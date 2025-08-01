import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";

import Logout from "./views/Logout";
import SecurityLayout from "./layout/SecurityLayout";
import PrivateLayout from "./layout/PrivateLayout";

import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import RegisterPage from "./views/RegisterPage";
import ProfilePage from "./views/Profile";
import Landing from "./views/LandingPage";

import Loading from "./components/Loading"

import "./App.css";
import ChatApp from "./views/ChatApp";

export default function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user || false));

  if (user === null) return <Loading />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/security" element={<SecurityLayout user={user} />} >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<PrivateLayout user={user} />} >
          <Route path="logout" element={<Logout />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chatApp" element={<ChatApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
