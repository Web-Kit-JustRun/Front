import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userStore } from "../store/userStore";
import { useRequest } from "../utils/useRequest";

const RankContainer = () => {
  const [top100, setTop100] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [rankingPercentage, setRankPercentage] = useState("");

  const userData = useRecoilValue(userStore);
  const request = useRequest();
  // const { userId } = userData;
  // console.log("🚀 ~ RankContainer ~ userData:", userData);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const topRankingPromise = request("/api/ranking/top", "GET");
        // console.log(
        // "🚀 ~ fetchRankingData ~ topRankingPromise:",
        // topRankingPromise,
        // );
        const userRankingPromise = request(
          `/api/users/${userData.user.userId}/ranking`,
          "GET",
        );
        // console.log(
        // "🚀 ~ fetchRankingData ~ userRankingPromise:",
        // userRankingPromise,
        // );

        const [topRankingResult, userRankingResult] = await Promise.allSettled([
          topRankingPromise,
          userRankingPromise,
        ]);
        if (topRankingResult.status === "fulfilled") {
          setTop100(topRankingResult.value);
        }
        if (userRankingResult.status === "fulfilled") {
          setUserRank(userRankingResult.value);
        }
        setRankPercentage(Math.floor(userRank.rankingPercentage * 100) / 100);
        console.log("🚀 ~ RankContainer ~ userRank:", userRank);
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    };

    fetchRankingData();
  }, [request, userData.token, userData.user.userId]);

  // console.log("🚀 ~ RankContainer ~ userRank:", userRank);
  return (
    <RankContainerBlock>
      <TitleContainer>
        <Title>Ranking Board</Title>
        <InfoIcon
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          {showTooltip && <Tooltip>랭크는 매 학기마다 초기화 됩니다.</Tooltip>}
        </InfoIcon>
      </TitleContainer>
      {userRank && (
        <MyRank>
          <RankCell>{userData.user.name}</RankCell>
          <RankCell>상위 {rankingPercentage}%</RankCell>
          <RankCell>{userRank.rankingPoints} points</RankCell>
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
            {top100.map((user) => (
              <RankRow key={user.rank}>
                <RankCell>{user.rank}</RankCell>
                <RankCell>{user.name}</RankCell>
                <RankCell>{user.rankingPoints}</RankCell>
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
  background-color: #ffffff;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
`;

const InfoIcon = styled.div`
  position: relative;
  font-size: 1.5rem;
  color: #007bff;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.875rem;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  background-color: #007bff;
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
  background-color: #007bff;
  color: white;
  border-radius: 8px;
`;
