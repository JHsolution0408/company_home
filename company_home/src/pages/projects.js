import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ProjectsPage = () => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <h1>프로젝트</h1>
      
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
        저희가 성공적으로 완료한 다양한 프로젝트들입니다.
      </p>

      <div style={{ marginBottom: "40px" }}>
        <h2>주요 프로젝트</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3>프로젝트 1</h3>
            <p><strong>카테고리:</strong> 웹 개발</p>
            <p><strong>기간:</strong> 2023.01 - 2023.06</p>
            <p style={{ color: "#666" }}>프로젝트 1에 대한 간단한 설명입니다.</p>
            <Link to="/projects/project-1" style={{ color: "#0066cc", fontWeight: "bold" }}>
              프로젝트 상세보기 →
            </Link>
          </div>

          <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3>프로젝트 2</h3>
            <p><strong>카테고리:</strong> 모바일 앱</p>
            <p><strong>기간:</strong> 2023.03 - 2023.10</p>
            <p style={{ color: "#666" }}>프로젝트 2에 대한 간단한 설명입니다.</p>
            <Link to="/projects/project-2" style={{ color: "#0066cc", fontWeight: "bold" }}>
              프로젝트 상세보기 →
            </Link>
          </div>

          <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3>프로젝트 3</h3>
            <p><strong>카테고리:</strong> 클라우드 인프라</p>
            <p><strong>기간:</strong> 2023.05 - 2023.12</p>
            <p style={{ color: "#666" }}>프로젝트 3에 대한 간단한 설명입니다.</p>
            <Link to="/projects/project-3" style={{ color: "#0066cc", fontWeight: "bold" }}>
              프로젝트 상세보기 →
            </Link>
          </div>

          <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3>프로젝트 4</h3>
            <p><strong>카테고리:</strong> AI/ML</p>
            <p><strong>기간:</strong> 2024.01 - 2024.08</p>
            <p style={{ color: "#666" }}>프로젝트 4에 대한 간단한 설명입니다.</p>
            <Link to="/projects/project-4" style={{ color: "#0066cc", fontWeight: "bold" }}>
              프로젝트 상세보기 →
            </Link>
          </div>
        </div>
      </div>

      <section style={{ marginTop: "60px", padding: "30px", backgroundColor: "#f0f8ff", borderRadius: "8px" }}>
        <h2>더 많은 프로젝트를 보고 싶으신가요?</h2>
        <p>저희와 함께 새로운 프로젝트를 시작할 준비가 되어있습니다.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold", fontSize: "18px" }}>
          연락처 →
        </Link>
      </section>
    </div>
  </Layout>
)

export const Head = () => <Seo title="프로젝트" />

export default ProjectsPage
