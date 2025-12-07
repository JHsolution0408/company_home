import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const VisionMissionPage = () => (
  <Layout>
    <header style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #e0e0e0", padding: "40px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto", textAlign: "left" }}>
        <h1 style={{ color: "#003d99", marginBottom: "12px", fontSize: "32px" }}>비전 및 미션</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>
          JH솔루션의 비전과 미션을 통해 혁신을 향한 우리의 방향성을 확인하세요.
        </p>
      </div>
    </header>

    <main style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto" }}>
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#0066cc", marginBottom: "16px" }}>비전</h2>
          <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
            데이터 공학과 AI를 통해 산업 전반의 효율을 극대화하고 지속 가능한 미래를 이끕니다.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#0066cc", marginBottom: "16px" }}>미션</h2>
          <ul style={{ color: "#555", lineHeight: "1.8", paddingLeft: "20px", margin: 0 }}>
            <li>고객 맞춤형 AI·시뮬레이션 기반 통합 플랫폼 제공</li>
            <li>에너지 최적화와 Net-zero 달성을 위한 엔지니어링 지원</li>
            <li>지속 가능한 가치 창출을 위한 파트너십 강화</li>
          </ul>
        </section>

        <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
          <h3 style={{ color: "#003d99", marginBottom: "12px" }}>다음 단계</h3>
          <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
            우리의 비전과 미션을 실현하기 위한 실행 전략과 성과를 지속적으로 공유하겠습니다.
          </p>
        </section>
      </div>
    </main>
  </Layout>
)

export const Head = () => <Seo title="비전 및 미션" />

export default VisionMissionPage
