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

- https://pusher.com/chatkit에 가입하여 chatkit instance 생성
- src/config/chatkitConfig.tsx 생성하여
  export const CHATKIT_INSTANCE_LOCATOR = '내 instance locator'
  export const CHATKIT_SECRET_KEY = '내 Secret Key'
  기입

### 4. 실행

```cmd
yarn start
```

## 디렉토리 구조

-- src/
| |-- components/
| | |-------- Cards/ - Cards page 구성 component
| | |-------- Chat/ - Chat page 구성 component
| | |-------- FindFriend/ - FindFriend page 구성 component
| | |-------- Footer/ - Footer 구성 component
| | |-------- Header/ - Header 구성 component
| | |-------- Home/ - Home page 구성 component
| | |-------- Login/ - Login page 구성 component
| | |-------- Register/ - Register page 구성 component
| | |-------- Shared/ - 공통적으로 쓰이는 component
| |-- config/
| | |-------- chatkitConfig.tsx - chatkit secret, API key
| | |-------- Message.tsx - 긴 문구들 저장
| | |-------- questions.tsx - 질문, 답변들 목록
| |
| |-- css/
| | |-------- Chat - Chat 화면 구성 CSS
| | |-------- imageInput.css - image upload input css
| | |-------- selectPlaces.css - 장소 select tree css
| |
| |-- graphql/
| | |-------- apollo.tsx - apollo client 설정
| | |-------- queries.tsx - query 모음
| | |-------- fragments.tsx - fragments 모음
| | |-------- resolvers.tsx - resolvers 모음
| |
| |-- hooks/
| | |-------- Mypage/ - Mypage page 사용 custom hooks
| | |-------- Home/ - Home page 사용 custom hooks
| | |-------- Register/ - Register page 사용 custom hooks
| | |-------- Shared/ - 여러 page 사용 custom hooks
| |
| |--- routes/
| | |-------- Cards/ - Cards page layout
| | |-------- Chat/ - Chat page layout
| | |-------- FindFriend/ - FindFriend page layout
| | |-------- Home/ - Home page layout
| | |-------- Login/ - Login page layout
| | |-------- Mypage/ - Mypage page layout
| | |-------- Register/ - Register page layout
| | |-------- NotFound/ - NotFound page layout
| |
| |--- utils/
| | |-------- Chat/ - Cards page 쓰이는 함수
| | |-------- Shared/
| | | |------------ UserCard/ - User card에서 쓰이는 함수
| | | |------------ redirectWhenError.ts - error시 redirect 함수
| |
| |--- App.tsx - 메인 타입스크립트
| |--- index.tsx - 어플리케이션 엔트리 포인트
|

## tech stack

- Typescript
- React hook
- GraphQL w/ Apollo client (v2.6)

## LICENSE

MIT
