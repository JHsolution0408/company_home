import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const MobileSolutionPage = () => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/solutions" style={{ color: "#0066cc" }}>← 솔루션으로 돌아가기</Link>
      
      <h1>모바일 솔루션</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>개요</h2>
        <p>
          iOS와 Android 플랫폼을 지원하는 안정적이고 사용자 친화적인 모바일 애플리케이션을 개발합니다.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>주요 기술</h2>
        <ul>
          <li>Swift, Kotlin, Flutter, React Native</li>
          <li>Firebase, AWS Amplify</li>
          <li>OAuth, JWT 보안</li>
          <li>App Store, Google Play 배포</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>제공 서비스</h2>
        <ul>
          <li>네이티브 앱 개발 (iOS, Android)</li>
          <li>크로스 플랫폼 앱 개발</li>
          <li>모바일 UI/UX 디자인</li>
          <li>배포 및 유지보수</li>
          <li>성능 모니터링</li>
        </ul>
      </section>

      <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>문의하기</h2>
        <p>모바일 솔루션에 대해 궁금하신 점이 있으시면 언제든지 문의하세요.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold" }}>
          연락처 →
        </Link>
      </section>
    </div>
  </Layout>
)

export const Head = () => <Seo title="모바일 솔루션" />

export default MobileSolutionPage
