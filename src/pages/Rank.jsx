import styled from "styled-components";
import RankContainer from "../containers/RankContainer";

const Rank = () => {
  const RankPageBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
  `;

  return (
    <RankPageBlock>
      <RankContainer />
    </RankPageBlock>
  );
};

export default Rank;
