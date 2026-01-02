import * as styles from "./ProjectTag.module.css"
import * as React from "react"

const TAGS = {
  INDUSTRY: '산업 적용 사례',
  INFRA: '도시·건물 프로젝트',
  GOV: '정부 과제 및 연구 성과'
}

const TAG_CLASSES = {
  INDUSTRY: styles.tagIndustry,
  INFRA: styles.tagInfra,
  GOV: styles.tagGov,
}

export default function ProjectTag({ tag }) {
  const label = TAGS[tag] || tag
  const tagClass = TAG_CLASSES[tag] || styles.tag

  return (
    <span className={`${styles.tag} ${tagClass}`}>
      {label}
    </span>
  )
}
