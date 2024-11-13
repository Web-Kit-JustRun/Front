import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const RankContainer = () => {
  const [top_100, set_Top100] = useState([]);
  const [user_rank, setUser_rank] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const { user_id } = userData;

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/ranking");
        if (response.status === 200) {
          set_Top100(response.data.top_100);
          setUser_rank(response.data.user_rank);
        }
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <RankContainerBlock>
      <Title>Ranking Board</Title>
      {user_rank && (
        <MyRank>
          <RankCell>{user_rank.rank}등</RankCell>
          <RankCell>{user_rank.ranking_points} points</RankCell>
          <RankCell>{user_rank.name}</RankCell>
        </MyRank>
      )}
      <ScrollableContainer>
        <RankTable>
          <thead>
            <RankHeader>
              <th>Rank</th>
              <th>Name</th>
              <th>Ranking Points</th>
            </RankHeader>
          </thead>
          <tbody>
            {top_100.map((user) => (
              <RankRow key={user.rank}>
                <RankCell>{user.rank}</RankCell>
                <RankCell>{user.name}</RankCell>
                <RankCell>{user.ranking_points}</RankCell>
              </RankRow>
            ))}
          </tbody>
        </RankTable>
      </ScrollableContainer>
    </RankContainerBlock>
  );
};

export default RankContainer;

// 스타일 컴포넌트

const RankContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const RankTable = styled.table`
  width: 100%;
  max-width: 800px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;

const RankHeader = styled.tr`
  background-color: #333;
  color: white;
  font-weight: bold;
`;

const RankRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const RankCell = styled.td`
  width: 33.33%;
  text-align: center;
  padding: 10px 0;
`;

const ScrollableContainer = styled.div`
  width: 80%;
  max-width: 800px;
  height: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const MyRank = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 800px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #333;
  color: white;
  border-radius: 8px;
`;
