import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import { Icon } from '@iconify/react';
import flagFrance from '@iconify/icons-twemoji/flag-france';
import flagEngland from '@iconify/icons-twemoji/flag-england';
import flagItaly from '@iconify/icons-twemoji/flag-italy';
import flagSpain from '@iconify/icons-twemoji/flag-spain';
import flagGermany from '@iconify/icons-twemoji/flag-germany';
import flagPortugal from '@iconify/icons-twemoji/flag-portugal';
import flagRussia from '@iconify/icons-twemoji/flag-russia';

import "../css/Profile.css"

import profileIcon from "../assets/profileIcon.svg"
import bellIcon from "../assets/bell.svg"
import langIcon from "../assets/langIcon.svg"
import lockIcon from "../assets/lockIcon.svg"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const [userUID, setUserUID] = useState(null);
  const [pseudo, setPseudo] = useState('');
  const [flag1, setFlag1] = useState("");
  const [flag2, setFlag2] = useState("");

  const logOut = () => {
    const auth = getAuth();
    auth.signOut();
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userUID) return;
    const getElementInDoc = async () => {
      const docRef = doc(db, "users", userUID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPseudo(docSnap.data().pseudo);
      } else {
        console.error("No such document!");
      }
    };
    const getFlags = async () => {
      const docRef = doc(db, "users", userUID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().nativeLang === "frLang") setFlag1(flagFrance);
        if (docSnap.data().nativeLang === "enLang") setFlag1(flagEngland);
        if (docSnap.data().nativeLang === "itLang") setFlag1(flagItaly);
        if (docSnap.data().nativeLang === "esLang") setFlag1(flagSpain);
        if (docSnap.data().nativeLang === "deLang") setFlag1(flagGermany);
        if (docSnap.data().nativeLang === "ptLang") setFlag1(flagPortugal);
        if (docSnap.data().nativeLang === "ruLang") setFlag1(flagRussia);
        if (docSnap.data().learnLang === "frLang") setFlag2(flagFrance);
        if (docSnap.data().learnLang === "itLang") setFlag2(flagItaly);
        if (docSnap.data().learnLang === "enLang") setFlag2(flagEngland);
        if (docSnap.data().learnLang === "esLang") setFlag2(flagSpain);
        if (docSnap.data().learnLang === "deLang") setFlag2(flagGermany);
        if (docSnap.data().learnLang === "ptLang") setFlag2(flagPortugal);
        if (docSnap.data().learnLang === "ruLang") setFlag2(flagRussia);
      } else {
        console.error("No such document!");
      }
    };
    getFlags();
    getElementInDoc();
  }, [userUID]);

  return (
    <div className="globalProfileContainer">
      <div className="profileContainer">
        <h1>Profil</h1>
        <div className="userPreview">
          <img src={profileIcon} height={50} alt="profileIcon" />
          <p className="userName">{pseudo}</p>
        </div>
        <div className="breakLine" />
        <div className="languageFlags">
          <Icon icon={flag1} width={80} height={80} />
          <Icon icon={flag2} width={80} height={80} />
        </div>
        <div className="settings">
          <p>Paramètres</p>
          <li className="listItem">
            <img src={profileIcon} alt="profileIcon" height={20} />
            <p>Informations personnelles</p>
          </li>
          <div className="breakLine" />
          <li className="listItem">
            <img src={bellIcon} alt="bellIcon" height={20} />
            <p>Notifications</p>
          </li>
          <div className="breakLine" />
          <li className="listItem">
            <img src={langIcon} alt="langIcon" height={20} />
            <p>Languages</p>
          </li>
          <div className="breakLine" />
          <li onClick={logOut} className="listItem">
            <img src={lockIcon} alt="lockIcon" height={20} />
            <p>Se deconnecter</p>
          </li>
          <div className="breakLine" />
        </div>
      </div>
    </div>
  );
}
