import Login from "../pages/Login/Login";
import SearchId from "../pages/Login/SearchId";
import SearchPw from "../pages/Login/SearchPw";
import Register from "../pages/Login/Register";
import Main from "../pages/Main";
import Rank from "../pages/Rank";
import Lecture from "../pages/Lecture";
import Store from "../pages/Store";
import Lesson from "../pages/Lesson";
import PurchaseList from "../pages/PurchaseList";
import QuizBoard from "../pages/QuizBoard";

//기본 틀임. 로그인 회원가입은 고정된 레이아웃이 없을거라 여기(사실 역할별로 나눈거)
const publicRoutes = [
  { path: "/", element: <Login />, layoutType: "none" },
  { path: "/login", element: <Login />, layoutType: "none" },
  { path: "/searchid", element: <SearchId />, layoutType: "none" },
  { path: "/searchpw", element: <SearchPw />, layoutType: "none" },
  { path: "/register", element: <Register />, layoutType: "none" },
];

const authenticatedRoutes = [
  { path: "/main", element: <Main />, layoutType: "main" },
  { path: "/rank", element: <Rank />, layoutType: "main" },
  { path: "/lecture", element: <Lecture />, layoutType: "study" },
  { path: "/store", element: <Store />, layoutType: "store" },
  {
    path: "/purchaseList",
    element: <PurchaseList />,
    layoutType: "purchaseList",
  },
  { path: "/lesson", element: <Lesson />, layoutType: "lesson" },
  { path: "/quizzes", element: <QuizBoard />, layoutType: "lesson" },
];

export { publicRoutes, authenticatedRoutes };
