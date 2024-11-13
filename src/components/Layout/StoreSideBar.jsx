// src/components/StoreSideBar.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StoreSideBar = () => {
  const navigate = useNavigate();

  return (
    <SideBarContainer>
      <MenuButton onClick={() => navigate("/menu1")}>메뉴1</MenuButton>
      <MenuButton onClick={() => navigate("/menu2")}>메뉴2</MenuButton>
      <MenuButton onClick={() => navigate("/menu3")}>메뉴3</MenuButton>
      <PurchaseList>구매 목록</PurchaseList>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MenuButton = styled.button`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const PurchaseList = styled.div`
  margin-top: auto;
  font-size: 12px;
  color: #333;
  text-align: center;
`;

export default StoreSideBar;
