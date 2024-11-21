import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userStore } from "../store/userStore";
import { currentLessonIdStore } from "../store/lessonStore";

const MainPage = () => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userState = useRecoilValue(userStore);
  const setCurrentLessonId = useSetRecoilState(currentLessonIdStore);
  const { token: authToken, user: userData } = userState;

  // 로드맵 더미 데이터
  const roadmap = [
    { date: "2024-11-21", task: "알고리즘 과제 제출" },
    { date: "2024-11-22", task: "데이터베이스 시험 준비" },
    { date: "2024-11-23", task: "운영체제 프로젝트 미팅" },
    { date: "2024-11-24", task: "수업 정리 및 복습" },
    { date: "2024-11-25", task: "알고리즘 팀 과제 발표" },
  ];

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rankingsResponse, quizzesResponse, coursesResponse] =
          await Promise.all([
            axios.get(process.env.REACT_APP_HOST_URL + "/api/ranking/top"),
            axios.get(process.env.REACT_APP_HOST_URL + "/api/quizzes/recent", {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
            axios.get(
              process.env.REACT_APP_HOST_URL +
                `/api/users/${userData.userId}/courses`,
              {
                headers: { Authorization: `Bearer ${authToken}` },
              },
            ),
          ]);

        setRankings(rankingsResponse.data);
        setRecentQuizzes(quizzesResponse.data);
        setCourses(coursesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userData, authToken]);

  console.log("🚀 ~ MainPage ~ rankings:", rankings, recentQuizzes);

  const goToLessonPage = (course_id) => {
    setCurrentLessonId(course_id);
    navigate(`/lesson`);
  };

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Sidebar>
        <h2>로드맵</h2>
        {roadmap.map((item, index) => (
          <p key={index}>{`${item.date}: ${item.task}`}</p>
        ))}
      </Sidebar>
      <Content>
        <CoursesContainer>
          <h3>수업 목록</h3>
          {courses.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>과목명</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.course_id}
                    onClick={() => goToLessonPage(course.course_id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{course.course_name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <NoDataMessage>수강 중인 과목이 없습니다.</NoDataMessage>
          )}
        </CoursesContainer>
        <QuizzesContainer>
          <h3>퀴즈 게시판</h3>
          {recentQuizzes.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>과목명</th>
                  <th>퀴즈 제목</th>
                </tr>
              </thead>
              <tbody>
                {recentQuizzes.map((quiz) => (
                  <tr
                    key={quiz.quiz_id}
                    // onClick={() => navigate(`/quiz/${quiz.quiz_id}`)} // 퀴즈 상세 페이지로 이동
                    style={{
                      cursor: "pointer", // 마우스 커서 변경
                    }}
                  >
                    <td>{quiz.course_name}</td>
                    <td>{quiz.title}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <NoDataMessage>등록된 퀴즈가 없습니다.</NoDataMessage>
          )}
        </QuizzesContainer>
      </Content>

      <RankingSidebar>
        <h2>랭킹</h2>
        {rankings.map((rank, index) => (
          <p key={index}>{`${index + 1}. ${rank.name} (${
            rank.ranking_points
          } pt)`}</p>
        ))}
        <NavigateButton onClick={() => navigate("/rank")}>
          랭킹 게시판으로 이동
        </NavigateButton>
      </RankingSidebar>
    </Container>
  );
};

export default MainPage;

/// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: "Arial", sans-serif;
`;

const Sidebar = styled.div`
  width: 20%;
  background-color: #ffffff;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 20px;
    color: #007bff;
    margin-bottom: 15px;
  }

  p {
    font-size: 14px;
    color: #555;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
  }
`;

const Content = styled.div`
  width: 60%;
  padding: 20px;
  background-color: #ffffff;
  margin: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  h3 {
    font-size: 22px;
    color: #333;
    margin-bottom: 15px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
  }
`;

const RankingSidebar = styled.div`
  width: 20%;
  background-color: #ffffff;
  padding: 20px;
  border-left: 1px solid #e0e0e0;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 20px;
    color: #007bff;
    margin-bottom: 15px;
  }

  p {
    font-size: 14px;
    color: #555;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
  }
`;

const NavigateButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }
`;

const CoursesContainer = styled.div`
  margin-bottom: 30px;
  max-height: 300px; /* 스크롤이 생길 최대 높이 */
  overflow-y: auto; /* 스크롤 활성화 */
  padding-right: 10px; /* 스크롤바와 콘텐츠 간격 조정 */
  border: 1px solid #ffffff; /* 테두리 추가 */
  border-radius: 5px;
  background-color: #ffffff; /* 배경색 추가 */

  h3 {
    font-size: 18px;
    color: #007bff;
    margin-bottom: 10px;
    border-bottom: 2px solid #ddd; /* 제목 아래 구분선 */
    padding-bottom: 5px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0; /* 행 구분선 */
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const QuizzesContainer = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 18px;
    color: #007bff;
    margin-bottom: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;
  text-align: left;

  th {
    background-color: #007bff;
    color: #ffffff;
    padding: 10px;
    border: 1px solid #ddd;
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;
    color: #555;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #007bff;
  text-align: center;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  color: red;
  text-align: center;
  margin-top: 50px;
`;

const NoDataMessage = styled.div`
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
`;
