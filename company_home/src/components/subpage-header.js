import * as React from "react"
import { Link } from "gatsby"

const SubPageHeader = ({ siteTitle, bgImage }) => {
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
    { name: "JHAION 엔진", slug: "jhaion-engine" },
    { name: "에너지 관리", slug: "energy" },
    { name: "시뮬레이션", slug: "simulation" },
    { name: "인공지능", slug: "ai" },
    { name: "디지털 트윈", slug: "digital-twin" },
    { name: "미디어", slug: "media" },
  ]

  const companyItems = [
    { name: "비전 및 미션", slug: "vision-mission" },
    { name: "JHAION 개발 배경", slug: "jhaion-background" },
    { name: "협력 네트워크", slug: "partners" },
  ]

  const pressItems = [
    { name: "보도자료", slug: "" },
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
          backgroundColor: "rgba(2, 8, 22, 0.60)",
          color: "white",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1250,
          paddingTop: "0px",
          marginTop: "15px",
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundSize: bgImage ? "cover" : undefined,
          backgroundPosition: bgImage ? "center" : undefined,
        }}
      >
        <div style={{
          backgroundColor: "rgba(253, 253, 253, 0.10)",
          width: "1800px",
          maxWidth: "100%",
          display: "flex",
          height: "60px",
          padding: "0 60px",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
        }}>
          {/* 로고 (footer와 동일 이미지) */}
          <div style={{ width: "125px", height: "40px" }}>
            <Link to="/" style={{ textDecoration: "none", display: "block" }}>
              <img src="/images/btm_logo.svg" alt="JH Solution" style={{ height: "40px" }} />
            </Link>
          </div>

        {/* 메뉴 네비게이션 */}
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
            padding: isMobile ? "16px 0 0 0" : "0",
            display: isMobile ? "block" : "flex",
            alignItems: "center",
            flex: 1,
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
              gap: isMobile ? "0" : "60px",
              justifyContent: isMobile ? "flex-start" : "center",
              textAlign: isMobile ? "left" : "center",
              backgroundColor: isMobile ? "transparent" : "transparent",
              width: isMobile ? "100%" : "auto",
              padding: isMobile ? "12px var(--size-gutter) 0" : 0,
              boxShadow: "none",
              flex: isMobile ? "none" : "1",
            }}
          >
            {/* 회사소개 */}
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
                  color: window.location.pathname.startsWith('/company/') ? "#66E695" : "white",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: isMobile ? "16px" : "18px",
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
                    top: isMobile ? "0" : "calc(100% + 15px)",
                    left: isMobile ? "0" : "50%",
                    transform: isMobile ? "none" : "translateX(-50%)",
                    backgroundColor: "#FDFDFD",
                    minWidth: "200px",
                    width: isMobile ? "100%" : "auto",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    zIndex: "1000",
                    borderRadius: "4px",
                    marginTop: isMobile ? "10px" : "0",
                    paddingTop: isMobile ? "0" : "15px",
                    marginTop: isMobile ? "10px" : "-15px",
                  }}
                >
                  {companyItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/company/${item.slug}`}
                      style={{
                        color: "#17181B",
                        padding: "12px 20px",
                        textDecoration: "none",
                        display: "block",
                        fontSize: "18px",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 솔루션 */}
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
                  fontSize: isMobile ? "16px" : "18px",
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
                    top: isMobile ? "0" : "calc(100% + 15px)",
                    left: isMobile ? "0" : "50%",
                    transform: isMobile ? "none" : "translateX(-50%)",
                    backgroundColor: "#FDFDFD",
                    minWidth: "200px",
                    width: isMobile ? "100%" : "auto",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    zIndex: "1000",
                    borderRadius: "4px",
                    marginTop: isMobile ? "10px" : "0",
                    paddingTop: isMobile ? "0" : "15px",
                    marginTop: isMobile ? "10px" : "-15px",
                  }}
                >
                  {solutionItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/solutions/${item.slug}`}
                      style={{
                        color: "#17181B",
                        padding: "12px 20px",
                        textDecoration: "none",
                        display: "block",
                        fontSize: "18px",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      {item.name}
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
                fontSize: isMobile ? "16px" : "18px",
              }}
            >
              프로젝트
            </Link>

            {/* 홍보센터 */}
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
                  fontSize: isMobile ? "16px" : "18px",
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
                    top: isMobile ? "0" : "calc(100% + 15px)",
                    left: isMobile ? "0" : "50%",
                    transform: isMobile ? "none" : "translateX(-50%)",
                    backgroundColor: "#FDFDFD",
                    minWidth: "200px",
                    width: isMobile ? "100%" : "auto",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    zIndex: "1000",
                    borderRadius: "4px",
                    marginTop: isMobile ? "10px" : "0",
                    paddingTop: isMobile ? "0" : "15px",
                    marginTop: isMobile ? "10px" : "-15px",
                  }}
                >
                  {pressItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/press/${item.slug}`}
                      style={{
                        color: "#17181B",
                        padding: "12px 20px",
                        textDecoration: "none",
                        display: "block",
                        fontSize: "18px",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      {item.name}
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
                    color: "#17181B", // light/gray/0
                    backgroundColor: "#FDFDFD",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "14px",
                    display: "inline-block",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  문의하기
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* 모바일 메뉴 버튼 및 문의하기 버튼 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
            style={{
              display: isMobile ? "inline-flex" : "none",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
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
                color: "#17181B", // light/gray/0
                backgroundColor: "#FDFDFD",
                padding: "8px 20px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "14px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              문의하기
            </Link>
          )}
        </div>
        </div>
      </header>
    </>
  )
}

export default SubPageHeader
