// API(/api/*)는 사이트와 같은 호스트에서 서빙된다 (site-env.js 참고)
import { siteUrl as apiBaseUrl } from "../../site-env"

export const apiAssetUrl = value => {
  if (!value || /^(https?:)?\/\//i.test(value) || !value.startsWith("/api/")) {
    return value
  }
  return `${apiBaseUrl}${value}`
}

export const apiRequest = async (path, options = {}) => {
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData
  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body && !isFormData
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data.error || "요청을 처리하지 못했습니다.")
    error.status = response.status
    throw error
  }
  return data
}

export const formatNoticeDate = value => {
  if (!value) return ""
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  })
    .format(new Date(value))
    .replace(/\. /g, ".")
    .replace(/\.$/, "")
}
