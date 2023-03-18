import React from "react";

import { Outlet, Navigate } from "react-router-dom";
const jwtController = require("../utils/jwt.js");

const PrivateRoutes = () => {
  let auth = jwtController.getToken();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
