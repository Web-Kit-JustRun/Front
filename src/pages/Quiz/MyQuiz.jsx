import styled from "styled-components";
import MyQuizContainer from "../../containers/Quiz/MyQuizContainer";

const MyQuiz = () => {
  const MyQuizBlock = styled.div`
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
    <MyQuizBlock>
      <MyQuizContainer />
    </MyQuizBlock>
  );
};

export default MyQuiz;
