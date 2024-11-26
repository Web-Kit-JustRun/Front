import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MySideBar = () => {
  const navigate = useNavigate();

  return (
    <SideBarContainer>
      <SideBarItem onClick={() => navigate("/change-password")}>
        비밀번호 수정
      </SideBarItem>
      <SideBarItem onClick={() => navigate("/purchaselist")}>
        상점 구매 내역
      </SideBarItem>
      <SideBarItem onClick={() => navigate("/myquiz")}>
        신청한 퀴즈 전체 조회
      </SideBarItem>
    </SideBarContainer>
  );
};

export default MySideBar;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;
const SideBarItem = styled.button`
  flex: 1;
  padding: 10px 15px;
  font-size: 14px;
  color: #fff;
  background-color: #0084ff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005fbb;
  }
`;
