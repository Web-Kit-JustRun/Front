import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userStore } from "../store/userStore";
import { currentLessonIdStore } from "../store/lessonStore";
import { useRequest } from "../utils/useRequest";

const LessonContainer = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const userState = useRecoilValue(userStore);
  const currentLessonId = useRecoilValue(currentLessonIdStore);
  const { token: authToken, user: userData } = userState;
  const request = useRequest();

  const getAttemptStatusLabel = (status) => {
    switch (status) {
      case "correct":
        return "정답";
      case "incorrect":
        return "오답";
      case "not_attempted":
        return "풀지 않은 문제";
      default:
        return "알 수 없음";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 공지사항 데이터
        setAnnouncements([
          { id: 1, title: "기말고사 일정 공지", date: "2024.12.01." },
          { id: 2, title: "과제 제출 연장 안내", date: "2024.11.25." },
          { id: 3, title: "중간고사 성적 발표", date: "2024.11.15." },
          { id: 4, title: "강의실 변경 안내", date: "2024.11.10." },
          {
            id: 5,
            title: "학기 말 프로젝트 발표 준비 안내",
            date: "2024.11.05.",
          },
        ]);

        // 강의자료 데이터
        setLectures([
          { courseId: 1, courseName: "데이터베이스 설계 기초" },
          { courseId: 2, courseName: "운영체제 주요 개념" },
          { courseId: 3, courseName: "알고리즘 시간복잡도" },
          { courseId: 4, courseName: "소프트웨어 공학 요구사항 분석" },
          { courseId: 5, courseName: "네트워크 통신 프로토콜" },
        ]);

        // 과제 목록 데이터
        const assignmentsData = await request(
          `/api/courses/${currentLessonId}/assignments`,
          "GET",
        );
        setAssignments(assignmentsData.slice(0, 5)); // 5개로 제한

        // 퀴즈 리스트 데이터
        const quizzesData = await request(
          `/api/courses/${currentLessonId}/quizzes`,
          "GET",
        );
        setQuizzes(quizzesData.slice(0, 5)); // 5개로 제한
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchData();
  }, [authToken, currentLessonId, request, userData.userId]);

  return (
    <LessonBlock>
      <ContentSection>
        <Card>
          <h2>공지사항</h2>
          <Table>
            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td>{announcement.title}</td>
                  <td style={{ textAlign: "right" }}>{announcement.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ViewAllButton onClick={() => navigate("/announcements")}>
            전체보기
          </ViewAllButton>
        </Card>

        <ThreeColumnSection>
          <Card>
            <h3>과제 목록</h3>
            <Table>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.assignment_id}>
                    <td>{assignment.title}</td>
                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ViewAllButton onClick={() => navigate("/assignments")}>
              전체보기
            </ViewAllButton>
          </Card>

          <Card>
            <h3>강의 자료</h3>
            <Table>
              <tbody>
                {lectures.map((lecture) => (
                  <tr key={lecture.courseId}>
                    <td>{lecture.courseName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ViewAllButton onClick={() => navigate("/lectures")}>
              전체보기
            </ViewAllButton>
          </Card>

          <Card>
            <h3>퀴즈 리스트</h3>
            <Table>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.quizId}>
                    <td>{String(quiz.quizId).padStart(4, "0")}</td>
                    <td>{quiz.title}</td>
                    <td>{getAttemptStatusLabel(quiz.attemptStatus)}</td>
                    <td>{new Date(quiz.creationDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ViewAllButton onClick={() => navigate("/quizzes")}>
              전체보기
            </ViewAllButton>
          </Card>
        </ThreeColumnSection>
      </ContentSection>
    </LessonBlock>
  );
};

// Styled Components
const LessonBlock = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const ContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex-grow: 1;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  h2,
  h3 {
    margin-bottom: 15px;
    color: #333;
  }
`;

const ThreeColumnSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  td {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const ViewAllButton = styled.button`
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

export default LessonContainer;
