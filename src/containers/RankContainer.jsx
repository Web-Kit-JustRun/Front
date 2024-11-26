import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userStore } from "../store/userStore";
import { useRequest } from "../utils/useRequest";
import diamond from "../img/rank/diamond.png";
import platinum from "../img/rank/platinum.png";
import gold from "../img/rank/gold.png";
import silver from "../img/rank/silver.png";
import bronze from "../img/rank/bronze.png";

const RankContainer = () => {
  const [top100, setTop100] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [rankingPercentage, setRankPercentage] = useState("");

  const userData = useRecoilValue(userStore);
  const request = useRequest();

  // 티어 아이콘을 가져오는 함수
  const getTierIcon = (percentage) => {
    if (percentage > 2500) return diamond;
    else if (percentage > 2000) return platinum;
    else if (percentage > 1700) return gold;
    if (percentage > 500) return silver;
    return bronze;
  };

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const topRankingPromise = request("/api/ranking", "GET");
        const userRankingPromise = request(
          `/api/users/${userData.user.userId}/ranking`,
          "GET",
        );

        const [topRankingResult, userRankingResult] = await Promise.allSettled([
          topRankingPromise,
          userRankingPromise,
        ]);

        if (topRankingResult.status === "fulfilled") {
          setTop100(topRankingResult.value.top100);
        }
        if (userRankingResult.status === "fulfilled") {
          setUserRank(userRankingResult.value);
          const percentage =
            Math.floor(userRankingResult.value.rankingPercentage * 100) / 100;
          setRankPercentage(percentage);
        }
        console.log("🚀 ~ RankContainer ~ userRank:", userRank);
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    };

    fetchRankingData();
  }, [request, userData.user.userId]);

  return (
    <RankContainerBlock>
      <TitleContainer>
        <Title>Ranking Board</Title>
        <InfoIcon
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          {showTooltip && <Tooltip>랭크는 매 학기마다 초기화됩니다.</Tooltip>}
        </InfoIcon>
      </TitleContainer>
      {userRank && (
        <MyRank>
          <ProfileImage>
            <img src={getTierIcon(userRank.rankingPoints)} alt="티어 아이콘" />
          </ProfileImage>
          <RankDetails>
            <RankCell>{userData.user.name}</RankCell>
            <RankCell>상위 {rankingPercentage}%</RankCell>
            <RankCell>{userRank.rankingPoints} points</RankCell>
          </RankDetails>
        </MyRank>
      )}
      <ScrollableContainer>
        <RankTable>
          <thead>
            <RankHeader>
              <th>Rank</th>
              <th>등급</th>
              <th>Name</th>
              <th>Ranking Points</th>
            </RankHeader>
          </thead>
          <tbody>
            {top100.map((user) => (
              <RankRow key={user.rank}>
                <RankCell>{user.rank}</RankCell>
                <RankCell>
                  {" "}
                  <img
                    src={getTierIcon(user.rankingPoints)}
                    alt="티어 아이콘"
                  />
                </RankCell>
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
  color: #007bff;
`;

const InfoIcon = styled.div`
  position: relative;
  font-size: 1.5rem;
  color: #007bff;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #007bff;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const RankHeader = styled.tr`
  background-color: #007bff;
  color: white;
  font-weight: bold;
`;

const RankCell = styled.td`
  text-align: center;
  padding: 10px 0;
  color: #333;

  & img {
    width: 20px;
  }
`;

const RankRow = styled.tr`
  &:nth-child(even) {
    background-color: #f0f8ff;
  }

  &:hover {
    background-color: #e3f2fd;
  }

  & td:nth-child(2) {
    width: 40px; /* 두 번째 열의 너비를 40px로 설정 */
  }
`;

const ScrollableContainer = styled.div`
  width: 80%;
  max-width: 800px;
  height: 100%;
  padding: 20px;
  border: 1px solid #007bff;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 8px;
`;

const MyRank = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  max-width: 800px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  font-weight: bold;
`;

// 프로필 이미지를 위한 스타일 컴포넌트
const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

// 랭크 정보를 위한 스타일 컴포넌트
const RankDetails = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  & td {
    color: #ffffff;
  }
`;
