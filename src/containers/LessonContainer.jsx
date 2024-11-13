import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LessonContainer = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const authToken = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 전체 수강 과목
        const coursesResponse = await axios.get(
          `http://localhost:8080/api/users/${userData.user_id}/courses`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setCourses(coursesResponse.data);

        // 더미 공지사항
        setAnnouncements([
          { id: 1, title: "공지사항 1", date: "2023-10-01" },
          { id: 2, title: "공지사항 2", date: "2023-10-05" },
          { id: 3, title: "공지사항 3", date: "2023-10-10" },
        ]);

        // 과제 목록
        const assignmentsResponse = await axios.get(
          `http://localhost:8080/api/courses/1/assignments`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setAssignments(assignmentsResponse.data.slice(0, 3));

        // 강의 자료
        const lecturesResponse = await axios.get(
          `http://localhost:8080/api/users/1/courses`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setLectures(lecturesResponse.data.slice(0, 3));

        // 퀴즈 리스트
        const quizzesResponse = await axios.get(
          `http://localhost:8080/api/courses/1/quizzes`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setQuizzes(quizzesResponse.data.slice(0, 3));
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchData();
  }, [authToken, userData.user_id]);

  return (
    <LessonBlock>
      <ContentSection>
        <Card>
          <h2>전체 수강 과목</h2>
          <Table>
            <tbody>
              {courses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.course_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

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
                    <td>{assignment.due_date}</td>
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
                  <tr key={lecture.course_id}>
                    <td>{lecture.course_name}</td>
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
                  <tr key={quiz.quiz_id}>
                    <td>{quiz.title}</td>
                    <td>{quiz.creation_date}</td>
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
  padding: 20px;
  background-color: #f9fafb;
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
  width: 100%;
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
