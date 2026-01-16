import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import PartnersContent from "../../components/template/PartnersContent.jsx";

const PAGE_TITLE = "협력 네트워크";
const PAGE_DESCRIPTION = "혁신적인 기술 가치 창출을 위한 협력 네트워크를 구축했습니다.";

const PartnersPage = () => (
  <Layout
    type={'light'}
    subHeaderTitle={PAGE_TITLE}
    subHeaderDescription={PAGE_DESCRIPTION}
    subHeaderBgImage={'/images/banners/bg_vision.png'}
  >
    <PartnersContent />
  </Layout>
)

export const Head = () => {
  return (
    <Seo 
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
    />
  )
}

export default PartnersPage
