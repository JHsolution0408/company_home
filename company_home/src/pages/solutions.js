import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SolutionsPage = () => (
  <Layout>
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', maxWidth: '100%', padding: 'clamp(24px,4vw,60px) 5vw', boxSizing: 'border-box', margin: '0 auto' }}>
      <h1>솔루션</h1>
      
      <p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
        고객의 다양한 비즈니스 요구에 맞춘 맞춤형 솔루션을 제공합니다.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "40px" }}>
        <div style={{ padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#f0f8ff" }}>
          <h3 style={{ color: "#0066cc" }}>웹 솔루션</h3>
          <p>
            최신 웹 기술을 기반으로 한 고성능 웹 애플리케이션 개발
          </p>
          <Link to="/solutions/web" style={{ color: "#0066cc", fontWeight: "bold" }}>
            자세히 보기 →
          </Link>
        </div>

        <div style={{ padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#f0f8ff" }}>
          <h3 style={{ color: "#0066cc" }}>모바일 솔루션</h3>
          <p>
            iOS, Android 플랫폼을 지원하는 안정적인 모바일 애플리케이션 개발
          </p>
          <Link to="/solutions/mobile" style={{ color: "#0066cc", fontWeight: "bold" }}>
            자세히 보기 →
          </Link>
        </div>

        <div style={{ padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#f0f8ff" }}>
          <h3 style={{ color: "#0066cc" }}>클라우드 솔루션</h3>
          <p>
            AWS, Azure 등 주요 클라우드 플랫폼을 활용한 인프라 구축
          </p>
          <Link to="/solutions/cloud" style={{ color: "#0066cc", fontWeight: "bold" }}>
            자세히 보기 →
          </Link>
        </div>

        <div style={{ padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#f0f8ff" }}>
          <h3 style={{ color: "#0066cc" }}>AI/ML 솔루션</h3>
          <p>
            인공지능과 머신러닝을 활용한 지능형 솔루션 개발
          </p>
          <Link to="/solutions/ai" style={{ color: "#0066cc", fontWeight: "bold" }}>
            자세히 보기 →
          </Link>
        </div>

        <div style={{ padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#f0f8ff" }}>
          <h3 style={{ color: "#0066cc" }}>컨설팅</h3>
          <p>
            디지털 전환 및 기술 개선를 위한 전문 컨설팅 서비스
          </p>
          <Link to="/solutions/consulting" style={{ color: "#0066cc", fontWeight: "bold" }}>
            자세히 보기 →
          </Link>
        </div>

        <div style={{ padding: "30px", border: "2px solid #0066cc", borderRadius: "8px", backgroundColor: "#f0f8ff" }}>
          <h3 style={{ color: "#0066cc" }}>유지보수</h3>
          <p>
            장기적인 안정성을 위한 지속적인 시스템 유지보수 및 지원
          </p>
          <Link to="/solutions/maintenance" style={{ color: "#0066cc", fontWeight: "bold" }}>
            자세히 보기 →
          </Link>
        </div>
      </div>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="솔루션" />

export default SolutionsPage
