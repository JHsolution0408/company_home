import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const ProjectDetailPage = ({ params }) => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/projects" style={{ color: "#0066cc" }}>← 프로젝트로 돌아가기</Link>
      
      <h1>프로젝트 1</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>프로젝트 개요</h2>
        <p><strong>프로젝트명:</strong> 프로젝트 1</p>
        <p><strong>클라이언트:</strong> 클라이언트 회사명</p>
        <p><strong>카테고리:</strong> 웹 개발</p>
        <p><strong>기간:</strong> 2023.01 - 2023.06</p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>프로젝트 요약</h2>
        <p>
          본 프로젝트는 클라이언트의 비즈니스 요구사항을 분석하여 맞춤형 웹 애플리케이션을 개발한 사례입니다.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>주요 성과</h2>
        <ul>
          <li>성과 1</li>
          <li>성과 2</li>
          <li>성과 3</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>사용 기술</h2>
        <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>PostgreSQL</li>
          <li>AWS</li>
        </ul>
      </section>

      <section
        style={{
          backgroundColor: "#f0f8ff",
          padding: "30px",
          borderRadius: "8px"
        }}
      >
        <h2>문의하기</h2>

        <p>이 프로젝트와 유사한 개발을 원하시면 문의하세요.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold" }}>
          연락처 →
        </Link>
      </section>
    </div>
  </Layout>
)

export const Head = () => <Seo title="프로젝트 1" />

export default ProjectDetailPage
