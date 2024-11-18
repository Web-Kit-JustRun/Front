import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentLessonIdStore } from "../store/lessonStore";
import axios from "axios";
import { userStore } from "../store/userStore";
import styled from "styled-components";

export default function AssignmentBoard() {
  const user = useRecoilValue(userStore).user;
  const currentLessonId = useRecoilValue(currentLessonIdStore);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchLessonDetail() {
      const result = await axios.get(
        process.env.REACT_APP_HOST_URL +
          `/api/courses/${currentLessonId}/assignments`
      );

      setAssignments(result.data);
    }

    fetchLessonDetail();
  }, [currentLessonId]);

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
            <TableCell key={assignment.assignment_id}>
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
