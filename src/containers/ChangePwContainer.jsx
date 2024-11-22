import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userStore } from "../store/userStore";
import InputForm from "../components/Common/InputForm";

const ChangePwContainer = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userState = useRecoilValue(userStore);
  const { token: authToken, user: userData } = userState;
  const {user_id} = userData

  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) =>
    setConfirmPassword(e.target.value);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 비밀번호 변경 요청 예시
      await axios.post(
        process.env.REACT_APP_HOST_URL +`/api/users/${user_id}/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${authToken}` } }
        ,"Content-Type: application/json"
      );
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login");
    } catch (error) {
      setErrorMessage("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <ChangePwContainerBlock>
      <ChangePwCard>
        <h1>비밀번호 변경</h1>
        <Form>
          <InputWrapper>
            <InputForm
            title={"현재 비밀번호"}
              type="password"
              inputTitle={"현재 비밀번호를 입력해주세요."}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </InputWrapper>
          <InputWrapper>
            <InputForm
            title={"새 비밀번호"}
              type="password"
              inputTitle={"새 비밀번호를 입력해주세요."}
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </InputWrapper>
          <InputWrapper>
            <InputForm
            title={"새 비밀번호 확인"}
              type="password"
              inputTitle={"새 비밀번호를 한 번 더 입력해주세요."}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </InputWrapper>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <ActionButton onClick={handleSubmit}>비밀번호 변경</ActionButton>
          <ActionButton onClick={() => navigate("/mypage")}>
            취소
          </ActionButton>
        </Form>
      </ChangePwCard>
    </ChangePwContainerBlock>
  );
};

export default ChangePwContainer;

const ChangePwContainerBlock = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const ChangePwCard = styled.div`
  background: #;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 400px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333333;
    text-align: center;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4491ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.3s;

  &:hover {
    background-color: #3778d9;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;
