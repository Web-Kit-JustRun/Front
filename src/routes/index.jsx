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
import AssignmentBoard from "../pages/Assignment/AssignmentBoard";
import AssignmentSubmitBoard from "../pages/Assignment/AssignmentSubmitBoard";
import CreateQuizContainer from "../containers/Quiz/CreateQuizContainer";
import SolveQuiz from "../pages/Quiz/SolveQuiz";
import MyQuiz from "../pages/Quiz/MyQuiz";
import QuizBoard from "../containers/QuizBoardContainer";
import MyPage from "../pages/MyPage";
import ChangePw from "../pages/ChangePw";

// 기본 틀임. 로그인 회원가입은 고정된 레이아웃이 없을거라 여기(사실 역할별로 나눈거)
const publicRoutes = [
  { path: "/", element: <Login />, layoutType: "none" },
  { path: "/login", element: <Login />, layoutType: "none" },
  { path: "/searchid", element: <SearchId />, layoutType: "none" },
  { path: "/searchpw", element: <SearchPw />, layoutType: "none" },
  { path: "/register", element: <Register />, layoutType: "none" },
];

const authenticatedRoutes = [
  //메인 홈
  { path: "/main", element: <Main />, layoutType: "main" },
  //마이페이지
  { path: "/mypage", element: <MyPage />, layoutType: "main" },
  //비밀번호 변경 페이지
  { path: "/change-password", element: <ChangePw />, layoutType: "main" },

  //랭킹 게시판
  { path: "/rank", element: <Rank />, layoutType: "main" },
  //강의 목록 페이지(더미)
  { path: "/lecture", element: <Lecture />, layoutType: "study" },
  //스토어 페이지
  { path: "/store", element: <Store />, layoutType: "store" },
  //구매 목록
  {
    path: "/purchaseList",
    element: <PurchaseList />,
    layoutType: "purchaseList",
  },
  
  //강의실 페이지
  { path: "/lesson", element: <Lesson />, layoutType: "lesson" },
  
  //퀴즈 게시판
  { path: "/quizzes", element: <QuizBoard />, layoutType: "lesson" },
    //퀴즈 등록 
  {
    path: "/quizzes/add",
    element: <CreateQuizContainer />,
    layoutType: "lesson",
  },
  //퀴즈 푸는 페이지
  { path: "/solvequiz", element: <SolveQuiz />, layoutType: "lesson" },
  //내가 등록한 퀴즈 조회
  { path: "/myquiz", element: <MyQuiz />, layoutType: "lesson" },
  //과제 페이지
  { path: "/assignments", element: <AssignmentBoard />, layoutType: "lesson" },
  {
    path: "/assignments/submit/:id",
    element: <AssignmentSubmitBoard />,
    layoutType: "lesson",
  },
];

export { publicRoutes, authenticatedRoutes };
