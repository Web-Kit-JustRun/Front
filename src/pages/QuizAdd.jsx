import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentLessonIdStore } from "../store/lessonStore";
import axios from "axios";
import { userStore } from "../store/userStore";
import styled from "styled-components";

export default function QuizAdd() {
  const user = useRecoilValue(userStore).user;
  const currentLessonId = useRecoilValue(currentLessonIdStore);

  return (
    <div>
      <h1>asdsad</h1>
    </div>
  );
}
