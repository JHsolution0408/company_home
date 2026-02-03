import React from "react"
import * as styles from "./DescriptionCard.module.css"

export default function DescriptionCard({
  imageSrc,
  imageAlt,
  title,
  description,
  className,
}) {
  return (
    <div className={`${styles.descriptionCard} ${className}`}>
      <div>
        <img
          className={styles.descriptionCardImage}
          src={imageSrc}
          alt={imageAlt}
        />
      </div>

      <div>
        <h3 className={styles.descriptionCardTitle}>
          {title}
        </h3>
        <p className={styles.descriptionCardDescription}>
          {description}
        </p>
      </div>
    </div>
  )
}
