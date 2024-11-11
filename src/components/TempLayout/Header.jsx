import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderBlock>
      <div className="header-item first" onClick={() => navigate("/")}>
        <h1>Logo</h1>
      </div>
      <div className="header-item" onClick={() => navigate("/home")}>
        <i className="fas fa-home"></i>
      </div>
      <div className="header-item" onClick={() => navigate("/about")}>
        <i className="fas fa-info-circle"></i>
      </div>
      <div className="header-item" onClick={() => navigate("/settings")}>
        <i className="fas fa-cog"></i>
      </div>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px; /* Header 높이 설정 */
  padding: 0 20px;
  background-color: #f8f9fa;

  .header-item {
    margin: 0 15px;
    cursor: pointer;

    h1 {
      font-size: 1.5em;
      color: #333;
    }

    i {
      font-size: 1.8em;
      color: #333;
    }

    &:hover {
      color: #007bff; /* hover 색상 변경 */
    }
  }

  .first {
    margin-right: 20px;
  }
`;

export default Header;
