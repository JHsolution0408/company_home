import React from "react"
import * as styles from "./FloatTop.module.css"
import BackToTopIcon from "/static/icons/common/floatTop-icon.svg";

export default function BackToTop({ layoutRootRef }) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const onScroll = () => {
      setVisible(window.scrollY >= 300)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClickBackToTop = () => {
    if (!layoutRootRef?.current) return
    layoutRootRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <button
      type="button"
      className={`${styles.backToTop} ${visible ? styles.show : styles.hide}`}
      onClick={handleClickBackToTop}
      aria-label="Back to Top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <img 
        src={BackToTopIcon} 
        alt="BackToTop Icon" 
        width={24}
        height={24}
      />
    </button>
  )
}

BackToTop.displayName = "BackToTop"
