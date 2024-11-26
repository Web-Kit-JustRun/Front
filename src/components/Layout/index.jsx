import styled from "styled-components";
import Navbar from "./Navbar";
import Header from "./Header";
import StoreSideBar from "./StoreSideBar";
import MySideBar from "./MySideBar"; // 새롭게 추가된 사이드바 컴포넌트
import { useRecoilValue } from "recoil";
import { currentLessonIdStore, lessonStore } from "../../store/lessonStore";

const Layout = ({ children, layoutType }) => {
  const lessons = useRecoilValue(lessonStore);
  const currentLessonId = useRecoilValue(currentLessonIdStore);

  const currentLesson = lessons.find(
    (lesson) => lesson.courseId === currentLessonId,
  );

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        {layoutType === "lesson" && (
          <NavBar>
            <Navbar courseName={currentLesson?.courseName ?? "강의"} />
          </NavBar>
        )}
        {(layoutType === "store" || layoutType === "purchaseList") && (
          <StoreSideBarWrapper>
            <StoreSideBar layoutType={layoutType} />
          </StoreSideBarWrapper>
        )}
        {layoutType === "mypage" && (
          <MySideBarWrapper>
            <MySideBar />
          </MySideBarWrapper>
        )}
        <ContentArea layoutType={layoutType}>{children}</ContentArea>
      </ContentWrapper>
    </LayoutWrapper>
  );
};
export default Layout;

const LayoutWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f8ff;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #005fa3;
  color: #ffffff;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-top: 80px;
`;
const NavBar = styled.div`
  width: 240px;
  height: calc(100vh - 80px);
  position: fixed;
  top: 80px;
  left: 0;
  overflow-y: auto;
  background-color: #0077cc;
  color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;
const StoreSideBarWrapper = styled.div`
  width: 240px;
  height: calc(100vh - 80px);
  position: fixed;
  top: 80px;
  left: 0;
  overflow-y: auto;
  background-color: #e0eefe;
  color: #333;
`;
const MySideBarWrapper = styled.div`
  width: 240px;
  height: calc(100vh - 80px);
  position: fixed;
  top: 80px;
  left: 0;
  overflow-y: auto;
  background-color: #c8e5ff;
  color: #333;
`;
const ContentArea = styled.main`
  margin-left: ${(props) =>
    props.layoutType === "lesson" ||
    props.layoutType === "store" ||
    props.layoutType === "purchaseList" ||
    props.layoutType === "mypage"
      ? "240px"
      : "0"};
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;
