/**
 * 배포 환경 판별 (빌드 타임).
 * GATSBY_ 접두사가 있어야 브라우저 번들(src)에도 값이 주입된다.
 * 플래그가 없거나 오타면 개발 배포로 간주 → 색인/운영 API 가 실수로 열리지 않는다.
 */

const isProd = process.env.GATSBY_DEPLOY_ENV === `production`

// SEO 기준 주소를 운영웹 대표 주소로 설정
const prodUrl = `https://www.jh-solution.net`

// 현재 배포된 실제 주소.
const siteUrl = isProd ? prodUrl : `https://dev.jh-solution.net`

module.exports = { isProd, siteUrl, prodUrl }
