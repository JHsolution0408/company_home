const renderHead = deployEnv => {
  jest.resetModules()
  if (deployEnv) {
    process.env.DEPLOY_ENV = deployEnv
  } else {
    delete process.env.DEPLOY_ENV
  }

  const head = []
  require("../../gatsby-ssr").onRenderBody({
    setHtmlAttributes: () => {},
    setHeadComponents: components => head.push(...components),
  })
  return head.map(c => c.props)
}

const naverContent = metas =>
  metas.find(m => m.name === "naver-site-verification")?.content

const hasNoindex = metas =>
  metas.some(m => m.name === "robots" && m.content.includes("noindex"))

describe("gatsby-ssr onRenderBody", () => {
  const original = process.env.DEPLOY_ENV

  afterEach(() => {
    process.env.DEPLOY_ENV = original
  })

  it("운영 빌드(DEPLOY_ENV=production): 색인 허용 + 운영 네이버 인증코드", () => {
    const metas = renderHead("production")

    expect(hasNoindex(metas)).toBe(false)
    expect(naverContent(metas)).toBe("c2a395993442831aa17d17a5514d87f11efb45b9")
  })

  it("개발 빌드(DEPLOY_ENV=development): noindex + 개발 네이버 인증코드", () => {
    const metas = renderHead("development")

    expect(hasNoindex(metas)).toBe(true)
    expect(naverContent(metas)).toBe("7ce7f4899c6784a48e3158f842c855baeb8eb2ff")
  })

  it("DEPLOY_ENV 누락 시에는 안전하게 개발 빌드로 취급한다", () => {
    const metas = renderHead(null)

    expect(hasNoindex(metas)).toBe(true)
    expect(naverContent(metas)).toBe("7ce7f4899c6784a48e3158f842c855baeb8eb2ff")
  })
})
