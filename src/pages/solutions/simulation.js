import * as React from "react";
import SubPageHeader from "../../components/subpage-header";
import Seo from "../../components/seo";
import Footer from "../../components/footer";
import { graphql } from "gatsby";

export const query = graphql`
  query SimulationPageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/simulation.md$/" }) {
      frontmatter {
        title
        description
        slug
      }
      html
    }
  }
`;

const SimulationPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;
  return (
    <>
      <SubPageHeader bgImage="/images/about/bg_vision.png" />
      <main style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
        <div style={{ width: '100vw', maxWidth: '100vw', minHeight: '1px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 0 }}>
          <div id="title-meta" style={{
            width: '100%',
            maxWidth: '100vw',
            backgroundColor: 'black',
            backgroundImage: 'linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%), url(/images/bg_vision.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center bottom',
            marginBottom: '25px',
            padding: '100px 20px 60px 50px'
          }}>
            <div id="title-text" style={{ width: '90vw', maxWidth: '90vw', margin: '0 auto', textAlign: 'left' }}>
              <h1 style={{ margin: "0 auto", maxWidth: "90vw", color: '#FDFDFD', fontSize: '40px' }}>{frontmatter.title}</h1>
              <p style={{ margin: "0 auto", maxWidth: "90vw", color: '#FDFDFD', whiteSpace: 'nowrap', maxWidth: '90vw', fontSize: '20px' }}>
                {frontmatter.description}
              </p>
            </div>
          </div>
          <div id="content-md" style={{
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
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const Head = () => <Seo title="시뮬레이션" />;

export default SimulationPage;
