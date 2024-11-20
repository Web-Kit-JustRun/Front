import styled from "styled-components";
import InputForm from "../Common/InputForm";
import logo from "../../img/edukit logo.png"; // 로고 경로

const SearchPwComponent = (props) => {
  const {
    userId,
    activeButton,
    idError,
    handleEmailChange,
    handleEmailDomainChange,
    handleFormSubmit,
    handleNavigate,
    emailDomain,
    handleIdChange,
    emailError,
    userEmail,
  } = props;

  return (
    <SearchPwBlock>
      <LogoSection>
        <LogoContainer>
          <Logo src={logo} alt="금오공대 LMS" />
          <LogoText>금오공대 LMS</LogoText>
        </LogoContainer>
      </LogoSection>
      <FormSection>
        <SearchCard>
          <ButtonContainer>
            <StyledButton
              onClick={() => handleNavigate("/searchId")}
              active={activeButton === "searchId"}
            >
              아이디 찾기
            </StyledButton>
            <StyledButton
              onClick={() => handleNavigate("/searchPw")}
              active={activeButton === "searchPw"}
            >
              비밀번호 찾기
            </StyledButton>
          </ButtonContainer>
          <InputWrapper>
            <Label>아이디</Label>
            <InputForm
              eMsgColor={idError ? "red" : "white"}
              eMsgContent={idError ? "아이디를 입력해 주세요" : ""}
              onChange={handleIdChange}
              value={userId}
            />
          </InputWrapper>
          <EmailForm>
            <InputWrapper>
              <Label>이메일</Label>
              <InputForm
                eMsgColor={emailError ? "red" : "white"}
                eMsgContent={emailError ? "이메일을 입력해 주세요" : ""}
                onChange={handleEmailChange}
                value={userEmail}
              />
            </InputWrapper>
            <AtSymbol>@</AtSymbol>
            <InputWrapper>
              <EmailSelectWrapper>
                <EmailSelect
                  value={emailDomain}
                  onChange={handleEmailDomainChange}
                >
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="custom">직접 입력</option>
                </EmailSelect>
              </EmailSelectWrapper>
            </InputWrapper>
          </EmailForm>
          <ActionButton onClick={handleFormSubmit}>확인</ActionButton>
          <CancelButton onClick={() => handleNavigate("/login")}>
            취소
          </CancelButton>
        </SearchCard>
      </FormSection>
    </SearchPwBlock>
  );
};

// Styled Components
const SearchPwBlock = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555555;
  margin-bottom: 5px;
  display: block;
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

const SearchCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
`;

const StyledButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: ${(props) => (props.active ? "#4491ff" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#3778d9" : "#f4f4f4")};
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  margin-bottom: 20px;

  label {
    font-size: 14px;
    color: #555555;
    margin-bottom: 5px;
    display: block;
  }
`;

const EmailForm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AtSymbol = styled.span`
  padding: 0 5px;
  font-size: 18px;
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
  font-size: 14px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  color: #333;
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

const CancelButton = styled(ActionButton)`
  background-color: #f4f4f4;
  color: #6b6b6b;

  &:hover {
    background-color: #e0e0e0;
    color: #333;
  }
`;

export default SearchPwComponent;
