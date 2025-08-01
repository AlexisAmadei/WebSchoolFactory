import React from "react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { auth, db } from "../config/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

import logoText from "../assets/logoText.svg";
import groupSquares from "../assets/groupSquares.svg";
import iconChatApp from "../assets/iconChatApp.svg";
import iconProfile from "../assets/iconProfile.svg";

import ProfileCard from "../components/ProfileCard";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "../utils/CurrentUser";

import "../css/HomePage.css"

export default function HomePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleClickChat = () => {
    navigate("/chatApp");
  };
  const handleClickProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const getUserUID = async () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user.uid);
        }
      });
      return () => {
        unsubscribe();
      };
    };
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
    };
    getUserUID();
    getAllUsers();
  }, []);
  return (
    <div className="globalHomeContainer">
      <div className="headerContainer">
        <div className="headerHome">
          <div className="headerLeft">
            <img src={groupSquares} alt="groupSquares" />
          </div>
          <div className="headerCenter">
            <img src={logoText} alt="limo logo"/>
          </div>
          <div className="headerRight">
            <img onClick={handleClickChat} id="left" src={iconChatApp} alt="iconChatApp" />
            <img onClick={handleClickProfile} id="right" src={iconProfile} alt="iconProfile" />
          </div>
        </div>
      </div>
      <div className="bodyHome" key={users.id}>
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            age={user.age}
            pseudo={user.pseudo}
            centerInterest={user.center}
            nativeLang={user.nativeLang}
            profession={user.profession}
            userUID={user.id}
          />
        ))}
      </div>
    </div>
  );
}