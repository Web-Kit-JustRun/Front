// src/components/RankPage.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Rank = () => {
  const [rankingData, setRankingData] = useState(null);
  // const fetchRankingData = async () => {
  //   const data = await axios.get(`api/users/${user_id}/ranking`,{Header:{Authorization: Bearer {jwt_token}}});
  //   setRankingData(data);
  // }
  const RankPageBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
  `;

  return (
    <RankPageBlock>
      <h1>Rank Page</h1>a
      {rankingData ? (
        <div>
          <p>User ID: {rankingData.user_id}</p>
          <p>Ranking Points: {rankingData.ranking_points}</p>
          <p>Ranking Grade: {rankingData.ranking_grade}</p>
        </div>
      ) : (
        <p>Loading ranking data...</p>
      )}
    </RankPageBlock>
  );
};

export default Rank;
