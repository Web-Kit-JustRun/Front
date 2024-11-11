import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchPwComponent from "../../components/Login/SearchPwComponent";

const SearchPwContainer = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [userId, setUserId] = useState("");
  const [idError, setIdError] = useState(false);
  const [emailDomain, setEmailDomain] = useState("gmail.com");
  const [userEmail, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  // 이메일 처리
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleEmailDomainChange = (e) => setEmailDomain(e.target.value);

  // 아이디 입력 처리
  const handleIdChange = (e) => {
    setUserId(e.target.value);
  };

  // 폼 제출 처리
  const handleFormSubmit = () => {
    let hasError = false;

    // 아이디가 비어있을 때 에러 처리
    if (userId === "") {
      setIdError(true);
      hasError = true;
    } else {
      setIdError(false);
    }

    // 이메일이 비어있을 때 에러 처리
    if (userEmail === "") {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    // 에러가 없을 때만 제출 처리
    if (!hasError) {
      alert("비밀번호 찾기 요청이 완료되었습니다.");
      navigate("/login");
    }
  };

  // 네비게이션 처리
  const handleNavigate = (path) => {
    navigate(path);
  };

  // propData로 전달
  const propData = {
    userId,
    activeButton: "searchPw",
    idError,
    handleEmailChange,
    handleEmailDomainChange,
    handleFormSubmit,
    handleNavigate,
    emailDomain,
    handleIdChange,
    emailError,
    userEmail,
  };

  return <SearchPwComponent {...propData} />;
};

export default SearchPwContainer;
