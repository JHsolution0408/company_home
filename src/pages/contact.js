import React from "react";

import Contact from "../components/contact/Contact";
import Layout from "../components/layout";
import Seo from "../components/seo";

const PAGE_TITLE = "문의 하기";
const PAGE_DESCRIPTION = "맞춤형 솔루션이 필요하다면 제이에이치솔루션과 상담으로 시작하세요.";

const ContactPage = () => {
  return (
    <Layout
      type={'light'}
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage={'/images/banners/bg_vision.png'}
    >
      <Contact />
    </Layout>    
  );
}

export const Head = () => {
  return (
    <Seo 
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
    />
  )
}

export default ContactPage
