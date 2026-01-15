import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./PagerLink.module.css"

/**
 * 이전 / 다음 페이지 이동용 PagerLink 컴포넌트
 * disabled=true 인 경우 Link 대신 비활성 버튼을 렌더링한다.
 */
const PagerLink = ({ to, disabled, children }) => {
  if (disabled) {
    return (
      <div className={styles.disableBtn} aria-disabled="true">
        <span>{children}</span>
      </div>
    )
  }

  return (
    <Link className={styles.pagerBtn} to={to}>
      <span>{children}</span>
    </Link>
  )
}

export default PagerLink
