import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import * as styles from "../company/vision-mission.module.css";
import SectionTitle from "../../components/template/SectionTitle"
import SectionMovieTitle from "../../components/template/SectionMovieTitle";
import ImageCard from "../../components/template/ImageCard"


export const query = graphql`
  query MediaPageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/media.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const MediaPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      type={'dark'}
      subHeaderTitle={frontmatter.title}
      subHeaderDescription={frontmatter.description}
      subHeaderBgImage="/images/banners/bg_media.png"
    >
      <div className={styles.container}>
          {/* AI 영상 제작 솔루션 */}
          <section>
            <SectionTitle
              title={
                <>
                  AI 영상 제작 솔루션
                </>
              }
              description={`AI 솔루션은 일러스트, 웹툰이나 만화책 및 사진 등 정적인 이미지 IP를 분석하여 역동적인 고품질 영상으로 제작합니다.`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card-ai-video1.png",
                  alt: "이미지의 동적 변환",
                }}
                title={"이미지의 동적 변환"}
                description={`그래픽 리소스를 분석하여 자연스러운 애니메이션 움직임을 생성합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-ai-video2.png",
                  alt: "장편 제작",
                }}
                title={"장편 제작"}
                description={`숏폼을 넘어 서사가 있는 긴 러닝타임의 고품질 영상을 제작합니다. `}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-ai-video3.png",
                  alt: "일관성 유지",
                }}
                title={"일관성 유지"}
                description={`캐릭터·배경 학습으로 영상 전체의 일관성을 유지하는 기술을 보유합니다.`}
              />
            </div>
            
            <SectionMovieTitle
              title={
                <>
                  이미지 원작 기반 생동감 있는 장편 AI 영상 제작
                </>
              }
              description={`정적인 이미지 소스를 동적 영상화하는 기술을 통해 사용자 움직임에 반응하는 양방향 콘텐츠 제작한 영상을 직접 확인해보세요.`}
            />
            <div className={styles.videoBox}>
              <div className={styles.video}>
                <iframe
                  className={styles.videoIframe}
                  src="https://www.youtube.com/embed/Nxe8HhexNVI?si=VfnkuMA6zuCPuxze&amp"
                  allow="autoplay"
                  allowFullScreen
                  title="YouTube video player"
                />
              </div>
              <div className={styles.video}>
                <iframe
                  className={styles.videoIframe}
                  src="https://www.youtube.com/embed/dC7dp1yOM-w?si=uUpRMffGWRhnFLGv"
                  allow="autoplay"
                  allowFullScreen
                  title="YouTube video player"
                />
              </div>
            </div>
          </section>

          {/* AI AVATAR */}
          <section>
            <SectionTitle
              title={
                <>
                  AI AVATAR
                </>
              }
              description={`고도화된 페이셜 애니메이션과 음성 합성 기술을 통해 자연스러운 감정 표현이 가능한 AI아바타를 제작합니다. XR, PC와 모바일 등 다양한 플랫폼에서 지능형 가이드, 강사 또는 개인화 된 파트너로서 최상의 교육, 홍보 및 커뮤니케이션 경험을 제공합니다.`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card-ai-avatar1.png",
                  alt: "LLM 기반 실시간 대화",
                }}
                title={"LLM 기반 실시간 대화"}
                description={`문맥을 이해하고 자연스럽게 대화하는 AI 엔진을 탑재합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-ai-avatar2.png",
                  alt: "멀티 플랫폼",
                }}
                title={"멀티 플랫폼"}
                description={`PC와 모바일은 물론 XR 플랫폼 내에서도 끊김 없는 렌더링을 지원합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-ai-avatar3.png",
                  alt: "맞춤형 페르소나 설계",
                }}
                title={"맞춤형 페르소나 설계"}
                description={`목적에 맞는 외형 커스터마이징과 고유 지식 베이스를 구축합니다.`}
              />
            </div>

            <SectionMovieTitle
              title={
                <>
                  소통하는 지능형 디지털 휴먼
                </>
              }
              description={`사용자의 음성과 감정에 반응하는 실시간 리깅 기술을 직접 확인해보세요.`}
            />
            <div className={styles.videoBox}>
              <div className={styles.video}>
                <iframe
                  className={styles.videoIframe}
                  src="https://www.youtube.com/embed/9ofXAYn1Qc4?si=kJQK-VpH6UBQquel"
                  allow="autoplay"
                  allowFullScreen
                  title="YouTube video player"
                />
              </div>
            </div>
          </section>

          {/* XR PLATFORM */}
          <section>
            <SectionTitle
              title={
                <>
                  XR PLATFORM
                </>
              }
              description={`공간 컴퓨팅 기술을 기반으로 단순한 관람을 넘어 실시간 다중 접속, 인터랙티브 요소 그리고 AI 아바타와 유기적으로 결합을 통한 몰입감있는 콘텐츠를 제공합니다.`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card-xp-platform1.png",
                  alt: "AI 기술 적용",
                }}
                title={"AI 기술 적용"}
                description={`AI 아바타와 연동되어 양방향 콘텐츠를 제공합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-xp-platform2.png",
                  alt: "실시간 다중 접속 환경",
                }}
                title={"실시간 다중 접속 환경"}
                description={`수천 명이 동시에 소통하고 함께 플레이가 가능합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-xp-platform3.png",
                  alt: "디바이스 최적화",
                }}
                title={"디바이스 최적화"}
                description={`PC와 모바일 및 VR/AR 기기 등 다양한 플랫폼에서 최상의 퍼포먼스를 발휘합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-xp-platform4.png",
                  alt: "검증된 솔루션",
                }}
                title={"검증된 솔루션"}
                 description={`다수의 공공 및 민간 프로젝트를 통해 입증된 기술적 완성도를 보유하고 있습니다.`}
              />              
            </div>

            <SectionMovieTitle
              title={
                <>
                  상상이 현실이 되는, 무한의 가능성을 확장하는 공간
                </>
              }
              description={`첨단 게임 엔진 기반의 독보적인 몰입감으로 차별화 된 XR 경험을 설계된 내용을 직접 확인해보세요.`}
            />
            <div className={styles.videoBox}>
              <div className={styles.video}>
                <iframe
                  className={styles.videoIframe}
                  src="https://www.youtube.com/embed/ty81yrLMnuU?si=HD9Kb4bxx02RJHoW"
                  allow="autoplay"
                  allowFullScreen
                  title="YouTube video player"
                />
              </div>
              <div className={styles.video}>
                <iframe
                  className={styles.videoIframe}
                  src="https://www.youtube.com/embed/KjdH7_13m1w?si=htcFCixLLDkDVPDK"
                  allow="autoplay"
                  allowFullScreen
                  title="YouTube video player"
                />
              </div>              
            </div>            
          </section>

          {/* GAME CONTENTS */}
          <section>
            <SectionTitle
              title={
                <>
                  GAME CONTENTS
                </>
              }
              description={`재미의 본질을 꿰뚫는 기획력 위에 AI 기반의 효율적인 제작 파이프라인과 XR의 확장성을 결합하였습니다. 단순한 플레이를 넘어 사용자의 감각을 깨우는 차세대 게임 경험을 설계합니다.`}
            />

            <div className={styles.flexBox}>
              <ImageCard
                image={{
                  src: "/images/solutions/card-game-contents1.png",
                  alt: "AI 융합 하이브리드 게임",
                }}
                title={"AI 융합 하이브리드 게임"}
                description={`게임 메카닉 노하우와 최첨단 AI 기술을 융합하여 XR게임과 모바일 캐주얼 게임을 제작합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-game-contents2.png",
                  alt: "AI 파이프라인 혁신",
                }}
                title={"AI 파이프라인 혁신"}
                description={`개발 과정에 AI 적용으로 제작 기간과 비용 절감을 달성합니다.`}
              />

              <ImageCard
                image={{
                  src: "/images/solutions/card-game-contents3.png",
                  alt: "지능형 NCP 솔루션",
                }}
                title={"지능형 NCP 솔루션"}
                description={`AI 기반의 지능형 NPC(AI 아바타)를 도입하여 몰입감 있는 게임 환경 제공합니다.`}
              />
            </div> 

            <SectionMovieTitle
              title={
                <>
                  AI와 XR 요소 결합한 게임 콘텐츠 제작
                </>
              }
              description={`AI 기반의 절차적 생성 기술(Procedural Generation)을 활용하여 XR 환경 내 무한한 콘텐츠를 제공합니다.`}
            />
            <div className={styles.videoBox}>
              <div className={styles.video}>
                <iframe
                  className={styles.videoIframe}
                  src="https://www.youtube.com/embed/U6Bc-QdX67I?si=m1F1a7Gdmw-jxK1u"
                  allow="autoplay"
                  allowFullScreen
                  title="YouTube video player"
                />
              </div>            
            </div>            
          </section>
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="미디어" />;

export default MediaPage;

