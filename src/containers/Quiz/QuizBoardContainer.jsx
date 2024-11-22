import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../utils/useRequest";

const MyQuizContainer = () => {
  const navigate = useNavigate();
  const request = useRequest();
  const [quizzes, setQuizzes] = useState([]);
  const courseId = 1;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await request(`/api/courses/${courseId}/quizzes`, "GET");

        data && setQuizzes(data);
      } catch (error) {
        console.error("퀴즈 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchQuizzes();
  }, [request]);

  const handleRowClick = (quiz) => {
    navigate("/solvequiz", { state: { quiz } });
  };

  const handleMyQuizzesClick = () => {
    navigate("/myquiz");
  };

  const getAttemptStatusLabel = (status) => {
    switch (status) {
      case "correct":
        return "정답";
      case "incorrect":
        return "오답";
      case "not_attempted":
        return "미풀이";
      default:
        return "알 수 없음";
    }
  };

  return (
    <BoardContainer>
      <BoardHeader>
        <Title>퀴즈 게시판</Title>
        <ButtonGroup>
          <RegisterButton onClick={() => navigate("/quizzes/add")}>
            등록하기
          </RegisterButton>
          <MyQuizzesButton onClick={handleMyQuizzesClick}>
            내가 만든 문제
          </MyQuizzesButton>
        </ButtonGroup>
      </BoardHeader>
      {quizzes.length > 0 ? (
        <ScrollableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>문제 ID</TableHeader>
                <TableHeader>제목</TableHeader>
                <TableHeader>생성 날짜</TableHeader>
                <TableHeader>풀이 상태</TableHeader>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <TableRow
                  key={quiz.quizId}
                  onClick={() => handleRowClick(quiz)}
                >
                  <TableCell>{quiz.quizId}</TableCell>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>
                    {new Date(quiz.creationDate).toLocaleDateString("ko-KR")}
                  </TableCell>
                  <TableCell>
                    {getAttemptStatusLabel(quiz.attempt_status)}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </ScrollableContainer>
      ) : (
        <Loading>불러올 데이터가 없습니다.</Loading>
      )}
    </BoardContainer>
  );
};

export default MyQuizContainer;

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const RegisterButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const MyQuizzesButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
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

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Loading = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: gray;
`;
