const defaultApiBaseUrl = "https://www.jh-solution.net"

const getApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return defaultApiBaseUrl
  }

  // const isLoopbackHost = /^(localhost|127\.0\.0\.1)$/i.test(
  //   window.location.hostname
  // )
  // const defaultSameHostApiPort = isLoopbackHost ? "3000" : "13000"
  // const isLocalDevelopmentPort = window.location.port === "8060"
  // if (isLocalDevelopmentPort) {
  //   return `${window.location.protocol}//${window.location.hostname}:${defaultSameHostApiPort}`
  // }

  return defaultApiBaseUrl
}

export const apiAssetUrl = value => {
  if (!value || /^(https?:)?\/\//i.test(value) || !value.startsWith("/api/")) {
    return value
  }
  return `${getApiBaseUrl()}${value}`
}

export const apiRequest = async (path, options = {}) => {
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
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
