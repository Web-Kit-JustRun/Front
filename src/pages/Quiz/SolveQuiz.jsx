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
  width: 95%;
  min-height: calc(100vh-100px);
  padding: 20px;
`;
