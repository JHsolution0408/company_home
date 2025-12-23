import React from 'react';
import * as styles from './SectionTitle.module.css';

export default function SectionTitle({ title, highlightedTitle, description }) {
  return (
    <div className={styles.titleContainer}>
      <h2 className={styles.title}>
        {title}
      </h2>
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </div>
  )
}
