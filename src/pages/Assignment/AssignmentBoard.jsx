import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { currentLessonIdStore } from "../../store/lessonStore";
import { userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

export default function AssignmentBoard() {
  const userData = useRecoilValue(userStore);
  const user = userData.user;
  const token = userData.token;
  const currentLessonId = useRecoilValue(currentLessonIdStore);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  console.log(currentLessonId);

  useEffect(() => {
    async function fetchLessonDetail() {
      try {
        const result = await axios.get(
          process.env.REACT_APP_HOST_URL +
            `/api/courses/${currentLessonId}/assignments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setAssignments(result.data);
      } catch (error) {
        console.error(error);
        setError("데이터를 로드하는 중 오류가 발생했습니다.");
      }
    }

    fetchLessonDetail();
  }, [currentLessonId, token]);

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
        <p>과제</p>
        {user && user.user_type === "professor" && (
          <button className="assignmentAddButton">과제 생성</button>
        )}
      </Header>
      <Table>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <TableCell
              key={assignment.assignment_id}
              onClick={() => {
                navigate(`/assignments/${assignment.assignment_id}`);
              }}
            >
              <p>{assignment.title}</p>
              <div>
                <p>기한 {new Date(assignment.due_date).toLocaleDateString()}</p>
                <p>
                  {assignment.student_score ?? 0}/{assignment.score}
                </p>
              </div>
            </TableCell>
          ))
        ) : (
          <p>과제가 없습니다.</p>
        )}
      </Table>
    </Layout>
  );
}

const ErrorParagraph = styled.p`
  color: red;
`;

const TableCell = styled.div`
  padding: 10px;
  & > div {
    display: flex;
    gap: 30px;
    cursor: pointer;
  }
  border-bottom: 1px solid #dedede;
  & p {
    margin: 10px 0;
  }
  &:hover {
    background: #dedede;
  }
`;

const Layout = styled.div`
  padding: 0 40px;
`;

const Table = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 200px 30px; */

  & * {
    white-space: nowrap;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  & > :not(.assignmentAddButton) {
    font-size: 30px;
  }
  & > .assignmentAddButton {
    font-size: 20px;
    border: none;
    background: orange;
    color: white;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;
