import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes, authenticatedRoutes } from "./routes";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route key={idx} path={route.path} element={route.element} /> // 수정: <Element /> 제거
      ))}

      {authenticatedRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={<Layout>{route.element}</Layout>} // 수정: <Element /> 제거
        />
      ))}
    </Routes>
  );
}

export default App;
