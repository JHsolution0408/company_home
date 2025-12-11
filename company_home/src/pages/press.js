import * as React from "react"
import { Link } from "gatsby"

import SubPageHeader from "../components/subpage-header"
import Seo from "../components/seo"

const PressPage = () => (
  <>
    <SubPageHeader />
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', maxWidth: '100%', padding: 'clamp(24px,4vw,60px) 5vw', boxSizing: 'border-box', margin: '0 auto' }}>
      <h1>홍보센터</h1>
      
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
        저희 회사의 최신 뉴스, 보도자료, 그리고 미디어 자료들입니다.
      </p>

      <div style={{ marginBottom: "60px" }}>
        <h2>최신 뉴스</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          <article style={{ padding: "20px", border: "1px solid #ddd", borderLeft: "4px solid #0066cc", borderRadius: "4px" }}>
            <h3>
              <Link to="/press/news-1" style={{ color: "#0066cc", textDecoration: "none" }}>
                새로운 솔루션 출시
              </Link>
            </h3>
            <p style={{ color: "#999", fontSize: "14px" }}>2024년 12월 1일</p>
            <p style={{ color: "#666" }}>
              저희 회사가 새로운 AI 기반 솔루션을 출시했습니다. 자세한 내용은 보도자료를 참고하세요.
            </p>
            <Link to="/press/news-1" style={{ color: "#0066cc", fontWeight: "bold" }}>
              자세히 읽기 →
            </Link>
          </article>

          <article style={{ padding: "20px", border: "1px solid #ddd", borderLeft: "4px solid #0066cc", borderRadius: "4px" }}>
            <h3>
              <Link to="/press/news-2" style={{ color: "#0066cc", textDecoration: "none" }}>
                국제 상 수상
              </Link>
            </h3>
            <p style={{ color: "#999", fontSize: "14px" }}>2024년 11월 15일</p>
            <p style={{ color: "#666" }}>
              저희 팀이 국제 기술 혁신상을 수상했습니다.
            </p>
            <Link to="/press/news-2" style={{ color: "#0066cc", fontWeight: "bold" }}>
              자세히 읽기 →
            </Link>
          </article>

          <article style={{ padding: "20px", border: "1px solid #ddd", borderLeft: "4px solid #0066cc", borderRadius: "4px" }}>
            <h3>
              <Link to="/press/news-3" style={{ color: "#0066cc", textDecoration: "none" }}>
                신규 파트너십 체결
              </Link>
            </h3>
            <p style={{ color: "#999", fontSize: "14px" }}>2024년 10월 20일</p>
            <p style={{ color: "#666" }}>
              글로벌 IT 기업과 전략적 파트너십을 체결했습니다.
            </p>
            <Link to="/press/news-3" style={{ color: "#0066cc", fontWeight: "bold" }}>
              자세히 읽기 →
            </Link>
          </article>
        </div>
      </div>

      <div style={{ marginBottom: "60px" }}>
        <h2>보도자료</h2>
        <p>
          저희 회사와 관련된 언론 보도자료들입니다.
        </p>
        <ul style={{ color: "#0066cc" }}>
          <li><Link to="/press/releases/release-1" style={{ color: "#0066cc" }}>2024년 4분기 경영 성과</Link></li>
          <li><Link to="/press/releases/release-2" style={{ color: "#0066cc" }}>신제품 발표 보도자료</Link></li>
          <li><Link to="/press/releases/release-3" style={{ color: "#0066cc" }}>기술 파트너십 협약</Link></li>
        </ul>
      </div>

      <div style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>미디어 문의</h2>
        <p>
          저희 회사에 대한 취재나 보도자료 배포는 아래 연락처로 문의하세요.
        </p>
        <p>
          <strong>이메일:</strong> <a href="mailto:press@company.com" style={{ color: "#0066cc" }}>press@company.com</a><br />
          <strong>전화:</strong> 02-0000-0000
        </p>
      </div>
      </div>
    </div>
  </>
)

export const Head = () => <Seo title="홍보센터" />

export default PressPage
