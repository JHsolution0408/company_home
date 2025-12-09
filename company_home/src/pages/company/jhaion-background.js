import * as React from "react"
import SubPageHeader from "../../components/subpage-header"
import Seo from "../../components/seo"

const JhaionBackgroundPage = () => (
  <>
    <SubPageHeader />
    <header style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #e0e0e0", padding: "40px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto", textAlign: "left" }}>
        <h1 style={{ color: "#003d99", marginBottom: "12px", fontSize: "32px" }}>JHAION 개발 배경</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>
          초거대 AI 기반 최적화 엔진 JHAION의 탄생 배경과 기술적 진화를 소개합니다.
        </p>
      </div>
    </header>

    <main style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "85%", margin: "0 auto" }}>
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#0066cc", marginBottom: "16px" }}>개발 동기</h2>
          <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
            복잡한 에너지 소비 패턴을 정밀하게 예측하고 최적의 운영 환경을 자동 설계하기 위해 시작되었습니다.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#0066cc", marginBottom: "16px" }}>핵심 기술</h2>
          <ul style={{ color: "#555", lineHeight: "1.8", paddingLeft: "20px", margin: 0 }}>
            <li>CFD 시뮬레이션과 AI 모델의 통합 학습</li>
            <li>대규모 시나리오 최적화를 위한 자동화 파이프라인</li>
            <li>실시간 데이터 수집·분석 기반 피드백 루프</li>
          </ul>
        </section>

        <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
          <h3 style={{ color: "#003d99", marginBottom: "12px" }}>현재와 미래</h3>
          <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
            JHAION은 지속적인 모델 고도화와 산업별 맞춤형 기능 확장을 통해 최적화 성능을 높이고 있습니다.
          </p>
        </section>
      </div>
    </main>
  </>
)

export const Head = () => <Seo title="JHAION 개발 배경" />

export default JhaionBackgroundPage
