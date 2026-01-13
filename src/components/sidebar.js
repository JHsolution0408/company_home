import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import * as styles from "./sidebar.module.css"

import ChevronDownIcon from "/static/icons/common/chevron-down-icon.svg"

function Sidebar({ 
  isMenuOpen, 
  setIsMenuOpen, 
  menu,
  isActiveMenu,
  isActiveSubMenu,
  buildItemPath,
}) {
  const { pathname } = useLocation()

  const [openKey, setOpenKey] = React.useState(null)

  const toggleMenu = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setOpenKey(null);
  }

  React.useEffect(() => {
    if (!isMenuOpen) return

    const activeGroup = menu.find(
      (m) => m.items?.length && (pathname === m.basePath || pathname.startsWith(`${m.basePath}/`))
    );
    if (activeGroup) {
      setOpenKey(activeGroup.key);
    }
  }, [isMenuOpen, pathname, menu])

  return (
    <>
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.show : ""}`}
        onClick={handleNavClick}
        role="button"
        tabIndex={-1}
        aria-label="사이드바 닫기"
      />

      <nav
        id="mobileSidebar"
        className={`${styles.navMobile} ${isMenuOpen ? styles.navMobileOpen : ""}`}
        role="navigation"
        aria-label="모바일 사이드바 내비게이션"
        aria-hidden={!isMenuOpen}
      >
        {menu.map((menu) => {
          const active = isActiveMenu(menu.basePath)
          const opened = openKey === menu.key

          if (menu.items?.length) {
            return (
              <div key={menu.key} className={styles.menuGroup}>
                <button
                  type="button"
                  className={`${styles.menuButton} ${active ? styles.menuButtonSelected : ""}`}
                  onClick={() => toggleMenu(menu.key)}
                  aria-expanded={opened}
                  aria-controls={`sidebar-group-${menu.key}`}
                >
                  <span>{menu.label}</span>
                  <ChevronIconComponent isShow={opened} />
                </button>

                <div
                  id={`sidebar-group-${menu.key}`}
                  className={`${styles.dropdownMobileContainer} ${
                    opened ? styles.dropdownOpenMobile : ""
                  }`}
                >
                  {menu.items.map((item) => (
                    <Link
                      key={item.slug || item.name}
                      to={buildItemPath(menu.basePath, item.slug)}
                      className={[
                        styles.dropdownLink,
                        isActiveSubMenu(menu.basePath, item.slug) ? styles.activeLink : "",
                      ].join(" ")}
                      onClick={handleNavClick}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <Link
              key={menu.key}
              to={menu.basePath}
              className={[
                styles.navLink,
                active ? styles.activeNav : "",
              ].join(" ")}
              onClick={handleNavClick}
            >
              <button type="button" className={styles.menuButton}>
                <span>{menu.label}</span>
              </button>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

function ChevronIconComponent({ isShow }) {
  return (
    <div className={styles.navIconContainer}>
      <img
        src={ChevronDownIcon}
        alt="chevron down"
        style={{
          transform: isShow ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          transformOrigin: "50% 50%",
          willChange: "transform",
        }}
      />
    </div>
  )
}

export default Sidebar
