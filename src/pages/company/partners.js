import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import PartnersContent from "../../components/template/PartnersContent.jsx";

const PAGE_TITLE = "협력 네트워크";
const PAGE_DESCRIPTION = "기술적 혁신을 만들기 위해 다양한 파트너와 협력하고 있습니다.";

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
