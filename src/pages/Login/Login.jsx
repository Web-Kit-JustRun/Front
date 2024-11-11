import styled from "styled-components";
import LoginContainer from "../../containers/Login/LoginContainer";

const Login = () => {
    //페이지 코드에서는 컴포넌트or 컨테이너 외엔 아무것도 없어야함. 스타일도 웬만하면 ㄴㄴ
    return (
        <LoginPageBlock>
            <LoginContainer />
        </LoginPageBlock>
    );
};

const LoginPageBlock = styled.div``;
export default Login;
