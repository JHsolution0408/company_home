import React from 'react';
import * as styles from "./JourneyTextAnimation.module.css";

const JourneyTextAnimation = () => {
  return (
    <div 
      className={styles.interaction}
      style={{
        background: "url(/images/banners/bg-jhaion-banner.png) center center / cover no-repeat",
      }}
    >
      <div className={styles.slogan}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>데이터와 물리학의 간극을 메우다</h1>
          <h2>JHAION의 시작</h2>
        </div>
        <h3>
          기존의 예측 방식이 가진 불확실성을 해결하고,&nbsp;
          <br className={styles.brForMobile} />
          탄소 중립이라는 시대적 과제에 가장 정밀한 답을 내놓기 위해 탄생했습니다.
        </h3>
      </div>

      {/* TODO: 1) PC 버전일때 - 애니메이션 있음 */}
      <div className={styles.copylightContainer} aria-label="Journey of Hyper-Scale AI Optimization Net-Zero">
        <div className={styles.copylightWrapper} aria-label="Journey of">
          <p className={`${styles.copylightText} ${styles.highlightedCopylight}`}>J</p>
          <p className={`${styles.copylightText} ${styles.copylightTextFade}`}>ourney of</p>
        </div>
        <div className={styles.copylightWrapper} aria-label="Hyper-Scale">
          <p className={`${styles.copylightText} ${styles.highlightedCopylight}`}>H</p>
          <p className={`${styles.copylightText} ${styles.copylightTextFade}`}>yper-Scale</p>
        </div>
        <div className={styles.copylightWrapper} aria-label="AI">
          <p className={`${styles.copylightText} ${styles.highlightedCopylight}`}>AI</p>
        </div>
        <div className={styles.copylightWrapper} aria-label="Optimization">
          <p className={`${styles.copylightText} ${styles.highlightedCopylight}`}>O</p>
          <p className={`${styles.copylightText} ${styles.copylightTextFade}`}>ptimization</p>
        </div>
        <div className={styles.copylightWrapper} aria-label="Net-Zero">
          <p className={`${styles.copylightText} ${styles.highlightedCopylight}`}>N</p>
          <p className={`${styles.copylightText} ${styles.copylightTextFade}`}>et-Zero</p>
        </div>
      </div>
    </div>
  );
};

export default JourneyTextAnimation;
