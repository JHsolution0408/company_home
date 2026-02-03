<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's default starter
</h1>

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.com/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI ([install instructions](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/#gatsby-cli)) to create a new site, specifying the default starter.

    ```shell
    # create a new Gatsby site using the default starter
    gatsby new my-default-starter https://github.com/gatsbyjs/gatsby-starter-default
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-default-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries).

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🚀 Quick start (Netlify)

Deploy this starter with one click on [Netlify](https://app.netlify.com/signup):

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a typical Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

1.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

1.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/) for more detail).

1.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

1.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

1.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

1.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

1.  **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/docs/tutorial/getting-started/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[Build, Deploy, and Host On Netlify](https://netlify.com)

The fastest way to combine your favorite tools and APIs to build the fastest sites, stores, and apps for the web. And also the best place to build, deploy, and host your Gatsby sites.

<!-- AUTO-GENERATED-CONTENT:END -->



## 🧪 테스트 가이드 (useSlider 포함)

이 프로젝트에는 Jest + React Testing Library + jsdom 기반의 테스트 환경이 구성되어 있습니다. Gatsby v5/React 18 환경을 고려하여 `gatsby`와 정적 자산 모듈에 대한 목(mock)도 포함되어 있습니다.

### 지원 Node 버전
- Node LTS 18.x 또는 20.x 권장 (Gatsby 5 호환)

### 설치
```bash
npm install
```

### 실행
```bash
npm test
```
- 워치 모드는 기본적으로 비활성화되어 있으며, CI 친화적으로 한 번 실행 후 종료합니다.

### 구성 파일 개요
- `package.json`
  - `scripts.test`: `jest --watchAll=false`
  - devDependencies: `jest`, `babel-jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@babel/preset-env`, `@babel/preset-react`, `identity-obj-proxy` 등
- `jest.config.js`
  - `testEnvironment: 'jsdom'`
  - `setupFilesAfterEnv: ['<rootDir>/test/setupTests.js']`
  - `moduleNameMapper`로 CSS/파일/`gatsby` 모듈을 목 처리
- `babel.config.js`
  - `@babel/preset-env`(Node current), `@babel/preset-react`(automatic runtime)
- `test/setupTests.js`
  - `@testing-library/jest-dom` 등록
  - jsdom 한계 보완: `requestAnimationFrame/cancelAnimationFrame` 폴리필, `getComputedStyle().gap` 모킹
- `test/__mocks__/gatsby.js`
  - `navigate`/`Link` 등 Gatsby API 목
- `test/__mocks__/fileMock.js`
  - 이미지/파일 자산 목

### 포함된 테스트
- `src/hooks/__tests__/useSlider.test.js`
  - 초기 마운트 시 두 번째 세트 시작 지점으로 스크롤 이동(초기 센터링)
  - 스크롤에 따른 현재 인덱스 갱신
  - 양 끝 경계에서의 스크롤 정규화(무한 루프 유지)
  - 마우스 클릭(드래그 아님) 시 `getHrefFromEvent` 경로로 `navigate` 호출
  - 드래그 임계값 초과 시 클릭으로 간주되지 않음(`navigate` 미호출)
  - 터치 탭(짧은 시간/거리) 시 `getHrefFromEvent` 경로로 이동

### 자주 묻는 질문 / 트러블슈팅
- jsdom에서 레이아웃 측정 값(`offsetWidth`, `clientWidth`, `scrollWidth`)이 0으로 나오는 경우가 있어 테스트 내에서 수동 모킹합니다. 이 값이 없으면 슬라이더 stride/setWidth 계산이 진행되지 않으니, 테스트 구성요소에서 적절히 지정해야 합니다.
- 훅 내부에서 `getHrefFromEvent`를 제공하지 않으면 `document.elementFromPoint`를 통해 링크를 추정합니다. 테스트에서는 `getHrefFromEvent`를 제공하여 비결정성을 줄였습니다.
- 실제 브라우저의 스크롤 관성/스냅과 jsdom은 다를 수 있으므로, 테스트는 기능적 계약(인덱스 업데이트, 경계 정규화, 탭-드래그 판정, 네비게이션 호출 유무)에 집중합니다.
- 변경 사항이 반영되지 않을 때는 Gatsby 캐시가 원인일 수 있습니다. 개발 서버를 사용할 때는 `npm run clean && npm run develop`를 고려하세요. 테스트만 실행할 때는 캐시 영향이 없습니다.

### 팁
- 테스트 파일 추가 규칙: `**/__tests__/**/*.(spec|test).[jt]s?(x)` 패턴을 따릅니다.
- CSS Modules는 `identity-obj-proxy`로 목 처리되며, 클래스 이름 비교 대신 DOM 구조/텍스트를 검증하세요.
- Gatsby 전역/모듈이 필요한 경우 `test/__mocks__/gatsby.js`를 확장하여 사용하세요.


### 추가 트러블슈팅: jest-environment-jsdom 오류
- 에러: `Test environment jest-environment-jsdom cannot be found`가 출력되는 경우
  - 원인: Jest 28+부터 `jest-environment-jsdom`이 기본 번들에서 분리되었습니다.
  - 해결: 다음 패키지를 devDependencies로 설치하세요.
    ```bash
    npm i -D jest-environment-jsdom@^29.7.0
    ```
  - 설정 확인: `jest.config.js`에 `testEnvironment: 'jsdom'`이 설정되어 있어야 합니다.
