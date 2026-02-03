import React, { useMemo, useRef, useEffect, useState } from "react";
import { navigate } from "gatsby";
import SectionTitle from "../../components/template/SectionTitle";
import * as styles from "./Contact.module.css";
import { useToast } from "../toast/ToastProvider";

// 문의 유형 체크박스 옵션 목록
const INQUIRY_TYPES = [
  { key: "jhaion-engine", label: "JHAION 엔진" },
  { key: "energy", label: "에너지 관리" },
  { key: "simulation", label: "시뮬레이션" },
  { key: "ai", label: "인공지능" },
  { key: "digitaltwin", label: "디지털 트윈" },
  { key: "media", label: "미디어" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// 문의하기 유효성 검사
const validate = (form) => {
  const next = {};
  if (!form.name.trim()) {
    next.name = "성함을 입력해 주세요.";
  }

  const emailTrim = form.email.trim();
  if (!emailTrim) {
    next.email = "이메일 주소를 입력해 주세요.";
  } else if (!EMAIL_REGEX.test(emailTrim)) {
    next.email = "이메일 형식이 올바르지 않습니다.";
  }

  const phoneTrim = form.phone.trim();
  if (!phoneTrim) {
    next.phone = "연락처를 입력해 주세요.";
  } else if (!/^\d+$/.test(phoneTrim)) {
    next.phone = '"-" 없이 숫자만 입력해 주세요.';
  } else if (phoneTrim.length < 8 || phoneTrim.length > 15) {
    next.phone = "연락처 길이가 올바르지 않습니다. (8~15자리 권장)";
  }

  if (!form.types.length) {
    next.types = "문의 유형을 1개 이상 선택해 주세요.";
  }

  const msgTrim = form.message.trim();
  if (!msgTrim) {
    next.message = "문의 내용을 입력해 주세요.";
  } else if (msgTrim.length > 5000) {
    next.message = "문의 내용은 최대 5,000자까지 입력할 수 있습니다.";
  }

  return next;
};

const Contact = () => {
  const { showToast } = useToast();

  const timerRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    types: [],
    message: "",
  });

  const errors = useMemo(() => validate(form), [form]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhoneInput = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, phone: onlyDigits }));
  };

  const toggleType = (typeKey) => {
    setForm((prev) => {
      const exists = prev.types.includes(typeKey);
      return {
        ...prev,
        types: exists ? prev.types.filter((k) => k !== typeKey) : [...prev.types, typeKey],
      };
    });
  };

  // 선택된 key 배열을 label 배열로 변환 (서버로 label을 보내는 게 안전)
  const selectedTypeLabels = useMemo(() => {
    const map = new Map(INQUIRY_TYPES.map((t) => [t.key, t.label]));
    return form.types.map((k) => map.get(k)).filter(Boolean);
  }, [form.types]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      showToast({ message: "필수 항목을 확인해 주세요.", type: "error" });
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          inquiryType: selectedTypeLabels,
          message: form.message.trim(),
        }),
      });

      const data = await resp.json().catch(() => null);

      if (!resp.ok || !data?.ok) {
        throw new Error(data?.error || "Submit failed");
      }

      showToast({ message: "제출이 완료되었습니다.", type: "success" });

      timerRef.current = setTimeout(() => {
        navigate("/");
      }, 3000);

      setForm({ name: "", email: "", phone: "", types: [], message: "" });
    } catch (err) {
      showToast({
        message: "제출에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <SectionTitle
        title={
          <>
            JH솔루션&nbsp;
            <span>문의</span>
          </>
        }
        className={styles.contactTitle}
      />

      <form id="contactForm" onSubmit={handleSubmit} className={styles.contactForm}>
        {/* 사용자 정보 입력 영역 */}
        <div className={styles.userInfoSection}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              이름 <span className={styles.star}>*</span>
            </label>
            <input
              id="name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="성함 입력"
              autoComplete="name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              이메일 주소 <span className={styles.star}>*</span>
            </label>
            <input
              id="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="이메일 주소 입력 (예: jh-solution@naver.com)"
              autoComplete="email"
              inputMode="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              연락처 <span className={styles.star}>*</span>
            </label>
            <input
              id="phone"
              value={form.phone}
              onChange={handlePhoneInput}
              placeholder='"-" 없이 숫자만 입력'
              autoComplete="tel"
              inputMode="numeric"
            />
          </div>
        </div>

        {/* 문의 관련 입력 영역 */}
        <div className={styles.inquirySection}>
          {/* 문의 유형 체크박스 */}
          <div className={styles.field}>
            <div className={styles.label}>
              문의 유형 <span className={styles.star}>*</span>
            </div>

            <div className={styles.checkboxGrid}>
              {INQUIRY_TYPES.map((t) => {
                const checked = form.types.includes(t.key);
                return (
                  <label key={t.key} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleType(t.key)}
                    />
                    <span className={styles.box}></span>
                    <span>{t.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 문의 내용 */}
          <div className={`${styles.field} ${styles.messageInputBox}`}>
            <label htmlFor="message" className={styles.label}>
              문의 내용 <span className={styles.star}>*</span>
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={handleChange("message")}
              placeholder="문의 내용 입력 (최대: 5,000자)"
              className={styles.textarea}
              maxLength={5000}
              required
            />
          </div>
        </div>
      </form>

      <button
        type="submit"
        form="contactForm"
        className={styles.submitBtn}
        disabled={!isValid || isSubmitting}
        data-is-valid={!isValid}
      >
        {isSubmitting ? "전송 중..." : "문의하기"}
      </button>
    </div>
  );
};

export default Contact;
