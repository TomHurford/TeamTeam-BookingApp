import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const jwtController = require("./jwt.js");

// A function for the private routes which prevents non logged in users from accessing pages they are not authorised to access.
export const PrivateRoutes = () => {
  let auth = jwtController.getToken();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

// A function for the logged in routes which prevents logged in users from accessing pages they are not authorised to access.
export const LoggedInRoutes = () => {
  let auth = !jwtController.getToken();
  return auth ? <Outlet /> : <Navigate to="/home" />;
};
