import * as React from "react"
import SubPageHeader from "../../components/subpage-header"
import Seo from "../../components/seo"
import Footer from "../../components/footer"

const PartnersPage = () => (
  <>
    <SubPageHeader />
    <main style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
      <div style={{ width: '90vw', maxWidth: '90vw', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 0 }}>
        <div style={{ marginBottom: "32px", backgroundImage: 'url(/images/about/bg_vision.png)', backgroundSize: 'cover', backgroundPosition: 'center', padding: "60px 20px 60px 50px", width: '100%' }}>
          <h1>협력 네트워크</h1>
          <p>혁신적인 기술 가치 창출을 위한 협력 네트워크를 구축했습니다.</p>
        </div>
        <div style={{ width: '100%', textAlign: 'left' }}>
          <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#17181B", marginBottom: "16px", fontSize: "40px", fontWeight: 700 }}>
            혁신 시너지를 창출하는 <span style={{color: '#177D3C'}}>협력 철학</span>
          </h2>
          <p style={{ color: "#2E3236", fontSize: "20px", lineHeight: "1.8", marginBottom: "24px" }}>
            단독이 아닌 파트너들과 함께 기술적 시너지를 창출하여 시장의 혁신을 주도하겠습니다.
          </p>
          <div style={{display: 'flex', gap: '32px', marginBottom: '40px', width: '100vw', maxWidth: '100vw', justifyContent: 'center', alignItems: 'stretch', marginLeft: 0, marginRight: 0, padding: '0 0 0 50px'}}>
            <div style={{flex: 1, flexBasis: 0, background: '#fff', borderRadius: '32px', boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <img src="/images/partners/partner1.png" alt="파트너1" style={{borderRadius: '32px', marginBottom: '18px', display: 'block'}} />
              <div style={{fontSize: 24, fontWeight: 500, color: '#17181B', marginBottom: 12}}>AI 생태계 확장을 위한 공동의 목표</div>
              <div style={{fontSize: 18, fontWeight: 400, color: '#757B82', lineHeight: 1.7}}>
                JHAION 엔진은 학계, 산업계, 플랫폼 전문가와의 유기적인 협력을 통해 완성됩니다. 우리는 함께 기술적 한계를 극복하고 고객에게 최적의 솔루션을 제공하는 것을 공동의 목표로 삼습니다.
              </div>
            </div>
            <div style={{flex: 1, flexBasis: 0, background: '#fff', borderRadius: '32px', boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <img src="/images/partners/partner2.png" alt="파트너2" style={{borderRadius: '32px', marginBottom: '18px', display: 'block'}} />
              <div style={{fontSize: 24, fontWeight: 500, color: '#17181B', marginBottom: 12}}>데이터로 증명하는 Net-Zero 생태계</div>
              <div style={{fontSize: 18, fontWeight: 400, color: '#757B82', lineHeight: 1.7}}>
                측정 가능하고 검증된 데이터(MRV)를 기반으로 가장 현실적이고 경제적인 탄소중립 로드맵을 완성합니다.
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#17181B", marginBottom: "16px", fontSize: "40px", fontWeight: 700 }}>
            JHAION의 분야별 <span style={{color: '#177D3C'}}>네트워크 구성</span>
          </h2>
          <p style={{ color: "#2E3236", fontSize: "20px", lineHeight: "1.8", marginBottom: "24px" }}>
            핵심 기술력 확보와 산업 적용 확대를 위해 입체적인 파트너쉽을 구축했습니다.
          </p>
          <div style={{display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '40px', width: '100vw', maxWidth: '100vw', justifyContent: 'center', marginLeft: 0, marginRight: 0, padding: '0 0 0 50px'}}>
            <div style={{flex: 1, flexBasis: 0, width: '500px', background: '#F8F9FA', borderRadius: '32px', border: '1.5px solid #E0E4E8', boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)', padding: '32px', minWidth: '220px', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <img src="/images/partners/network_icon1.png" alt="기술 파트너" style={{width: '40.58px', height: '40.58px', borderRadius: '16px', marginBottom: '18px', objectFit: 'cover', display: 'block', alignSelf: 'flex-start'}} />
              <div style={{fontSize: 24, fontWeight: 500, color: '#17181B', marginBottom: 12}}>기술 파트너</div>
              <div style={{fontSize: 20, fontWeight: 400, color: '#757B82', lineHeight: 1.7}}>
                Hyper-Scale AI 기술 플랫폼을 주요 IT 기업 · 연구소와 공동 연구하며 기술의 깊이와 속도를 높이고 있습니다
              </div>
            </div>
            <img src="/images/partners/network_icon_plus.png" alt="plus" style={{width: '48px', height: '48px', margin: '0 8px'}} />
            <div style={{flex: 1, flexBasis: 0, width: '500px', background: '#F8F9FA', borderRadius: '32px', border: '1.5px solid #E0E4E8', boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)', padding: '32px', minWidth: '220px', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <img src="/images/partners/network_icon2.png" alt="산업 적용 파트너" style={{width: '40.58px', height: '40.58px', borderRadius: '16px', marginBottom: '18px', objectFit: 'cover', display: 'block', alignSelf: 'flex-start'}} />
              <div style={{fontSize: 24, fontWeight: 500, color: '#17181B', marginBottom: 12}}>산업 적용 파트너</div>
              <div style={{fontSize: 20, fontWeight: 400, color: '#757B82', lineHeight: 1.7}}>
                AI 플랫폼(에너지,설비, 안전, 자율 운영)적용을 위해 주요 고객사, 엔지니어링 파트너와 협력하고 있습니다.
              </div>
            </div>
            <img src="/images/partners/network_icon_plus.png" alt="plus" style={{width: '48px', height: '48px', margin: '0 8px'}} />
            <div style={{flex: 1, flexBasis: 0, width: '500px', background: '#F8F9FA', borderRadius: '32px', border: '1.5px solid #E0E4E8', boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)', padding: '32px', minWidth: '220px', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <img src="/images/partners/network_icon3.png" alt="학술/연구 파트너" style={{width: '40.58px', height: '40.58px', borderRadius: '16px', marginBottom: '18px', objectFit: 'cover', display: 'block', alignSelf: 'flex-start'}} />
              <div style={{fontSize: 24, fontWeight: 500, color: '#17181B', marginBottom: 12}}>학술/연구 파트너</div>
              <div style={{fontSize: 20, fontWeight: 400, color: '#757B82', lineHeight: 1.7}}>
                AI-CFD 최신 이론과 기술 검증을 위해 국내외 대학 및 연구 기관과 협력하고 있습니다.
              </div>
            </div>
          </div>
        </section>

      </div>
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </>
)

export const Head = () => <Seo title="협력 네트워크" />

export default PartnersPage
