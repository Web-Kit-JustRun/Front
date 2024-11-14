import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Navbar = ({ courseName }) => {
  const navigate = useNavigate();

  return (
    <NavbarBlock>
      <Category>{courseName || "강의"}</Category>
      <SectionLabel>카테고리</SectionLabel>
      <NavItem onClick={() => navigate("/lectures")}>
        <span>강의 목록</span>
      </NavItem>
      <NavItem>
        <span>강의 자료</span>
      </NavItem>
      <NavItem onClick={() => navigate("/assignments")}>
        <span>과제 목록</span>
      </NavItem>
      <NavItem onClick={() => navigate("/quizzes")}>
        <span>퀴즈 목록</span>
      </NavItem>
    </NavbarBlock>
  );
};

const Category = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const NavbarBlock = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  height: calc(100vh - 150px);
  background-color: #f8f9fa;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .project-name {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
`;

const SectionLabel = styled.label`
  font-size: 0.9em;
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  i {
    margin-right: 10px;
    font-size: 1.2em;
    color: #007bff;
  }

  span {
    font-size: 1em;
  }
`;

export default Navbar;
