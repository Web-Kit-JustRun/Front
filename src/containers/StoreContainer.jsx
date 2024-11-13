import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// 아이콘 라이브러리에 아이콘 추가
library.add(faTicket);

const StoreContainer = () => {
  const [items, setItems] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [rewardPoints, setRewardPoints] = useState("");
  const { user_id } = userData;

  // 아이템 목록 조회
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/store/items"
        );
        if (response.status === 200) {
          setItems(response.data.items);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  //아이템 목록 잘 들어왔나?
  console.log("🚀 ~ StoreContainer ~ items:", items);

  // 리워드 조회
  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${user_id}/rewards`
        );
        if (response.status === 200) {
          setRewardPoints(response.data.reward_points);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchRewardData();
  }, []);

  const handleBuy = async (e, item) => {
    e.preventDefault();
    if (rewardPoints > item.price) {
      try {
        const response = await axios.post(
          `/api/store/items/${item.item_id}/purchase`,
          {
            purchase_id: item.item_id,
            price: item.price,
          }
        );

        if (response.status === 200) {
          alert(
            `"${item.item_name}"을(를) ${item.price} 포인트에 구매했습니다!`
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
        {items ? (
          <ItemList>
            {items.map((item) => (
              <ItemCard key={item.item_id}>
                <FontAwesomeIcon icon={faTicket} size="2x" />
                <ItemDetails>
                  <ItemName>{item.item_name}</ItemName>
                  <ItemPrice>가격: {item.price} Point</ItemPrice>
                </ItemDetails>
                <BuyItem onClick={(e) => handleBuy(e, item)}>구매</BuyItem>
              </ItemCard>
            ))}
          </ItemList>
        ) : (
          <div>페이지 로딩중</div>
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
