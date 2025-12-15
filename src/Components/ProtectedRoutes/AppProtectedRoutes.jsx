import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

export default function AppProtectedRoutes({ children }) {
  const { token } = useContext(authContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return <>{children}</>;
}
