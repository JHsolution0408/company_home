import React from 'react';
import * as styles from './ImageCard.module.css';

export default function ImageCard({ image, title, description }) {
  const { src, alt } = image;
  
  return (
    <div className={styles.imageCardContainer}>
      <img
        src={src}
        alt={alt}
        style={{
          borderRadius: 20,
          width: "100%",
        }}
      />

      {title && (
        <div className={styles.imageCardContent}>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
      )}
    </div>
  )
}
