import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userStore } from "../store/userStore";
import { currentLessonIdStore } from "../store/lessonStore";

const MyPageContainer = () => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userState = useRecoilValue(userStore);
  const setCurrentLessonId = useSetRecoilState(currentLessonIdStore);
  const { token: authToken, user: userData } = userState;




  return (
    <MyPageContainerBlock>
      hello
    </MyPageContainerBlock>
  );
};

export default MyPageContainer;

const MyPageContainerBlock = styled.div``;

