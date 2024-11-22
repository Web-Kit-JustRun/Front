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

  console.log(assignments);

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
        {user && user.userType === "professor" && (
          <button className="assignmentAddButton">과제 생성</button>
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
                <p>기한 {new Date(assignment.dueDate).toLocaleDateString()}</p>
                <p>
                  {assignment.student_score ?? 0}/{assignment.score ?? 0}
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
