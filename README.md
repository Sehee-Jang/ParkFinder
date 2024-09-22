# Park Finder
![image](https://github.com/user-attachments/assets/8b6eeca3-41f6-4816-92bc-ffb7641e68de)

# 배포 링크 
https://naver.com/

## 📖 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [팀소개](#팀소개)
3. [프로젝트 계기](#프로젝트-계기)
4. [주요기능](#주요기능)
5. [개발기간](#개발기간)
6. [기술스택](#기술스택)
7. [서비스 구조](#서비스-구조)
8. [와이어프레임](#와이어프레임)
9. [API 명세서](#API-명세서)
10. [ERD](#ERD)
11. [프로젝트 파일 구조](#프로젝트-파일-구조) 
12. [Trouble Shooting](#trouble-shooting) - 후기 
    
## 👨‍🏫 프로젝트 소개
주차장을 빠르고, 정확하게 찾을 수 있는 Service - Park Finder

## 팀소개
조아영 - https://github.com/ayoung-j](https://github.com/ayoung-j)
노용철 - https://github.com/RYC0208
장세희 - https://github.com/Sehee-Jang
최지민 - http://github.com/jigong2024
홍승우 - https://github.com/FujiiKaze97


## 프로젝트 계기
카카오 API를 활용하여, 사용자의 현재 위치정보를 토대로 주변 주차장의 정보를 빠르고 정확하게 찾을 수 있는 서비스.


## 💜 주요기능
1. 




## ⏲️ 개발기간
- 2024.09.12(목) ~ 2024.09.23(월)

## 📚️ 기술스택

### ✔️ Language
Javascript, Jsx


### ✔️ Version Control
Git


### ✔️ IDE
Vscode


### ✔️ Framework
React


### ✔️ Deploy
Vercel , Github io using my domain? 


### ✔️  DBMS
json-server(db.json) - 댓글 , 즐겨찾기 Feature에서 사용 중 


## 서비스 구조



## 와이어프레임
![image](https://github.com/user-attachments/assets/8238b91c-d199-47f1-b0eb-b11d35ee850a)
![image](https://github.com/user-attachments/assets/be62e9c1-7e58-4bcb-b7ac-dc0c74ae32ab)
![image](https://github.com/user-attachments/assets/91b07d77-f0d2-4a6d-a068-2c1f45eed93a)
![image](https://github.com/user-attachments/assets/663913f7-d12a-42ee-9a5f-00cffd315bdb)

## API 명세서
서버 API_URL : https://moneyfulpublicpolicy.co.kr/

-회원가입
Request
Method → POST
URL PATH →  /register
Body ⬇️​
JSON
{
    "id": "유저 아이디",
		"password": "유저 비밀번호",
		"nickname": "유저 닉네임"
}
​
Response
{
  "message": "회원가입 완료",
  "success": true
}


-로그인 
Request
Method → POST
URL PATH →  /login
Body ⬇️​
JSON
{
  "id":"유저 아이디",
  "password": "유저 비밀번호"
}
​
Query string ⬇️ (선택)
accessToken 유효시간 조정을 위한 query string
/login?expiresIn=10m

// 유효시간을 10분인 accessToken 요청
​
Response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiY2FiYyIsImlhdCI6MTcwMDgxNDQyMCwiZXhwIjoxNzAwODE4MDIwfQ.8hWOHHEzDPzumnqCU7jyoi3zFhr-HNZvC7_pzBfOeuU",
  "userId": "유저 아이디",
  "success": true,
  "avatar": "프로필 이미지",
  "nickname": "유저 닉네임"
}

-회원정보 확인
Request
Method → GET
URL PATH →  /user
Header ⬇️​
{
	"Authorization": "Bearer AccessToken"
}
​
Response
{
  "id": "사용자 아이디",
  "nickname": "사용자 닉네임",
  "avatar": null,
  "success": true
}

-프로필 변경
Request
Method → PATCH
URL PATH →  /profile
Header ⬇️​
{
	"Authorization": "Bearer AccessToken"
}
​
Body ⬇️​
FORM
{
	"avatar": [이미지파일],
	"nickname": "변경할 닉네임"
}
​
Response
{
  "avatar": "변경된 이미지 URL",
  "nickname": "변경된 닉네임",
  "message": "프로필이 업데이트되었습니다.",
  "success": true
}

-comment Api
서버 API_URL : https://moneyfulpublicpolicy.co.kr/

-댓글 확인
Request
Method → GET
URL PATH

-댓글 추가
Request
Method → POST
URL PATH / comment + createdAt: new Date().toISOString()

-댓글 삭제
Method → DELETE
URL PATH + ${id}

-댓글 수정
Method → PATCH
URL PATH + ${id}
text(변경할 댓글),
createdAt: new Date().toISOString()




## 프로젝트 파일 구조
📦src
 ┣ 📂assets
 ┃ ┣ 📜back-btn.png
 ┃ ┣ 📜bookmark-off.png
 ┃ ┣ 📜bookmark-on.png
 ┃ ┣ 📜down.png
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜github-mark.png
 ┃ ┣ 📜github.svg
 ┃ ┣ 📜logo.png
 ┃ ┣ 📜next.png
 ┃ ┣ 📜no-image.png
 ┃ ┣ 📜prev.png
 ┃ ┣ 📜react.svg
 ┃ ┣ 📜up.png
 ┃ ┗ 📜velog.svg
 ┣ 📂context
 ┃ ┗ 📜UserConext.jsx
 ┣ 📂layout
 ┃ ┣ 📂footer
 ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┗ 📜FooterStyle.js
 ┃ ┣ 📂header
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┗ 📜HeaderStyle.js
 ┃ ┗ 📜Layout.jsx
 ┣ 📂pages
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Form
 ┃ ┃ ┃ ┣ 📜Form.jsx
 ┃ ┃ ┃ ┗ 📜FormStyle.js
 ┃ ┃ ┗ 📜TuiEditor.jsx
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┣ 📜CommentItem.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Comments.jsx
 ┃ ┃ ┃ ┃ ┣ 📜CommentsStyle.js
 ┃ ┃ ┃ ┃ ┗ 📜CommentUpdateForm.jsx
 ┃ ┃ ┃ ┗ 📜getPost.js
 ┃ ┃ ┣ 📂context
 ┃ ┃ ┃ ┗ 📜CommentContext.jsx
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┗ 📜useComments.js
 ┃ ┃ ┣ 📂modify
 ┃ ┃ ┃ ┣ 📜Modify.jsx
 ┃ ┃ ┃ ┗ 📜ModifyStyle.js
 ┃ ┃ ┣ 📜Detail.jsx
 ┃ ┃ ┗ 📜DetailStyle.js
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜LoginInput.jsx
 ┃ ┃ ┃ ┗ 📜LoginInputStyle.js
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┗ 📜LoginStyle.js
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜Main.jsx
 ┃ ┃ ┗ 📜MainStyle.js
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┣ 📜BookMark.jsx
 ┃ ┃ ┃ ┗ 📜MyBoard.jsx
 ┃ ┃ ┣ 📂mymodify
 ┃ ┃ ┃ ┣ 📜Mymodify.jsx
 ┃ ┃ ┃ ┗ 📜MymodifyStyle.js
 ┃ ┃ ┣ 📜Mypage.jsx
 ┃ ┃ ┗ 📜MypageStyle.js
 ┃ ┣ 📂signup
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜SignupInput.jsx
 ┃ ┃ ┃ ┗ 📜SignupInputStyle.js
 ┃ ┃ ┣ 📜Signup.jsx
 ┃ ┃ ┗ 📜SignupStyle.js
 ┃ ┗ 📂write
 ┃ ┃ ┣ 📜Write.jsx
 ┃ ┃ ┗ 📜WriteStyle.js
 ┣ 📂shared
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📜PrivateRoute.jsx
 ┃ ┗ 📜Router.jsx
 ┣ 📂supabase
 ┃ ┗ 📜supabase.js
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜main.jsx
 ┗ 📜reset.css


## Trouble Shooting
### 1. 프로필 기능 구현 시 프로젝트 환경에 따라 진행이 어려운 문제.
당초 프로필 기능을 구현하려 하니, 우선 json-server와 캠프에서 제공해주는 api로는 
온전한 이미지 파일 저장이 어려운 상황 -> base64로 인코딩을 하면 이미지 파일의 길이가 가변적으로 매우 늘어남
-> 렌더링 이슈, 속도 저하 이슈가 나올 수도 있기에, 가능하면 닉네임 수정만 구현하는 방향에서 프로필 수정은 완료하라 라는 피드백
-> 허나 마이 페이지에서 프로필 사진 수정이 없다면, 대부분에 웹 사이트에서 프로필 수정 시에는 이미지 수정이 대부분 존재하기에 아쉬운 상황
-> 같은 상황에서, 프로필 구현을 사용자 api에 존재하는 avatar를 통해 파일을 base64형식이나 url 방식으로 전달한 것이 아닌 ,파일 형식 그대로 전송하고, 
불러올 때만 url 형식으로 불러오면 된다는 케이스를 트러블슈팅 중 확인하여 , 해당 사항 반영 후 완료



## Project Remind  & 프로젝트 소감 
### 조아영


### 노용철


### 김세희 


### 최지민 


### 홍승우
팀원 간 서로 존중하고 ,의견 충돌없이 대부분의 방향성에서 부드럽게 흘러갔던 프로젝트였습니다. 
전달 사항이 있을 때마다, Slack, 구두를 통한 커뮤니케이션을 통해, 각자 맡은 역할을 , 필수 구현 사항에 맞게 적절히 구현 할 수 있는 구현 시간 내에서 잘 구현했다고 생각합니다.
아쉬운 점으로는 Git PR에 대한 comment나 코드 리뷰를 제대로 활용하지는 못하였기에, 추후 시간이 된다면 이를 활용할 수 있었으면 좋겠다는 생각도 듭니다. 




