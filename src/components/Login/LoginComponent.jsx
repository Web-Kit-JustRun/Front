import React from "react";
import styled from "styled-components";
import InputForm from "../Common/InputForm";
import logo from "../../img/edukit logo.png";

const LoginComponent = (props) => {
  const {
    userId,
    userPw,
    idError,
    pwError,
    handleIdChange,
    handlePwChange,
    handleFormSubmit,
    handleNavigate,
  } = props;

  return (
    <Container>
      <LogoSection>
        <LogoContainer>
          <Logo src={logo} alt="금오공대 LMS" />
          <LogoText>금오공대 LMS</LogoText>
        </LogoContainer>
      </LogoSection>
      <FormSection>
        <LoginCard>
          <h1>로그인</h1>
          <Form>
            <InputWrapper>
              <InputForm
                title={"아이디"}
                eMsgColor={idError ? "red" : "white"}
                eMsgContent={idError ? "아이디를 입력해 주세요" : ""}
                onChange={handleIdChange}
                value={userId}
                inputTitle={"아이디를 입력해주세요"}
              />
            </InputWrapper>
            <InputWrapper>
              <InputForm
                title={"비밀번호"}
                type="password"
                eMsgColor={pwError ? "red" : "white"}
                eMsgContent={pwError ? "비밀번호를 입력해 주세요" : ""}
                onChange={handlePwChange}
                value={userPw}
                inputTitle={"비밀번호를 입력해주세요"}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleFormSubmit();
                  }
                }}
              />
            </InputWrapper>
            <ActionButton onClick={handleFormSubmit}>로그인</ActionButton>
            <ActionButton onClick={() => handleNavigate("/register")}>
              회원가입
            </ActionButton>

            <ActionGroup>
              <ActionItem onClick={() => handleNavigate("/searchid")}>
                아이디 찾기
              </ActionItem>
              <ActionItem onClick={() => handleNavigate("/searchpw")}>
                비밀번호 찾기
              </ActionItem>
            </ActionGroup>
          </Form>
        </LoginCard>
      </FormSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f4f4;
`;

const LogoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e9f4ff;
`;

const LogoContainer = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 10px;
`;

const LogoText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const LoginCard = styled.div`
  background: #ffffff;
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

const Label = styled.label`
  font-size: 14px;
  color: #555555;
  margin-bottom: 5px;
  display: block;
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

const ActionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ActionItem = styled.span`
  cursor: pointer;
  color: #6b6b6b;
  font-size: 14px;
  &:hover {
    color: #000000;
  }
`;

export default LoginComponent;
