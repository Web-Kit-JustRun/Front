import React, { useState } from "react";
import styled from "styled-components";

const QuizApprovalBoardContainer = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "퀴즈 제목 1",
      content: "퀴즈 내용 1",
      choices: ["1번 보기", "2번 보기", "3번 보기 (정답)", "4번 보기"],
      correctChoice: 2,
      points: 100,
      author: "홍길동",
    },
    {
      id: 2,
      title: "퀴즈 제목 2",
      content: "퀴즈 내용 2",
      choices: ["1번 보기", "2번 보기 (정답)", "3번 보기", "4번 보기"],
      correctChoice: 1,
      points: 150,
      author: "이순신",
    },
  ]);

  return (
    <BoardContainer>
      <Header>
        <Title>허가 대기 게시판</Title>
        <PendingCount>대기중인 퀴즈 수: {quizzes.length}</PendingCount>
      </Header>
      <QuizList>
        {quizzes.map((quiz) => (
          <QuizItem key={quiz.id}>
            <QuizHeader>
              <QuizTitle>{quiz.title}</QuizTitle>
              <QuizAuthor>작성자: {quiz.author}</QuizAuthor>
            </QuizHeader>
            <QuizContent>{quiz.content}</QuizContent>
            <Choices>
              {quiz.choices.map((choice, index) => (
                <Choice key={index} isCorrect={index === quiz.correctChoice}>
                  {choice} {index === quiz.correctChoice && "(정답)"}
                </Choice>
              ))}
            </Choices>
            <Actions>
              <Points>{quiz.points}pt</Points>
              <ActionButton approve>허가</ActionButton>
              <ActionButton>거절</ActionButton>
            </Actions>
          </QuizItem>
        ))}
      </QuizList>
    </BoardContainer>
  );
};

export default QuizApprovalBoardContainer;

const BoardContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #007bff;
`;

const PendingCount = styled.span`
  font-size: 1rem;
  color: #555;
`;

const QuizList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuizItem = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const QuizTitle = styled.h2`
  font-size: 1.2rem;
  color: #333;
`;

const QuizAuthor = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

const QuizContent = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  color: #555;
`;

const Choices = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
`;

const Choice = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.isCorrect ? "#d4edfa" : "#f8f9fa")};
  color: ${(props) => (props.isCorrect ? "#007bff" : "#333")};
  border: 1px solid ${(props) => (props.isCorrect ? "#bee3f8" : "#ddd")};
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.isCorrect ? "#cfe2ff" : "#e9ecef"};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Points = styled.div`
  font-size: 0.9rem;
  color: #007bff;
  font-weight: bold;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.approve ? "#007bff" : "#dc3545"};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.approve ? "#0056b3" : "#c82333"};
  }
`;
