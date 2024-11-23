import React from "react";
import styled from "styled-components";
import ChangePwContainer from "../containers/ChangePwContainer";

const ChangePw = () => {
  // const { course_id } = useParams();

  return (
    <ChangePwBlock>
      <ChangePwContainer />
    </ChangePwBlock>
  );
};

const ChangePwBlock = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ChangePw;
