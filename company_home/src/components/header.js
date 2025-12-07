import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => {
  const [showSolutionMenu, setShowSolutionMenu] = React.useState(false)
  const [showCompanyMenu, setShowCompanyMenu] = React.useState(false)
  const [showPressMenu, setShowPressMenu] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false
      setIsMobile(mobile)
      if (!mobile) {
        setIsMenuOpen(false)
      }
    }

    handleResize()
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const solutionItems = [
    { name: "JHAION 엔진", icon: "⚙️", slug: "jhaion-engine" },
    { name: "에너지 관리", icon: "⚡", slug: "energy" },
    { name: "시뮬레이션", icon: "📊", slug: "simulation" },
    { name: "인공지능", icon: "🤖", slug: "ai" },
    { name: "디지털 트윈", icon: "👥", slug: "digital-twin" },
    { name: "미디어", icon: "📱", slug: "media" },
  ]

  const companyItems = [
    { name: "비전 및 미션", icon: "🎯", slug: "vision-mission" },
    { name: "JHAION 개발 배경", icon: "📖", slug: "jhaion-background" },
    { name: "협력 네트워크", icon: "🤝", slug: "partners" },
  ]

  const pressItems = [
    { name: "보도자료", icon: "📰", slug: "press-release" },
  ]

  return (
    <>
      {isMobile && isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1100,
          }}
        />
      )}

      <header
        style={{
          backgroundColor: "#0066cc",
          color: "white",
          margin: `0 auto`,
          padding: `var(--space-4) var(--size-gutter)`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          position: "relative",
        }}
      >
        <div style={{ flex: "1", textAlign: "left", zIndex: 1300 }}>
          <Link
            to="/"
            style={{
              fontSize: `var(--font-sm)`,
              textDecoration: `none`,
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {siteTitle}
          </Link>
        </div>

        <div
          style={{
            position: isMobile ? "fixed" : "static",
            top: isMobile ? 0 : "auto",
            right: isMobile ? 0 : "auto",
            bottom: isMobile ? 0 : "auto",
            left: isMenuOpen ? 0 : "100%",
            width: isMobile ? "75vw" : "auto",
            height: isMobile ? "100vh" : "auto",
            backgroundColor: isMobile ? "#0066cc" : "transparent",
            zIndex: 1200,
            transition: isMobile ? "left 0.3s ease" : "none",
            overflowY: isMobile ? "auto" : "visible",
            paddingTop: isMobile ? "16px" : 0,
          }}
        >
          {isMobile && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "16px",
                paddingLeft: "var(--size-gutter)",
                paddingRight: "var(--size-gutter)",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>메뉴</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="메뉴 닫기"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: "1",
                }}
              >
                ✕
              </button>
            </div>
          )}

          <nav
            style={{
              display: isMobile ? "block" : "flex",
              gap: isMobile ? "0" : "30px",
              justifyContent: isMobile ? "flex-start" : "center",
              textAlign: isMobile ? "left" : "center",
              backgroundColor: isMobile ? "transparent" : "transparent",
              width: "100%",
              padding: isMobile ? "12px var(--size-gutter) 0" : 0,
              boxShadow: "none",
            }}
          >
            {/* 회사소개 Dropdown Menu */}
            <div
              style={{
                position: "relative",
                display: isMobile ? "block" : "inline-block",
                width: isMobile ? "100%" : "auto",
                marginBottom: isMobile ? "8px" : 0,
              }}
              onMouseEnter={!isMobile ? () => setShowCompanyMenu(true) : undefined}
              onMouseLeave={!isMobile ? () => setShowCompanyMenu(false) : undefined}
              onClick={isMobile ? () => setShowCompanyMenu((prev) => !prev) : undefined}
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: isMobile ? "10px 0" : "0",
                  fontFamily: "inherit",
                  width: isMobile ? "100%" : "auto",
                  textAlign: isMobile ? "left" : "center",
                }}
              >
                회사소개
              </button>

              {showCompanyMenu && (
                <div
                  style={{
                    position: isMobile ? "relative" : "absolute",
                    top: isMobile ? "0" : "100%",
                    left: isMobile ? "0" : "50%",
                    transform: isMobile ? "none" : "translateX(-50%)",
                    backgroundColor: "#003d99",
                    minWidth: "200px",
                    width: isMobile ? "100%" : "auto",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    zIndex: "1000",
                    borderRadius: "4px",
                    marginTop: isMobile ? "10px" : "0",
                  }}
                >
                  {companyItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/company/${item.slug}`}
                      style={{
                        color: "white",
                        padding: "12px 20px",
                        textDecoration: "none",
                        display: "block",
                        fontSize: "14px",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#0052a3")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      {item.icon} {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 솔루션 Dropdown Menu */}
            <div
              style={{
                position: "relative",
                display: isMobile ? "block" : "inline-block",
                width: isMobile ? "100%" : "auto",
                marginBottom: isMobile ? "8px" : 0,
              }}
              onMouseEnter={!isMobile ? () => setShowSolutionMenu(true) : undefined}
              onMouseLeave={!isMobile ? () => setShowSolutionMenu(false) : undefined}
              onClick={isMobile ? () => setShowSolutionMenu((prev) => !prev) : undefined}
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: isMobile ? "10px 0" : "0",
                  fontFamily: "inherit",
                  width: isMobile ? "100%" : "auto",
                  textAlign: isMobile ? "left" : "center",
                }}
              >
                솔루션
              </button>

              {showSolutionMenu && (
                <div
                  style={{
                    position: isMobile ? "relative" : "absolute",
                    top: isMobile ? "0" : "100%",
                    left: isMobile ? "0" : "50%",
                    transform: isMobile ? "none" : "translateX(-50%)",
                    backgroundColor: "#003d99",
                    minWidth: "200px",
                    width: isMobile ? "100%" : "auto",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    zIndex: "1000",
                    borderRadius: "4px",
                    marginTop: isMobile ? "10px" : "0",
                  }}
                >
                  {solutionItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/solutions/${item.slug}`}
                      style={{
                        color: "white",
                        padding: "12px 20px",
                        textDecoration: "none",
                        display: "block",
                        fontSize: "14px",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#0052a3")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      {item.icon} {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/projects"
              style={{
                color: "white",
                textDecoration: "none",
                display: isMobile ? "block" : "inline-block",
                padding: isMobile ? "10px 0" : 0,
                textAlign: isMobile ? "left" : "center",
                width: isMobile ? "100%" : "auto",
              }}
            >
              프로젝트
            </Link>

            {/* 홍보센터 Dropdown Menu */}
            <div
              style={{
                position: "relative",
                display: isMobile ? "block" : "inline-block",
                width: isMobile ? "100%" : "auto",
                marginBottom: isMobile ? "8px" : 0,
              }}
              onMouseEnter={!isMobile ? () => setShowPressMenu(true) : undefined}
              onMouseLeave={!isMobile ? () => setShowPressMenu(false) : undefined}
              onClick={isMobile ? () => setShowPressMenu((prev) => !prev) : undefined}
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: isMobile ? "10px 0" : "0",
                  fontFamily: "inherit",
                  width: isMobile ? "100%" : "auto",
                  textAlign: isMobile ? "left" : "center",
                }}
              >
                홍보센터
              </button>

              {showPressMenu && (
                <div
                  style={{
                    position: isMobile ? "relative" : "absolute",
                    top: isMobile ? "0" : "100%",
                    left: isMobile ? "0" : "50%",
                    transform: isMobile ? "none" : "translateX(-50%)",
                    backgroundColor: "#003d99",
                    minWidth: "200px",
                    width: isMobile ? "100%" : "auto",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    zIndex: "1000",
                    borderRadius: "4px",
                    marginTop: isMobile ? "10px" : "0",
                  }}
                >
                  {pressItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/press/${item.slug}`}
                      style={{
                        color: "white",
                        padding: "12px 20px",
                        textDecoration: "none",
                        display: "block",
                        fontSize: "14px",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#0052a3")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      {item.icon} {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isMobile && (
              <div style={{ marginTop: "10px" }}>
                <Link
                  to="/contact"
                  style={{
                    color: "white",
                    backgroundColor: "#ff6b6b",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "14px",
                    display: "inline-block",
                  }}
                >
                  문의하기
                </Link>
              </div>
            )}
          </nav>
        </div>

        <div
          style={{
            flex: "1",
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            zIndex: 1300,
          }}
        >
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
            style={{
              display: isMobile ? "inline-flex" : "none",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.6)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ☰
          </button>
          {!isMobile && (
            <Link
              to="/contact"
              style={{
                color: "white",
                backgroundColor: "#ff6b6b",
                padding: "8px 20px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              문의하기
            </Link>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
