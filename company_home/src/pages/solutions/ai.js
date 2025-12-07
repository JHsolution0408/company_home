import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const AISolutionPage = () => (
  <Layout>
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Link to="/solutions" style={{ color: "#0066cc" }}>← 솔루션으로 돌아가기</Link>
      
      <h1>AI/ML 솔루션</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>개요</h2>
        <p>
          인공지능과 머신러닝 기술을 활용하여 비즈니스 가치를 창출하는 지능형 솔루션을 개발합니다.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>주요 기술</h2>
        <ul>
          <li>TensorFlow, PyTorch, Keras</li>
          <li>scikit-learn, XGBoost</li>
          <li>Natural Language Processing</li>
          <li>Computer Vision</li>
          <li>AWS SageMaker, Azure ML</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>제공 서비스</h2>
        <ul>
          <li>머신러닝 모델 개발</li>
          <li>데이터 분석 및 인사이트</li>
          <li>자연어 처리 애플리케이션</li>
          <li>이미지 인식 시스템</li>
          <li>예측 분석</li>
        </ul>
      </section>

      <section style={{ backgroundColor: "#f0f8ff", padding: "30px", borderRadius: "8px" }}>
        <h2>문의하기</h2>
        <p>AI/ML 솔루션에 대해 궁금하신 점이 있으시면 언제든지 문의하세요.</p>
        <Link to="/contact" style={{ color: "#0066cc", fontWeight: "bold" }}>
          연락처 →
        </Link>
      </section>
    </div>
  </Layout>
)

export const Head = () => <Seo title="AI/ML 솔루션" />

export default AISolutionPage
