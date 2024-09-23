# Park Finder

![image](https://github.com/user-attachments/assets/8b6eeca3-41f6-4816-92bc-ffb7641e68de)

## 🔗 배포 링크

https://parkfinder.fujiikaze.kr/<br/>
<br/>

## 📖 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [팀소개](#-팀소개)
3. [프로젝트 목적](#-프로젝트-목적)
4. [주요기능](#-주요기능)
5. [개발기간](#%EF%B8%8F-개발기간)
6. [기술스택](#%EF%B8%8F-기술스택)
7. [서비스 구조](#-서비스-구조)
8. [와이어프레임](#-와이어프레임)
9. [API 명세서](#-api-명세서)
10. [프로젝트 파일 구조](#-프로젝트-파일-구조)
11. [Trouble Shooting](#-trouble-shooting)
12. [Project Remind & 프로젝트 소감](#-project-remind--프로젝트-소감)
    <br/>

## 👨‍🏫 프로젝트 소개

**"Park Finder" - 주차장을 빠르고 정확하게 찾을 수 있는 웹 서비스**<br/>
도심 지역에서 주차 문제는 점점 더 심화되고 있고, 이에 따라 주차장을 손쉽게 찾을 수 있는 서비스에 대한 필요성이 증가하고 있습니다.<br/>
기존의 지도 서비스는 주차장 정보가 부족하거나 사용자 경험이 불편한 경우가 많았기 때문에, 이를 개선하고자 "Park Finder"를 개발하게 되었습니다.<br/>
<br/>

## 👨‍👩‍👧‍👦 팀소개

조아영 - https://github.com/ayoung-j<br/>
노용철 - https://github.com/RYC0208<br/>
장세희 - https://github.com/Sehee-Jang<br/>
최지민 - http://github.com/jigong2024<br/>
홍승우 - https://github.com/FujiiKaze97<br/>
<br/>

## 💡 프로젝트 목적

카카오 API를 활용하여 사용자에게 가장 가까운 주차장을 실시간으로 제공하고, 지도 상에 정확한 위치를 표시하여 사용자 편의를 극대화하는 것을 목표로 합니다.<br/>
빠른 검색 속도와 직관적인 UI, 최신 주차장 정보 제공을 통해 기존 지도 서비스와 차별화된 경험을 제공합니다.<br/>
이를 통해 사용자는 실시간 위치 기반으로 주차장을 쉽게 검색하고 정보를 확인할 수 있습니다.<br/>
<br/>

## 💜 주요기능

### 메인화면

![메인화면](https://github.com/user-attachments/assets/9d750d6d-c63d-459d-a55d-fe70a823bedb)

### 주차장 상세 조회

![주차장 상세 조회](https://github.com/user-attachments/assets/e5da9f0b-eae6-4c31-919d-e7f909338d3e)

### 주차장 검색

![주차장 검색](https://github.com/user-attachments/assets/e73a18a9-743b-4ee5-b3aa-d6eff3a0a415)

```jsx
useEffect(() => {
  if (!map || !location.center) return;
  setOpenMarkerId(null);
  searchPlaces(location.center, currentPage); // 검색 실행
}, [map, searchValue, currentPage, location.center]); // searchValue(map, location.center, currentPage)가 변경되면, searchPlaces 함수를 호출하여 검색

// 검색하기
const handleSearch = (e) => {
  e.preventDefault();
  setSearchValue(keyword); // 최종적으로 입력된 검색어를 설정
  setIsSidebarDetailOpen(false); // 검색 시 사이드바 상세 정보 닫기
  return false;
};

// 폼 제출 시 searchValue에 최종 입력된 keyword 전달
<form onSubmit={handleSearch}>
  <div className="search-input">
    <input
      type="text"
      value={keyword}
      placeholder="주차장 앞 키워드만 입력해 주세요"
      className="input"
      onChange={(e) => setKeyword(e.target.value)} // 입력된 값을 실시간으로 keyword에 저장
    />
    <button type="submit">
      <span className="material-symbols-rounded text-zinc-400">search</span>
    </button>
  </div>
</form>;
```

**검색 기능 구현**<br/>
검색창에 글자를 입력할 때마다 searchPlaces()가 호출되지 않도록 최적화된 방식을 적용했습니다.<br />
사용자가 입력을 완료한 후, 최종적으로 입력된 검색어(searchValue)에 대해서만 검색이 이루어지도록 설계하여 불필요한 API 요청 및 함수 호출을 방지했습니다.<br />
이를 통해 성능을 최적화했으며, 사용자가 검색어를 입력하는 도중 성급하게 검색이 실행되지 않도록 하여 불필요한 검색 결과를 줄임으로써 사용자 경험을 크게 개선할 수 있었습니다.

### 주차장 즐겨찾기

![주차장 즐겨찾기 기능](https://github.com/user-attachments/assets/70db5418-f74e-46b5-995e-3797b764ee55)

```jsx
const createPlaceAndUpdate = async ({ place, userId }) => {
  try {
    const places = await fetchPlaces();
    const existingPlace = places.find((existingPlace) => existingPlace.id === place.id);

    if (existingPlace) {
      return await updateBookmark(existingPlace, userId);
    } else {
      return await createNewPlace(place, userId);
    }
  } catch (error) {
    console.error("장소 확인 중 오류 발생:", error);
  }
};
```

북마크 기능은 머니풀 서버의 유저 테이블을 수정할 수 없었기 때문에
북마크 버튼을 누르면 해당 장소에 대한 데이터를 db.json 담아서 북마크 버튼을 누른
사용자의 id를 장소의 bookmarks 배열에 기록하였습니다. 내가 누른 북마크의 UI를 변경시키고
마이페이지에서도 그 리스트를 확인할 수 있습니다.

db.json에 인자로 전달받은 장소의 데이터가 이미 존재하는지의 여부에 따라서
createNewPlace 혹은 updateBookmark 함수를 호출할 수 있도록 조건문을 넣어주었습니다.

사용자 경험 향상을 위해 Tanstack Query의 onMutate 옵션을 사용하여 낙관적 업데이트를 구현했습니다.

### 댓글 추가

![댓글 추가](https://github.com/user-attachments/assets/88cdcae1-e3e4-40d4-8ab5-800fb47e1910)

```jsx
const { data: latestUserInfo } = useQuery({
  queryKey: ["userInfo", user?.id],
  queryFn: () => getUserProfile(token),
  enabled: !!user && !!token // 유저와 토큰이 있을 때만 쿼리 실행
});
useEffect(() => {
  if (latestUserInfo) {
    setUser(latestUserInfo);
  }
}, [latestUserInfo, setUser]);
const updatedComments = useMemo(() => {
  if (!comments) return [];
  return comments.map((comment) => {
    if (comment.userId === user?.id) {
      return {
        ...comment,
        nickname: user.nickname,
        avatar: user.avatar
      };
    }
    return comment;
  });
}, [comments, user]);
```

**최신 유저 정보와 댓글 데이터 동기화**<br/>
: useQuery를 사용해 최신 유저 정보를 가져오고 useEffect를 사용해 전역 상태를 업데이트 해주고 이를 통해 최신 유저 정보를 유지할 수 있었습니다.<br/>
: useMemo를 사용해 댓글 목록과 유저 정보가 변경될 때만 댓글 데이터를 재계산합니다. 이는 불필요한 렌더링을 방지하여 애플리케이션의 성능을 향상시킵니다.<br/>
불필요한 렌더링을 방지할 수 있어서 자랑스러운 코드라고 생각합니다!<br/>

### 댓글 수정 및 삭제

![댓글 수정 및 삭제](https://github.com/user-attachments/assets/ebb53187-4054-44c7-85c1-02dece44b1ba)

### 회원가입

![회원가입](https://github.com/user-attachments/assets/48dae8ec-74be-45d7-ba68-c868aa628270)

```jsx
const handleSignup = async (formData) => {
  try {
    await register(formData);
    toast.success("회원가입이 완료되었습니다. 로그인해주세요.");
    navigate("/login");
  } catch (error) {
    toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
  }
};
```

**유효성 검사 및 회원가입 처리**<br />
Toast 알림: react-toastify를 활용하여 회원가입 성공 및 실패 시 사용자에게 알림을 제공합니다.
유효성 검사: 회원가입 폼에서는 이름과 닉네임 필드를 추가하여 유효성을 검사하고 있습니다.

### 로그인

![로그인](https://github.com/user-attachments/assets/8a592ab6-37ab-484a-90c9-75d5035d3808)

```jsx
const handleLogin = async (formData) => {
  try {
    const loginData = await login(formData);
    const userProfile = await getUserProfile(loginData.accessToken);
    setAuth(userProfile, loginData.accessToken);
    navigate("/"); // 로그인 후 홈으로 이동
  } catch (error) {
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
  }
};
```

**유효성 검사 및 로그인 처리**<br />
로그인 유효성 검사: 아이디와 비밀번호가 각각 5자, 8자 이상인지 확인 후 로그인 요청을 보냅니다.
상태 관리: Zustand를 사용하여 전역 상태에서 사용자 프로필 및 액세스 토큰을 관리합니다.
에러 처리: 로그인 실패 시 사용자에게 알림을 띄워주는 에러 처리 로직을 포함합니다.

**로그인 및 회원가입 폼 유효성 검사**<br />

```jsx
const validateForm = () => {
  let isValid = true;
  let newErrors = {
    id: "",
    password: "",
    name: "",
    nickname: ""
  };

  if (!formData.id || formData.id.length < 5) {
    newErrors.id = "아이디는 최소 5자 이상이어야 합니다.";
    isValid = false;
  }

  if (!formData.password || formData.password.length < 8) {
    newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    isValid = false;
  }

  if (mode === "signup" && !formData.name) {
    newErrors.name = "이름을 입력해주세요.";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};
```

폼 유효성 검사: 사용자가 입력한 정보가 유효한지 검증합니다. 비밀번호는 최소 8자, 아이디는 최소 5자 이상이어야 하며, 회원가입일 경우 이름 필드를 필수로 입력해야 합니다.
실시간 에러 메시지: 잘못된 입력이 있을 경우 해당 필드 아래에 오류 메시지를 실시간으로 표시합니다.

### 로그아웃

![로그아웃](https://github.com/user-attachments/assets/a80d6f4b-216c-4b10-aff2-8d1bee7c7110)

### 프로필 수정

![프로필 수정](https://github.com/user-attachments/assets/96604818-81b9-467d-a20a-ae642e7e5e9c)

```jsx
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const objectUrl = URL.createObjectURL(file); // 파일을 URL로 변환
    document.getElementById("imgPrev").src = objectUrl;
    setImgSrc(file);
  }
};
```

파일을 url로 변환하여 파일 등록 후 이미지는 변경된 것처럼 사용자에게 표시하되, 전송 프로토콜 규칙에 맞추어 file은 url형식이 아닌 file 형식 그 자체로 전송하도록 Problem solve 한 것을 자랑스러운 코드라고 생각합니다.
<br/>

## ⏲️ 개발기간

2024.09.12(목) ~ 2024.09.23(월)<br/>
<br/>

## 📚️ 기술스택

### ✔️ Language

![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jsx](https://img.shields.io/badge/Jsx-666666?style=for-the-badge)

### ✔️ Version Control

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### ✔️ IDE

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)

### ✔️ Framework

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React_Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### ✔️ Deploy

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Glitch](https://img.shields.io/badge/Glitch-2800ff?style=for-the-badge&logo=glitch&logoColor=white)

### ✔️ DBMS

![json-server](https://img.shields.io/badge/json_server-666666?style=for-the-badge)<br/>
db.json - 댓글 , 즐겨찾기 Feature에서 사용 중

### ✔️ State

![Zustand](https://img.shields.io/badge/Zustand-666666?style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-666666?style=for-the-badge)<br/>

### ✔️ Linters

![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

### ✔️ Design

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

### ✔️ API

[🔗 카카오 지도 API](https://apis.map.kakao.com/web/)
<br/><br/>

## 🧱 서비스 구조

- 메인페이지(지도)
  - 카카오 API를 활용한 주차장 지도 기능
  - 주차장 상세 정보 제공
  - 검색 기능을 통한 주차장 찾기
  - 즐겨찾기 기능으로 특정 장소 저장
  - 주차장에 대한 댓글 작성 및 CRUD 기능
- 회원가입/로그인 페이지
  - 인증/인가를 통한 회원가입 및 로그인 기능
  - 로그인 및 회원가입 시 유효성 검사
- 마이페이지
  - 프로필 이미지 최적화 및 등록 기능
  - 닉네임 수정 기능
  - 즐겨찾기한 장소 관리 및 저장 기능
    <br/>

## 🎨 와이어프레임

<details>
  <summary><b>Park Finder 와이어프레임</b></summary>

![image](https://github.com/user-attachments/assets/8238b91c-d199-47f1-b0eb-b11d35ee850a)
![image](https://github.com/user-attachments/assets/be62e9c1-7e58-4bcb-b7ac-dc0c74ae32ab)
![image](https://github.com/user-attachments/assets/91b07d77-f0d2-4a6d-a068-2c1f45eed93a)
![image](https://github.com/user-attachments/assets/663913f7-d12a-42ee-9a5f-00cffd315bdb)

</details>
<br/>

## 📋 API 명세서

서버 API_URL : https://moneyfulpublicpolicy.co.kr/<br/>

<details>
  <summary><b>API 명세서</b></summary>
<br/>
	
**회원가입**
```
Request
Method → POST
URL PATH → /register
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
```

**로그인**

```
Request
Method → POST
URL PATH → /login
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
```

**회원정보 확인**

```
Request
Method → GET
URL PATH → /user
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
```

**프로필 변경**

```
Request
Method → PATCH
URL PATH → /profile
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
```

</details>
	
### Comment Api
서버 API_URL : https://moneyfulpublicpolicy.co.kr/
<details>
  <summary><b>Comment Api</b></summary>
<br/>
	
**댓글 확인**
```
Request
Method → GET
URL PATH
```

**댓글 추가**

```
Request
Method → POST
URL PATH / comment + createdAt: new Date().toISOString()
```

**댓글 삭제**

```
Method → DELETE
URL PATH + ${id}
```

**댓글 수정**

```
Method → PATCH
URL PATH + ${id}
text(변경할 댓글),
createdAt: new Date().toISOString()
```

</details>
<br />

<<<<<<< HEAD

## 프로젝트 파일 구조

<<<<<<< HEAD

![image](https://github.com/user-attachments/assets/d5c5855d-b48d-4a97-8b50-3b62d0fc2d0a)

=======
<<<<<<< HEAD
📦src
┣ 📂api
┃ ┣ 📜auth.js
┃ ┣ 📜bookmark.js
┃ ┗ 📜comments.js
┣ 📂assets
┃ ┣ 📂fonts
┃ ┃ ┣ 📜Pretendard-Bold.subset.woff
┃ ┃ ┣ 📜Pretendard-Bold.subset.woff2
┃ ┃ ┣ 📜Pretendard-Light.subset.woff
┃ ┃ ┣ 📜Pretendard-Light.subset.woff2
┃ ┃ ┣ 📜Pretendard-Medium.subset.woff
┃ ┃ ┣ 📜Pretendard-Medium.subset.woff2
┃ ┃ ┣ 📜Pretendard-Regular.subset.woff
┃ ┃ ┣ 📜Pretendard-Regular.subset.woff2
┃ ┃ ┣ 📜Pretendard-SemiBold.subset.woff
┃ ┃ ┗ 📜Pretendard-SemiBold.subset.woff2
=======

## 📦 프로젝트 파일 구조

<details>
  <summary><b>Park Finder 파일 구조</b></summary>

```
 ┣ 📂public
>>>>>>> cce5afba468fd42e59a0b8c2c1ea014a8131f0cb
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📂favicon
 ┃ ┃ ┃ ┣ 📜browserconfig.xml
 ┃ ┃ ┃ ┣ 📜favicon-16x16.png
 ┃ ┃ ┃ ┣ 📜favicon-32x32.png
 ┃ ┃ ┃ ┣ 📜favicon-96x96.png
 ┃ ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┃ ┗ 📜manifest.json
 ┃ ┃ ┗ 📜og.jpg
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜bookmark.js
 ┃ ┃ ┗ 📜comments.js
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┣ 📜Pretendard.subset.woff
 ┃ ┃ ┃ ┗ 📜Pretendard.subset.woff2
 ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┣ 📜default_img.png
 ┃ ┃ ┃ ┣ 📜my-location@2x.png
 ┃ ┃ ┃ ┗ 📜pin-marker@2x.png
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜AuthForm.jsx
 ┃ ┃ ┣ 📜BookmarkButton.jsx
 ┃ ┃ ┣ 📜MainLayout.jsx
 ┃ ┃ ┣ 📜ProtectedRoute.jsx
 ┃ ┃ ┣ 📜SideBar.jsx
 ┃ ┃ ┗ 📜SubLayout.jsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useCreatePlaceAndUpdate.js
 ┃ ┃ ┣ 📜useGetPlaces.js
 ┃ ┃ ┗ 📜useMapActions.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┗ 📜Comments.jsx
 ┃ ┃ ┣ 📂join
 ┃ ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┃ ┗ 📜Signup.jsx
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📜Home.jsx
 ┃ ┃ ┃ ┗ 📜KakaoMap.jsx
 ┃ ┃ ┗ 📂myPage
 ┃ ┃ ┃ ┣ 📜Bookmark.jsx
 ┃ ┃ ┃ ┣ 📜MyPage.jsx
 ┃ ┃ ┃ ┣ 📜PlaceItem.jsx
 ┃ ┃ ┃ ┣ 📜PlaceList.jsx
 ┃ ┃ ┃ ┗ 📜Profile.jsx
 ┃ ┣ 📂shared
 ┃ ┃ ┗ 📜Router.jsx
 ┃ ┣ 📂zustand
 ┃ ┃ ┣ 📜authStore.js
 ┃ ┃ ┣ 📜commentStore.js
 ┃ ┃ ┗ 📜mapStore.js
 ┃ ┣ 📜App.jsx
 ┃ ┣ 📜index.css
 ┃ ┗ 📜main.jsx
 ┣ 📜.env.local
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜db.json
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜README.md
 ┣ 📜tailwind.config.js
 ┣ 📜vite.config.js
 ┗ 📜yarn.lock
```

</details>
<br/>

## 💥 Trouble Shooting

### 1. 프로필 기능 구현 시 프로젝트 환경에 따라 진행이 어려운 문제

#### 문제상황

- 당초 프로필 기능을 구현하려 하니, 우선 json-server와 캠프에서 제공해주는 api로는 온전한 이미지 파일 저장이 어려운 상황
- base64로 인코딩을 하면 이미지 파일의 길이가 가변적으로 매우 늘어남
- 렌더링 이슈, 속도 저하 이슈가 나올 수도 있기에, 가능하면 닉네임 수정만 구현하는 방향에서 프로필 수정은 완료하라 라는 피드백
- 허나 마이 페이지에서 프로필 사진 수정이 없다면, 대부분에 웹 사이트에서 프로필 수정 시에는 이미지 수정이 대부분 존재하기에 아쉬운 상황

#### 해결 방법, 개선 사항

- 같은 상황에서, 프로필 구현을 사용자 api에 존재하는 avatar를 통해 파일을 base64형식이나 url 방식으로 전달한 것이 아닌 ,파일 형식 그대로 전송
- 불러올 때만 url 형식으로 불러오면 된다는 케이스를 트러블슈팅 중 확인하여 , 해당 사항 반영 후 완료
  <br/>

### 2. 댓글 수정 시 UI 반응성 저하

#### 문제상황

- 디테일 페이지에서 댓글 수정 시 수정은 성공적으로 되지만 서버 응답을 기다려야해서 서버 응답 대기 후 UI 업데이트가 되는 문제점

<<<<<<< HEAD

> > > > > > > e2a4ab101829ebf4fd9359a13e70186f39e42954

## Trouble Shooting

### 1. 프로필 기능 구현 시 프로젝트 환경에 따라 진행이 어려운 문제.

당초 프로필 기능을 구현하려 하니, 우선 json-server와 캠프에서 제공해주는 api로는
온전한 이미지 파일 저장이 어려운 상황 -> base64로 인코딩을 하면 이미지 파일의 길이가 가변적으로 매우 늘어남
-> 렌더링 이슈, 속도 저하 이슈가 나올 수도 있기에, 가능하면 닉네임 수정만 구현하는 방향에서 프로필 수정은 완료하라 라는 피드백
-> 허나 마이 페이지에서 프로필 사진 수정이 없다면, 대부분에 웹 사이트에서 프로필 수정 시에는 이미지 수정이 대부분 존재하기에 아쉬운 상황
-> 같은 상황에서, 프로필 구현을 사용자 api에 존재하는 avatar를 통해 파일을 base64형식이나 url 방식으로 전달한 것이 아닌 ,파일 형식 그대로 전송하고,
불러올 때만 url 형식으로 불러오면 된다는 케이스를 트러블슈팅 중 확인하여 , 해당 사항 반영 후 완료

## Project Remind & 프로젝트 소감

### 조아영

### 노용철

### 김세희

### 최지민

### 홍승우

# 팀원 간 서로 존중하고 ,의견 충돌없이 대부분의 방향성에서 부드럽게 흘러갔던 프로젝트였습니다.

#### 해결 방법

- Tanstack Query를 활용한 낙관적 업데이트(Optimistic Updates) 구현

#### 개선 사항

- 즉각적인 UI 업데이트로 사용자 경험 향상
- 네트워크 지연에 관계없디 반응성 있는 인터페이스 제공
- 오류 발생 시 이전 상태로 자동 롤백
  <br />

## 🗨 Project Remind & 프로젝트 소감

#### 조아영

카카오 API의 여러 기능을 실제 서비스에 적용해보는 유익한 경험이었습니다. 팀원들과의 협업 과정에서 다양한 이슈들이 발생했지만 원활한 소통을 통해 신속히 해결할 수 있었습니다. 이번 프로젝트를 통해 API 통합 및 협업의 중요성을 깊이 이해할 수 있었습니다.

#### 노용철

Zustand와 Tanstack Query를 사용하여 클라이언트 전역 상태 및 서버 상태를 관리하여 효율적으로 로직을 분배하는 방법을 알게 되었고 팀과 협업하여 서로에게 필요한 부분들에 대해 소통하여 개선하는 방식이 좋았으며 외부 API를 사용하여 웹 서비스의 퀄리티를 올리고 사용자에게 더 나은 서비스를 경험시킬 수 있다고 생각했습니다

#### 장세희

이번 프로젝트 기간동안 팀워크가 너무 좋고 팀 분위기가 좋아서 큰 문제없이 프로젝트를 잘 마무리 할 수 있었던거 같습니다. 소통은 물론 피드백 또한 즉각적으로 이루어져서 너무 좋았고, 서로를 존중하고 배려한다는 것을 많이 느낄 수 있었습니다! 프로젝트 기간동안 연휴가 겹쳤음에도 불구하고 다들 너무 고생 많으셨고 다음 팀프로젝트에도 다시 만났으면 좋겠습니다! :)

#### 최지민

이번 프로젝트를 통해 Tanstack Query의 강력한 기능을 실제로 경험할 수 있었습니다. 특히 낙곽적 업데이트 구현 과정에서 사용자 경험 개선의 중요성을 깊이 이해하게 되었습니다. 또한, 팀원들과의 원활한 협업 덕분에 기술적 도전을 효과적으로 극복할 수 있었고 이는 프로젝트의 성공에 큰 도움이 되었습니다!

#### 홍승우

팀원 간 서로 존중하고 ,의견 충돌없이 대부분의 방향성에서 부드럽게 흘러갔던 프로젝트였습니다.
<<<<<<< HEAD

> > > > > > > cce5afba468fd42e59a0b8c2c1ea014a8131f0cb
> > > > > > > 전달 사항이 있을 때마다, Slack, 구두를 통한 커뮤니케이션을 통해, 각자 맡은 역할을 , 필수 구현 사항에 맞게 적절히 구현 할 수 있는 구현 시간 내에서 잘 구현했다고 생각합니다.
> > > > > > > 아쉬운 점으로는 Git PR에 대한 comment나 코드 리뷰를 제대로 활용하지는 못하였기에, 추후 시간이 된다면 이를 활용할 수 있었으면 좋겠다는 생각도 듭니다.
> > > > > > > =======
> > > > > > > 전달 사항이 있을 때마다, Slack, 구두를 통한 커뮤니케이션을 통해, 각자 맡은 역할을 , 필수 구현 사항에 맞게 적절히 구현 할 수 있는 구현 시간 내에서 잘 구현했다고 생각합니다.
> > > > > > > 아쉬운 점으로는 Git PR에 대한 comment나 코드 리뷰를 제대로 활용하지는 못하였기에, 추후 시간이 된다면 이를 활용할 수 있었으면 좋겠다는 생각도 듭니다.
> > > > > > > 78bd5012f25fea7f05636bd4573c5f98c2b59dee
