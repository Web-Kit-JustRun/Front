import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPageContainer = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get(
          `http://localhost:8080/api/users/${userData.user_id}/courses`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchData();
  }, [userData, authToken]);

  const goToLessonPage = (courseId) => {
    navigate(`/lesson/${courseId}`);
  };

  return (
    <MainPageBlock>
      <h1>Main Page</h1>
      <Card>
        <h2>전체 수강 과목</h2>
        <Table>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.course_id}
                onClick={() => goToLessonPage(course.course_id)}
              >
                <td>{course.course_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <NavigateButton onClick={() => navigate("/rank")}>
        Go to Rank Page
      </NavigateButton>
    </MainPageBlock>
  );
};

const MainPageBlock = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavigateButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
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

export default MainPageContainer;
