import * as React from "react";
import Seo from "../../components/seo";
import Layout from "../../components/layout"
import VisionMissionContent from "../../components/template/VisionMissionContent"
import * as styles from "./vision-mission.module.css";

const VisionMissionPage = () => {
  return (
    <Layout
      type={'light'}
      subHeaderTitle={"비전 및 미션"}
      subHeaderDescription={'초거대 AI와 공학의 만남, 지속 가능한 내일을 가장 정밀하게 설계합니다.'}
      subHeaderBgImage="/images/banners/bg_vision.png"
    >
      <VisionMissionContent />
    </Layout>
  );
};

export const Head = () => <Seo title="비전 및 미션" />;

export default VisionMissionPage;
