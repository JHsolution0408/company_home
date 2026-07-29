import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import * as styles from "./header.module.css"
import Sidebar from "./sidebar";
import { MENU, buildItemPath } from "../data/nav";

import LogoDefault from '../images/logo/jhsolution-logo.svg';
import LogoWhite from '../images/logo/jhsolution-logo-white.svg';
import CloseIcon from '/static/icons/common/close-icon.svg';
import HamburgerIcon from '/static/icons/common/hamburger-menu-icon.svg';
import HamburgerIconWhite from '/static/icons/common/hamburger-menu-icon-white.svg';

const MOBILE_BREAKPOINT = 1000

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
    () => !isHome && !isScrolled,
    [isHome, isScrolled]
  )

  const logoSrc = useDarkDesktop ? LogoWhite : LogoDefault;
  const mobileMenuSrc = useDarkDesktop ? HamburgerIconWhite : HamburgerIcon;

  const filteredBgImage =
    type === "dark"
      ? `linear-gradient(rgba(2, 8, 22, 0.6), rgba(2, 8, 22, 0.6)), url(${bgImage})`
      : `url(${bgImage})`;

  const isActiveMenu = React.useCallback(
    (menu) => {
      const paths = menu.matchPaths?.length ? menu.matchPaths : [menu.basePath]
      return paths
        .filter(Boolean)
        .some((p) => pathname === p || pathname.startsWith(`${p}/`));
    },
    [pathname]
  )

  const isActiveSubMenu = React.useCallback(
    (menu, item) => {
      const targetPath = buildItemPath(menu, item)
      return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
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
      if (!isHome) {
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
              useDarkDesktop ? styles.darkGnbBackground : styles.lightGnbBackground,
            ].join(" ")}
          >
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <img src={logoSrc} width={53} height={40} alt="JH SOLUTION Logo" />
              </Link>
            </div>

            <nav
              id="menu"
              className={styles.navDesktop}
              role="navigation"
              aria-label="데스크탑 내비게이션"
            >
              {MENU.map((menu) => {
                const active = isActiveMenu(menu);
                // dropdown menu
                if (menu.items?.length) {
                  return (
                    <div key={menu.key} className={styles.menuGroup}>
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
                              to={buildItemPath(menu, item)}
                              className={[
                                styles.dropdownLink,
                                isActiveSubMenu(menu, item)
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

              <a 
                className={styles.contactForm} 
                href="/contact"
                target="_self"
                aria-label="Contact Button Form"
              >
                <div className={styles.contact}>
                  <span>문의하기</span>
                </div>
              </a>
            </div>
          </div>
        </header>

        {isShowSubHeader && subHeader}
      </div>
    </>
  )
}

export default Header
