import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userStore } from "../store/userStore";
import diamond from "../img/rank/diamond.png"
import platinum from "../img/rank/platinum.png"
import gold from "../img/rank/gold.png"; // 골드 로고
import silver from "../img/rank/silver.png"; // 실버 로고
import bronze from "../img/rank/bronze.png"; // 브론즈 로고


const MyPageContainer = () => {
  const navigate = useNavigate();
  const [userRanking, setUserRanking] = useState(null); // 사용자 랭킹 데이터 상태
  
  const userState = useRecoilValue(userStore);
  const { token: authToken, user: userData } = userState;
  const {user_id} = userData
  
  
  useEffect(() => {
    // API 호출로 사용자 랭킹 정보 가져오기
    
    // ({
      //   user_id: user.user_id,
      //   name: user.name,
      //   student_number: user.student_number,
      //   ranking_points: user.ranking_points,
      //   reward_points: user.reward_points,
      //   ranking_percentage: 15.0, // 더미 데이터
      // });
      const fetchUserRanking = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_HOST_URL+`/api/users/${user_id}/profile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUserRanking(response.data);
      } catch (error) {
        console.error("Failed to fetch user ranking:", error);
      }
    };
    
    fetchUserRanking();
  }, [authToken, userData]);
  
  
  if (!userRanking) {
    
    return <Loading>Loading...</Loading>;
  }

  const { name, ranking_points, ranking_percentage,student_number } = userRanking;

  // 티어 아이콘 로직
  const getTierIcon = (percentage) => {
    if (percentage <= 20) return diamond; // 상위 10% 티어
    if (percentage <= 30) return platinum; // 상위 30% 티어
    if (percentage <= 40) return gold; // 상위 50% 티어
    if (percentage <= 50) return silver; // 상위 50% 티어
    return bronze; // 나머지
  };

  return (
    <MyPageContainerBlock>
      <ProfileSection>
      <ProfileImage>
  <img style={{}} src={getTierIcon(ranking_percentage)} alt="티어 아이콘" />
</ProfileImage>
        <ProfileDetails>
          <UserName>{name}</UserName>
          <UserInfo>{`학번 : ${student_number}`}</UserInfo>
          <UserPoints>{`${ranking_points} 랭킹포인트`}</UserPoints>
          <UserRank>
            {/* {`${ranking_rank}위`}  */}
            <span>({`상위 ${ranking_percentage}%`})</span>
          </UserRank>
        </ProfileDetails>
      </ProfileSection>
      <ButtonsSection>
        <ActionButton onClick={() => navigate("/change-password")}>비밀번호 수정</ActionButton>
        <ActionButton onClick={() => navigate("/purchaselist")}>상점 구매 내역</ActionButton>
      </ButtonsSection>
    </MyPageContainerBlock>
  );
};

export default MyPageContainer;

// 스타일 컴포넌트
const MyPageContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  margin-right: 20px;
  & img {
  width:80px;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const UserInfo = styled.p`
  font-size: 16px;
  margin: 5px 0;
  color: #666;
`;

const UserPoints = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0;
`;

const UserRank = styled.p`
  font-size: 18px;
  margin: 5px 0;
  span {
    color: #007bff;
  }
`;

const ButtonsSection = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Loading = styled.div`
  font-size: 24px;
  color: #666;
`;

