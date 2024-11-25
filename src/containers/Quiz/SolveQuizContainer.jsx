import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentQuizIdStore } from "../../store/quizStore";
import { useRequest } from "../../utils/useRequest";
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

const SolveQuizContainer = () => {
  const quizId = useRecoilValue(currentQuizIdStore); // Recoil에서 퀴즈 ID 가져오기
  const [quiz, setQuiz] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0); // 진행률 상태
  const request = useRequest();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!quizId) return; // 퀴즈 ID가 없으면 요청하지 않음
      try {
        const data = await request(`/api/quizzes/${quizId}`, "GET");
        setQuiz(data);
      } catch (error) {
        alert("퀴즈 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchQuizData();
  }, [quizId, request]);

  const handleChoiceClick = (index) => {
    setSelectedChoice(index);
  };

  const handleSubmit = async () => {
    if (selectedChoice === null) {
      alert("답안을 선택해주세요!");
      return;
    }

    if (!window.confirm("답을 제출하시겠습니까?")) return;

    setIsSubmitting(true);
    setProgress(0); // 진행률 초기화

    // ProgressBar 증가 시뮬레이션
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await request(`/api/quizzes/${quizId}/attempt`, "POST", {
        selectedChoice,
      });

      clearInterval(interval); // 진행률 업데이트 중지
      setProgress(100); // 진행 완료

      setTimeout(() => {
        if (response.isCorrect) {
          alert("정답입니다!");
          navigate("/quizzes");
        } else {
          alert("오답입니다. 다시 시도해주세요!");
          setIsSubmitting(false); // 오답인 경우 다시 제출 가능
          setProgress(0); // 진행률 초기화
        }
      }, 500);
    } catch (error) {
      clearInterval(interval);
      setProgress(0);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!quiz) {
    return <div>퀴즈 데이터를 불러오는 중...</div>;
  }

  const chunkedChoices = [];
  for (let i = 0; i < quiz.choices.length; i += 2) {
    chunkedChoices.push(quiz.choices.slice(i, i + 2));
  }

  return (
    <SolveQuizContainerBlock>
      <HeaderContainer>
        <h1>퀴즈 풀기</h1>
        <p>문제 ID: {quiz.quizId}</p>
        <p>과정 이름: {quiz.courseName}</p>
        <p>제목: {quiz.title}</p>
        <p>
          생성 날짜: {new Date(quiz.creationDate).toLocaleDateString("ko-KR")}
        </p>
        <QuestionContainer>
          <SyntaxHighlighter language="javascript" style={atomOneLight}>
            {quiz.question}
          </SyntaxHighlighter>
        </QuestionContainer>
      </HeaderContainer>
      <ChoicesContainer>
        {chunkedChoices.map((row, rowIndex) => (
          <ChoiceRow key={rowIndex}>
            {row.map((choice, index) => (
              <Choice
                key={index}
                isSelected={selectedChoice === rowIndex * 2 + index + 1}
                onClick={() => handleChoiceClick(rowIndex * 2 + index + 1)}
              >
                {choice}
              </Choice>
            ))}
          </ChoiceRow>
        ))}
      </ChoicesContainer>
      <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
      {isSubmitting && (
        <ProgressBar
          completed={progress}
          isLabelVisible={false}
          height="10px"
          bgColor="#007bff"
          baseBgColor="#f5f5f5"
        />
      )}
    </SolveQuizContainerBlock>
  );
};

export default SolveQuizContainer;

// Styled Components
const SolveQuizContainerBlock = styled.div`
  width: 100%;
  height: 100vh; /* 화면 전체 높이 */
  padding: 20px;
  background-color: #f0f8ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const HeaderContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const ChoiceRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const Choice = styled.div`
  width: 30%; /* 화면 너비의 30% */
  height: 50px; /* 높이는 50px */
  margin: 10px 0;
  padding: 10px; /* 패딩 조정 */
  border: 2px solid ${({ isSelected }) => (isSelected ? "#007bff" : "#ccc")};
  background-color: ${({ isSelected }) => (isSelected ? "#e6f7ff" : "#fff")};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #e6f7ff;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const QuestionContainer = styled.div`
  width: 80%; /* 너비 제한 */
  margin: 0 auto; /* 중앙 정렬 */
`;
