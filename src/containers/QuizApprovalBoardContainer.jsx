import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useRequest } from "../utils/useRequest";
import { currentLessonIdStore } from "../store/lessonStore";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";

const QuizApprovalBoardContainer = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState({});
  const currentLessonId = useRecoilValue(currentLessonIdStore);

  const request = useRequest();

  const fetchQuizzes = useCallback(async () => {
    try {
      const data = await request(
        `/api/courses/${currentLessonId}/quizzes/pending`,
        "GET",
      );

      if (data) {
        setQuizzes(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  }, [currentLessonId, request]);

  // useEffect로 fetchQuizzes 호출
  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);
  const handleQuizApproval = async (quizId, isApprove) => {
    const points =
      isApprove === "approve" ? selectedDifficulty[quizId] || null : null;

    if (isApprove === "approve" && points === null) {
      alert("난이도를 선택해주세요.");
      return;
    }

    try {
      const payload = {
        isApprove,
        points,
      };

      const response = await request(
        `/api/quizzes/${quizId}/approve`,
        "POST",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        alert(response.data.message);

        // 상태 업데이트: 승인/거절된 퀴즈를 리스트에서 제거

        fetchQuizzes();

        // 선택된 난이도 초기화
        setSelectedDifficulty((prev) => {
          const updated = { ...prev };
          delete updated[quizId];
          return updated;
        });
      }
    } catch (error) {
      console.error("Error approving/rejecting quiz:", error);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  const handleDifficultySelection = (quizId, points) => {
    setSelectedDifficulty((prev) => ({
      ...prev,
      [quizId]: points,
    }));
  };

  return (
    <BoardContainer>
      <Header>
        <Title>허가 대기 게시판</Title>
        <PendingCount>대기중인 퀴즈 수: {quizzes.length}</PendingCount>
      </Header>
      <QuizList>
        {quizzes.map((quiz) => (
          <QuizItem key={quiz.quizId}>
            <QuizHeader>
              <QuizTitle>{quiz.title}</QuizTitle>
              <QuizAuthor>작성자: {quiz.author}</QuizAuthor>
            </QuizHeader>
            <QuizContent>
              <SyntaxHighlighter
                language="plaintext"
                style={atomOneLight}
                customStyle={{
                  backgroundColor: "#f8f9fa", // 배경색
                  padding: "10px", // 내부 여백
                  borderRadius: "5px", // 모서리 둥글기
                  fontSize: "1rem", // 글꼴 크기
                  lineHeight: "1.5", // 줄 간격
                }}
              >
                {quiz.question}
              </SyntaxHighlighter>
            </QuizContent>
            <Choices>
              {quiz.choices.map((choice, index) => (
                <Choice key={index} isCorrect={index === quiz.correctChoice}>
                  {choice} {index === quiz.correctChoice && "(정답)"}
                </Choice>
              ))}
            </Choices>
            <DifficultyContainer>
              <DifficultyButton
                selected={selectedDifficulty[quiz.quizId] === 300}
                onClick={() => handleDifficultySelection(quiz.quizId, 300)}
              >
                상 (300pt)
              </DifficultyButton>
              <DifficultyButton
                selected={selectedDifficulty[quiz.quizId] === 200}
                onClick={() => handleDifficultySelection(quiz.quizId, 200)}
              >
                중 (200pt)
              </DifficultyButton>
              <DifficultyButton
                selected={selectedDifficulty[quiz.quizId] === 100}
                onClick={() => handleDifficultySelection(quiz.quizId, 100)}
              >
                하 (100pt)
              </DifficultyButton>
            </DifficultyContainer>
            <Actions>
              <ActionButton
                approve
                onClick={() => handleQuizApproval(quiz.quizId, "approve")}
              >
                허가
              </ActionButton>
              <ActionButton
                onClick={() => handleQuizApproval(quiz.quizId, "reject")}
              >
                거절
              </ActionButton>
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
  justify-content: space-between; /* 버튼 간 간격 유지 */
  margin: 10px 0;
  width: 90%; /* QuizList의 90% */
  margin: 10px auto; /* 수평 가운데 정렬 */
`;

const Choice = styled.div`
  flex: 1; /* 각 버튼이 동일한 비율로 공간 차지 */
  margin: 0 2.5px; /* 양쪽에 2.5px 간격으로 설정 (총 5px 간격) */
  padding: 0 10px; /* 텍스트 간격 */
  background-color: ${(props) => (props.isCorrect ? "#d4edfa" : "#f8f9fa")};
  color: ${(props) => (props.isCorrect ? "#007bff" : "#333")};
  border: 1px solid ${(props) => (props.isCorrect ? "#bee3f8" : "#ddd")};
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
  height: 30px; /* 버튼 높이 */
  line-height: 30px; /* 텍스트 세로 정렬 */
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => (props.isCorrect ? "#cfe2ff" : "#e9ecef")};
  }
`;

const DifficultyContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center;
  margin-top: 10px;
  gap: 10px; /* 버튼 간 10px 간격 */
`;
const DifficultyButton = styled.button`
  padding: 10px 20px;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.selected ? "white" : "#333")};
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  &:hover {
    background-color: ${(props) => (props.selected ? "#0056b3" : "#e9ecef")};
  }
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center;
  margin-top: 10px;
  gap: 10px; /* 버튼 간 10px 간격 */
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.approve ? "#007bff" : "#dc3545")};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => (props.approve ? "#0056b3" : "#c82333")};
  }
`;
