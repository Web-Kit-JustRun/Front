import React from "react";
import styled from "styled-components";
import InputForm from "../Common/InputForm";
import logo from "../../img/edukit logo.png";

const RegisterComponent = (props) => {
  const {
    userId,
    userPw,
    userPw2,
    userName,
    userEmail,
    idError,
    pwError,
    pw2Error,
    nameError,
    emailError,
    handleIdChange,
    handlePwChange,
    handlePw2Change,
    handleNameChange,
    handleEmailChange,
    handleEmailDomainChange,
    handleFormSubmit,
    handleNavigate,
    emailDomain,
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
        <RegisterCard>
          <h1>회원 가입</h1>
          <Form>
            <InputWrapper>
              <InputForm
                title="아이디"
                inputTitle="ID"
                eMsgColor={idError ? "red" : "white"}
                eMsgContent={idError ? "아이디를 입력해 주세요" : ""}
                onChange={handleIdChange}
                value={userId}
              />
            </InputWrapper>
            <InputWrapper>
              <InputForm
                title="비밀번호"
                inputTitle="Password"
                type="password"
                eMsgColor={pwError ? "red" : "white"}
                eMsgContent={pwError ? "비밀번호를 입력해 주세요" : ""}
                onChange={handlePwChange}
                value={userPw}
              />
            </InputWrapper>
            <InputWrapper>
              <InputForm
                title="비밀번호 확인"
                inputTitle="Confirm Password"
                type="password"
                eMsgColor={pw2Error ? "red" : "white"}
                eMsgContent={pw2Error ? "비밀번호가 일치하지 않습니다" : ""}
                onChange={handlePw2Change}
                value={userPw2}
              />
            </InputWrapper>
            <InputWrapper>
              <InputForm
                title="이름"
                inputTitle="Name"
                eMsgColor={nameError ? "red" : "white"}
                eMsgContent={nameError ? "이름을 입력해 주세요" : ""}
                onChange={handleNameChange}
                value={userName}
              />
            </InputWrapper>
            <InputWrapper>
              <EmailForm>
                <EmailInput>
                  <InputForm
                    title="이메일"
                    inputTitle="Email"
                    eMsgColor={emailError ? "red" : "white"}
                    eMsgContent={emailError ? "이메일을 입력해 주세요" : ""}
                    onChange={handleEmailChange}
                    value={userEmail}
                  />
                </EmailInput>
                <AtSymbol>@</AtSymbol>
                <EmailSelectWrapper>
                  <EmailSelect
                    value={emailDomain}
                    onChange={handleEmailDomainChange}
                  >
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                  </EmailSelect>
                </EmailSelectWrapper>
              </EmailForm>
            </InputWrapper>
            <ActionButton onClick={handleFormSubmit}>가입하기</ActionButton>
            <ActionButton onClick={() => handleNavigate("/login")}>
              취소
            </ActionButton>
          </Form>
        </RegisterCard>
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

const RegisterCard = styled.div`
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

const EmailForm = styled.div`
  display: flex;
  align-items: center;
`;

const EmailInput = styled.div`
  flex: 1;
`;

const AtSymbol = styled.span`
  padding: 0 5px;
  font-size: 1em;
  color: #333;
`;

const EmailSelectWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: "▼";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
    color: #4a78ba;
    font-size: 0.8em;
  }
`;

const EmailSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1em;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
`;

export default RegisterComponent;
