import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizBoardContainer = () => {
  const navigate = useNavigate();
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

  console.log("데이터 들어왔니", quizzes);

  const handleCreate = () => {
    navigate("/createquiz");
  };

  const handleRowClick = (quiz) => {
    navigate("/solvequiz", { state: { quiz } }); // 퀴즈 데이터를 state로 전달
  };

  return (
    <QuizBoardContainerBlock>
      <BoardHeader>
        <Title>퀴즈 게시판</Title>
        <RegisterButton onClick={handleCreate}>등록하기</RegisterButton>
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
            {quizzes && quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <TableRow
                  key={quiz.quiz_id}
                  onClick={() => handleRowClick(quiz)}
                >
                  <TableCell>{quiz.quiz_id}</TableCell>
                  <TableCell>{quiz.course_name}</TableCell>
                  <TableCell style={{ cursor: "pointer", color: "#007bff" }}>
                    {quiz.title}
                  </TableCell>
                  <TableCell>
                    {new Date(quiz.creation_date).toLocaleDateString("ko-KR")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <TableCell colSpan="4" style={{ textAlign: "center" }}>
                  퀴즈 데이터가 없습니다.
                </TableCell>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollableContainer>
    </QuizBoardContainerBlock>
  );
};

export default QuizBoardContainer;

// Styled Components
const QuizBoardContainerBlock = styled.div`
  width: 100%;
  height: calc(100vh - 120px); /* Adjust to fit within a layout */
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const BoardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
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
  width: 100%;
  flex: 1;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #007bff;
  color: white;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
`;
