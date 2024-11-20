import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { selectedMenuState } from "../../store/selectedMenuStore";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStore } from "../../store/userStore";
import axios from "axios";

const StoreSideBar = ({ layoutType }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);
  const userData = useRecoilValue(userStore).user; // 사용자 데이터 가져오기
  const { user_id } = userData || {};
  const [rewardPoints, setRewardPoints] = useState(null); // 리워드 포인트 상태

  // 리워드 포인트 가져오기
  useEffect(() => {
    const fetchRewardPoints = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_URL}/api/users/${user_id}/rewards`
        );
        if (response.status === 200) {
          setRewardPoints(response.data.reward_points); // 리워드 포인트 설정
        }
      } catch (error) {
        console.error("Error fetching reward points:", error);
        setRewardPoints("N/A"); // 오류 시 기본값 설정
      }
    };

    if (user_id) {
      fetchRewardPoints(); // 사용자 ID가 있을 경우 API 호출
    }
  }, [user_id]);

  // 메뉴 클릭 시 상태 업데이트
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <SideBarContainer>
      <RewardPointsContainer>
        <h3>사용가능 kit</h3>
        <RewardPoints>
          {rewardPoints !== null ? `${rewardPoints} Kit` : "로딩 중..."}
        </RewardPoints>
      </RewardPointsContainer>
      <WholeMenuButton onClick={() => handleMenuClick("")}>
        전체메뉴
      </WholeMenuButton>
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

export default StoreSideBar;

// Styled Components
const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const RewardPointsContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  text-align: center;
`;

const RewardPoints = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
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

const WholeMenuButton = styled.button`
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
