import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ServicesPage = () => (
  <Layout>
    <h1>서비스</h1>
    <p>
      우리가 제공하는 서비스를 소개합니다.
    </p>
    
    <div>
      <h2>서비스 1</h2>
      <p>서비스 1에 대한 설명</p>
    </div>

    <div>
      <h2>서비스 2</h2>
      <p>서비스 2에 대한 설명</p>
    </div>

    <div>
      <h2>서비스 3</h2>
      <p>서비스 3에 대한 설명</p>
    </div>

    <Link to="/">홈으로 돌아가기</Link>
  </Layout>
)

export const Head = () => <Seo title="서비스" />

export default ServicesPage
