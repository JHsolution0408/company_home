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

    const activeGroup = menu.find((m) => {
      if (m.matchPaths?.length) {
        return m.matchPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
      }

      const isInvalidGroup = !m.items?.length || !m.basePath;

      if (isInvalidGroup) {
        return false;
      }

      return pathname === m.basePath || pathname.startsWith(`${m.basePath}/`);
    })

    if (activeGroup) {
      setOpenKey(activeGroup.key);
    }

  }, [isMenuOpen, pathname, menu])


  return (
    <>
      <button
        type="button"
        className={`${styles.overlay} ${isMenuOpen ? styles.show : ""}`}
        onClick={handleNavClick}
        aria-label="사이드바 닫기"
      />

      <nav
        id="mobileSidebar"
        className={`${styles.navMobile} ${isMenuOpen ? styles.navMobileOpen : ""}`}
        role="navigation"
        aria-label="모바일 사이드바 내비게이션"
        aria-hidden={!isMenuOpen}
      >
        <ul className={styles.menuList}>
          {menu.map((menu) => {
            const active = isActiveMenu(menu)
            const opened = openKey === menu.key

            return (
              <li key={menu.key} className={styles.menuGroup}>
                {menu.items?.length ? (
                  <>
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

                    <ul
                      id={`sidebar-group-${menu.key}`}
                      className={`${styles.dropdownMobileContainer} ${
                        opened ? styles.dropdownOpenMobile : ""
                      }`}
                    >
                      {menu.items.map((item) => (
                        <li key={item.slug || item.name} className={styles.dropdownItem}>
                          <Link
                            to={buildItemPath(menu, item)}
                            className={[
                              styles.dropdownLink,
                              isActiveSubMenu(menu, item) ? styles.activeLink : "",
                            ].join(" ")}
                            onClick={handleNavClick}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={menu.basePath}
                    className={`${styles.navLink} ${styles.menuButton}`}
                    onClick={handleNavClick}
                  >
                    <span>{menu.label}</span>
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
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
