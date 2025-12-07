import * as React from "react"

const Footer = () => (
  <footer style={{ backgroundColor: "#333333", color: "white", padding: "40px 20px", width: "100%", boxSizing: "border-box", margin: 0 }}>
    <div style={{ maxWidth: "85%", margin: "0 auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
        <tbody>
          <tr>
            <td colSpan="3" style={{ paddingBottom: "30px", textAlign: "left" }}>
              <h3 style={{ color: "white", marginBottom: "15px", margin: 0 }}>JH Solution</h3>
            </td>
          </tr>
          <tr>
            <td style={{ width: "70%", verticalAlign: "top", paddingRight: "40px", paddingBottom: "30px", textAlign: "left" }}>
              <p style={{ padding: 0, fontSize: "13px", color: "#ccc", lineHeight: "1.8", margin: 0 }}>
                <strong style={{ color: "white" }}>오시는길</strong><br />
                제이에이치솔루션 (우)08504 서울특별시 금천구 가산디지털2로 135, 1공 1701-1703호(가산동, 가산어반워크)<br />
                <br />
                <strong style={{ color: "white" }}>Tel :</strong> 02-6404-1607  <strong style={{ color: "white" }}>FAX :</strong> 02-6008-1606
              </p>
            </td>
            <td style={{ width: "30%", verticalAlign: "top", paddingLeft: "40px", paddingBottom: "30px", textAlign: "right" }}>
              <h4 style={{ color: "white", marginBottom: "15px" }}>회사소개서</h4>
              <p style={{ fontSize: "13px", margin: 0 }}>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>다운로드</a>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: "left", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              <p style={{ margin: 0, color: "#ccc", fontSize: "13px" }}>
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
