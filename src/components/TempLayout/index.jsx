import styled from "styled-components";
import Navbar from "./Navbar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        <NavBar>
          <Navbar />
        </NavBar>
        <ContentArea>{children}</ContentArea>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px; /* Header의 높이 설정 */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-top: 60px; /* Header 높이만큼 여백 추가 */
`;

const NavBar = styled.div`
  width: 240px;
  height: calc(100vh - 60px); /* 화면 높이에서 Header 높이만큼 제외 */
  position: fixed;
  top: 60px; /* Header 높이 아래에 위치 */
  left: 0;
  overflow-y: auto;
  background-color: #f5f5f5; /* Sidebar 배경색 */
`;

const ContentArea = styled.main`
  margin-left: 240px; /* Sidebar 넓이만큼 여백 추가 */
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export default Layout;
