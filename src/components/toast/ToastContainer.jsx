import React from "react";
import * as styles from "./toast.module.css";
import checkIcon from '/static/icons/common/check-icon.svg';

export default function ToastContainer({ 
  toasts, 
  onClose
}) {
  return (
    <div 
      className={styles.container} aria-live="polite" aria-relevant="additions">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type] || ""}`}>
          <img 
            src={checkIcon}
            alt="Contact Button"
            width={24}
            height={24}
          />
          <span className={styles.msg}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
