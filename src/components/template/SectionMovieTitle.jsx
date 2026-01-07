import React from 'react';
import * as styles from './SectionMovieTitle.module.css';

export default function SectionMovieTitle({ title, highlightedTitle, description, sectionLabel }) {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.headingWrap}>
        {sectionLabel && (
          <p className={styles.sectionLabel} aria-label="section label">
            {sectionLabel}
          </p>
        )}
        <h2 className={styles.title}>
          {title}
        </h2>
      </div>
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </div>
  )
}
