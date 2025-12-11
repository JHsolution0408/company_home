import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const ConsultingSolutionPage = () => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/solutions" style={{ color: "#0066cc" }}>← 솔루션으로 돌아가기</Link>
      
      <h1>컨설팅</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>개요</h2>
        <p>
          디지털 전환, 기술 개선, 비즈니스 최적화를 위한 전문적인 컨설팅 서비스를 제공합니다.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>컨설팅 영역</h2>
        <ul>
          <li>디지털 전환 전략</li>
          <li>기술 아키텍처 검토</li>
          <li>팀 구성 및 교육</li>
          <li>프로세스 최적화</li>
          <li>보안 및 규정 준수</li>
        </ul>
      </section>
      <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>문의하기</h2>
        <p>컨설팅 서비스에 대해 궁금하신 점이 있으시면 언제든지 문의하세요.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold" }}>
          연락처 →
        </Link>
      </section>
    </div>
  </Layout>
)
