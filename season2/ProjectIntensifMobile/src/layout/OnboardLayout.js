import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { db } from "../config/firebaseConfig";

export default function OnBoard() {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
