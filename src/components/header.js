import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./header.module.css"
import PCLogo from '../images/logo/jhsolution-logo-pc.svg';

const Header = ({ siteTitle }) => {
  const [showSolutionMenu, setShowSolutionMenu] = React.useState(false)
  const [showCompanyMenu, setShowCompanyMenu] = React.useState(false)
  const [showPressMenu, setShowPressMenu] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const MOBILE_BREAKPOINT = 1000;

  React.useEffect(() => {
    // Close on ESC
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    // Auto-close when resizing to desktop
    const onResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsMenuOpen(false);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('resize', onResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('resize', onResize);
      }
    };
  }, []);

  // Prevent background scroll when sidebar is open
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    const prev = body.style.overflow;
    if (isMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = prev || '';
      body.style.overflow = '';
    }
    return () => {
      body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
    { name: "JHAION 개발 배경", icon: "📖", slug: "jhaion-background-new" },
    { name: "협력 네트워크", icon: "🤝", slug: "partners" },
  ]

  const pressItems = [
    { name: "보도자료", icon: "📰", slug: "" },
  ]

  return (
    <>
      {isMenuOpen && (
        <div
          className={`${styles.overlay} ${isMenuOpen ? styles.show : ""}`}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <header className={styles.header}>
        <div className={styles.inner}>
          {/* 첫 번째 구역: 로고 */}
          <div className={styles.logo}>
            <Link
              to="/"
              className={styles.logoLink}
            >
              <img
                src={PCLogo}
                width={'125px'}
                height={'36px'}
                alt={'JH Solution Logo'}
              />
          </Link>
        </div>

        {/* 두 번째 구역: 메뉴 네비게이션 */}
        <nav id="mobileSidebar" className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`} role="navigation" aria-label="모바일 사이드바 내비게이션" aria-hidden={!isMenuOpen}>
          <div className={styles.panelTopBar}>
            <span className={styles.panelTitle}>메뉴</span>
            <button className={styles.panelCloseBtn} onClick={() => setIsMenuOpen(false)} aria-label="메뉴 닫기">✕</button>
          </div>
            {/* 회사소개 Dropdown Menu */}
            <div className={styles.menuGroup}
              onMouseEnter={() => setShowCompanyMenu(true)}
              onMouseLeave={() => setShowCompanyMenu(false)}
              onClick={() => setShowCompanyMenu((prev) => !prev)}
            >
              <button className={styles.menuButton}>회사소개</button>

              {/* 서브 메뉴 펼쳤을 때 */}
              {showCompanyMenu && (
                <div className={styles.dropdown}>
                  {companyItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/company/${item.slug}`}
                      className={styles.dropdownLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 솔루션 Dropdown Menu */}
            <div className={styles.menuGroup}
              onMouseEnter={() => setShowSolutionMenu(true)}
              onMouseLeave={() => setShowSolutionMenu(false)}
              onClick={() => setShowSolutionMenu((prev) => !prev)}
            >
              <button className={styles.menuButton}>솔루션</button>

              {showSolutionMenu && (
                <div className={styles.dropdown}>
                  {solutionItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/solutions/${item.slug}`}
                      className={styles.dropdownLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button className={styles.menuButton}>
              <Link to="/projects" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                프로젝트
              </Link>
            </button>

            {/* 홍보센터 Dropdown Menu */}
            <div className={styles.menuGroup}
              onMouseEnter={() => setShowPressMenu(true)}
              onMouseLeave={() => setShowPressMenu(false)}
              onClick={() => setShowPressMenu((prev) => !prev)}
            >
              <button className={styles.menuButton}>홍보센터</button>

              {showPressMenu && (
                <div className={styles.dropdown}>
                  {pressItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/press/${item.slug}`}
                      className={styles.dropdownLink}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.contactMobileWrap}>
                <Link to="/contact" className={styles.contactMobile}>
                  문의하기
                </Link>
              </div>
          </nav>

        {/* 세 번째 구역: 모바일 메뉴 버튼 및 문의하기 버튼 */}
        <div className={styles.rightControls}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
            aria-controls="mobileSidebar"
            aria-expanded={isMenuOpen}
            className={styles.hamburger}
          >
            ☰
          </button>
          <Link to="/contact" className={styles.contact}>
            문의하기
          </Link>
        </div>
        </div>
      </header>
    </>
  )
}

export default Header
