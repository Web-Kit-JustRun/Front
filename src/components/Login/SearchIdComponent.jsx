import styled from "styled-components";
import InputForm from "../Common/InputForm";

const SearchIdComponent = (props) => {
  const {
    userEmail,
    handleEmailChange,
    handleFormSubmit,
    handleNavigate,
    handleEmailDomainChange,
    activeButton,
    emailError,
    emailDomain,
  } = props;

  return (
    <SearchBlock>
      <h1>아이디 찾기 페이지</h1>
      <ButtonContainer>
        <Button
          onClick={() => handleNavigate("/searchId")}
          active={activeButton === "searchId"}
        >
          아이디 찾기
        </Button>
        <Button
          onClick={() => handleNavigate("/searchPw")}
          active={activeButton === "searchPw"}
        >
          비밀번호 찾기
        </Button>
      </ButtonContainer>
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
        <InputWrapper>
          <EmailSelectWrapper>
            <EmailSelect value={emailDomain} onChange={handleEmailDomainChange}>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="hanmail.net">hanmail.net</option>
            </EmailSelect>
          </EmailSelectWrapper>
        </InputWrapper>
      </EmailForm>
      <ConfirmButton onClick={handleFormSubmit}>확인</ConfirmButton>
      <CancelButton onClick={() => handleNavigate("/login")}>취소</CancelButton>
    </SearchBlock>
  );
};

const AtSymbol = styled.span`
  padding: 0 5px;
  font-size: 1em;
  color: #333;
  margin-left: 15px;
`;

const EmailInput = styled.div`
  margin-top: 3px;
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
  border-bottom: 1px solid grey;
`;

const EmailSelectWrapper = styled.div`
  position: relative;
  width: 110%;

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

const EmailForm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  background-color: ${(props) => (props.active ? "#4491ff" : "white")};
  color: ${(props) => (props.active ? "white" : "#000")};
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #4a78ba;
    color: white;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-top: 6px;

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border-radius: 4px;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: #4491ff;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #4a78ba;
  }
`;

const CancelButton = styled.span`
  cursor: pointer;
  color: #6b6b6b;
  text-decoration: underline;
  &:hover {
    color: #000000;
  }
`;

export default SearchIdComponent;
