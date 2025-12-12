import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const CompanyPage = () => (
  <Layout>
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', maxWidth: '100%', padding: 'clamp(24px,4vw,60px) 5vw', boxSizing: 'border-box', margin: '0 auto' }}>
      <h1>회사 소개</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>회사 개요</h2>
        <p>
          저희 회사는 [회사명]으로, [설립년도]년에 설립되었습니다.
          최신 기술과 창의적인 솔루션을 통해 고객의 성공을 지원합니다.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>회사의 가치</h2>
        <ul>
          <li><strong>혁신:</strong> 끊임없는 기술 혁신</li>
          <li><strong>신뢰:</strong> 고객과의 신뢰 관계 구축</li>
          <li><strong>우수성:</strong> 최고 품질의 서비스 제공</li>
          <li><strong>협력:</strong> 팀 협력과 소통</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>주요 성과</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>클라이언트</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>100+</p>
          </div>
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>프로젝트</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>250+</p>
          </div>
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>경험</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc" }}>15+</p>
          </div>
        </div>
      </section>

      <section>
        <h2>조직 구성</h2>
        <p>
          자세한 조직 구성 및 팀 정보는 아래 링크에서 확인하실 수 있습니다.
        </p>
        <Link to="/company/team" style={{ color: "#0066cc", fontWeight: "bold" }}>
          팀 소개 →
        </Link>
      </section>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="회사 소개" />

export default CompanyPage
