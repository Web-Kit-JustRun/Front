import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIdComponent from "../../components/Login/SearchIdComponent";

const SearchIdContainer = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailDomain, setEmailDomain] = useState("gmail.com");

  const handleEmailDomainChange = (e) => setEmailDomain(e.target.value);

  // 이메일 입력 처리
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
    if (e.target.value !== "") {
      setEmailError(false); // 이메일 입력 시 에러 메시지 숨기기
    }
  };

  // 아이디 찾기 폼 제출 처리
  const handleFormSubmit = () => {
    if (userEmail === "") {
      setEmailError(true); // 이메일이 비어 있으면 에러 메시지 출력
    } else {
      alert("아이디 찾기 요청이 완료되었습니다.");
      // 아이디 찾기 로직
      navigate("/login");
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const propData = {
    userEmail,
    handleEmailChange,
    handleFormSubmit,
    handleNavigate,
    handleEmailDomainChange,
    activeButton: "searchId",
    emailError,
    emailDomain,
  };

  return <SearchIdComponent {...propData} />;
};

export default SearchIdContainer;
