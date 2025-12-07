import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const PartnersPage = () => (
  <Layout>
    <header style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #e0e0e0", padding: "40px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto", textAlign: "left" }}>
        <h1 style={{ color: "#003d99", marginBottom: "12px", fontSize: "32px" }}>협력 네트워크</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>
          글로벌 파트너들과의 협업을 통해 확장되는 JH솔루션의 생태계를 소개합니다.
        </p>
      </div>
    </header>

    <main style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto" }}>
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#0066cc", marginBottom: "16px" }}>핵심 파트너십</h2>
          <ul style={{ color: "#555", lineHeight: "1.8", paddingLeft: "20px", margin: 0 }}>
            <li>에너지 기업과의 공동 R&D 및 PoC 프로젝트</li>
            <li>클라우드/AI 플랫폼 사업자와의 기술 협력</li>
            <li>학계·연구기관과의 공동 연구 및 인력 양성</li>
          </ul>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#0066cc", marginBottom: "16px" }}>협력 가치</h2>
          <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
            파트너와 함께 새로운 시장 기회를 발굴하고, 최적화된 솔루션을 빠르게 제공하여 상호 성장을 도모합니다.
          </p>
        </section>

        <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
          <h3 style={{ color: "#003d99", marginBottom: "12px" }}>파트너 제안</h3>
          <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
            새로운 협업을 통해 더 큰 가치를 만들고 싶다면 언제든 연락주세요.
          </p>
        </section>
      </div>
    </main>
  </Layout>
)

export const Head = () => <Seo title="협력 네트워크" />

export default PartnersPage
