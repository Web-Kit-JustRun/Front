import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStore } from "../store/userStore";
import { selectedMenuState } from "../store/selectedMenuStore"; // Recoil 상태

// 아이콘 라이브러리에 아이콘 추가
library.add(faTicket);

const StoreContainer = () => {
  const [items, setItems] = useState([]);
  const [rewardPoints, setRewardPoints] = useState("");
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);
  const userState = useRecoilValue(userStore);
  const { token: authToken, user: userData } = userState;
  // 아이템별 수량 관리
  const [quantities, setQuantities] = useState({});
  const { user_id } = userData;
  console.log("selectedMenu:", selectedMenu); // 상태 확인

  useEffect(() => {
    const resetMenu = () => {
      setSelectedMenu("");
    };
    resetMenu();
  }, []);

  // 아이템 목록 조회
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST_URL + "/api/store/items"
        );
        if (response.status === 200) {
          setItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  // 리워드 조회
  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST_URL + `/api/users/${user_id}/rewards`
        );
        if (response.status === 200) {
          setRewardPoints(response.data.reward_points);
        }
      } catch (error) {
        console.error("Error fetching reward data:", error);
      }
    };

    fetchRewardData();
  }, [user_id]);

  // 선택된 메뉴에 따른 아이템 필터링
  const filteredItems = selectedMenu
    ? items.filter((item) => item.item_type === selectedMenu) // 선택된 메뉴가 있을 경우 필터링
    : items; // 선택된 메뉴가 없을 경우 모든 아이템 출력

  // 수량 입력 핸들러
  const handleQuantityChange = (item_id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [item_id]: Math.max(0, parseInt(value) || 0), // 0 이상의 정수로 설정
    }));
  };

  const handleBuy = async (e, item) => {
    e.preventDefault();
    const quantity = quantities[item.item_id] || 1; // 수량 기본값: 1

    if (rewardPoints >= item.price * quantity) {
      try {
        const response = await axios.post(
          `/api/store/items/${item.item_id}/purchase`,
          { headers: { Authorization: `Bearer ${authToken}` } },
          {
            purchase_id: item.item_id,
            price: item.price,
            quantity: quantity, // 수량 포함
          }
        );

        if (response.status === 200) {
          alert(
            `"${item.item_name}"을(를) ${
              item.price * quantity
            } 포인트에 구매했습니다!`
          );
        } else {
          alert("구매 요청이 완료되지 않았습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error during purchase:", error);
        alert("구매 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("포인트 부족");
    }
  };

  return (
    <StoreContainerBlock>
      <ScrollableContainer>
        {filteredItems.length > 0 ? (
          <ItemList>
            {filteredItems.map((item) => (
              <ItemCard key={item.item_id}>
                <FontAwesomeIcon icon={faTicket} size="2x" />
                <ItemDetails>
                  <ItemName>{item.item_name}</ItemName>
                  <ItemPrice>가격: {item.price} Point</ItemPrice>
                  <QuantityInput
                    type="number"
                    min="1"
                    value={quantities[item.item_id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.item_id, e.target.value)
                    }
                  />
                </ItemDetails>
                <BuyItem onClick={(e) => handleBuy(e, item)}>구매</BuyItem>
              </ItemCard>
            ))}
          </ItemList>
        ) : (
          <div>선택한 메뉴에 해당하는 항목이 없습니다.</div>
        )}
      </ScrollableContainer>
    </StoreContainerBlock>
  );
};

const StoreContainerBlock = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const ScrollableContainer = styled.div`
  width: 80%;
  max-width: 800px;
  height: 500px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const ItemList = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ItemCard = styled.div`
  width: 180px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const QuantityInput = styled.input`
  width: 60px;
  margin-top: 10px;
  padding: 5px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const BuyItem = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const ItemDetails = styled.div`
  padding: 10px;
`;

const ItemName = styled.h2`
  font-size: 16px;
  margin: 10px 0;
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: #555;
`;

export default StoreContainer;
