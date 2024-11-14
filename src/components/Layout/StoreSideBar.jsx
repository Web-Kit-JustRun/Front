import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StoreSideBar = ({ layoutType }) => {
  const navigate = useNavigate();

  return (
    <SideBarContainer>
      <MenuButton onClick={() => navigate("/menu1")}>메뉴1</MenuButton>
      <MenuButton onClick={() => navigate("/menu2")}>메뉴2</MenuButton>
      <MenuButton onClick={() => navigate("/menu3")}>메뉴3</MenuButton>
      {layoutType === "store" ? (
        <StorePurchaseButton
          onClick={() => {
            navigate("/purchaselist");
          }}
        >
          구매 목록
        </StorePurchaseButton>
      ) : (
        <StorePurchaseButton
          onClick={() => {
            navigate("/store");
          }}
        >
          스토어
        </StorePurchaseButton>
      )}
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

const StorePurchaseButton = styled.button`
  margin-top: auto;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ff8c00; /* 오렌지색 계열 */
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #e07b00; /* 더 진한 오렌지색 */
  }
`;

export default StoreSideBar;
