import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const QuizBoard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/quizzes/recent"
        );
        if (response.status === 200) {
          setQuizzes(response.data);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <BoardContainer>
      <BoardHeader>
        <Title>퀴즈 게시판</Title>
        <RegisterButton>등록하기</RegisterButton>
      </BoardHeader>
      <ScrollableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>문제 ID</TableHeader>
              <TableHeader>과정 이름</TableHeader>
              <TableHeader>제목</TableHeader>
              <TableHeader>생성 날짜</TableHeader>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.quiz_id}>
                <TableCell>{quiz.quiz_id}</TableCell>
                <TableCell>{quiz.course_name}</TableCell>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>
                  {new Date(quiz.creation_date).toLocaleDateString("ko-KR")}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ScrollableContainer>
    </BoardContainer>
  );
};

export default QuizBoard;

// Styled Components
const BoardContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: Arial, sans-serif;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ScrollableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;
