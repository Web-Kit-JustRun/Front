import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import logo from "../../img/edukit logo.png";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentLessonIdStore, lessonStore } from "../../store/lessonStore";
import { userStore } from "../../store/userStore";
import { useRequest } from "../../utils/useRequest";

const Header = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useRecoilState(lessonStore);
  const [currentLessonId, setCurrentLessonId] =
    useRecoilState(currentLessonIdStore);
  const [userData, setUserData] = useRecoilState(userStore);
  const request = useRequest();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await request(
          `/api/users/${userData.user.userId}/courses`,
          "GET",
        );

        data && setLessons(data);
      } catch (error) {
        console.error("수업 정보를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchCourses();
  }, [request, setLessons, userData.user.userId]);

  const handleClassChange = (e) => {
    const lessonId = e.target.value;
    setCurrentLessonId(+lessonId);
    navigate(`/lesson`);
  };

  return (
    <HeaderBlock>
      <Logo
        onClick={() => {
          setCurrentLessonId("");
          navigate("/main");
        }}
      >
        <img src={logo} alt="EdukIt Logo" />
      </Logo>

      <UserSection>
        <ClassSelect value={currentLessonId} onChange={handleClassChange}>
          <option value="" disabled hidden>
            수업 선택
          </option>
          {lessons.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </ClassSelect>

        <UserInfo>
          <UserId
            onClick={() => {
              setCurrentLessonId("");
              navigate("/mypage");
            }}
          >
            {userData.user.username}
          </UserId>
          <RankingPoints onClick={() => navigate("/rank")}>
            랭킹 점수: {userData.user.ranking_points}
          </RankingPoints>
        </UserInfo>
        <StoreIcon onClick={() => navigate("/store")}>
          <FaStore />
        </StoreIcon>
        <LogoutButton
          onClick={() => {
            setUserData(null);
            navigate("/login");
          }}
        >
          Logout
        </LogoutButton>
      </UserSection>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  background-color: #afdfe4;
`;

const Logo = styled.div`
  cursor: pointer;

  img {
    width: 60px;
    height: auto;
  }
`;

const ClassSelect = styled.select`
  padding: 5px;
  font-size: 1em;
  border-radius: 5px;
  margin-right: 20px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  max-width: 100%;
  overflow: hidden;
  margin-right: 5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  div {
    font-size: 0.9em;
  }
`;

const UserId = styled.div`
  cursor: pointer;
  font-size: 0.9em;
  color: #333;

  &:hover {
    color: #007bff;
  }
`;
const RankingPoints = styled.div`
  cursor: pointer;
  font-size: 0.9em;
  color: #333;

  &:hover {
    color: #007bff;
  }
`;

const StoreIcon = styled.div`
  font-size: 1.5em;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #007bff;
  }
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  font-size: 0.9em;
  background-color: #f05454;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d94343;
  }
`;

export default Header;
