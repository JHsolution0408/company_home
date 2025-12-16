import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = () => (
  <Layout>
    <h1>회사 소개</h1>
    <p>
      여기에 회사의 소개 내용을 작성하세요.
    </p>
    <p>
      회사의 역사, 미션, 비전 등을 포함할 수 있습니다.
    </p>
    <Link to="/">홈으로 돌아가기</Link>
  </Layout>
)

export const Head = () => <Seo title="회사 소개" />

export default AboutPage
