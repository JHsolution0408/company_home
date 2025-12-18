import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./header.module.css"
import PCLogo from '../images/logo/jhsolution-logo-pc.svg';
import CloseIcon from '/static/icons/common/close-icon.svg';
import ChevronDownIcon from '/static/icons/common/chevron-down-icon.svg';
import HamburgerIcon from '/static/icons/common/hamburger-menu-icon.svg';

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
        <Sidebar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          showSolutionMenu={showSolutionMenu}
          setShowSolutionMenu={setShowSolutionMenu}
          showCompanyMenu={showCompanyMenu}
          setShowCompanyMenu={setShowCompanyMenu}
          showPressMenu={showPressMenu}
          setShowPressMenu={setShowPressMenu}
          companyItems={companyItems}
          solutionItems={solutionItems}
          pressItems={pressItems}
        />
      )}

      <header className={styles.header}>
        <div className={`${styles.inner} ${isMenuOpen && styles.sidemenuInnerOpen}`}>
          {/* 첫 번째 구역: 로고 */}
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <img
                src={PCLogo}
                width={"125px"}
                height={"36px"}
                alt={"JH Solution Logo"}
              />
            </Link>
          </div>

          {/* 두 번째 구역: 메뉴 네비게이션 */}

          {/* 세 번째 구역: 모바일 메뉴 버튼 및 문의하기 버튼 */}
          <div className={styles.rightControls}>
            {isMenuOpen ? (
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="메뉴 열기"
                aria-controls="mobileSidebar"
                aria-expanded={isMenuOpen}
                className={styles.hamburger}
              >
                <img
                  src={CloseIcon}
                  alt={"close icon"}
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen(prev => !prev)}
                aria-label="메뉴 열기"
                aria-controls="mobileSidebar"
                aria-expanded={isMenuOpen}
                className={styles.hamburger}
              >
                <img
                  src={HamburgerIcon}
                  alt={"hamburger menu icon"}
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </button>
            )}

            <Link to="/contact" className={styles.contact}>
              문의하기
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

function Sidebar({
  isMenuOpen,
  setIsMenuOpen,
  showSolutionMenu,
  setShowSolutionMenu,
  showCompanyMenu,
  setShowCompanyMenu,
  showPressMenu,
  setShowPressMenu,
  companyItems,
  solutionItems,
  pressItems,
}) {
  return (
    <>
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.show : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav
        id="mobileSidebar"
        className={`${styles.nav}
          ${isMenuOpen ? styles.navOpen : ""}`}
        role="navigation"
        aria-label="모바일 사이드바 내비게이션" aria-hidden={!isMenuOpen}
      >
        {/* 회사소개 Dropdown Menu */}
        <div className={styles.menuGroup}>
          <button
            className={styles.menuButton}
            onMouseEnter={() => setShowCompanyMenu(true)}
            onMouseLeave={() => setShowCompanyMenu(false)}
            onClick={() => setShowCompanyMenu((prev) => !prev)}
          >
          <span>
            회사소개
          </span>
            <div className={styles.navIconContainer}>
              <img
                src={ChevronDownIcon}
                alt={'chevron down'}
                style={{
                  transform: showCompanyMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  transformOrigin: '50% 50%',
                  willChange: 'transform',
                }}
              />
            </div>
          </button>

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

        <Link to="/projects" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
          <button className={styles.menuButton}>
            프로젝트
          </button>
        </Link>

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
      </nav>
    </>
  )
}

export default Header
