/**
 * 배포 환경 판별 (빌드 타임).
 * 빌드 시 DEPLOY_ENV=production 을 명시한 경우에만 운영 배포로 취급한다.
 * 값이 없거나 오타가 나면 개발 배포로 간주하므로, 실수로 색인이 열리지 않는다.
 */

const SITES = {
  production: `https://www.jh-solution.net`,
  development: `https://dev.jh-solution.net`,
}

const isProd = process.env.DEPLOY_ENV === `production`

module.exports = {
  isProd,
  siteUrl: isProd ? SITES.production : SITES.development,
}
