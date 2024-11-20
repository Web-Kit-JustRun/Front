// src/components/StoreSideBar.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { selectedMenuState } from "../../store/selectedMenuStore";
import { useRecoilState } from "recoil";

const StoreSideBar = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);

  // 메뉴 클릭 시 상태 업데이트 및 이동
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); // Recoil 상태 업데이트
  };
  return (
    <SideBarContainer>
      <MenuButton onClick={() => handleMenuClick("")}>전체메뉴</MenuButton>
      <MenuButton onClick={() => handleMenuClick("타입1")}>메뉴1</MenuButton>
      <MenuButton onClick={() => handleMenuClick("타입2")}>메뉴2</MenuButton>
      <MenuButton onClick={() => handleMenuClick("타입3")}>메뉴3</MenuButton>
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

const PurchaseList = styled.div`
  margin-top: auto;
  font-size: 12px;
  color: #333;
  text-align: center;
`;

export default StoreSideBar;
