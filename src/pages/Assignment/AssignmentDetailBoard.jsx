import { useRecoilValue } from "recoil";
import { userStore } from "../../store/userStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useRequest } from "../../utils/useRequest";

export default function AssignmentDetailBoard() {
  const userData = useRecoilValue(userStore);
  const [assignmentDetail, setAssignmentDetail] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const request = useRequest();

  useEffect(() => {
    async function fetchAssignmentDetail() {
      const assignmentId = params.id;
      const data = await request(`/api/assignments/${assignmentId}`, "GET");

      setAssignmentDetail(data);
    }

    fetchAssignmentDetail();
  }, [params.id, request]);

  if (!assignmentDetail) return null;

  return (
    <div>
      <p>{assignmentDetail.title}</p>
      <p>{assignmentDetail.content}</p>
      <p>첨부파일: {assignmentDetail.attachment}</p>
      <Menu>
        <p>
          제출 기한: {new Date(assignmentDetail.dueDate).toLocaleDateString()}
        </p>
        {userData.user.userType === "professor" ? (
          <ProfessorMenu>
            <button>제출 명단 확인</button>
            <button>수정하기</button>
            <button>삭제하기</button>
          </ProfessorMenu>
        ) : (
          <button
            onClick={() => {
              navigate(`/assignments/submit/${assignmentDetail.assignment_id}`);
            }}
          >
            제출하기
          </button>
        )}
      </Menu>
    </div>
  );
}

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  height: 36px;
  & button {
    border: none;
    background: orange;
    padding: 10px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const ProfessorMenu = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
