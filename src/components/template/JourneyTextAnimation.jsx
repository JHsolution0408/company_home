import React from 'react';
import * as styles from "./JourneyTextAnimation.module.css";

const JourneyTextAnimation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.journeyCopylightContainer}>
        <h1>데이터와 물리학의 간극을 메우다</h1>
        <h2>JHAION의 시작</h2>
        <h3>기존의 예측 방식이 가진 불확실성을 해결하고, 탄소 중립이라는 시대적 과제에 가장 정밀한 답을 내놓기 위해 탄생했습니다.</h3>
      </div>
      <div className={styles.copylightContainer} aria-label="Journey of Hyper-Scale AI Optimization Net-Zero">
        <div className={`${styles.JTAWrapper} ${styles.JTAAnimated}`} aria-label="Journey of">
          <p className={`${styles.JTAText} ${styles.JTATextHighlight}`}>J</p>
          <p className={`${styles.JTAText} ${styles.JTATextFade} ${styles.JTAFadein}`}>ourney of</p>
        </div>
        <div className={`${styles.JTAWrapper} ${styles.JTAAnimated}`} aria-label="Hyper-Scale">
          <p className={`${styles.JTAText} ${styles.JTATextHighlight}`}>H</p>
          <p className={`${styles.JTAText} ${styles.JTATextFade} ${styles.JTAFadein}`}>yper-Scale</p>
        </div>
        <div className={`${styles.JTAWrapper} ${styles.JTAAnimated}`} aria-label="AI">
          <p className={`${styles.JTAText} ${styles.JTATextHighlight}`}>AI</p>
        </div>
        <div className={`${styles.JTAWrapper} ${styles.JTAAnimated}`} aria-label="Optimization">
          <p className={`${styles.JTAText} ${styles.JTATextHighlight}`}>O</p>
          <p className={`${styles.JTAText} ${styles.JTATextFade} ${styles.JTAFadein}`}>ptimization</p>
        </div>
        <div className={`${styles.JTAWrapper} ${styles.JTAAnimated}`} aria-label="Net-Zero">
          <p className={`${styles.JTAText} ${styles.JTATextHighlight}`}>N</p>
          <p className={`${styles.JTAText} ${styles.JTATextFade} ${styles.JTAFadein}`}>et-Zero</p>
        </div>
      </div>
    </div>
  );
};

export default JourneyTextAnimation;
