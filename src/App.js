import React from "react";
import { Route, Routes } from "react-router-dom";
import TempLayout from "./components/TempLayout/";
import "./App.css";
import { publicRoutes, authenticatedRoutes } from "./routes";

function App() {
  return (
    <>
      <Routes>
        {publicRoutes.map((route, idx) => {
          // index.jsx 파일에서 설정한 경로 토대로 화면에 렌더링함. 자세한 원리는 나도 모름
          const Element = route.element;
          return <Route key={idx} path={route.path} element={<Element />} />;
        })}

        {authenticatedRoutes.map((route, idx) => {
          const Element = route.element;
          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <TempLayout>
                  <Element />
                </TempLayout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
