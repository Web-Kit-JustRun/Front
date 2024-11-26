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
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Lesson;
