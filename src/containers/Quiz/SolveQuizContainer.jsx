import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const SolveQuizContainer = () => {
  const location = useLocation();
  // navigate에서 전달된 state를 가져옴
  const { quiz } = location.state || {}; // 데이터가 없을 경우 대비하여 기본값 처리

  if (!quiz) {
    return <div>퀴즈 데이터가 없습니다.</div>; // 데이터가 없을 경우 처리
  }
  return (
    <SolveQuizContainerBlock>
      <div>
        <h1>퀴즈 풀기</h1>
        <p>문제 ID: {quiz.quizId}</p>
        <p>과정 이름: {quiz.courseName}</p>
        <p>제목: {quiz.title}</p>
        <p>
          생성 날짜: {new Date(quiz.creationDate).toLocaleDateString("ko-KR")}
        </p>
      </div>
    </SolveQuizContainerBlock>
  );
};

export default SolveQuizContainer;

// Styled Components
const SolveQuizContainerBlock = styled.div`
  width: 100%;
  height: calc(100vh - 120px); /* Adjust to fit within a layout */
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;
