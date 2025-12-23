import React from 'react';
import * as styles from '../../pages/company/vision-mission.module.css';

export default function VisionMissionContent() {
  return (
    <div className={styles.wrapper}>
      <h1>
        Global Standard in <span style={{ color: '#177D3C' }}>AI-ENGINEERING</span>
      </h1>

      <table style={{ width: '90%', maxWidth: '90vw' }}>
        <tbody>
        <tr>
          <td>
            <img
              src="/images/about/mission-1.png"
              alt="미션 이미지 1"
              style={{
                borderRadius: 20,
                verticalAlign: 'bottom',
                display: 'block',
                marginBottom: 0,
                width: '100%',
                height: '95%'
              }}
            />
          </td>
          <td rowSpan={3}> </td>
          <td>
            <img
              src="/images/about/mission-2.png"
              alt="미션 이미지 2"
              style={{
                borderRadius: 20,
                verticalAlign: 'bottom',
                display: 'block',
                marginBottom: 0,
                width: '100%',
                height: '95%'
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>기술의 한계를 넘는 융합혁신</strong>
          </td>
          <td>
            <strong>데이터로 증명하는 Net-Zero 생태계</strong>
          </td>
        </tr>
        <tr>
          <td style={{ overflow: 'hidden' }}>
            Hyper-scale AI의 연산력에 CFD(수치해석)의 정밀함을 더해, 기존방식으로는 불가능했던 산업 전반의 초정밀 에너지 최적화를 실현합니다.
          </td>
          <td>
            막연한 선언이 아닌, 측정 가능하고 검증된 데이터(MRV)를 기반으로 가장 현실적이고 경제적인 탄소중립 로드맵을 완성합니다.
          </td>
        </tr>
        <tr>
          <td style={{ height: 45 }}> </td>
        </tr>
        </tbody>
      </table>

      <h1>
        고객과 함께하는 동행의 <span style={{ color: '#177D3C' }}>핵심 미션</span>
      </h1>
      <h2>고객과 함께 최적화 여정을 시작하고 성공적으로 완수해 나가겠습니다.</h2>

      <table style={{ width: '90%', maxWidth: '90vw' }}>
        <tbody>
        <tr>
          <td>
            <span style={{ color: '#177D3C', opacity: 0.8, fontSize: 24 }}>Value for Customers</span>
            <img src="/images/about/mission-3.png" alt="미션 3" style={{ float: 'right' }} />
          </td>
          <td rowSpan={3} style={{ width: 35, backgroundColor: '#FDFDFD' }}></td>
          <td>
            <span style={{ color: '#177D3C', opacity: 0.8, fontSize: 24 }}>Value for Society</span>
            <img src="/images/about/mission-4.png" alt="미션 4" style={{ float: 'right' }} />
          </td>
        </tr>
        <tr>
          <td>
            <strong>고객의 성공을 위한 전략적 최적화</strong>
          </td>
          <td>
            <strong>지속 가능한 미래를 위한 기술적 책임</strong>
          </td>
        </tr>
        <tr>
          <td>
            우리 기술은 고개의 이익으로 이어져야 합니다. JHAION 엔진으로 운영 효율을 극대화 하고 에너지 비용과 탄소 배출을 동시에 낮춰 고객의 경쟁력을 수치로 증명합니다.
          </td>
          <td>
            기술의 진보는 환경을 해치지 않아야 합니다. 건물부터 도시, 산업 현장까지 에너지 흐름을 투명하게 시각화 하고 제어하여 다음 세대를 위한 깨끗하고 안전한 환경을 구축하는데 앞장섭니다.
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ height: 125, backgroundColor: '#FDFDFD' }}></td>
        </tr>
        </tbody>
      </table>

      <br />
      <br />
      <h1>
        기술혁신을 이끄는 <span style={{ color: '#177D3C' }}>핵심가치</span>
      </h1>

      AI 기반의 독보적인 기술역량으로 지속 가능한 미래를 선도하는 글로벌 파트너가 되겠습니다.
      <br />
      <br />

      <table style={{ width: '77vw' }}>
        <tbody>
        <tr>
          <td style={{ width: '30%' }}>
            <table
              id="tb1"
              style={{
                backgroundColor: '#F8F9FA',
                border: '1px solid #E0E4E8',
                borderRadius: 16,
                overflow: 'hidden'
              }}
            >
              <tbody>
              <tr>
                <td>
                  <img src="/images/about/mission-5.png" alt="미션 5" />
                </td>
              </tr>
              <tr>
                <td id="td-1">
                  <strong>융합적 전문성</strong>
                </td>
              </tr>
              <tr>
                <td id="td-6">
                  우리는 IT와 공학의 경계를 허뭅니다. AI엔지니어와 도메인 전문가의 협업을 통해, 단순히 데이터를 읽는 것을 넘어 물리적 현상의 원인까지 규명하는 깊이 있는 솔루션을 만듭니다.
                </td>
              </tr>
              </tbody>
            </table>
          </td>
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
            <img src="/images/about/mission_plus.png" alt="플러스" />
          </td>
          <td style={{ width: '30%' }}>
            <table
              id="tb2"
              style={{
                backgroundColor: '#F8F9FA',
                border: '1px solid #E0E4E8',
                borderRadius: 16,
                overflow: 'hidden'
              }}
            >
              <tbody>
              <tr>
                <td style={{ padding: 10 }}>
                  <img src="/images/about/mission-6.png" alt="미션 6" />
                </td>
              </tr>
              <tr>
                <td id="td-1" style={{ paddingLeft: 10 }}>
                  <strong>혁신적 선도성</strong>
                </td>
              </tr>
              <tr>
                <td id="td-8">
                  남들이 가지 않은 길을 두려워 하지 않습니다. 기존 시장에 없던 Hyper-scale AI 기반의 자율운영 모델을 제시하며, 글로벌 에너지 기술 패러다임을 주도합니다.
                </td>
              </tr>
              </tbody>
            </table>
          </td>
          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
            <img src="/images/about/mission_plus.png" alt="플러스" />
          </td>
          <td style={{ width: '30%' }}>
            <table
              id="tb3"
              style={{
                backgroundColor: '#F8F9FA',
                border: '1px solid #E0E4E8',
                borderRadius: 16,
                overflow: 'hidden'
              }}
            >
              <tbody>
              <tr>
                <td>
                  <img src="/images/about/mission-7.png" alt="미션 7" />
                </td>
              </tr>
              <tr>
                <td id="td-1">
                  <strong>검증된 신뢰성</strong>
                </td>
              </tr>
              <tr>
                <td id="td-10">
                  결과는 반드시 증명되어야 합니다. 수많은 시뮬레이션 (Digital Twin)과 실증 사례를 통해 예측의 정확도를 보장하며, 고객에게 약속한 효율을 끝까지 책임집니다.
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ height: 125 }}> </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
