import * as React from "react"
import * as styles from "./subheader.module.css"

/**
 * SubHeader component
 * Renders a banner area under the fixed header on non-home pages.
 *
 * Props:
 * - title: string (required)
 * - description: string (optional)
 * - bgImage: string (optional) URL path for background image
 * - paddingClass: string (optional) allow overriding default padding class
 * - children: ReactNode (optional) extra content rendered under description
 */
const SubHeader = ({ title, description, bgImage = "", paddingClass, children }) => {

  return (
    <div
      id="subheader"
      className={`${styles.wrapper} ${paddingClass ? paddingClass : styles.contentPadding}`}
      role="region"
      aria-label="페이지 상단 소개 영역"
    >
      <div id="title-text" className={styles.inner}>
        {title && (<h1 className={styles.title}>{title}</h1>)}
        {description && (<p className={styles.description}>{description}</p>)}
        {children}
      </div>
    </div>
  )
}

export default SubHeader
