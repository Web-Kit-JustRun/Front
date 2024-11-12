import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [projectName, setProjectName] = useState("");

  const navigate = useNavigate();

  const handleDocument = () => {
    navigate("/document");
  };

  const handleIssue = () => {
    navigate("/issue");
  };

  const handleRankPage = () => {
    navigate("/rank");
  };

  const getProjectName = () => {
    setProjectName("사이드바");
  };

  useEffect(() => {
    getProjectName();
  }, []);

  return (
    <NavbarBlock>
      <div className="project-name">{projectName}</div>

      <SectionLabel>게시판(임시)</SectionLabel>

      <NavItem onClick={handleRankPage}>
        <i className="fa-solid fa-wrench fa-xl"></i>
        <span>랭킹 게시판</span>
      </NavItem>

      <SectionLabel>CATEGORY</SectionLabel>
      <NavItem>
        <i className="fa-regular fa-calendar fa-xl"></i>
        <span>TimeLine</span>
      </NavItem>
      <NavItem onClick={handleIssue}>
        <i className="fa-solid fa-wrench fa-xl"></i>
        <span>Issue Ticket</span>
      </NavItem>
      <NavItem>
        <i className="fa-solid fa-code fa-xl"></i>
        <span>Code Issue</span>
      </NavItem>

      <SectionLabel>DOC</SectionLabel>
      <NavItem onClick={handleDocument}>
        <i className="fa-solid fa-folder fa-xl"></i>
        <span>Document</span>
      </NavItem>
    </NavbarBlock>
  );
};

const NavbarBlock = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  height: calc(100vh - 150px); /* Header의 높이만큼 제외 */
  background-color: #f8f9fa;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE와 Edge에서 스크롤 바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤 바 숨기기 */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari에서 스크롤 바 숨기기 */
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
