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
            <li>배포 및 유지보수</li>
            <li>성능 모니터링</li>
              <div id="vision-mission-meta" style={{
                width: '100%',
                maxWidth: '100vw',
                backgroundColor: 'black',
                backgroundImage: 'linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%), url(/images/bg_vision.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                marginBottom: '25px',
                padding: '100px 20px 60px 50px',
              }}>
                <div id="vision-mission-text" style={{ width: '90vw', maxWidth: '90vw', margin: '0 auto', textAlign: 'left' }}>
                  <h1 style={{ margin: '0 auto', maxWidth: '90vw', color: '#FDFDFD', fontSize: '40px' }}>모바일 솔루션</h1>
                  <p style={{ margin: '0 auto', maxWidth: '90vw', color: '#FDFDFD', whiteSpace: 'nowrap', fontSize: '20px' }}>
                    iOS와 Android 플랫폼을 지원하는 안정적이고 사용자 친화적인 모바일 애플리케이션을 개발합니다.
                  </p>
                </div>
              </div>
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
