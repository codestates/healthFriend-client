# healthFriend-client

헬스 친구를 찾기 위한 웹 페이지

헬스 친구가 있다면 운동을 더 재밌게 하면서, 건강도 챙기고, 친구까지 만들 수 있습니다

헬스 친구가 나를 잘 찾을 수 있도록, 나에 대한 정보를 입력하고, 친구 찾기를 통해서 헬스 친구를 찾아보세요!

https://healthfriend.club 에서 바로 사용할 수 있습니다

## 소개

- 본 파일은 healthFriend 프로그램의 client 파일입니다.
- local 환경에서 demo 실행을 위해서 https://github.com/codestates/healthFriend-server 서버 파일을 함께 설치해 주세요

## 사용법

### 1. 코드 복사

```cmd
git clone https://github.com/codestates/healthFriend-client.git
```

### 2. package 설치

```cmd
yarn
```

### 3. src/config/chatkitConfig.tsx 파일 생성

- https://pusher.com/chatkit에 가입하여 chatkit instance를 만든 후
  export const CHATKIT_INSTANCE_LOCATOR = '내 instance locator'
  export const CHATKIT_SECRET_KEY = '내 Secret Key'
  기입하여 파일 생성

### 4. 실행

## 디렉토리 구조

## tech stack

- Typescript
- React hook
- GraphQL w/ Apollo client (v2.6)

## LICENSE

MIT
