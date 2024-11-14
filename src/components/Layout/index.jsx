import styled from "styled-components";
import Navbar from "./Navbar";
import Header from "./Header";
import StoreSideBar from "./StoreSideBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Layout = ({ children, layoutType }) => {
  const { course_id } = useParams();
  const [courseName, setCourseName] = useState("Loading...");

  useEffect(() => {
    const fetchCourseName = async () => {
      if (course_id) {
        const authToken = localStorage.getItem("authToken");
        try {
          const response = await axios.get(
            `http://localhost:8080/api/courses/${course_id}`,
            { headers: { Authorization: `Bearer ${authToken}` } }
          );
          console.log("Fetched course name:", response.data.course_name); // 응답 데이터 확인
          setCourseName(response.data.course_name); // API 응답이 비어 있을 때 대비
        } catch (error) {
          console.error("Course name fetch failed:", error);
        }
      }
    };
    fetchCourseName();
  }, [course_id]);

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        {layoutType === "lesson" && (
          <NavBar>
            <Navbar courseName={courseName} /> {/* courseName 전달 */}
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
  height: calc(100vh - 80px);
  position: fixed;
  top: 80px;
  left: 0;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

const StoreSideBarWrapper = styled.div`
  width: 240px;
  height: calc(100vh - 0px);
  position: fixed;
  top: 80px;
  left: 0;
  overflow-y: auto;
  background-color: #e0e0e0;
`;

const ContentArea = styled.main`
  margin-left: ${(props) =>
    props.layoutType === "lesson" || props.layoutType === "store"
      ? "240px"
      : "0"};
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export default Layout;
