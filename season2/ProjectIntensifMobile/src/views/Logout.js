import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function Logout() {
  useEffect(() => {
    signOut(auth);
  }, []);
  return <div>Logout</div>;
}
