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
      try {
        const data = await request(`/api/assignments/${assignmentId}`, "GET");
        console.log("Assignment Detail:", data); // 데이터 구조 확인용
        setAssignmentDetail(data);
      } catch (error) {
        console.error("Error fetching assignment detail:", error);
      }
    }

    fetchAssignmentDetail();
  }, [params.id, request]);

  if (!assignmentDetail) return null;

  return (
    <Container>
      <Content>
        <Title>{assignmentDetail.title}</Title>
        <Description>{assignmentDetail.content}</Description>
        <Attachment>
          첨부파일: {assignmentDetail.attachmentName ?? "없음"}
        </Attachment>
        <Deadline>
          제출 기한: {new Date(assignmentDetail.dueDate).toLocaleDateString()}
        </Deadline>
      </Content>
      <Menu>
        {userData.user.userType === "professor" ? (
          <ProfessorMenu>
            <Button>제출 명단 확인</Button>
            <Button>수정하기</Button>
            <DeleteButton>삭제하기</DeleteButton>
          </ProfessorMenu>
        ) : (
          <SubmitButton
            onClick={() => {
              navigate(`/assignments/submit/${assignmentDetail.assignmentId}`);
            }}
          >
            제출하기
          </SubmitButton>
        )}
      </Menu>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f7faff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #003366;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const Attachment = styled.p`
  font-size: 16px;
  color: #0077cc;
  margin-bottom: 10px;
`;

const Deadline = styled.p`
  font-size: 16px;
  color: #003366;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Button = styled.button`
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0055b3;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff3333;

  &:hover {
    background-color: #cc0000;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #0077cc;

  &:hover {
    background-color: #005fa3;
  }
`;

const ProfessorMenu = styled.div`
  display: flex;
  gap: 15px;
`;
