import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userStore } from "../store/userStore";
import { currentLessonIdStore } from "../store/lessonStore";
import { useRequest } from "../utils/useRequest";

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
  const request = useRequest();

  const generateTimeline = () => {
    const today = new Date();
    const timeline = [];

    const events = [
      { dateOffset: -5, task: "데이터베이스 기말 보고서 초안 작성" },
      { dateOffset: -4, task: "운영체제 퀴즈 (오전 10시 ~ 11시)" },
      { dateOffset: -3, task: "소프트웨어 공학 중간 발표 준비" },
      { dateOffset: -2, task: "프로그래밍 기초 실습 / 코드 리뷰" },
      { dateOffset: -1, task: "과제 제출 마감: 컴퓨터 네트워크 (자정까지)" },
      {
        dateOffset: 0,
        task: "중간고사 (오후 2시 ~ 4시) / 팀 프로젝트 발표 준비",
      },
      { dateOffset: 1, task: "캡스톤 디자인 발표 (오후 3시 ~ 5시)" },
      { dateOffset: 2, task: "기말고사 대비 스터디 모임 (오후 7시)" },
      { dateOffset: 3, task: "알고리즘 문제 풀이 세션 (오전 10시 ~ 12시)" },
      { dateOffset: 4, task: "기술 세미나 참여: AI와 미래 (오후 5시 ~ 7시)" },
      { dateOffset: 5, task: "수업 프로젝트 마감일: 웹 개발 프로젝트" },
    ];

    for (const event of events) {
      const date = new Date(today);
      date.setDate(today.getDate() + event.dateOffset);
      timeline.push({
        date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
        task: event.task,
      });
    }

    return timeline;
  };

  const roadmap = generateTimeline();

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rankingsData, quizzesData, coursesData] = await Promise.all([
          request("/api/ranking/top", "GET"),
          request("/api/quizzes/recent", "GET"),
          request(`/api/users/${userData.userId}/courses`, "GET"),
        ]);

        setRankings(rankingsData);
        setRecentQuizzes(quizzesData);
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userData, authToken, request]);

  // console.log("🚀 ~ MainPage ~ rankings:", rankings, recentQuizzes);

  const goToLessonPage = (courseId) => {
    setCurrentLessonId(courseId);
    navigate(`/lesson`);
  };

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Sidebar>
        <h2>일정</h2>
        <ul className="timeline">
          {roadmap.map((item, index) => (
            <li className="timeline-item" key={index}>
              <span className="timeline-marker"></span>
              {index < roadmap.length - 1 && (
                <span className="timeline-line"></span>
              )}
              <div className="timeline-card">
                <h4>{item.date}</h4>
                <p>{item.task}</p>
              </div>
            </li>
          ))}
        </ul>
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
                    key={course.courseId}
                    onClick={() => goToLessonPage(course.courseId)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{course.courseName}</td>
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
                    key={quiz.quizId}
                    // onClick={() => navigate(`/quiz/${quiz.quizId}`)} // 퀴즈 상세 페이지로 이동
                    style={{
                      cursor: "pointer", // 마우스 커서 변경
                    }}
                  >
                    <td>{quiz.courseName}</td>
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
            rank.rankingPoints
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
  font-family: "Arial", sans-serif;
`;

const Sidebar = styled.div`
  width: 20%;
  position: relative;
  top: 20px;
  height: calc(100vh - 80px);
  padding: 20px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 넘칠 경우 스크롤 활성화 */
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */

  &::-webkit-scrollbar {
    display: none; /* Chrome 및 Safari에서 스크롤바 숨기기 */
  }

  h2 {
    font-size: 20px;
    color: #007bff;
    margin-bottom: 15px;
  }

  /* 타임라인 스타일 */
  .timeline {
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .timeline-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .timeline-item:last-child {
    margin-bottom: 0;
  }

  .timeline-marker {
    width: 12px;
    height: 12px;
    background-color: #007bff;
    border-radius: 50%;
    position: relative;
    margin-right: 20px;
  }

  .timeline-line {
    width: 2px;
    background-color: #007bff;
    position: absolute;
    top: 0;
    left: 5px;
    bottom: 0;
  }

  .timeline-card {
    flex: 1;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #555;
    font-size: 14px;
  }

  .timeline-card h4 {
    margin: 0 0 5px;
    font-size: 16px;
    color: #333;
  }

  .timeline-card p {
    margin: 0;
    font-size: 14px;
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
  height: calc(100vh - 80px);
  position: relative;
  top: 20px;
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
