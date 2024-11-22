import styled from "styled-components";
import QuizApprovalBoardContainer from "../containers/QuizApprovalBoardContainer";

const QuizApprovalBoard = () => {
  const QuizApprovalBoardBlock = styled.div`
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
    <QuizApprovalBoardBlock>
      <QuizApprovalBoardContainer />
    </QuizApprovalBoardBlock>
  );
};

export default QuizApprovalBoard;
