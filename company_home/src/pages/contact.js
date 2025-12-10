import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactPage = () => (
  <Layout>
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', maxWidth: '100%', padding: 'clamp(24px,4vw,60px) 5vw', boxSizing: 'border-box', margin: '0 auto' }}>
      <h1>연락처</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginBottom: "60px" }}>
        <section>
          <h2 style={{ color: "#0066cc" }}>회사 정보</h2>
          <p>
            <strong>회사명:</strong> JH Solution<br />
            <strong>대표:</strong> 회사 대표명<br />
            <strong>주소:</strong> 서울시 강남구 IT Valley 123<br />
            <strong>전화:</strong> 02-0000-0000<br />
            <strong>팩스:</strong> 02-0000-0001<br />
            <strong>이메일:</strong> <a href="mailto:info@company.com" style={{ color: "#0066cc" }}>info@company.com</a>
          </p>
        </section>

        <section>
          <h2 style={{ color: "#0066cc" }}>부서별 연락처</h2>
          <p>
            <strong>영업 문의:</strong><br />
            <a href="mailto:sales@company.com" style={{ color: "#0066cc" }}>sales@company.com</a><br />
            02-0000-0010<br />
            <br />
            <strong>기술 지원:</strong><br />
            <a href="mailto:support@company.com" style={{ color: "#0066cc" }}>support@company.com</a><br />
            02-0000-0020
          </p>
        </section>
      </div>

      <section style={{ marginBottom: "60px" }}>
        <h2>문의 양식</h2>
        <form style={{ display: "grid", gap: "15px", maxWidth: "600px" }}>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>이름</label>
            <input type="text" name="name" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>이메일</label>
            <input type="email" name="email" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>연락처</label>
            <input type="tel" name="phone" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }} />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>문의 내용</label>
            <select name="subject" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
              <option>선택하세요</option>
              <option>솔루션 문의</option>
              <option>프로젝트 제안</option>
              <option>기술 지원</option>
              <option>기타 문의</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>메시지</label>
            <textarea name="message" rows="6" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontFamily: "inherit" }}></textarea>
          </div>

          <button 
            type="submit" 
            style={{ 
              backgroundColor: "#0066cc", 
              color: "white", 
              padding: "12px 30px", 
              border: "none", 
              borderRadius: "4px", 
              fontSize: "16px", 
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            전송하기
          </button>
        </form>
      </section>

      <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>오시는 길</h2>
        <p>
          저희 사무실은 서울 강남 IT Valley 센터에 위치하고 있습니다.<br />
          대중교통으로 쉽게 오실 수 있습니다.
        </p>
        <p style={{ color: "#666", fontSize: "14px" }}>
          지도는 추후 추가될 예정입니다.
        </p>
      </section>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="연락처" />

export default ContactPage
