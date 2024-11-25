import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Navbar = ({ courseName }) => {
  const navigate = useNavigate();

  return (
    <NavbarBlock>
      <Category>{courseName || "강의"}</Category>
      <SectionLabel>카테고리</SectionLabel>
      <NavItem onClick={() => navigate("/lectures")}>
        <i className="fas fa-chalkboard-teacher"></i>
        <span>강의 목록</span>
      </NavItem>
      <NavItem>
        <i className="fas fa-book"></i>
        <span>강의 자료</span>
      </NavItem>
      <NavItem onClick={() => navigate("/assignments")}>
        <i className="fas fa-tasks"></i>
        <span>과제 목록</span>
      </NavItem>
      <NavItem onClick={() => navigate("/quizzes")}>
        <i className="fas fa-question-circle"></i>
        <span>퀴즈 목록</span>
      </NavItem>
    </NavbarBlock>
  );
};

const NavbarBlock = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  height: calc(100vh - 100px);
  background-color: #1f81c7; /* 네비게이션 진한 블루 */
  border-radius: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  .project-name {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ffffff;
  }
`;

const Category = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
`;

const SectionLabel = styled.label`
  font-size: 1.1em;
  color: #cce7ff;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  color: #ffffff;
  border-radius: 5px;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #0077cc; /* 밝은 블루 */
    transform: translateX(5px); /* 약간의 이동 효과 */
  }

  i {
    margin-right: 10px;
    font-size: 1.2em;
    color: #cce7ff;
  }

  span {
    font-size: 1em;
  }
`;

export default Navbar;
