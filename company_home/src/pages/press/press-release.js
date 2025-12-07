import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const PressReleasePage = () => (
  <Layout>
    <header style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #e0e0e0", padding: "40px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto", textAlign: "left" }}>
        <h1 style={{ color: "#003d99", marginBottom: "12px", fontSize: "32px" }}>보도자료</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>
          JH솔루션이 전하는 공식 보도자료와 최신 뉴스를 확인하세요.
        </p>
      </div>
    </header>

    <main style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto" }}>
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#0066cc", marginBottom: "16px" }}>최신 보도자료</h2>
          <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
            곧 업데이트될 예정입니다. 새로운 소식을 기대해 주세요.
          </p>
        </section>

        <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
          <h3 style={{ color: "#003d99", marginBottom: "12px" }}>문의</h3>
          <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
            보도 관련 문의는 연락처 페이지를 통해 연락 부탁드립니다.
          </p>
        </section>
      </div>
    </main>
  </Layout>
)

export const Head = () => <Seo title="보도자료" />

export default PressReleasePage
