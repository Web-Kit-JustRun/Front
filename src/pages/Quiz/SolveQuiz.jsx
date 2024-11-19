import styled from "styled-components";
import SolveQuizContainer from "../../containers/Quiz/SolveQuizContainer";

const SolveQuiz = () => {
  return (
    <SolveQuizBlock>
      <SolveQuizContainer />
    </SolveQuizBlock>
  );
};

export default SolveQuiz;
const SolveQuizBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;
