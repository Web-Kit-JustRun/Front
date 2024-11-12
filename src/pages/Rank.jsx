// src/components/RankPage.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Rank = () => {
  const [rankingPoint, setRankingPoint] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const { user_id } = userData;
  const { token } = authToken;

  // userData 형태
  // user: {
  //   user_id: 1,
  //   username: username, // 요청에서 받은 username 사용 (실제 인증 없이)
  //   name: "Test User",
  //   user_type: "student",
  //   ranking_points: 100,
  //   reward_points: 50,
  // },

  // 랭킹포인트 등급 데이터 형태
  // {
  //   "user_id": 1,
  //   "ranking_points": 1200,
  //   "ranking_percentage": 0.1
  // }

  useEffect(() => {
    const getMyRankOnServer = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/${user_id}/login`,
        {
          Header: { Authorization: `Bearer ${token}` },
        }
      );
      setRankingPoint(res.body.ranking_points);
    };
  }, []);

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
      <h1>Rank Page</h1>

      <div>
        <p>User ID: {user_id}</p>
        <p>Ranking Points: {rankingPoint}</p>
        <p>Ranking Grade: {}</p>
      </div>

      <p>Loading ranking data...</p>
    </RankPageBlock>
  );
};
export default Rank;
