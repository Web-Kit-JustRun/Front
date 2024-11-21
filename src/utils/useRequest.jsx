import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { userStore } from "../store/userStore";
import { useLocation, useNavigate } from "react-router-dom";

export function useRequest() {
  const token = useRecoilValue(userStore)?.token;
  const navigate = useNavigate();
  const location = useLocation();
  const request = useCallback(
    async (url, method, body, options) => {
      try {
        const parsedMethod = method.toLowerCase();
        let props;
        let config = {
          ...options,
          headers: { Authorization: `Bearer ${token}` },
        };
        switch (parsedMethod) {
          case "post":
          case "put":
          case "patch":
            props = [process.env.REACT_APP_HOST_URL + url, body, config];
            break;
          default:
            props = [process.env.REACT_APP_HOST_URL + url, config];
            break;
        }

        const result = await axios[parsedMethod](...props);

        return result.data;
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          const isNotLoginPage =
            location.pathname !== "/" && location.pathname !== "/login";
          if (error.status === 401 && isNotLoginPage) {
            alert("로그인이 필요합니다.");
            return navigate("/login");
          }
        }
        throw error;
      }
    },
    [location, navigate, token],
  );

  return request;
}
