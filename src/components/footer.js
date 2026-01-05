import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./footer.module.css"
import DownloadIcon from "/static/icons/common/download-icon.svg";

const ADDRESS_LINK = `https://map.kakao.com/?map_type=TYPE_MAP&q=%EC%84%9C%EC%9A%B8+%EA%B8%88%EC%B2%9C%EA%B5%AC+%EA%B0%80%EC%82%B0%EB%94%94%EC%A7%80%ED%84%B82%EB%A1%9C+135&urlLevel=2&urlX=473026&urlY=1105733`;

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
              <a
                href={ADDRESS_LINK}
                target="_blank"
                rel="noreferrer"
                className={styles.addressLink}
              >
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
              </a>
            </div>

            {/* 회사 소개서 섹션 */}
            <div className={styles.rightCol}>
              <div className={styles.rightInner}>
                <p className={styles.linkP}>
                  <a
                    href="/document/jhsolution-introduction.pdf"
                    className={styles.brochureLink}
                    download="제이에이치솔루션 회사소개서.pdf"
                  >
                    회사소개서

                    <img
                      src={DownloadIcon}
                      alt="Download Icon"
                      width={20}
                      height={20}
                    />
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
