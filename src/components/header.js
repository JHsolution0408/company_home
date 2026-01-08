import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./header.module.css"
import LogoDefault from '../images/logo/jhsolution-logo.svg';
import LogoWhite from '../images/logo/jhsolution-logo-white.svg';
import CloseIcon from '/static/icons/common/close-icon.svg';
import ChevronDownIcon from '/static/icons/common/chevron-down-icon.svg';
import HamburgerIcon from '/static/icons/common/hamburger-menu-icon.svg';
import OpenIcon from '/static/icons/common/open-icon.svg';
import subheader from "./subheader"

const ContactFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSd8r-HC_kxlfuRDtX1LJvZaldc6I79aeUgdUQrS8TvHIAuo8Q/viewform';

const Header = ({ type = 'light', bgImage, subHeader }) => {
  const [showSolutionMenu, setShowSolutionMenu] = React.useState(false)
  const [showCompanyMenu, setShowCompanyMenu] = React.useState(false)
  const [showPressMenu, setShowPressMenu] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  // Scroll state (desktop only as requested)
  const [isScrolled, setIsScrolled] = React.useState(false)

  const MOBILE_BREAKPOINT = 1000;

  const isHome = typeof window !== 'undefined' && window.location && window.location.pathname === '/';
  const currentPath = typeof window !== 'undefined' && window.location ? window.location.pathname : '';
  const isCompanyRoute = currentPath.startsWith('/company');
  const isSolutionsRoute = currentPath.startsWith('/solutions');
  const isProjectsRoute = currentPath.startsWith('/projects');
  const isPressRoute = currentPath.startsWith('/press');

  const isShowSubHeader = subHeader && !isMenuOpen;

  const filteredBgImage = bgImage
    ? `linear-gradient(rgba(2, 8, 22, 0.6), rgba(2, 8, 22, 0.6)), url(${bgImage})`
    : ""


  // track desktop breakpoint and global listeners
  const [isDesktop, setIsDesktop] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth >= MOBILE_BREAKPOINT : false
  )
  // Derived theme flag: on non-home desktop pages, dark at top, light after scroll
  const useDarkDesktop = React.useMemo(
    () => !isHome && isDesktop && !isScrolled,
    [isHome, isDesktop, isScrolled]
  );
  const logoSrc = useDarkDesktop ? LogoWhite : LogoDefault;

  React.useEffect(() => {
    // Close on ESC
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    // Handle resize: update desktop flag and close mobile menu when switching to desktop
    const onResize = () => {
      if (typeof window === 'undefined') return;
      const desktopNow = window.innerWidth >= MOBILE_BREAKPOINT;
      setIsDesktop(desktopNow);
      if (desktopNow) setIsMenuOpen(false);
      // Re-evaluate scroll state for desktop-only behavior
      setIsScrolled(!isHome && desktopNow && window.scrollY > 0);
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
  }, [isHome]);

  // Prevent background scroll/drag when sidebar is open by toggling a body class
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (isMenuOpen) {
      body.classList.add('body--no-scroll');
    } else {
      body.classList.remove('body--no-scroll');
    }
    return () => {
      body.classList.remove('body--no-scroll');
    };
  }, [isMenuOpen]);

  // Desktop-only scroll observer to toggle dark(top)/light(scrolled) on non-home
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => {
      if (!isHome && isDesktop) {
        setIsScrolled(window.scrollY > 0);
      } else {
        setIsScrolled(false);
      }
    };
    // initialize state on mount and when deps change
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHome, isDesktop]);

  const solutionItems = [
    { name: "JHAION 엔진", slug: "jhaion-engine" },
    { name: "에너지 관리", slug: "energy" },
    { name: "시뮬레이션", slug: "simulation" },
    { name: "인공지능", slug: "ai" },
    { name: "디지털 트윈", slug: "digitaltwin" },
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

      <div
        style={
          isShowSubHeader
            ? {
                width: "100vw",
                minHeight: !!subHeader ? "278px" : "112px",
                backgroundImage: filteredBgImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: "var(--z-index-level-1000)",
              }
            : {
                width: "100vw",
                minHeight: "112px",
                zIndex: "var(--z-index-level-1000)",
              }
        }
      >
        <header className={styles.header}>
          <div
            className={`
            ${styles.inner} 
            ${isMenuOpen && styles.sidemenuInnerOpen} 
            ${useDarkDesktop && styles.darkGnbBackground}
          `}
          >
            {/* 첫 번째 구역: 로고 */}
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <img
                  src={logoSrc}
                  width={53}
                  height={40}
                  alt={"JH Solution Logo"}
                />
              </Link>
            </div>

            {/* 두 번째 구역: 메뉴 네비게이션 */}
            <nav
              id="menu"
              className={styles.navDesktop}
              role="navigation"
              aria-label="데스크탑 내비게이션"
              aria-hidden={false}
            >
              {/* 회사소개 Dropdown Menu */}
              <div className={styles.menuGroup} tabIndex={0}>
                <button
                  className={`
                  ${styles.menuButton} 
                  ${useDarkDesktop && styles.menuButtonDarkTheme}
                  ${isCompanyRoute && styles.menuButtonSelected}
                `}
                >
                  회사소개
                  {/* 항상 렌더링, CSS/상태로 보이기 제어 */}
                  <div className={styles.dropdownDesktop}>
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
                </button>
              </div>

              {/* 솔루션 Dropdown Menu */}
              <div className={styles.menuGroup} tabIndex={0}>
                <button
                  className={`
                  ${styles.menuButton} ${
                    isSolutionsRoute && styles.menuButtonSelected
                  }
                  ${useDarkDesktop && styles.menuButtonDarkTheme}
                `}
                >
                  솔루션
                </button>

                <div className={styles.dropdownDesktop}>
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
              </div>

              <button
                className={`
                  ${styles.menuButton} 
                  ${isProjectsRoute && styles.menuButtonSelected} 
                `}
              >
                <Link
                  to="/projects"
                  className={`
                    ${styles.navLink}
                    ${useDarkDesktop && styles.navLinkDarkTheme}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  프로젝트
                </Link>
              </button>

              {/* 홍보센터 Dropdown Menu */}
              <div className={styles.menuGroup} tabIndex={0}>
                <button
                  className={`${styles.menuButton} ${
                    isPressRoute && styles.menuButtonSelected
                  } ${useDarkDesktop && styles.menuButtonDarkTheme}`}
                >
                  홍보센터
                </button>

                <div className={styles.dropdownDesktop}>
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
              </div>
            </nav>

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
              <Link className={styles.contactForm} to={ContactFormLink} target="_self">
                <div className={styles.contact}>
                  <span>문의하기</span>
                  <div className={styles.contactIcon}>
                    <img
                      src={OpenIcon}
                      alt={"문의하기"}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {isShowSubHeader && subHeader}
      </div>
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
        className={`${styles.navMobile} ${isMenuOpen ? styles.navMobileOpen : ""}`}
        role="navigation"
        aria-label="모바일 사이드바 내비게이션"
        aria-hidden={!isMenuOpen}
      >
        {/* 회사소개 Dropdown Menu */}
        <div className={styles.menuGroup}>
          <button
            className={styles.menuButton}
            onClick={() => setShowCompanyMenu(prev => !prev)}
          >
            <span>회사소개</span>
            <ChevronIconComponent isShow={showCompanyMenu} />
          </button>

          {/* 항상 렌더링, 모바일은 상태로 열기 */}
          <div className={`${styles.dropdownMobileContainer} ${showCompanyMenu ? styles.dropdownOpenMobile : ''}`}>
            {companyItems.map((item, index) => (
              <Link
                key={index}
                to={`/company/${item.slug}`}
                className={styles.dropdownLink}
                activeClassName={styles.activeLink}
                partiallyActive={true}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 솔루션 Dropdown Menu */}
        <div
          className={styles.menuGroup}
          onClick={() => setShowSolutionMenu(prev => !prev)}
        >
          <button className={styles.menuButton}>
            <span>솔루션</span>
            <ChevronIconComponent isShow={showSolutionMenu} />
          </button>

          <div className={`${styles.dropdownMobileContainer} ${showSolutionMenu ? styles.dropdownOpenMobile : ''}`}>
            {solutionItems.map((item, index) => (
              <Link
                key={index}
                to={`/solutions/${item.slug}`}
                className={styles.dropdownLink}
                activeClassName={styles.activeLink}
                partiallyActive={true}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 프로젝트 Menu */}
        <Link
          to="/projects"
          className={styles.navLink}
          activeClassName={styles.activeNav}
          partiallyActive={true}
          onClick={() => setIsMenuOpen(false)}
        >
          <button className={styles.menuButton}>
            <span>프로젝트</span>
          </button>
        </Link>

        {/* 홍보센터 Dropdown Menu */}
        <div
          className={styles.menuGroup}
          onClick={() => setShowPressMenu(prev => !prev)}
        >
          <button className={styles.menuButton}>
            <span>홍보센터</span>
            <ChevronIconComponent isShow={showPressMenu} />
          </button>

          <div
            className={`${styles.dropdownMobileContainer} ${styles.dropdownMobile} ${showPressMenu ? styles.dropdownOpenMobile : ''}`}
          >
            {pressItems.map((item, index) => (
              <Link
                key={index}
                to={`/press/${item.slug}`}
                className={styles.dropdownLink}
                activeClassName={styles.activeLink}
                partiallyActive={true}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

function ChevronIconComponent({ isShow }) {
  return (
    <div className={styles.navIconContainer}>
      <img
        src={ChevronDownIcon}
        alt={"chevron down"}
        style={{
          transform: isShow
            ? "rotate(180deg)"
            : "rotate(0deg)",
          transition: "transform 0.2s ease",
          transformOrigin: "50% 50%",
          willChange: "transform",
        }}
      />
    </div>
  )
}

export default Header
