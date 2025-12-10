
import React from "react";
import SubPageHeader from "../../components/subpage-header";
import Footer from "../../components/footer";

const gradientTextStyle = {
  background: 'linear-gradient(90deg, #177D3C 0%, #4be085 50%, #177D3C 100%)',
  backgroundSize: '200% auto',
  color: '#177D3C',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'gradient-move 2.5s linear infinite',
  display: 'block',
};

const gradientKeyframes = `
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
`;

const PAGE_TITLE = "JHAION 개발배경";
const PAGE_DESCRIPTION = "JHAION 개발의 배경과 문제의식, 기술적 해답, 궁극적 목표를 소개합니다.";

export default function JhaionBackground() {
  return (
    <>
      <SubPageHeader siteTitle={PAGE_TITLE} />
      <main style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 0, padding: 0 }}>
        <div style={{ width: '90vw', maxWidth: '90vw', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 0 }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div id="jhaion-background-meta" style={{
              marginBottom: 0,
              backgroundImage: 'url(/images/about/bg_vision.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: "clamp(32px,6vw,60px) 5vw clamp(32px,6vw,60px) 0px",
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}>
              <h1 style={{ color: "#FDFDFD", fontSize: "clamp(2rem,5vw,2.5rem)", fontWeight: 700, marginBottom: "2px", textAlign: 'center', width: '100%', wordBreak: 'keep-all' }}>{PAGE_TITLE}</h1>
              <p style={{ color: "rgba(253, 253, 253, 0.60)", fontSize: "clamp(1rem,3vw,1.25rem)", fontWeight: 600, marginTop: 0, textAlign: 'center', width: '100%', wordBreak: 'keep-all' }}>{PAGE_DESCRIPTION}</p>
            </div>
          </div>
          <style>{gradientKeyframes + `
@media (max-width: 1800px) {
  #jhaion-background-meta { max-width: 100vw !important; }
}
@media (max-width: 900px) {
  #jhaion-background-meta { padding: 32px 2vw 32px 0px !important; }
  #intro-text span { font-size: 1.2rem !important; }
}
@media (max-width: 600px) {
  #jhaion-background-meta { padding: 24px 1vw 24px 0px !important; }
  #intro-text span { font-size: 1rem !important; }
}
`}</style>
          <div id="intro" style={{position:'relative',width:'100vw',height:'auto',margin:0,padding:0,overflow:'hidden',zIndex:1, display:'flex', justifyContent:'center'}}>
            <img src="/images/about/jhaionbackgrounds/intro.png" alt="intro" style={{width:'100vw',height:'auto',objectFit:'cover',display:'block',margin:0,padding:0}} />
            <div id="intro-text" style={{position:'absolute',top:0,left:0,width:'100vw',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',pointerEvents:'none',padding:'0 2vw',boxSizing:'border-box',maxWidth:'100%',margin:'0 auto'}}>
              <span id="intro-1" style={{
                color:'#fff',
                fontSize:'clamp(2rem,6vw,3.5rem)',
                fontWeight:800,
                textShadow:'0 2px 16px rgba(0,0,0,0.35)',
                display:'block',
                marginBottom:24,
                letterSpacing:'-1px',
                textAlign:'center',
                alignSelf:'center',
                width:'100%',
                wordBreak:'keep-all',
                maxWidth:'100%',
              }}>
                &ldquo; 데이터와 물리학의 간극을 메우다 &rdquo;
              </span>
              <span id="intro-2" style={{
                ...gradientTextStyle,
                fontSize:'clamp(1.5rem,5vw,2.75rem)',
                fontWeight:800,
                textShadow:'0 2px 8px rgba(0,0,0,0.18)',
                marginBottom:24,
                letterSpacing:'-1px',
                textAlign:'center',
                display:'block',
                alignSelf:'center',
                width:'100%',
                wordBreak:'keep-all',
                maxWidth:'100%',
              }}>
                JHAION의 시작
              </span>
              <span id="intro-3" style={{
                color:'#fff',
                fontSize:'clamp(1rem,3vw,1.5rem)',
                fontWeight:400,
                textShadow:'0 2px 8px rgba(0,0,0,0.18)',
                display:'block',
                lineHeight:2.1,
                marginBottom:36,
                textAlign:'center',
                alignSelf:'center',
                width:'100%',
                wordBreak:'keep-all',
                maxWidth:'100%',
              }}>
                기존의 예측 방식이 가진 불확실성을 해결하고, 탄소 중립이라는 시대적 과제에 가장 정밀한 답을 내놓기 위해 탄생했습니다.
              </span>
              <span id="intro-4" style={{
                fontSize:'clamp(1.5rem,6vw,3.75rem)',
                fontWeight:300,
                textShadow:'0 2px 8px rgba(0,0,0,0.18)',
                display:'block',
                lineHeight:1.2,
                letterSpacing:'-2px',
                textAlign:'center',
                alignSelf:'center',
                width:'100%',
                wordBreak:'keep-all',
                maxWidth:'100%',
              }}>
                <span style={{color:'#66E695'}}>J</span>
                <span style={{color:'#4A4F55'}}>ourney of Hyper-Scale </span>
                <span style={{color:'#66E695'}}>AI</span>
                <span style={{color:'#4A4F55'}}> Optimizati</span>
                <span style={{color:'#66E695'}}>O</span>
                <span style={{color:'#4A4F55'}}>n Net-</span>
                <span style={{color:'#66E695'}}>N</span>
                <span style={{color:'#4A4F55'}}>et-Zero</span>
              </span>
            </div>
          </div>
          <div style={{maxWidth: 1800, margin: '0', padding: '40px 0 40px 50px', textAlign: 'left'}}>
            {/* 문제 인식 영역 */}
            <div style={{marginBottom: 32}}>
              <h2 style={{fontSize: 24, fontWeight: 500, marginBottom: 18, color: '#177D3C'}}>문제 인식 (The Challenge)</h2>
              <div style={{lineHeight: 2, margin: 0}}>
                <div style={{fontSize:48, fontWeight:600, marginBottom:18, color:'#17181B'}}>&quot;기존의 방식으로는 복잡한 현실을 담을 수 없었습니다.&quot;</div>
                <div style={{fontSize:20, fontWeight:500, color:'#2E3236', marginBottom:2}}>
                  과거의 에너지 관리는 경험에 의해 의존 하거나 단순한 통계 데이터만을 신뢰했습니다.
                </div>
                <div style={{fontSize:20, fontWeight:500, color:'#2E3236', marginBottom:2}}>
                  하지만 시시각각 변하는 산업 현장의 변수와 유체흐름(CFD)을 배제한 데이터 분석은 잦은 오차와 비효율을 낳았습니다.
                </div>
                <div style={{fontSize:20, fontWeight:500, color:'#2E3236'}}>
                  우리는 생각했습니다. <span style={{fontStyle:'italic'}}>&quot;보이지 않는 물리적 현상까지 AI가 이해할 수는 없을까?&quot;</span>
                </div>
              </div>
            </div>
            {/* 카드 2개 + 화살표 row (높이 맞춤) */}
            <div style={{display: 'flex', flexDirection: 'row', gap: '32px', justifyContent: 'center', alignItems: 'stretch', margin: '40px 0 56px 0'}}>
              <div style={{
                background: `#fff url('/images/about/jhaionbackgrounds/challenge_bg1.png') right bottom/cover no-repeat`,
                borderRadius: '24px',
                boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)',
                padding: '16px 36px 40px 36px',
                border: '1px solid #E6ECE7',
                minHeight: '320px',
                height: '100%',
                width: '780px',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}>
                <div style={{color: '#177D3C', fontWeight: 600, opacity: 0.4, fontSize: 24, marginBottom: 10, marginTop: 0}}>Technical Problem</div>
                <div style={{fontSize: 28, fontWeight: 700, color: '#17181B', marginBottom: 18, lineHeight: 1.2}}>기존 기술의 명확한 한계 직면</div>
                <div style={{fontSize: 20, fontWeight: 400, color: '#5B5F62', lineHeight: 1.5}}>
                  기존 CFD 시뮬레이션은 정확했지만, 복잡한 시스템의 최적화와 대규모 자동화에는 시간 및 비용적 제약이 커서 실질적인 활용에 어려움이 있었습니다.
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src="/images/about/jhaionbackgrounds/jbg_arrow.png" alt="arrow" style={{width: 52, height: 52, alignSelf: 'center'}} />
              </div>
              <div style={{
                background: `#fff url('/images/about/jhaionbackgrounds/challenge_bg2.png') right bottom/cover no-repeat`,
                borderRadius: '24px',
                boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)',
                padding: '16px 36px 40px 36px',
                border: '1px solid #E6ECE7',
                minHeight: '320px',
                height: '100%',
                width: '780px',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}>
                <div style={{color: '#177D3C', fontWeight: 600, opacity: 0.4, fontSize: 24, marginBottom: 10, marginTop: 0}}>New Solution</div>
                <div style={{fontSize: 28, fontWeight: 700, color: '#17181B', marginBottom: 18, lineHeight: 1.2}}>초거대 AI 기반의 새로운 해법 확인</div>
                <div style={{fontSize: 20, fontWeight: 400, color: '#5B5F62', lineHeight: 1.5}}>
                  복잡하고 방대한 비선형 데이터를 처리하고 예측하기 위해, 일반 AI를 뛰어 넘는 Hyper-Scale AI 도입이 필수적인 해결책이었습니다.
                </div>
              </div>
            </div>
            {/* 기술적 해답 영역 */}
              <div style={{marginBottom: 32}}>
              <h2 style={{fontSize: 24, fontWeight: 500, marginBottom: 18, color: '#177D3C'}}>기술적 해답 (The Solution)</h2>
              <div style={{lineHeight: 2, margin: 0}}>
                <div style={{fontSize:48, fontWeight:600, marginBottom:18, color:'#17181B'}}>&quot;Hyper-scale AI와 공학(Engineering)의 필연적 만남&quot;</div>
                <div style={{fontSize:20, fontWeight:500, color:'#2E3236', marginBottom:2}}>
                  JH솔루션은 IT개발자와 공학 박사들이 머리를 맞대고 탄생시킨 결과물입니다.
                </div>
                <div style={{fontSize:20, fontWeight:500, color:'#2E3236', marginBottom:2}}>
                  데이터를 빠르게 처리하는 AI의 속도에 물리법칙을 해석하는 공학적 깊이를 융합하여, 현실과 오차 없이 동기화되는 초정밀 엔진 <b>'JHAION'</b>을 개발했습니다.
                </div>
              </div>
            </div>
          <div style={{display: 'flex', flexDirection: 'row', gap: '32px', justifyContent: 'center', alignItems: 'stretch', margin: '40px 0 56px 0'}}>
              <div style={{
                background: `#fff  right bottom/cover no-repeat`,
                borderRadius: '24px',
                boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)',
                padding: '16px 36px 40px 36px',
                border: '1px solid #E6ECE7',
                minHeight: '320px',
                height: '100%',
                width: '780px',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}>
                <div><img src="/images/about/jhaionbackgrounds/jbg-3.png" /></div>
                <div style={{fontSize: 28, fontWeight: 700, color: '#17181B', marginBottom: 18, lineHeight: 1.2}}>AI + 시뮬레이션 융합으로 한계돌파</div>
                <div style={{fontSize: 20, fontWeight: 400, color: '#5B5F62', lineHeight: 1.5}}>
                  AI의 효율과 CFD의 정확함을 결합하여, 단순 예측을 넘어 정확한 시뮬레이션 기반의 초고속 최적 설계 및 자율 운영 시스템을 구현했습니다. 
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src="/images/about/jhaionbackgrounds/jbg_plus.png" alt="arrow" style={{width: 52, height: 52, alignSelf: 'center'}} />
              </div>
              <div style={{
                background: `#fff right bottom/cover no-repeat`,
                borderRadius: '24px',
                boxShadow: '0 2px 12px 0 rgba(23,125,60,0.06)',
                padding: '16px 36px 40px 36px',
                border: '1px solid #E6ECE7',
                minHeight: '320px',
                height: '100%',
                width: '780px',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}>
                <div><img src="/images/about/jhaionbackgrounds/jbg-4.png" /></div>
                <div style={{fontSize: 28, fontWeight: 700, color: '#17181B', marginBottom: 18, lineHeight: 1.2}}>AI + 플랫폼으로 산업 현장에 확장 </div>
                <div style={{fontSize: 20, fontWeight: 400, color: '#5B5F62', lineHeight: 1.5}}>
                  에너지 효율, 설비 안전, 자율 운영 등 핵심 산업 분야에 JHAION 엔진을 적용하여 정량적 데이터 기반의 효율 극대화를 실현하는 플랫폼을 제공합니다.
                </div>
              </div>
            </div>
          {/* 궁극적 목표 영역 */}
            <div style={{marginBottom: 32}}>
              <h2 style={{fontSize: 24, fontWeight: 500, marginBottom: 18, color: '#177D3C'}}>궁극적 목표 (The Impact)</h2>
              <div style={{lineHeight: 2, margin: 0}}>
                <div style={{fontSize:48, fontWeight:600, marginBottom:18, color:'#17181B'}}>&quot;Net-Zero를 향한 가장 확실한 기술 표준&quot;</div>
                <div style={{fontSize:20, fontWeight:500, color:'#2E3236', marginBottom:2}}>우리의 기술 개발은 단순히 효율을 높이는 데 그치지 않습니다.
                </div>
                <div style={{fontSize:20, fontWeight:500, color:'#2E3236', marginBottom:2}}>
                  기업에게는 최적의 비용 절감을, 지구에게는 탄소없는 미래를 선물하는 것. 이것이 JHAION이 끊임없이 진화하는 이유입니다.
                </div>
              </div>
              <div style={{overflow: 'hidden', borderRadius: '24px'}}>
                {/* 이미지 영역을 디자인처럼 크게, div와 img 모두 borderRadius 적용 */}
                <div style={{width: '100%', maxWidth: '1720px', height: '340px', margin: '32px auto 0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 2px 12px 0 rgba(23,125,60,0.10)'}}>
                  <img src="/images/about/jhaionbackgrounds/jbg-5.png" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
