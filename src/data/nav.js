/**
 * 헤더/사이드바 내비게이션과 구조화 데이터(SiteNavigationElement, BreadcrumbList)가
 * 공유하는 단일 메뉴 정의.
 * gatsby-ssr.js(CommonJS)에서도 require 하므로 module.exports 형태를 유지한다.
 */

const solutionItems = [
  { name: "JHAION 엔진", slug: "jhaion-engine" },
  { name: "에너지 관리", slug: "energy" },
  { name: "시뮬레이션", slug: "simulation" },
  { name: "인공지능", slug: "ai" },
  { name: "디지털트윈", slug: "digitaltwin" },
  { name: "미디어", slug: "media" },
]

const companyItems = [
  { name: "비전 및 미션", slug: "vision-mission" },
  { name: "JHAION 개발 배경", slug: "jhaion-background" },
  { name: "협력 네트워크", slug: "partners" },
]

const pressItems = [
  { name: "보도자료", slug: "press" },
  { name: "기술 인사이트", slug: "techinsights" },
  { name: "공지사항", slug: "notice" },
]

// hasIndexPage: basePath 자체가 실제 페이지인 그룹만 true (Breadcrumb 링크로 쓰인다)
const MENU = [
  {
    key: "company",
    label: "회사소개",
    basePath: "/company",
    hasIndexPage: true,
    items: companyItems,
  },
  { key: "solutions", label: "솔루션", basePath: "/solutions", items: solutionItems },
  { key: "projects", label: "프로젝트", basePath: "/projects" },
  {
    key: "press",
    label: "홍보센터",
    basePath: "",
    items: pressItems,
    matchPaths: ["/press", "/techinsights", "/notice"],
  },
]

const buildItemPath = (menu, item) => {
  if (item.to) return item.to
  return `${menu.basePath}/${item.slug}`.replace(/\/$/, "")
}

// 사이트링크 후보로 검색엔진에 알릴 주요 경로 목록
const NAV_LINKS = [
  ...MENU.flatMap(menu => [
    ...(menu.hasIndexPage || !menu.items
      ? [{ name: menu.label, path: menu.basePath }]
      : []),
    ...(menu.items || []).map(item => ({
      name: item.name,
      path: buildItemPath(menu, item),
    })),
  ]),
  { name: "문의하기", path: "/contact" },
]

const matchPathsOf = menu =>
  (menu.matchPaths?.length ? menu.matchPaths : [menu.basePath]).filter(Boolean)

const isUnder = (path, base) => path === base || path.startsWith(`${base}/`)

/**
 * 경로에 해당하는 Breadcrumb 경로(홈 제외)를 돌려준다.
 * 예: "/company/partners" → [회사소개, 협력 네트워크]
 */
const breadcrumbsFor = pathname => {
  const path = (pathname || "/").replace(/\/+$/, "") || "/"
  if (path === "/") return []

  const menu = MENU.find(m => matchPathsOf(m).some(base => isUnder(path, base)))
  if (!menu) return []

  const group = menu.hasIndexPage
    ? [{ name: menu.label, path: menu.basePath }]
    : []

  if (!menu.items) return [{ name: menu.label, path: menu.basePath }]

  const item = menu.items.find(i => isUnder(path, buildItemPath(menu, i)))
  return item
    ? [...group, { name: item.name, path: buildItemPath(menu, item) }]
    : group
}

module.exports = { MENU, NAV_LINKS, buildItemPath, breadcrumbsFor }
