import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { currentLessonIdStore } from "../../store/lessonStore";
import { userStore } from "../../store/userStore";
import { useRequest } from "../../utils/useRequest";

const QuizBoard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const currentLessonId = useRecoilValue(currentLessonIdStore);
  const userState = useRecoilValue(userStore);
  const { user: userData } = userState;
  const navigate = useNavigate();
  const request = useRequest();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await request(
          `/api/courses/${currentLessonId}/quizzes/list`,
          "GET"
        );

        data && setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [currentLessonId, request]);

  const handleRowClick = (quiz) => {
    navigate("/solvequiz", { state: { quiz } }); // 퀴즈 데이터를 state로 전달
  };

  const handleQuizApprovalClick = () => {
    navigate("/quizapprovelist"); // 퀴즈 허가 목록 페이지로 이동
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
          <RegisterButton
            onClick={() => {
              navigate("/quizzes/add");
            }}
          >
            등록하기
          </RegisterButton>
          {userData.userType === "student" && (
            <QuizApprovalButton onClick={handleQuizApprovalClick}>
              퀴즈 허가 목록 조회
            </QuizApprovalButton>
          )}
        </ButtonGroup>
      </BoardHeader>
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
            {quizzes && quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <TableRow
                  key={quiz.quiz_id}
                  onClick={() => handleRowClick(quiz)}
                >
                  <TableCell>{quiz.quiz_id}</TableCell>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>
                    {new Date(quiz.creation_date).toLocaleDateString("ko-KR")}
                  </TableCell>
                  <TableCell>
                    {getAttemptStatusLabel(quiz.attempt_status)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <TableCell colSpan="4" style={{ textAlign: "center" }}>
                  퀴즈가 없습니다.
                </TableCell>
              </tr>
            )}
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
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

const QuizApprovalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #6c757d;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
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
  cursor: pointer;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;
