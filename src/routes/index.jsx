import Login from "../pages/Login/Login";
import SearchId from "../pages/Login/SearchId";
import SearchPw from "../pages/Login/SearchPw";
import Register from "../pages/Login/Register";
import Main from "../pages/Main";
import Rank from "../pages/Rank";

//기본 틀임. 로그인 회원가입은 고정된 레이아웃이 없을거라 여기(사실 역할별로 나눈거)
const publicRoutes = [
  { path: "/", element: Login },
  { path: "/login", element: Login },
  {
    path: "/searchid",
    element: SearchId,
  },
  {
    path: "/searchpw",
    element: SearchPw,
  },
  {
    path: "/register",
    element: Register,
  },
  {
    path: "/rank",
    element: Rank,
  },
];

const authenticatedRoutes = [
  { path: "/main", element: Main },
  { path: "/rank", element: Rank },
];

// 추가로 필요한게 생각나면 위 형식대로 만들면 됨
export { publicRoutes, authenticatedRoutes }; // 여기서 export해주는거 까먹으면 오류남
