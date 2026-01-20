import * as React from "react";
import Seo from "../../components/seo";
import Layout from "../../components/layout"
import VisionMissionContent from "../../components/template/VisionMissionContent"

const PAGE_TITLE = "비전 및 미션";
const PAGE_DESCRIPTION = "초거대 AI와 공학의 만남, 지속 가능한 내일을 가장 정밀하게 설계합니다.";

const VisionMissionPage = () => {
  return (
    <Layout
      type={'light'}
      subHeaderTitle={PAGE_TITLE}
      subHeaderDescription={PAGE_DESCRIPTION}
      subHeaderBgImage={'/images/banners/bg_vision.png'}
    >
      <VisionMissionContent />
    </Layout>
  );
};

export const Head = () => {
  return (
    <Seo 
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
    />
  )
}

export default VisionMissionPage;
