import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const WebSolutionPage = () => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/solutions" style={{ color: "#0066cc" }}>← 솔루션으로 돌아가기</Link>
      
      <h1>웹 솔루션</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>개요</h2>
        <p>
          최신 웹 기술을 활용하여 고성능, 확장성, 보안성을 갖춘 웹 애플리케이션을 개발합니다.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>주요 기술</h2>
        <ul>
          <li>React, Vue.js, Angular</li>
          <li>Node.js, Django, Java Spring</li>
          <li>PostgreSQL, MongoDB, Redis</li>
          <li>Docker, Kubernetes</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>제공 서비스</h2>
        <ul>
          <li>웹 애플리케이션 개발</li>
          <li>마이크로서비스 아키텍처 설계</li>
          <li>API 개발 및 통합</li>
          <li>성능 최적화</li>
          <li>보안 감사 및 강화</li>
        </ul>
      </section>

      <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>문의하기</h2>
        <p>웹 솔루션에 대해 궁금하신 점이 있으시면 언제든지 문의하세요.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold" }}>
          연락처 →
        </Link>
      </section>
    </div>
  </Layout>
)

export const Head = () => <Seo title="웹 솔루션" />

export default WebSolutionPage
