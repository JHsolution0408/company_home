import * as React from "react"
import { Link, navigate } from "gatsby"

import Seo from "../../components/seo"
import { apiAssetUrl, apiRequest, formatNoticeDate } from "../../utils/api"
import * as styles from "./admin.module.css"

const CONTENT_TYPES = {
  notice: { label: "공지사항", path: "/notice", slugPrefix: "notice" },
  press: { label: "보도자료", path: "/press", slugPrefix: "press" },
  techinsight: {
    label: "기술 인사이트",
    path: "/techinsights",
    slugPrefix: "insight",
  },
  project: { label: "프로젝트", path: "/projects", slugPrefix: "project" },
}

const localDate = value => {
  const date = value ? new Date(value) : new Date()
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  }).format(date)
}

const createContent = (contentType = "notice") => {
  const now = new Date()
  const pad = number => String(number).padStart(2, "0")
  const slug = `${CONTENT_TYPES[contentType].slugPrefix}-${now.getFullYear()}${pad(
    now.getMonth() + 1
  )}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`
  return {
    id: null,
    contentType,
    title: "",
    slug,
    summary: "",
    content: "",
    featureImageUrl: "",
    author: "",
    externalUrl: "",
    pdfUrl: "",
    displayOrder: 0,
    projectPeriod: "",
    projectClient: "",
    projectTags: [],
    projectContents: [],
    pdfLabel: "",
    pdfDownloadName: "",
    isPublished: false,
    publishedAt: localDate(),
  }
}

const toFormContent = content => ({
  ...content,
  publishedAt: localDate(content.publishedAt || content.createdAt),
})

const AdminContentPage = () => {
  const [admin, setAdmin] = React.useState(null)
  const [contents, setContents] = React.useState([])
  const [filter, setFilter] = React.useState("all")
  const [form, setForm] = React.useState(() => createContent())
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [uploadingPdf, setUploadingPdf] = React.useState(false)
  const [uploadedPdfName, setUploadedPdfName] = React.useState("")
  const [uploadedImages, setUploadedImages] = React.useState([])
  const [error, setError] = React.useState("")
  const [message, setMessage] = React.useState("")

  const loadContents = React.useCallback(async () => {
    const data = await apiRequest("/api/admin/content")
    setContents(data.contents)
  }, [])

  React.useEffect(() => {
    let active = true
    Promise.all([apiRequest("/api/admin/session"), apiRequest("/api/admin/content")])
      .then(([session, contentData]) => {
        if (!active) return
        setAdmin(session.admin)
        setContents(contentData.contents)
      })
      .catch(requestError => {
        if (requestError.status === 401) {
          navigate("/admin/login", { replace: true })
        } else if (active) {
          setError(requestError.message)
        }
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const visibleContents =
    filter === "all"
      ? contents
      : contents.filter(content => content.contentType === filter)

  const updateField = event => {
    const { name, value, checked, type } = event.target
    if (name === "contentType") {
      setForm(current =>
        current.id
          ? { ...current, contentType: value }
          : createContent(value)
      )
      return
    }
    setForm(current => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const resetForm = (contentType = filter === "all" ? "notice" : filter) => {
    setForm(createContent(contentType))
    setUploadedImages([])
    setUploadedPdfName("")
    setError("")
    setMessage("")
  }

  const handlePdfUpload = async event => {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

    setUploadingPdf(true)
    setError("")
    setMessage("")
    try {
      const body = new FormData()
      body.append("pdf", file)
      const data = await apiRequest("/api/admin/uploads/pdf", {
        method: "POST",
        body,
      })
      setUploadedPdfName(data.file.name)
      setForm(current => ({
        ...current,
        pdfUrl: data.file.url,
        pdfDownloadName: current.pdfDownloadName || data.file.name,
      }))
      setMessage("PDF 파일이 업로드되었습니다.")
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setUploadingPdf(false)
    }
  }

  const handleImageUpload = async event => {
    const files = Array.from(event.target.files || [])
    event.target.value = ""
    if (files.length === 0) return
    if (files.length > 10) {
      setError("이미지는 한 번에 최대 10장까지 선택할 수 있습니다.")
      return
    }

    setUploading(true)
    setError("")
    setMessage("")
    try {
      const body = new FormData()
      files.forEach(file => body.append("images", file))
      const data = await apiRequest("/api/admin/uploads", {
        method: "POST",
        body,
      })
      setUploadedImages(current => [...current, ...data.files])
      setForm(current => ({
        ...current,
        featureImageUrl: current.featureImageUrl || data.files[0]?.url || "",
      }))
      setMessage(`${data.files.length}장의 이미지가 업로드되었습니다.`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setUploading(false)
    }
  }

  const insertImageIntoContent = image => {
    const markdown = `\n\n![${image.name}](${image.url})\n\n`
    setForm(current => ({
      ...current,
      content: `${current.content}${markdown}`,
    }))
    setMessage("본문 끝에 이미지가 삽입되었습니다.")
  }

  const handleSave = async event => {
    event.preventDefault()
    setSaving(true)
    setError("")
    setMessage("")
    try {
      const payload = {
        ...form,
        projectTags: Array.isArray(form.projectTags)
          ? form.projectTags
          : [],
        projectContents: Array.isArray(form.projectContents)
          ? form.projectContents
          : [],
        displayOrder: Number(form.displayOrder || 0),
        publishedAt:
          form.isPublished && form.publishedAt
            ? new Date(`${form.publishedAt}T00:00:00+09:00`).toISOString()
            : null,
      }
      await apiRequest(
        form.id ? `/api/admin/content/${form.id}` : "/api/admin/content",
        {
          method: form.id ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      )
      await loadContents()
      setForm(createContent(form.contentType))
      setMessage("콘텐츠가 저장되었습니다.")
    } catch (requestError) {
      if (requestError.status === 401) {
        await navigate("/admin/login", { replace: true })
      } else {
        setError(requestError.message)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async content => {
    if (!window.confirm(`"${content.title}" 항목을 삭제할까요?`)) return
    setError("")
    setMessage("")
    try {
      await apiRequest(`/api/admin/content/${content.id}`, { method: "DELETE" })
      await loadContents()
      if (form.id === content.id) setForm(createContent(content.contentType))
      setMessage("콘텐츠가 삭제되었습니다.")
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const handleLogout = async () => {
    await apiRequest("/api/admin/logout", { method: "POST" }).catch(() => {})
    await navigate("/admin/login", { replace: true })
  }

  if (loading) {
    return <main className={styles.adminPage}>관리자 정보를 확인하는 중입니다.</main>
  }

  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHeader}>
        <div>
          <p className={styles.eyebrow}>JH SOLUTION</p>
          <h1>콘텐츠 관리</h1>
          <p>{admin?.username}님으로 로그인했습니다.</p>
        </div>
        <div className={styles.headerActions}>
          <Link
            to={CONTENT_TYPES[form.contentType].path}
            className={styles.secondaryButton}
          >
            현재 유형 페이지 보기
          </Link>
          <button type="button" className={styles.secondaryButton} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>

      {(error || message) && (
        <p className={error ? styles.formError : styles.formMessage}>
          {error || message}
        </p>
      )}

      <div className={styles.adminGrid}>
        <section className={styles.noticePanel}>
          <div className={styles.panelHeader}>
            <h2>콘텐츠 목록</h2>
            <button type="button" className={styles.primaryButton} onClick={() => resetForm()}>
              새 콘텐츠
            </button>
          </div>
          <div className={styles.filterTabs}>
            <button
              type="button"
              className={filter === "all" ? styles.filterTabActive : styles.filterTab}
              onClick={() => setFilter("all")}
            >
              전체
            </button>
            {Object.entries(CONTENT_TYPES).map(([value, definition]) => (
              <button
                type="button"
                key={value}
                className={filter === value ? styles.filterTabActive : styles.filterTab}
                onClick={() => setFilter(value)}
              >
                {definition.label}
              </button>
            ))}
          </div>
          <div className={styles.noticeList}>
            {visibleContents.length === 0 && <p>등록된 콘텐츠가 없습니다.</p>}
            {visibleContents.map(content => (
              <article
                key={content.id}
                className={`${styles.noticeItem} ${
                  form.id === content.id ? styles.noticeItemSelected : ""
                }`}
              >
                <button
                  type="button"
                  className={styles.noticeSelect}
                  onClick={() => {
                    setForm(toFormContent(content))
                    setUploadedImages([])
                    setUploadedPdfName("")
                    setError("")
                    setMessage("")
                  }}
                >
                  <span className={styles.typeBadge}>
                    {CONTENT_TYPES[content.contentType]?.label}
                  </span>
                  <strong>{content.title}</strong>
                  <span>
                    {content.isPublished ? "공개" : "비공개"} ·{" "}
                    {formatNoticeDate(content.publishedAt || content.createdAt)}
                  </span>
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDelete(content)}
                >
                  삭제
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.editorPanel}>
          <h2>{form.id ? "콘텐츠 수정" : "새 콘텐츠 작성"}</h2>
          <form onSubmit={handleSave} className={styles.editorForm}>
            <label>
              콘텐츠 유형
              <select name="contentType" value={form.contentType} onChange={updateField}>
                {Object.entries(CONTENT_TYPES).map(([value, definition]) => (
                  <option key={value} value={value}>
                    {definition.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              제목
              <input name="title" value={form.title} onChange={updateField} required />
            </label>
            <label>
              주소 슬러그
              <input
                name="slug"
                value={form.slug}
                onChange={updateField}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                required
              />
              <small>영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.</small>
            </label>
            <label>
              요약
              <textarea name="summary" value={form.summary} onChange={updateField} rows="3" />
            </label>
            <div className={styles.imageUploader}>
              <div>
                <strong>이미지 첨부</strong>
                <p>JPG, PNG, WEBP, GIF, AVIF · 장당 10MB · 한 번에 최대 10장</p>
              </div>
              <label className={styles.uploadButton}>
                {uploading ? "업로드 중..." : "이미지 선택"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>

            {uploadedImages.length > 0 && (
              <div className={styles.uploadedGrid}>
                {uploadedImages.map(image => (
                  <article key={image.url} className={styles.uploadedImage}>
                    <img src={apiAssetUrl(image.url)} alt={image.name} />
                    <span title={image.name}>{image.name}</span>
                    <div className={styles.imageActions}>
                      <button
                        type="button"
                        className={
                          form.featureImageUrl === image.url
                            ? styles.imageActionActive
                            : styles.imageAction
                        }
                        onClick={() =>
                          setForm(current => ({
                            ...current,
                            featureImageUrl: image.url,
                          }))
                        }
                      >
                        {form.featureImageUrl === image.url
                          ? "대표 이미지"
                          : "대표로 지정"}
                      </button>
                      {!["techinsight", "project"].includes(form.contentType) && (
                        <button
                          type="button"
                          className={styles.imageAction}
                          onClick={() => insertImageIntoContent(image)}
                        >
                          본문 삽입
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {form.featureImageUrl && uploadedImages.length === 0 && (
              <div className={styles.currentFeatureImage}>
                <span>현재 대표 이미지</span>
                <img
                  src={apiAssetUrl(form.featureImageUrl)}
                  alt="현재 대표 이미지"
                />
              </div>
            )}

            {form.contentType === "press" && (
              <label>
                기사 원문 URL
                <input
                  type="url"
                  name="externalUrl"
                  value={form.externalUrl}
                  onChange={updateField}
                  placeholder="https://..."
                />
              </label>
            )}

            {form.contentType === "techinsight" && (
              <>
                <label>
                  작성자
                  <input name="author" value={form.author} onChange={updateField} />
                </label>
                <div className={styles.fileUploader}>
                  <div>
                    <strong>PDF 파일</strong>
                    <p>PDF · 최대 30MB · 파일 1개</p>
                  </div>
                  <label className={styles.uploadButton}>
                    {uploadingPdf ? "업로드 중..." : form.pdfUrl ? "PDF 교체" : "PDF 선택"}
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                    />
                  </label>
                </div>
                {form.pdfUrl && (
                  <div className={styles.uploadedFile}>
                    <span>{uploadedPdfName || form.pdfDownloadName || "등록된 PDF"}</span>
                    <a href={apiAssetUrl(form.pdfUrl)} target="_blank" rel="noopener noreferrer">
                      파일 확인
                    </a>
                  </div>
                )}
                <label>
                  목록 정렬 순서
                  <input
                    type="number"
                    name="displayOrder"
                    value={form.displayOrder}
                    onChange={updateField}
                  />
                  <small>숫자가 클수록 먼저 표시됩니다.</small>
                </label>
              </>
            )}

            {form.contentType === "project" && (
              <>
                <label>
                  사업 기간
                  <input
                    name="projectPeriod"
                    value={form.projectPeriod}
                    onChange={updateField}
                    placeholder="2026.01 - 2026.12"
                  />
                </label>
                <label>
                  발주처 / 지원기관
                  <input
                    name="projectClient"
                    value={form.projectClient}
                    onChange={updateField}
                  />
                </label>
                <label>
                  태그
                  <input
                    value={(form.projectTags || []).join(", ")}
                    onChange={event =>
                      setForm(current => ({
                        ...current,
                        projectTags: event.target.value
                          .split(",")
                          .map(value => value.trim())
                          .map(value =>
                            /^[a-z0-9_-]+$/i.test(value)
                              ? value.toUpperCase()
                              : value
                          )
                          .filter(Boolean),
                      }))
                    }
                    placeholder="INDUSTRY, INFRA, GOV"
                  />
                  <small>
                    INDUSTRY는 산업 적용, INFRA는 도시·건물, GOV는 정부·연구
                    과제를 의미합니다. 여러 태그는 쉼표로 구분하세요. 새로운
                    태그가 필요하면 영문 코드 또는 표시할 이름을 그대로
                    입력할 수 있습니다. 예: ENERGY, DIGITAL_TWIN
                  </small>
                </label>
                <label>
                  사업 내용
                  <textarea
                    value={(form.projectContents || []).join("\n")}
                    onChange={event =>
                      setForm(current => ({
                        ...current,
                        projectContents: event.target.value
                          .split("\n")
                          .map(value => value.trim())
                          .filter(Boolean),
                      }))
                    }
                    rows="8"
                    placeholder="한 줄에 한 항목씩 입력합니다."
                  />
                </label>
                <div className={styles.fileUploader}>
                  <div>
                    <strong>PDF 자료</strong>
                    <p>선택 사항 · PDF · 최대 30MB · 파일 1개</p>
                  </div>
                  <label className={styles.uploadButton}>
                    {uploadingPdf ? "업로드 중..." : form.pdfUrl ? "PDF 교체" : "PDF 선택"}
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                    />
                  </label>
                </div>
                {form.pdfUrl && (
                  <div className={styles.uploadedFile}>
                    <span>{uploadedPdfName || form.pdfDownloadName || "등록된 PDF"}</span>
                    <a href={apiAssetUrl(form.pdfUrl)} target="_blank" rel="noopener noreferrer">
                      파일 확인
                    </a>
                  </div>
                )}
                <label>
                  PDF 버튼 문구
                  <input
                    name="pdfLabel"
                    value={form.pdfLabel}
                    onChange={updateField}
                    placeholder="자료 다운로드"
                  />
                </label>
                <label>
                  다운로드 파일명
                  <input
                    name="pdfDownloadName"
                    value={form.pdfDownloadName}
                    onChange={updateField}
                  />
                </label>
                <label>
                  목록 정렬 순서
                  <input
                    type="number"
                    name="displayOrder"
                    value={form.displayOrder}
                    onChange={updateField}
                  />
                </label>
              </>
            )}

            {!["techinsight", "project"].includes(form.contentType) && (
              <label>
                내용 (Markdown)
                <textarea
                  name="content"
                  value={form.content}
                  onChange={updateField}
                  rows="18"
                  required
                />
              </label>
            )}

            <div className={styles.publishRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={updateField}
                />
                홈페이지에 공개
              </label>
              <label>
                게시일
                <input
                  type="date"
                  name="publishedAt"
                  value={form.publishedAt}
                  onChange={updateField}
                  disabled={!form.isPublished}
                />
              </label>
            </div>
            <div className={styles.editorActions}>
              <button type="button" className={styles.secondaryButton} onClick={() => resetForm(form.contentType)}>
                취소
              </button>
              <button type="submit" className={styles.primaryButton} disabled={saving}>
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export const Head = () => (
  <>
    <Seo title="콘텐츠 관리" description="공지사항, 보도자료, 기술 인사이트 관리" />
    <meta name="robots" content="noindex,nofollow" />
  </>
)

export default AdminContentPage
