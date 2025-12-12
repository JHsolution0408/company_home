import * as React from "react";
import SubPageHeader from "../../components/subpage-header";
import Seo from "../../components/seo";
import Footer from "../../components/footer";
import { graphql } from "gatsby";

export const query = graphql`
  query VisionMissionQuery {
    markdownRemark(fileAbsolutePath: { regex: "/vision-mission.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const VisionMissionPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;
  return (
    <>
      <SubPageHeader bgImage="/images/about/bg_vision.png" />
      <main style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
        <div style={{ width: '100vw', maxWidth: '100vw', minHeight: '1px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 0 }}>
          <div id="vision-mission-meta" style={{
            width: '100%',
            maxWidth: '100vw',
            backgroundColor: 'black',
            backgroundImage: 'linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%), url(/images/bg_vision.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center bottom',
            marginBottom: '25px',
            padding: '100px 20px 60px 50px'
          }}>
            <div id="vision-mission-text" style={{ width: '90vw', maxWidth: '90vw', margin: '0 auto', textAlign: 'left' }}>
              <h1 style={{ margin: "0 auto", maxWidth: "90vw", color: '#FDFDFD', fontSize: '40px' }}>{frontmatter.title}</h1>
              <p style={{ margin: "0 auto", maxWidth: "90vw", color: '#FDFDFD', whiteSpace: 'nowrap', maxWidth: '90vw', fontSize: '20px' }}>
                우리는 데이터와 물리 법칙을 융합한 독자적인 기술로 산업의 난제를 해결합니다. 에너지 최적화를 넘어, 인류와 공존하는 탄소 중립 사회의 기술적 표준이 되겠습니다.
              </p>
            </div>
          </div>
          <div id="vision-mission-markdown" style={{
            maxWidth: "90vw",
            marginLeft: 0,
            marginRight: 0,
            fontSize: 20,
            lineHeight: 1.8,
            padding: "15px 24px 15px 3%"
          }}>
            <div
              dangerouslySetInnerHTML={{
                __html: html
                  .replace('AI-ENGINEERING', '<span style="color:#177D3C;font-weight:700;">AI-ENGINEERING</span>')
                  .replace(/(>[^<]*미션[^<]*<)/g, match => match.replace('미션', '<span style="color:#177D3C;font-weight:700;">미션</span>'))
                  .replace(/(>[^<]*핵심가치[^<]*<)/g, match => match.replace('핵심가치', '<span style="color:#177D3C;font-weight:700;">핵심가치</span>'))
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const Head = () => <Seo title="비전 및 미션" />;

export default VisionMissionPage;
