# JHSOLUTION 홈페이지

JHSOLUTION 공식 홈페이지입니다.

## 기술 스택

- Gatsby 5
- Typescript
- React

## 설치 방법

```shell
$ npm install
$ npm run develop
```



## 변경사항 개발 버전 배포 방법 (dev.jh-solution.net)

```shell
# 개발서버 내 홈페이지 저장소로 이동
$ cd /opt/frontend/company_home

# 최신 변경사항 pull
$ git checkout develop
$ git pull origin develop

# 도커 배포
$ pnpm deploy:dev
```



## 변경사항 상용 배포 방법 (jh-solution.net)


```shell
# 개발서버 내 홈페이지 저장소로 이동
$ cd /opt/frontend/company_home

# 최신 변경사항 pull
$ git checkout main
$ git pull origin main

# 도커 배포
$ pnpm deploy:main
```


## 실행된 도커 컨테이너 현황 확인

```shell
# 실행중인 도커 컨테이너 목록 중 'homepage' 키워드로 검색
$ docker ps | grep 'homepage'


# 전체 도커 컨테이너 목록 중 'homepage' 키워드로 검색 (오류등으로 인해 중지 상태 컨테이너도 포함)
$ docker ps -a | grep 'homepage'


# 도커 로그 확인 (아래 예시의 경우 10줄까지)
$ docker logs -n 10 jhsolution-homepage-main
```

## 연관 링크

- [기획서 FIGMA 링크](https://www.figma.com/design/5D2hsefMZ66sb0XhS4sR2T/JH-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%ED%99%94%EB%A9%B4%EC%84%A4%EA%B3%84?m=auto&t=0H0wqwZPIUQWcKCp-6)
- [디자인 FIGMA 링크](https://www.figma.com/design/aLPMmF7Yc8pft58kRSgrM7/JH-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%94%94%EC%9E%90%EC%9D%B8?m=dev)
