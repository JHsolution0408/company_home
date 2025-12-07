import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const CloudSolutionPage = () => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/solutions" style={{ color: "#0066cc" }}>← 솔루션으로 돌아가기</Link>
      
      <h1>클라우드 솔루션</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>개요</h2>
        <p>
          AWS, Azure, GCP 등 주요 클라우드 플랫폼을 활용하여 안정적이고 확장 가능한 인프라를 구축합니다.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>주요 기술</h2>
        <ul>
          <li>AWS (EC2, S3, RDS, Lambda)</li>
          <li>Azure (Virtual Machines, App Service)</li>
          <li>GCP (Compute Engine, Cloud Storage)</li>
          <li>Terraform, CloudFormation</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>제공 서비스</h2>
        <ul>
          <li>클라우드 아키텍처 설계</li>
          <li>마이그레이션 컨설팅</li>
          <li>인프라 자동화</li>
          <li>비용 최적화</li>
          <li>보안 및 모니터링</li>
        </ul>
      </section>

      <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>문의하기</h2>
        <p>클라우드 솔루션에 대해 궁금하신 점이 있으시면 언제든지 문의하세요.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold" }}>
          연락처 →
        </Link>
      </section>
    </div>
  </Layout>
)

export const Head = () => <Seo title="클라우드 솔루션" />

export default CloudSolutionPage
