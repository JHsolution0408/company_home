import * as React from "react"
import { navigate } from "gatsby"

import Seo from "../../components/seo"
import { apiRequest } from "../../utils/api"
import * as styles from "./admin.module.css"

const AdminLoginPage = () => {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    apiRequest("/api/admin/session")
      .then(() => navigate("/admin/notices", { replace: true }))
      .catch(() => {})
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await apiRequest("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      })
      await navigate("/admin/notices", { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <p className={styles.eyebrow}>JH SOLUTION</p>
        <h1>공지사항 관리자</h1>
        <p className={styles.description}>관리자 계정으로 로그인해주세요.</p>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label>
            아이디
            <input
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
              autoComplete="username"
              required
              autoFocus
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className={styles.formError}>{error}</p>}
          <button type="submit" className={styles.primaryButton} disabled={submitting}>
            {submitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </section>
    </main>
  )
}

export const Head = () => (
  <>
    <Seo title="관리자 로그인" description="공지사항 관리자 로그인" />
    <meta name="robots" content="noindex,nofollow" />
  </>
)

export default AdminLoginPage
