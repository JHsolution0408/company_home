import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const TeamPage = () => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/company" style={{ color: "#0066cc" }}>← 회사 소개로 돌아가기</Link>
      
      <h1>팀 소개</h1>
      
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
        저희 회사의 전문적이고 경험 많은 팀입니다.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" }}>
          <h3>팀 멤버 1</h3>
          <p style={{ color: "#0066cc", fontWeight: "bold" }}>CEO</p>
          <p style={{ color: "#666" }}>20년 이상의 IT 경력</p>
        </div>

        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" }}>
          <h3>팀 멤버 2</h3>
          <p style={{ color: "#0066cc", fontWeight: "bold" }}>CTO</p>
          <p style={{ color: "#666" }}>클라우드 및 AI 전문가</p>
        </div>

        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" }}>
          <h3>팀 멤버 3</h3>
          <p style={{ color: "#0066cc", fontWeight: "bold" }}>개발 리더</p>
          <p style={{ color: "#666" }}>15년 개발 경험</p>
        </div>

        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" }}>
          <h3>팀 멤버 4</h3>
          <p style={{ color: "#0066cc", fontWeight: "bold" }}>디자인 리더</p>
          <p style={{ color: "#666" }}>UX/UI 전문가</p>
        </div>

        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" }}>
          <h3>팀 멤버 5</h3>
          <p style={{ color: "#0066cc", fontWeight: "bold" }}>PM</p>
          <p style={{ color: "#666" }}>프로젝트 관리 전문가</p>
        </div>

        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" }}>
          <h3>팀 멤버 6</h3>
          <p style={{ color: "#0066cc", fontWeight: "bold" }}>QA 리더</p>
          <p style={{ color: "#666" }}>품질 보증 전문가</p>
        </div>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="팀 소개" />

export default TeamPage
