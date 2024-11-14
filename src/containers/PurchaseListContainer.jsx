import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const PurchaseListContainer = () => {
  const [items, setItems] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(300); // 기본 포인트 (예시)
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { user_id } = userData || {};

  // 구매 아이템 목록 조회
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${user_id}/purchases`
        );
        if (response.status === 200) {
          setItems(response.data.purchases);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [user_id]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <Container>
      <CurrentPoints>현재 포인트: {rewardPoints}</CurrentPoints>
      <Table>
        <thead>
          <tr>
            <TableHeader>상품이미지</TableHeader>
            <TableHeader>상품 유형</TableHeader>
            <TableHeader>상품명</TableHeader>
            <TableHeader>구매일</TableHeader>
            <TableHeader>가격</TableHeader>
            <TableHeader>사용 유무</TableHeader>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TableRow key={item.purchase_id}>
              <TableCell>
                <FontAwesomeIcon icon={faTicket} />
              </TableCell>
              <TableCell>{item.item_type}</TableCell>
              <TableCell>{item.item_name}</TableCell>
              <TableCell>{formatDate(item.purchase_date)}</TableCell>
              <TableCell>{item.price} Point</TableCell>
              <TableCell>{item.is_used ? "사용 완료" : "사용 가능"}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PurchaseListContainer;

// Styled Components
const Container = styled.div`
  width: 100%;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const CurrentPoints = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #333;
  color: white;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;
