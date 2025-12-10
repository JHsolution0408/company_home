import React from "react";

export default function JhaionBackground() {
  return (
    <div>
      <div id="intro" style={{position:'relative',top:0,left:0,width:'100vw',height:'auto',margin:0,padding:0,overflow:'hidden',zIndex:1}}>
        <img src="/images/about/jhaionbackgrounds/intro.png" alt="intro" style={{position:'absolute',top:0,left:0,width:'100vw',height:'100%',objectFit:'cover',display:'block',margin:0,padding:0}} />
        <div id="intro-text" style={{position:'absolute',top:0,left:0,width:'100vw',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',pointerEvents:'none'}}>
          <span id="intro-1" style={{color:'#fff',fontSize:48,fontWeight:700,textShadow:'0 2px 8px rgba(0,0,0,0.25)',display:'block'}}>데이터와 물리학의 간극을 메우다</span>
          <span id="intro-2" style={{color:'#fff',fontSize:48,fontWeight:700,textShadow:'0 2px 8px rgba(0,0,0,0.25)',display:'block'}}>JHAION 의 시작</span>
          <span id="intro-3" style={{color:'#fff',fontSize:24,fontWeight:400,textShadow:'0 2px 8px rgba(0,0,0,0.25)',display:'block'}}>기존의 예측방식이 가진 불확실성을 해소하고 탄소중립이라는 시대적 과제에 가장 정밀한 답을 내놓기 위해 탄생했습니다.</span>
          <span id="intro-4" style={{color:'#fff',fontSize:56,fontWeight:300,textShadow:'0 2px 8px rgba(0,0,0,0.25)',display:'block'}}>Journey of Hyper-Scale AI Optimization Net-Zero</span>
        </div>
      </div>
      <div style={{padding:'64px 0 0 0'}}></div>
      <section style={{maxWidth:1100,margin:'0 auto 64px auto',padding:'0 16px'}}>
        <h2 style={{color:'#177D3C',fontSize:24,fontWeight:600,marginBottom:8}}>문제인식 ( The Challenge )</h2>
        <div style={{fontSize:20,fontWeight:400,marginBottom:24}}>&quot;기존의 방식으로는 복잡한 현실을 담을 수 없었습니다.&quot;</div>
        <div style={{fontSize:16,lineHeight:1.7,marginBottom:16}}>
          과거의 에너지 관리는 경험에 의존하거나 단순한 통계 데이터만을 신뢰했습니다.<br/>
          하지만 시시각각 변하는 산업 현장의 변수와 유체흐름(CFD)를 배제한 데이터 분석은 잦은 오차와 비효율을 낳았습니다.<br/>
          우리는 생각했습니다.<br/>
          <b>&quot;보이지 않는 물리적 현상까지 AI가 이해할 수는 없을까?&quot;</b>
        </div>
        <div style={{display:'flex',gap:32,alignItems:'center',justifyContent:'center',margin:'32px 0',flexWrap:'wrap'}}>
          <table style={{width:320,backgroundColor:'#F8F9FA',border:'1px solid #E0E4E8',borderRadius:16,overflow:'hidden'}}>
            <tbody>
              <tr><td><img src="/images/about/jhaionbackgrounds/jbg-3.png" alt="기존기술"/></td></tr>
              <tr><td style={{fontWeight:'bold'}}>기존 기술의 명확한 한계 직면</td></tr>
              <tr><td>기존 CFD 시뮬레이션은 정확했지만, 복잡한 시스템의 최적화와 대규모 자동화에는 시간 및 비용적 제약이 커서 실질적인 활용에 어려움이 있었습니다.</td></tr>
            </tbody>
          </table>
          <img src="/images/about/jhaionbackgrounds/jbg_arrow.png" style={{minHeight:48,maxWidth:48}} alt="arrow"/>
          <table style={{width:320,backgroundColor:'#F8F9FA',border:'1px solid #E0E4E8',borderRadius:16,overflow:'hidden'}}>
            <tbody>
              <tr><td><img src="/images/about/jhaionbackgrounds/jbg-4.png" alt="AI해법"/></td></tr>
              <tr><td style={{fontWeight:'bold'}}>초거대 AI 기반의 새로운 해법 확인</td></tr>
              <tr><td>복잡하고 방대한 비전형 데이터를 처리하고 예측하기 위해, 일반 AI를 뛰어넘는 Hyper-scale AI 도입이 필수적인 해결책이었습니다.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section style={{maxWidth:1100,margin:'0 auto 64px auto',padding:'0 16px'}}>
        <h2 style={{color:'#177D3C',fontSize:24,fontWeight:600,marginBottom:8}}>기술적 해답 ( The Solution )</h2>
        <div style={{fontSize:20,fontWeight:400,marginBottom:24}}>&quot;Hyper-scale AI와 공학(Engineering)의 필연적 만남&quot;</div>
        <div style={{fontSize:16,lineHeight:1.7,marginBottom:16}}>
          JH솔루션은 IT개발자와 공학 박사들이 머리를 맞대고 탄생시킨 결과물입니다.<br/>
          데이터를 빠르게 처리하는 AI의 속도에 물리법칙을 해석하는 공학적 깊이를 융합하여,<br/>
          현실과 오차 없이 동기화되는 초정밀 엔진 <b>JHAION</b>을 개발했습니다.
        </div>
        <div style={{display:'flex',gap:32,alignItems:'center',justifyContent:'center',margin:'32px 0',flexWrap:'wrap'}}>
          <table style={{width:320,backgroundColor:'#F8F9FA',border:'1px solid #E0E4E8',borderRadius:16,overflow:'hidden'}}>
            <tbody>
              <tr><td><img src="/images/about/jhaionbackgrounds/jbg-3.png" alt="AI+시뮬"/></td></tr>
              <tr><td style={{fontWeight:'bold'}}>AI + 시뮬레이션 융합으로 한계 돌파</td></tr>
              <tr><td>AI의 효율과 CFD의 정확함을 결합하여, 단순 예측을 넘어 정확한 시뮬레이션 기반의 초고속 최적 설계 및 자율 운영 시스템을 구현했습니다.</td></tr>
            </tbody>
          </table>
          <img src="/images/about/jhaionbackgrounds/jbg_plus.png" style={{minHeight:48,maxWidth:48}} alt="plus"/>
          <table style={{width:320,backgroundColor:'#F8F9FA',border:'1px solid #E0E4E8',borderRadius:16,overflow:'hidden'}}>
            <tbody>
              <tr><td><img src="/images/about/jhaionbackgrounds/jbg-4.png" alt="AI+플랫폼"/></td></tr>
              <tr><td style={{fontWeight:'bold'}}>AI + 플랫폼으로 산업 현장에 확장</td></tr>
              <tr><td>에너지 효율, 설비 안전, 자율 운영 등 핵심 산업 분야에 JHAION 엔진을 적용하여 정량적 데이터 기반의 효율 극대화를 실현하는 플랫폼을 제공합니다.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section style={{maxWidth:1100,margin:'0 auto 64px auto',padding:'0 16px'}}>
        <h2 style={{color:'#177D3C',fontSize:24,fontWeight:600,marginBottom:8}}>궁극적 목표 ( The Impact )</h2>
        <div style={{fontSize:20,fontWeight:400,marginBottom:24}}>Net-Zero를 향한 가장 확실한 기술 표준</div>
        <div style={{fontSize:16,lineHeight:1.7,marginBottom:16}}>
          우리의 기술 개발은 단순히 효율을 높이는데 그치지 않습니다.<br/>
          기업에게는 최적의 비용절감을, 지구에는 탄소 없는 미래를 선물하는 것.<br/>
          이것이 JHAION이 끊임없이 진화하는 이유입니다.
        </div>
        <img src="/images/about/jhaionbackgrounds/jhaionbackground-5.png" style={{borderRadius:16,maxWidth:'100%',margin:'32px 0'}} alt="impact"/>
      </section>
    </div>
  );
}



