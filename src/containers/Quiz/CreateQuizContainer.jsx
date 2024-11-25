import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userStore } from "../../store/userStore";
import { currentLessonIdStore } from "../../store/lessonStore";
import { useRequest } from "../../utils/useRequest";

const CreateQuizContainer = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctChoice, setCorrectChoice] = useState(null);
  const userData = useRecoilValue(userStore);
  const currentLessonId = useRecoilValue(currentLessonIdStore);
  const request = useRequest();
  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleChoiceSelection = (index) => {
    setCorrectChoice(index + 1); // 보기 번호(1부터 시작)를 저장
  };
  const handleSubmit = async () => {
    // 유효성 검사
    if (
      !title ||
      !question ||
      choices.some((choice) => !choice) ||
      correctChoice === null
    ) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      // 요청 전송
      await request(
        `/api/courses/${currentLessonId}/quizzes/add`,
        "POST",
        {
          title: title,
          question: question,
          choices: choices,
          correctChoice: correctChoice,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      alert("퀴즈가 성공적으로 등록되었습니다.");
      navigate("/myquiz");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(
          `퀴즈 등록 중 오류가 발생했습니다: ${error.response.data.message}`,
        );
      } else {
        alert("퀴즈 등록 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <QuizContainer>
      <TitleInput
        placeholder="문제 제목 입력 - (클릭하여 원하는 제목을 입력할 수 있다)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <QuestionInput
        placeholder="문제 내용, 설명 입력 - (클릭하여 본문 내용을 입력할 수 있다)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <ChoicesContainer>
        {choices.map((choice, index) => (
          <ChoiceRow key={index}>
            <input
              type="text"
              placeholder={`${index + 1}번 보기 입력`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            />
            <input
              type="radio"
              name="correctChoice"
              checked={correctChoice === index + 1} // 번호(1부터 시작) 비교
              onChange={() => handleChoiceSelection(index)}
            />
          </ChoiceRow>
        ))}
      </ChoicesContainer>
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>제출 버튼</SubmitButton>
        <CancelButton onClick={() => navigate(-1)}>취소 버튼</CancelButton>
      </ButtonContainer>
    </QuizContainer>
  );
};

export default CreateQuizContainer;

// Styled Components
const QuizContainer = styled.div`
  width: 70%; /* 전체 화면의 70% */
  max-width: 960px;
  margin: 20px auto;
  padding: 40px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: Arial, sans-serif;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const QuestionInput = styled.textarea`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  height: 200px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none; /* 크기 조절 불가능 */
`;

const ChoicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ChoiceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 48%;

  input[type="text"] {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  input[type="radio"] {
    transform: scale(1.5);
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  padding: 12px 25px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 12px 25px;
  font-size: 18px;
  background-color: #ddd;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;
