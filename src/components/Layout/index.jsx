import styled from "styled-components";
import Navbar from "./Navbar";
import Header from "./Header";
import StoreSideBar from "./StoreSideBar";

const Layout = ({ children, layoutType }) => {
  console.log("type : ");
  console.log(layoutType);
  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        {layoutType === "study" && (
          <NavBar>
            <Navbar />
          </NavBar>
        )}
        {layoutType === "store" && (
          <StoreSideBarWrapper>
            <StoreSideBar />
          </StoreSideBarWrapper>
        )}
        <ContentArea layoutType={layoutType}>{children}</ContentArea>
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
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-top: 100px;
`;

const NavBar = styled.div`
  width: 240px;
  height: calc(100vh - 100px);
  position: fixed;
  top: 100px;
  left: 0;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

const StoreSideBarWrapper = styled.div`
  width: 240px;
  height: calc(100vh - 100px);
  position: fixed;
  top: 100px;
  left: 0;
  overflow-y: auto;
  background-color: #e0e0e0;
`;

const ContentArea = styled.main`
  margin-left: ${(props) =>
    props.layoutType === "study" || props.layoutType === "store"
      ? "240px"
      : "0"};
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export default Layout;
