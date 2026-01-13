import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import * as styles from "./header.module.css"
import Sidebar from "./sidebar";

import LogoDefault from '../images/logo/jhsolution-logo.svg';
import LogoWhite from '../images/logo/jhsolution-logo-white.svg';
import CloseIcon from '/static/icons/common/close-icon.svg';
import HamburgerIcon from '/static/icons/common/hamburger-menu-icon.svg';
import HamburgerIconWhite from '/static/icons/common/hamburger-menu-icon-white.svg';
import OpenIcon from '/static/icons/common/open-icon.svg';

const MOBILE_BREAKPOINT = 1000
const ContactFormLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSd8r-HC_kxlfuRDtX1LJvZaldc6I79aeUgdUQrS8TvHIAuo8Q/viewform"

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

const pressItems = [{ name: "보도자료", slug: "" }]

const MENU = [
  { key: "company", label: "회사소개", basePath: "/company", items: companyItems },
  { key: "solutions", label: "솔루션", basePath: "/solutions", items: solutionItems },
  { key: "projects", label: "프로젝트", basePath: "/projects" },
  { key: "press", label: "홍보센터", basePath: "/press", items: pressItems },
]

const buildItemPath = (basePath, slug) => {
  const path = `${basePath}/${slug || ""}`;
  return path.replace(/\/$/, "")
}

function Header({ type = "light", bgImage, subHeader }) {
  const { pathname } = useLocation();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(
    typeof window !== "undefined" ? window.innerWidth >= MOBILE_BREAKPOINT : false
  );
  const [isScrolled, setIsScrolled] = React.useState(false);

  const isHome = pathname === "/";
  const isShowSubHeader = subHeader && !isMenuOpen;

  const useDarkDesktop = React.useMemo(
    () => !isHome && isDesktop && !isScrolled,
    [isHome, isDesktop, isScrolled]
  )

  const logoSrc = useDarkDesktop ? LogoWhite : LogoDefault;
  const mobileMenuSrc = useDarkDesktop ? HamburgerIconWhite : HamburgerIcon;

  const filteredBgImage =
    type === "dark"
      ? `linear-gradient(rgba(2, 8, 22, 0.6), rgba(2, 8, 22, 0.6)), url(${bgImage})`
      : `url(${bgImage})`;

  const isActiveMenu = React.useCallback(
    (basePath) => pathname === basePath || pathname.startsWith(`${basePath}/`),
    [pathname]
  )

  const isActiveSubMenu = React.useCallback(
    (basePath, slug) => {
      const targetPath = buildItemPath(basePath, slug)
      return (
        pathname === targetPath ||
        pathname.startsWith(`${targetPath}/`)
      )
    },
    [pathname]
  )

  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    const onResize = () => {
      if (typeof window === "undefined") return
      const desktopNow = window.innerWidth >= MOBILE_BREAKPOINT;
      setIsDesktop(desktopNow);
      if (desktopNow) {
        setIsMenuOpen(false);
      }
      setIsScrolled(!isHome && desktopNow && window.scrollY > 0);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("resize", onResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("resize", onResize);
      }
    }
  }, [isHome])

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    if (isMenuOpen) {
      body.classList.add("body--no-scroll");
    } else {
      body.classList.remove("body--no-scroll");
    }
    return () => body.classList.remove("body--no-scroll");
  }, [isMenuOpen])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const onScroll = () => {
      if (!isHome && isDesktop) {
        setIsScrolled(window.scrollY > 0);
      } else {
        setIsScrolled(false);
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome, isDesktop])

  return (
    <>
      {isMenuOpen && (
        <Sidebar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          menu={MENU}
          isActiveMenu={isActiveMenu}
          isActiveSubMenu={isActiveSubMenu}
          buildItemPath={buildItemPath}
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
            className={[
              styles.inner,
              isMenuOpen ? styles.sidemenuInnerOpen : "",
              useDarkDesktop ? styles.darkGnbBackground : "",
            ].join(" ")}
          >
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <img src={logoSrc} width={53} height={40} alt="JH Solution Logo" />
              </Link>
            </div>

            <nav
              id="menu"
              className={styles.navDesktop}
              role="navigation"
              aria-label="데스크탑 내비게이션"
            >
              {MENU.map((menu) => {
                const active = isActiveMenu(menu.basePath)
                // dropdown menu
                if (menu.items?.length) {
                  return (
                    <div key={menu.key} className={styles.menuGroup} tabIndex={0}>
                      <button
                        type="button"
                        className={[
                          styles.menuButton,
                          useDarkDesktop ? styles.menuButtonDarkTheme : "",
                          active ? styles.menuButtonSelected : "",
                        ].join(" ")}
                      >
                        {menu.label}

                        <div className={styles.dropdownDesktop}>
                          {menu.items.map((item) => (
                            <Link
                              key={item.slug || item.name}
                              to={buildItemPath(menu.basePath, item.slug)}
                              className={[
                                styles.dropdownLink,
                                isActiveSubMenu(menu.basePath, item.slug)
                                  ? styles.subMenuButtonSelected
                                  : "",
                                ].join(" ")
                              }
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </button>
                    </div>
                  )
                }

                return (
                  <div key={menu.key} className={styles.menuGroup}>
                    <Link
                      to={menu.basePath}
                      className={[
                        styles.menuButton,
                        useDarkDesktop ? styles.menuButtonDarkTheme : "",
                        active ? styles.menuButtonSelected : "",
                      ].join(" ")}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {menu.label}
                    </Link>
                  </div>
                )
              })}
            </nav>

            <div className={styles.rightControls}>
              {isMenuOpen ? (
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="메뉴 닫기"
                  aria-controls="mobileSidebar"
                  aria-expanded={isMenuOpen}
                  className={styles.hamburger}
                  type="button"
                >
                  <img src={CloseIcon} alt="close icon" style={{ width: 20, height: 20 }} />
                </button>
              ) : (
                <button
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="메뉴 열기"
                  aria-controls="mobileSidebar"
                  aria-expanded={isMenuOpen}
                  className={styles.hamburger}
                  type="button"
                >
                  <img src={mobileMenuSrc} alt="hamburger menu icon" style={{ width: 20, height: 20 }} />
                </button>
              )}

              <Link className={styles.contactForm} to={ContactFormLink} target="_self">
                <div className={styles.contact}>
                  <span>문의하기</span>
                  <div className={styles.contactIcon}>
                    <img src={OpenIcon} alt="문의하기" width={20} height={20} />
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

export default Header
