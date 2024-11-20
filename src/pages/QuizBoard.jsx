import styled from "styled-components";
import QuizBoardContainer from "../containers/QuizBoardContainer";

const QuizBoard = () => {
  const QuizBoardBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
  `;

  return (
    <QuizBoardBlock>
      <QuizBoardContainer />
    </QuizBoardBlock>
  );
};

export default QuizBoard;
