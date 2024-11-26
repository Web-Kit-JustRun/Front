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
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const getTierIcon = (percentage) => {
  if (percentage <= 20) return diamond;
  if (percentage <= 30) return platinum;
  if (percentage <= 40) return gold;
  if (percentage <= 50) return silver;
  return bronze;
};

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
          null,
          {},
        );
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [userId, request]);

  useEffect(() => {
    const fetchStudentNumber = async () => {
      try {
        const data = await request(`/api/users/profile`, "GET", null, {});
        setStudentNumber(data.studentNumber);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchStudentNumber();
  }, [request]);

  useEffect(() => {
    const fetchUserRanking = async () => {
      try {
        const userRankingData = await request(
          `/api/users/${userId}/ranking`,
          "GET",
          null,
          {},
        );
        setUserRanking(userRankingData);
      } catch (error) {
        console.error("Failed to fetch ranking data:", error);
      }
    };

    fetchUserRanking();
  }, [userId, request]);

  const goToLessonPage = (courseId) => {
    setCurrentLessonId(courseId);
    navigate(`/lesson`);
  };

  if (!userRanking) {
    return <Loading>Loading...</Loading>;
  }

  const { rankingPoints, rankingPercentage } = userRanking;
  const formattedPercentage = Math.floor(rankingPercentage * 100) / 100;

  const generateNormalDistribution = (mean, stdDev, size) => {
    const data = [];
    const step = (6 * stdDev) / size;
    for (let i = 0; i <= size; i++) {
      const x = mean - 3 * stdDev + i * step;
      const y =
        (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
      data.push({ x, y });
    }
    return data;
  };

  const mean = 50;
  const stdDev = 15;
  const distributionData = generateNormalDistribution(mean, stdDev, 1000);

  const userX = formattedPercentage;
  const userY =
    (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * Math.pow((userX - mean) / stdDev, 2));

  const chartData = {
    datasets: [
      {
        label: "Normal Distribution",
        data: distributionData,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        pointRadius: 0,
        borderWidth: 2,
        parsing: false,
      },
      {
        label: "Your Rank",
        data: [{ x: userX, y: userY }],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        pointRadius: 5,
        type: "scatter",
        parsing: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Rank Percentage (%)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Probability Density",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <MyPageContainerBlock>
      <TitleContainer>
        <ProfileSection>
          <ProfileImage>
            <img src={getTierIcon(formattedPercentage)} alt="Tier Icon" />
          </ProfileImage>
          <ProfileDetails>
            <UserName>{`(${studentNumber}) ${name}`}</UserName>
            <UserPoints>
              {`${rankingPoints} points`}{" "}
              <UserRank>{`(상위 ${formattedPercentage}%)`}</UserRank>
            </UserPoints>
          </ProfileDetails>
        </ProfileSection>
      </TitleContainer>
      <ChartContainer>
        <h2>Rank Distribution</h2>
        <Line data={chartData} options={chartOptions} />
      </ChartContainer>
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
    </MyPageContainerBlock>
  );
};

export default MyPageContainer;

const MyPageContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 100px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const UserPoints = styled.p`
  font-size: 18px;
  color: #666;
`;

const UserRank = styled.span`
  font-size: 18px;
  color: #0084ff;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
`;

const CoursesContainer = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    font-size: 16px;
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

const Loading = styled.div`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-top: 20px;
`;
