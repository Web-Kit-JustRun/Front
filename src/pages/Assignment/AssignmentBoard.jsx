import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentLessonIdStore } from "../../store/lessonStore";
import { userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../utils/useRequest";

export default function AssignmentBoard() {
  const userData = useRecoilValue(userStore);
  const user = userData.user;
  const token = userData.token;
  const currentLessonId = useRecoilValue(currentLessonIdStore);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const request = useRequest();

  useEffect(() => {
    async function fetchLessonDetail() {
      try {
        const data = await request(
          `/api/courses/${currentLessonId}/assignments`,
          "GET",
        );
        setAssignments(data);
      } catch (error) {
        console.error(error);
        setError("데이터를 로드하는 중 오류가 발생했습니다.");
      }
    }

    fetchLessonDetail();
  }, [currentLessonId, request, token]);

  if (error)
    return (
      <Layout>
        <Header>
          <ErrorParagraph>
            데이터를 로드하는 도중 오류가 발생했습니다.
          </ErrorParagraph>
        </Header>
      </Layout>
    );

  return (
    <Layout>
      <Header>
        <Title>과제 목록</Title>
        {user && user.userType === "professor" && (
          <AddButton>과제 생성</AddButton>
        )}
      </Header>
      <Table>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <TableCell
              key={assignment.assignmentId}
              onClick={() => {
                navigate(`/assignments/${assignment.assignmentId}`);
              }}
            >
              <p>{assignment.title}</p>
              <div>
                <p>기한: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                <Score>
                  {assignment.student_score ?? 0}/{assignment.score ?? 0}
                </Score>
              </div>
            </TableCell>
          ))
        ) : (
          <EmptyMessage>과제가 없습니다.</EmptyMessage>
        )}
      </Table>
    </Layout>
  );
}

// Styled Components
const Layout = styled.div`
  padding: 20px 40px;
  background-color: #f7faff;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #003366;
  margin: 0;
`;

const AddButton = styled.button`
  font-size: 16px;
  border: none;
  background: #003366;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #0055b3;
  }
`;

const Table = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const TableCell = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ececec;
  cursor: pointer;
  transition: background-color 0.3s ease;

  & > div {
    display: flex;
    justify-content: space-between;
  }

  &:hover {
    background: #e6f2ff;
  }

  p {
    margin: 5px 0;
    color: #003366;
  }
`;

const Score = styled.p`
  font-weight: bold;
  color: #0077cc;
`;

const ErrorParagraph = styled.p`
  color: #ff3333;
  font-size: 16px;
  text-align: center;
`;

const EmptyMessage = styled.p`
  color: #999;
  text-align: center;
  font-size: 16px;
  margin: 20px 0;
`;
