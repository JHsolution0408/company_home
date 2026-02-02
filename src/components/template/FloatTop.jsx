import React from "react"
import * as styles from "./FloatTop.module.css"
import FloatTopIcon from "/static/icons/common/floatTop-icon.svg";

export default function FloatTop({ layoutRootRef }) {
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

  const handleClickFloatTop = () => {
    if (!layoutRootRef?.current) return
    layoutRootRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <button
      type="button"
      className={`${styles.floatTop} ${visible ? styles.show : styles.hide}`}
      onClick={handleClickFloatTop}
      aria-label="Float Top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <img 
        src={FloatTopIcon} 
        alt="FloatTop Icon" 
        width={24}
        height={24}
      />
    </button>
  )
}

FloatTop.displayName = "FloatTop"
