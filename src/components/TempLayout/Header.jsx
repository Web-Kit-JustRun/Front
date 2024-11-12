import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import logo from "../../img/edukit logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [courses, setCourses] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // 수업 정보 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userData.user_id}/courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("수업 정보를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchCourses();
  }, [userData.user_id]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <HeaderBlock>
      <Logo onClick={() => navigate("/main")}>
        <img src={logo} alt="EdukIt Logo" />
      </Logo>

      <UserSection>
        <ClassSelect value={selectedClass} onChange={handleClassChange}>
          <option value="">수업 선택</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name}
            </option>
          ))}
        </ClassSelect>
        <UserInfo>
          <div>{userData.username}</div>
          <div>랭킹 점수: {userData.ranking_points}</div>
        </UserInfo>
        <StoreIcon onClick={() => navigate("/store")}>
          <FaStore />
        </StoreIcon>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </UserSection>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px; /* Header 높이 설정 */
  padding: 0 20px;
  background-color: #dddddd;
`;

const Logo = styled.div`
  cursor: pointer;

  img {
    width: 60px; /* 로고 크기 조절 */
    height: auto;
  }
`;

const ClassSelect = styled.select`
  padding: 5px;
  font-size: 1em;
  border-radius: 5px;
  margin-right: 20px; /* 우측으로 위치 조정 */
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  max-width: 100%;
  overflow: hidden;
  margin-right: 5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  div {
    font-size: 0.9em;
  }
`;

const StoreIcon = styled.div`
  font-size: 1.5em;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #007bff;
  }
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  font-size: 0.9em;
  background-color: #f05454;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d94343;
  }
`;

export default Header;
