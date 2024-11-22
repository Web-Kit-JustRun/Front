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
  const [lectures, setLectures] = useState([]); // 강의자료 더미 데이터
  const [quizzes, setQuizzes] = useState([]);

  const userState = useRecoilValue(userStore);
  const currentLessonId = useRecoilValue(currentLessonIdStore);
  const { token: authToken, user: userData } = userState;
  const request = useRequest();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 더미 공지사항 설정
        setAnnouncements([
          { id: 1, title: "공지사항 1", date: "2023-10-01" },
          { id: 2, title: "공지사항 2", date: "2023-10-05" },
          { id: 3, title: "공지사항 3", date: "2023-10-10" },
        ]);

        // 더미 강의자료 설정
        setLectures([
          { courseId: 1, courseName: "데이터베이스 개론" },
          { courseId: 2, courseName: "운영체제" },
          { courseId: 3, courseName: "알고리즘 입문" },
        ]);

        // 과제 목록 API 호출
        const assignmentsData = await request(
          `/api/courses/${currentLessonId}/assignments`,
          "GET",
        );
        setAssignments(assignmentsData.slice(0, 3));

        // 퀴즈 리스트 API 호출
        const quizzesData = await request(
          `/api/courses/${currentLessonId}/quizzes/list`,
          "GET",
        );
        setQuizzes(quizzesData.slice(0, 3));
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
                  <td>{announcement.date}</td>
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
                    <td>{quiz.title}</td>
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

const LessonBlock = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f9fafb;
  width: 80%;
`;

const ContentSection = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  /* width: 100%; */
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
