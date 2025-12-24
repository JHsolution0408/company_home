import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../pages/company/vision-mission.module.css"

// 페이지 타입별 헤더 설정을 객체로 관리
const PAGE_HEADERS = {
  press: {
    title: '보도자료',
    description: 'JH솔루션의 혁신과 성과를 언론을 통해 전해드립니다'
  },
  project: {
    title: '프로젝트',
    description: '혁신적인 기술로 만들어가는 JH솔루션의 프로젝트'
  },
  default: {
    title: '', // 기본값으로 전달받은 title 사용
    description: '' // 기본값으로 전달받은 description 사용
  }
};

// 페이지 타입 판별 함수
const getPageType = (slug) => {
  if (String(slug).startsWith('news')) return 'press';
  if (String(slug).startsWith('project')) return 'project';
  return 'default';
};

const MarkdownBody = ({ html }) => {
  if (!html) {
    return <p style={{ color: "#c00" }}>콘텐츠를 불러오는 중 문제가 발생했습니다.</p>;
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};


const MarkdownPage = ({ data }) => {
  const node = data.markdownRemark;
  const { title, description, date, slug, featureImage } = node.frontmatter;
  console.log(slug, '값입니다.')

  return (
    <Layout
      // Layout 컴포넌트의 props 설정 부분
      type={'dark'}
      subHeaderTitle={PAGE_HEADERS[getPageType(slug)].title || title}
      subHeaderDescription={PAGE_HEADERS[getPageType(slug)].description || description}
      subHeaderBgImage="/images/bg_vision.png"
    >
      <section className={styles.container}>
        <h1>{title}</h1>
        <h1>{date}</h1>

        <hr />

        {featureImage && (
          <img
            src={featureImage}
            alt={title}
            style={{
              margin: '0 auto',
              width: '100%',
              maxWidth: '720px',
              height: '541px',
              objectFit: 'contain',
              borderRadius: '16px',
            }}
          />
        )}
        <MarkdownBody
          html={
            node.html
              .replace(/(문제인식\s*\(\s*The Challenge\s*\))/g, '<span style="color:#177D3C;font-size:24px;font-weight:600;margin-bottom:-1px;display:inline-block;">$1</span>')
              .replace(/(기술적 해답\s*\(\s*The Solution\s*\))/g, '<span style="color:#177D3C;font-size:24px;font-weight:600;margin-bottom:-1px;display:inline-block;">$1</span>')
              .replace(/(궁극적 목표\s*\(\s*The Impact\s*\))/g, '<span style="color:#177D3C;font-size:24px;font-weight:600;margin-bottom:-1px;display:inline-block;">$1</span>')
              .replace(/<img([^>]*)>/g, '<img$1 style="border-radius:16px;">')
          }
        />
      </section>
    </Layout>
  );
};

export const query = graphql`
  query MarkdownPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
        description
        slug
        featureImage
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.markdownRemark.frontmatter.title} />

export default MarkdownPage
