import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const PressDetailPage = () => (
        <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/press" style={{ color: "#0066cc" }}>← 홍보센터로 돌아가기</Link>
      
      <h1>새로운 솔루션 출시</h1>
      <p style={{ color: "#999", fontSize: "14px" }}>2024년 12월 1일</p>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>보도자료</h2>
        <p>
          저희 회사가 새로운 AI 기반 솔루션을 출시했습니다. 이 솔루션은 기업의 업무 효율성을 크게 향상시킬 수 있습니다.
        </p>
        <p>
          자세한 내용은 다음과 같습니다.
        </p>
        <ul>
          <li>주요 기능 1</li>
          <li>주요 기능 2</li>
          <li>주요 기능 3</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>회사 소개</h2>
        <p>
          저희 회사는 AI와 클라우드 기술을 전문으로 하는 IT 솔루션 회사입니다.
        </p>
      </section>

      <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>문의</h2>
        <p>
          <strong>이메일:</strong> <a href="mailto:press@company.com" style={{ color: "#0066cc" }}>press@company.com</a><br />
          <strong>전화:</strong> 02-0000-0000
        </p>
      </section>
    </div>
  </Layout>
)

export const Head = () => <Seo title="새로운 솔루션 출시" />

export default PressDetailPage
