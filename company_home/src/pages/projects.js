import * as React from "react"
import { Link } from "gatsby"

import SubPageHeader from "../components/subpage-header"
import Seo from "../components/seo"

const ProjectsPage = () => (
  <>
    <SubPageHeader />
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', maxWidth: '100%', padding: 'clamp(24px,4vw,60px) 5vw', boxSizing: 'border-box', margin: '0 auto' }}>
      <h1>프로젝트</h1>
      
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
        JH솔루션의 기술이 실현된 혁신의 현장, 데이터로 검증된 다양한 사업 분야의 수행 실적을 소개합니다.
      </p>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "10px" }}>산업과 도시의 내일을 바꾸는 JH솔루션의 핵심 프로젝트</h2>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
          제조 산업 현장부터 스마트시티, 국가 연구 과제까지 에너지 최적화와 디지털 전환을 위한 주요 수행 실적 입니다.
        </p>
      </div>

      <section style={{ marginTop: "60px", padding: "30px", backgroundColor: "#f0f8ff", borderRadius: "8px" }}>
        <h2>더 많은 프로젝트를 보고 싶으신가요?</h2>
        <p>저희와 함께 새로운 프로젝트를 시작할 준비가 되어있습니다.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold", fontSize: "18px" }}>
          연락처 →
        </Link>
      </section>
      </div>
    </div>
  </>
)

export const Head = () => <Seo title="프로젝트" />

export default ProjectsPage
