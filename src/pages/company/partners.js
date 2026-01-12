import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo";
import PartnersContent from "../../components/template/PartnersContent.jsx";
import * as styles from "./vision-mission.module.css";

const PartnersPage = () => (
  <Layout
    type={'light'}
    subHeaderTitle={'협력 네트워크'}
    subHeaderDescription={'혁신적인 기술 가치 창출을 위한 협력 네트워크를 구축했습니다.'}
    subHeaderBgImage="/images/banners/bg_vision.png"
  >
    <PartnersContent />
  </Layout>
)

export const Head = () => <Seo title="협력 네트워크" />

export default PartnersPage
