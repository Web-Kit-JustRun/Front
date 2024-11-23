import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userStore } from "../store/userStore";
import { currentLessonIdStore } from "../store/lessonStore";
import { useRequest } from "../utils/useRequest";
import diamond from "../img/rank/diamond.png";
import platinum from "../img/rank/platinum.png";
import gold from "../img/rank/gold.png";
import silver from "../img/rank/silver.png";
import bronze from "../img/rank/bronze.png";

const MyPageContainer = () => {
  const navigate = useNavigate();
  const request = useRequest();
  const userState = useRecoilValue(userStore);
  const setCurrentLessonId = useSetRecoilState(currentLessonIdStore);
  const [userRanking, setUserRanking] = useState(null);
  const [studentNumber, setStudentNumber] = useState(null);
  const [courses, setCourses] = useState([]);

  const { user } = userState;
  const { userId, name } = user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await request(
          `/api/users/${userId}/courses`,
          "GET",
        );
        setCourses(coursesData);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, [userId, request]);

  useEffect(() => {
    const fetchStudentNumber = async () => {
      try {
        const data = await request(`/api/users/profile`, "GET");
        setStudentNumber(data.studentNumber);
      } catch (error) {
        console.error("Failed to fetch user profile data:", error);
      }
    };

    fetchStudentNumber();
  }, [request]);

  useEffect(() => {
    const fetchUserRanking = async () => {
      try {
        const data = await request(`/api/users/${userId}/ranking`, "GET");
        setUserRanking(data);
      } catch (error) {
        console.error("Failed to fetch user ranking data:", error);
      }
    };

    fetchUserRanking();
  }, [userId, request]);

  const goToLessonPage = (courseId) => {
    setCurrentLessonId(courseId);
    navigate(`/lesson`);
  };

  const getTierIcon = (percentage) => {
    if (percentage <= 20) return diamond;
    if (percentage <= 30) return platinum;
    if (percentage <= 40) return gold;
    if (percentage <= 50) return silver;
    return bronze;
  };

  if (!userRanking) {
    return <Loading>Loading...</Loading>;
  }

  const { rankingPoints, rankingPercentage } = userRanking;
  const formattedPercentage = Math.floor(rankingPercentage * 100) / 100;

  return (
    <MyPageContainerBlock>
      <LeftSection>
        <ProfileSection>
          <ProfileImage>
            <img src={getTierIcon(formattedPercentage)} alt="티어 아이콘" />
          </ProfileImage>
          <ProfileDetails>
            <UserName>{name}</UserName>
            <UserInfo>{`학번 ${studentNumber}`}</UserInfo>
            <UserPoints>{`${rankingPoints} Ranking Points`}</UserPoints>
            <UserRank>
              <span>{`상위 ${formattedPercentage}%`}</span>
            </UserRank>
          </ProfileDetails>
        </ProfileSection>
        <RightSection>
          <CoursesContainer>
            <h3>수업 목록</h3>
            {courses.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>과목명</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr
                      key={course.courseId}
                      onClick={() => goToLessonPage(course.courseId)}
                    >
                      <td>{course.courseName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <NoDataMessage>수강 중인 과목이 없습니다.</NoDataMessage>
            )}
          </CoursesContainer>
        </RightSection>
        <ButtonsSection>
          <ActionButton onClick={() => navigate("/change-password")}>
            비밀번호 수정
          </ActionButton>
          <ActionButton onClick={() => navigate("/purchaselist")}>
            상점 구매 내역
          </ActionButton>
          <ActionButton onClick={() => navigate("/myquiz")}>
            신청한 퀴즈 전체 조회
          </ActionButton>
        </ButtonsSection>
      </LeftSection>
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
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;

  overflow: hidden;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const UserInfo = styled.p`
  font-size: 14px;
  color: #666;
`;

const UserPoints = styled.p`
  font-size: 14px;
  color: #666;
`;

const UserRank = styled.p`
  font-size: 14px;
  color: #0084ff;
  font-weight: bold;
`;

const RightSection = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    padding: 8px;
    color: #fff;
    background-color: #0084ff;
  }

  tbody tr {
    cursor: pointer;
    &:hover {
      background-color: #f9f9f9;
    }
  }

  td {
    padding: 8px;
    font-size: 14px;
  }
`;

const NoDataMessage = styled.p`
  font-size: 14px;
  color: #999;
  text-align: center;
`;

const ButtonsSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px 15px;
  font-size: 14px;
  color: #fff;
  background-color: #0084ff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005fbb;
  }
`;

const Loading = styled.div`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-top: 20px;
`;
