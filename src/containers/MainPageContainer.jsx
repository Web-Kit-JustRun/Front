import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainPageContainer = () => {
  const navigate = useNavigate();

  const goToRankPage = () => {
    navigate("/rank");
  };

  return (
    <MainPageBlock>
      <h1>Main Page</h1>
      <NavigateButton onClick={goToRankPage}>Go to Rank Page</NavigateButton>
    </MainPageBlock>
  );
};

const MainPageBlock = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavigateButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default MainPageContainer;
