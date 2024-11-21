import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStore } from "../store/userStore";
import { selectedMenuState } from "../store/selectedMenuStore";

const PurchaseListContainer = () => {
  const [items, setItems] = useState([]); // 전체 구매 목록
  const userData = useRecoilValue(userStore).user;
  const { userId } = userData || {};
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState); // 선택된 메뉴

  // 구매 아이템 목록 조회
  useEffect(() => {
    setSelectedMenu("");
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST_URL + `/api/users/${userId}/purchases`,
        );

        if (response.status === 200) {
          setItems(response.data); // 전체 데이터를 상태에 저장
          console.log("🚀 ~ fetchItems ~ response.data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItems();
  }, [userId]); // userId 변경 시만 요청

  // selectedMenu로 아이템 필터링
  const filteredItems = selectedMenu
    ? items.filter((item) => item.item_type === selectedMenu) // 선택된 메뉴에 맞는 아이템만 필터링
    : items; // 선택된 메뉴가 없으면 전체 데이터

  console.log("🚀 ~ PurchaseListContainer ~ filteredItems:", filteredItems);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "유효하지 않은 날짜";
    try {
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(dateString));
    } catch (error) {
      console.error("Invalid date:", dateString, error);
      return "유효하지 않은 날짜";
    }
  };

  return (
    <Container>
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
          {filteredItems.map((item) => (
            <TableRow key={item.purchase_id}>
              <TableCell>
                <FontAwesomeIcon icon={faTicket} />
              </TableCell>
              <TableCell>{item.item_type}</TableCell>
              <TableCell>{item.item_name}</TableCell>
              <TableCell>{formatDate(item.purchase_date)}</TableCell>
              <TableCell>{item.price} Kit</TableCell>
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
