import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfilePage from "../views/Profile";

export default function PrivateLayout({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (user === false) {
      navigate("/security/login");
    }
  }, [user, navigate]);

  if (user === false) return null;

  return (
    <div>
      <Outlet />
    </div>
  );
}
