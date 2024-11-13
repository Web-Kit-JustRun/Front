import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes, authenticatedRoutes } from "./routes";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route key={idx} path={route.path} element={route.element} />
      ))}

      {authenticatedRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <Layout layoutType={route.layoutType}>{route.element}</Layout>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
