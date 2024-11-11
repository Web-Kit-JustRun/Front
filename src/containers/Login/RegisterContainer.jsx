import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterComponent from "../../components/Login/RegisterComponent";

const RegisterContainer = () => {
  const navigate = useNavigate();

  // 상태 관리: 아이디, 비밀번호, 비밀번호 확인, 이름, 이메일
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [userPw2, setPw2] = useState("");
  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("gmail.com");

  // 에러 상태 관리
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [pw2Error, setPw2Error] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // 입력 처리 함수들
  const handleIdChange = (e) => setId(e.target.value);
  const handlePwChange = (e) => setPw(e.target.value);
  const handlePw2Change = (e) => setPw2(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleEmailDomainChange = (e) => setEmailDomain(e.target.value);

  // 폼 제출 처리 함수
  const handleFormSubmit = () => {
    const fullEmail = `${userEmail}@${emailDomain}`;

    // 각 필드에 대한 에러 상태 업데이트
    setIdError(userId === "");
    setPwError(userPw === "");
    setPw2Error(userPw !== userPw2);
    setNameError(userName === "");
    setEmailError(userEmail === "");

    // 모든 입력값이 유효할 경우 회원가입 완료
    if (userId && userPw && userPw === userPw2 && userName && userEmail) {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const propData = {
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
  };

  return <RegisterComponent {...propData} />;
};

export default RegisterContainer;
