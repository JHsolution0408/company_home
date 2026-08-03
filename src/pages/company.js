import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./company.module.css"

const PAGE_TITLE = "회사소개"
const PAGE_DESCRIPTION =
  "㈜제이에이치솔루션의 비전과 미션, JHAION 개발 배경, 협력 네트워크를 소개합니다."

// 하위 페이지의 실제 제목/설명과 동일하게 유지한다 (사이트링크 문구로 노출될 수 있음)
const SECTIONS = [
  {
    path: "/company/vision-mission",
    name: "비전 및 미션",
    description: "AI와 공학 기술로 지속 가능한 미래를 만들어갑니다.",
  },
  {
    path: "/company/jhaion-background",
    name: "JHAION 개발 배경",
    description: "JHAION 개발 배경과 기술적 해결 방법, 최종 목표를 소개합니다.",
  },
  {
    path: "/company/partners",
    name: "협력 네트워크",
    description: "기술적 혁신을 만들기 위해 다양한 파트너와 협력하고 있습니다.",
  },
]

const CompanyPage = () => (
  <Layout
    type="light"
    subHeaderTitle={PAGE_TITLE}
    subHeaderDescription={PAGE_DESCRIPTION}
    subHeaderBgImage="/images/banners/bg_vision.png"
  >
    <nav className={styles.list} aria-label="회사소개 하위 페이지">
      {SECTIONS.map(section => (
        <Link key={section.path} to={section.path} className={styles.card}>
          <h2 className={styles.cardTitle}>{section.name}</h2>
          <p className={styles.cardDescription}>{section.description}</p>
        </Link>
      ))}
    </nav>
  </Layout>
)

export const Head = () => (
  <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
)

export default CompanyPage
