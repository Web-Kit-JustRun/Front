import React from "react";
import styled from "styled-components";
import LessonContainer from "../containers/LessonContainer";
import { useParams } from "react-router-dom";

const Lesson = () => {
  const { course_id } = useParams();

  return (
    <LessonPageBlock>
      <LessonContainer courseId={course_id} />
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
