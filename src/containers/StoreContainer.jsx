// src/components/StoreContainer.jsx
import React from "react";
import styled from "styled-components";

const StoreContainer = () => {
  // 간단한 상품 목록 데이터
  const items = [
    { id: 1, name: "Item 1", price: "$10", imgSrc: "/images/item1.jpg" },
    { id: 2, name: "Item 2", price: "$20", imgSrc: "/images/item2.jpg" },
    { id: 3, name: "Item 3", price: "$30", imgSrc: "/images/item3.jpg" },
  ];

  return (
    <StoreContainerBlock>
      <h1>Store</h1>
      <ItemList>
        {items.map((item) => (
          <ItemCard key={item.id}>
            <ItemImage src={item.imgSrc} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>{item.price}</ItemPrice>
            </ItemDetails>
          </ItemCard>
        ))}
      </ItemList>
    </StoreContainerBlock>
  );
};

const StoreContainerBlock = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemList = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ItemCard = styled.div`
  width: 150px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 100%;
  height: auto;
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
