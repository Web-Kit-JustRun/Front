import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../utils/useRequest";
const MyQuizContainer = () => {
  const navigate = useNavigate();
  const request = useRequest();
  const [quizzes, setQuizzes] = useState([]);
  const course_id = 1;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await request(`/api/courses/${course_id}/quizzes`, "GET");
        data && setQuizzes(data); // 데이터를 상태로 저장
      } catch (error) {
        console.error("퀴즈 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchQuizzes(); // 컴포넌트 마운트 시 데이터 가져오기
  }, [request]);

  const handleRowClick = (quiz) => {
    navigate("/solvequiz", { state: { quiz } }); // 퀴즈 데이터를 state로 전달
  };

  console.log("데이터 들왔니", quizzes);

  return (
    <MyQuizContainerBlock>
      <TitleContainer>
        <h1>내 퀴즈</h1>
        <RegisterButton>등록하기</RegisterButton>
      </TitleContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>문제</TableHeader>
              <TableHeader>문제 제목</TableHeader>
              <TableHeader>상태</TableHeader>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.quiz_id} onClick={() => handleRowClick(quiz)}>
                <TableCell>{quiz.quiz_id}</TableCell>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>
                  <StatusButton status={quiz.status}>
                    {quiz.status === "approved"
                      ? "등록완료"
                      : quiz.status === "rejected"
                        ? "등록거절"
                        : "등록대기"}
                  </StatusButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      {quizzes.length === 0 && <Loading>불러올 데이터가 없습니다.</Loading>}
    </MyQuizContainerBlock>
  );
};

export default MyQuizContainer;

// Styled Components
const MyQuizContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  overflow-y: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 70vh; /* 스크롤 허용 높이 제한 */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #007bff;
  color: white;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
`;

const StatusButton = styled.div`
  display: inline-block;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
  color: white;
  background-color: ${(props) =>
    props.status === "approved"
      ? "green"
      : props.status === "rejected"
        ? "red"
        : "gray"};
`;

const Loading = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: gray;
`;
