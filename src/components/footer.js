import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./footer.module.css"

const Footer = () => (
  <div className={styles.container}>
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.section}>
          <div className={styles.logoWrap}>
            <Link to="/" className={styles.logoLink}>
              <img
                src="/images/btm_logo.svg"
                alt="JH Solution"
                className={styles.logoImg}
              />
            </Link>
          </div>

          <div className={styles.topBar}>
            {/* 오시는 길 섹션 */}
            <div className={styles.leftCol}>
              <div className={styles.infoText}>
                <div className={styles.mb8}>
                  <strong className={styles.infoTitle}>오시는길</strong>
                </div>

                <div className={styles.address}>
                  JH솔루션 (우) 08504&nbsp;
                  <br className={styles.br} />
                  서울특별시 금천구 가산디지털2로 135, 1공
                  1701-1703호(가산동, 가산어반워크)
                </div>

                <div className={styles.tel}>
                  <div>
                    <span className={styles.telLabel}>Tel:</span>
                    02-6404-1607
                  </div>

                  <div>
                    <span className={styles.telLabel}>FAX:</span>
                    02-6008-1606
                  </div>
                </div>
              </div>
            </div>

            {/* 회사 소개서 섹션 */}
            <div className={styles.rightCol}>
              <div className={styles.rightInner}>
                <p className={styles.linkP}>
                  <a href="#" className={styles.brochureLink}>
                    회사소개서
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 12L8 4M8 12L4 8M8 12L12 8"
                        stroke="#CFD3D8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.bottomBar}>
            <p className={styles.copy}>
              &copy; JHSolution. All right Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
)

export default Footer
