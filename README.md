# healthFriend-client

헬스 친구를 찾기 위한 웹 페이지

헬스 친구가 있다면 운동을 더 재밌게 하면서, 건강도 챙기고, 친구까지 만들 수 있습니다

헬스 친구가 나를 잘 찾을 수 있도록, 나에 대한 정보를 입력하고, 친구 찾기를 통해서 헬스 친구를 찾아보세요!

https://healthfriend.club 에서 바로 사용할 수 있습니다

## 소개

- 본 파일은 healthFriend 프로그램의 client 파일입니다.
- local 환경에서 demo 실행을 위해서 https://github.com/codestates/healthFriend-server 서버 파일을 함께 설치해 주세요

## Install

### 1. 코드 복사

```cmd
git clone https://github.com/codestates/healthFriend-client.git
```

### 2. package 설치

```cmd
yarn
```

### 3. src/config/chatkitConfig.tsx 파일 수정

-

## 디렉토리 구조

## local에서 프로그램을 실행시키는 법

1. git clone https://github.com/codestates/doit-server.git 를 하여 파일을 받습니다.
2. 본 파일의 최상위 디렉토리에 .env 파일을 만들고 해당 내용을 입력합니다.
   아래의 YOUR_SECRETNAME, YOUR_PASSWORD를 채워주시면 됩니다.

   COOKIE_SECRET=YOUR_SECRETNAME

   DEV_USERNAME=root
   DEV_PASSWORD=YOUR_PASSWORD
   DEV_DATABASE=doit
   DEV_HOST=127.0.0.1
   DEV_DIALECT=mysql

3. npm i 를 하여 package.json의 module들을 install 합니다.
4. npx sequelize db:create를 터미널에 입력하여 mysql에 db schema를 생성합니다.
5. (option) 본 파일의 seeders 디렉토리에는 기본 test data가 있습니다. 이 data들을 입력하고 싶다면 npx sequelize db:seed:all 을 입력합니다.
6. 실행은 npm run dev를 하면 됩니다.
7. 기존 table의 data를 지우고 싶다면 node utils/resetTables.js 를 입력하면 됩니다.

## 간단 폴더 설명

1. config = 어느 database에 연결할지 설정이 담겨 있습니다.
2. controllers = request가 들어올시 실제 실행되는 함수가 담겨있습니다.
3. models = database의 각 table에 대한 정의가 들어 있습니다.
4. passport = 로그인시 이용할 passport js의 logic이 담겨있습니다.
5. routes = API 요청시 어떤 함수를 실행할지 route가 있습니다.
6. seeders = test data가 있습니다.
7. utils = table을 reset하는 것과 입력 data를 validation하는 파일이 있습니다.
8. index.js = 기본 express 설정 및 middleware 실행이 들어있습니다.
