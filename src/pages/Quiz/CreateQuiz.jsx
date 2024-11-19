import styled from "styled-components";
import CreateQuizContainer from "../../containers/Quiz/CreateQuizContainer";

const CreateQuiz = () => {
  const CreateQuizBlock = styled.div`
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
    <CreateQuizBlock>
      <CreateQuizContainer />
    </CreateQuizBlock>
  );
};

export default CreateQuiz;
