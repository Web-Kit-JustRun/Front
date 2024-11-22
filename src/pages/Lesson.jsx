import React from "react";
import styled from "styled-components";
import LessonContainer from "../containers/LessonContainer";

const Lesson = () => {
  // const { courseId } = useParams();

  return (
    <LessonPageBlock>
      <LessonContainer />
    </LessonPageBlock>
  );
};

const LessonPageBlock = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Lesson;
