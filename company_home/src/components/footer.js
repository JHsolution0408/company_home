import * as React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer style={{ backgroundColor: "#4A4F55", color: "white", padding: "40px 20px", width: "100%", boxSizing: "border-box", margin: 0, height: "377px" }}>
    <div style={{ maxWidth: "85%", margin: "0 auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
        <tbody>
          <tr>
            <td colSpan="3" style={{ paddingBottom: "30px", textAlign: "left" }}>
              <Link to="/" style={{ textDecoration: "none", display: "inline-block" }}>
                <img src="/images/btm_logo.svg" alt="JH Solution" style={{ height: "40px" }} />
              </Link>
            </td>
          </tr>
          <tr>
            <td style={{ width: "70%", verticalAlign: "top", paddingRight: "40px", paddingBottom: "30px", textAlign: "left" }}>
              <div style={{ fontSize: "16px", fontWeight: "500", color: "#969BA2" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#CFD3D8", fontSize: "16px", fontWeight: "700" }}>오시는길</strong>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  JH솔루션 (우)08504 서울특별시 금천구 가산디지털2로 135, 1공 1701-1703호(가산동, 가산어반워크)
                </div>
                <div>
                  <span style={{ color: "#CFD3D8" }}>Tel :</span> 02-6404-1607  <span style={{ color: "#CFD3D8", marginLeft: "40px" }}>FAX :</span> 02-6008-1606
                </div>
              </div>
            </td>
            <td style={{ width: "30%", verticalAlign: "top", paddingLeft: "40px", paddingBottom: "30px", textAlign: "right" }}>
              <p style={{ padding: 0, fontSize: "16px", fontWeight: "500", color: "#969BA2", lineHeight: "1.8", margin: 0 }}>
                <a href="#" style={{ color: "#CFD3D8", fontSize: "16px", fontWeight: "700", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  회사소개서
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12L8 4M8 12L4 8M8 12L12 8" stroke="#CFD3D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: "left", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              <p style={{ margin: 0, color: "#ccc", fontSize: "14px" }}>
                &copy; JHSolution. All right Reserved.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </footer>
)

export default Footer
