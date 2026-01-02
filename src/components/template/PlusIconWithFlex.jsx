import React from "react"
import * as styles from "./PlusIconWithFlex.module.css"

export default function PlusIconWithFlex() {
  return (
    <div className={styles.plusImageContainer}>
      <img
        src="/images/about/mission_plus.png"
        width={"40px"}
        height={"40px"}
        alt="플러스"
      />
    </div>
  )
}
