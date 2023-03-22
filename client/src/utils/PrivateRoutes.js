import React from "react";

import { Outlet, Navigate } from "react-router-dom";
const jwtController = require("./jwt.js");

export const PrivateRoutes = () => {
  let auth = jwtController.getToken();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export const LoggedInRoutes = () => {
  let auth = !jwtController.getToken();
  return auth ? <Outlet /> : <Navigate to="/home" />;
};
