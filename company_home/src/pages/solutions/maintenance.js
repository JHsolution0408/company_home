import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const MaintenanceSolutionPage = () => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/solutions" style={{ color: "#0066cc" }}>← 솔루션으로 돌아가기</Link>
      
      <h1>유지보수</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>개요</h2>
        <p>
          애플리케이션과 시스템의 장기적인 안정성과 성능을 보장하기 위한 지속적인 유지보수 및 지원 서비스입니다.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>유지보수 서비스</h2>
        <ul>
          <li>버그 수정 및 패치</li>
          <li>성능 모니터링</li>
          <li>보안 업데이트</li>
          <li>기술 지원 (24/7)</li>
          <li>정기적인 점검</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>SLA 및 지원 옵션</h2>
        <ul>
          <li><strong>Silver:</strong> 업무 시간 지원</li>
          <li><strong>Gold:</strong> 24/7 지원 (4시간 응답)</li>
          <li><strong>Platinum:</strong> 24/7 지원 (1시간 응답)</li>
        </ul>
      </section>

      <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>문의하기</h2>
        <p>유지보수 서비스에 대해 궁금하신 점이 있으시면 언제든지 문의하세요.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold" }}>
          연락처 →
        </Link>
      </section>
    </div>
  </Layout>
)

export const Head = () => <Seo title="유지보수" />

export default MaintenanceSolutionPage
