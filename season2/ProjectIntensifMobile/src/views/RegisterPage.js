import React, { useState } from "react";
import { Link } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import 'firebase/firestore';
import { auth, db } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import "../css/RegisterPage.css";
import googleLogo from '../assets/googleLogo.svg'
import LanguageSelect from "./LanguageSelect";
import CenterSelect from "./CenterSelect";

export default function RegisterPage() {
  const [error, setError] = useState(null);
  const [nativeLang, setLang] = useState(null);
  const [learnLang, setLearnLang] = useState(null);
  const [center, setCenter] = useState(null);

  const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const pseudo = formData.get("pseudo");
    const age = formData.get("age");
    const profession = formData.get("Profession");
    const email = formData.get("email");
    const password = formData.get("password");
    const profileComplete = false;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(db, "users", user.uid), {
        pseudo,
        age,
        profession,
        email,
        password,
        profileComplete,
        nativeLang,
        learnLang,
        center,
      });
    })
    .catch((error) => {
      setError(error.message);
    });
  };
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .catch((error) => {
      setError(error.message);
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  if (nativeLang === null || learnLang === null) {
    return(
      <LanguageSelect handleLangSelect={( nativeLang, learnLang) => {
          setLang(nativeLang);
          setLearnLang(learnLang);
        }}
      />
    )
  }
  if (center === null) {
    return (
      <CenterSelect handleCenterSelect={( center ) => {
          setCenter(center);
        }}
      />
    )
  }
  return (
    <div className="globalRegisterContainer">
      <div className="registerContainer">
        <p>Ajoutez vos informations</p>
        <form onSubmit={handleRegister} className="registerForm">
          <TextField className="textField"
            margin="normal"
            required
            label="Pseudo"
            name="pseudo"
            autoFocus
          />
          <TextField className="textField"
            margin="normal"
            label="Age"
            name="age"
            required
          />
          <TextField className="textField"
            margin="normal"
            label="Profession"
            name="Profession"
            required
          />
          <TextField className="textField"
            margin="normal"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            required
          />
          <TextField className="textField"
            margin="normal"
            label="Mot de passe"
            name="password"
            required
            type={showPassword ? 'text' : 'password'}
            InputProps={
              {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
          <p className="cgu">
            En sélectionnant <span>Accepter et continuer</span>, j’accepte les Conditions de service, les Conditions de service relatives aux paiements, la Politique de
            non-discrimination et la Politique de confidentialité de Donkon
          </p>
          <input className="acceptButton" type="submit" value="Accepter et continuer" />
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
        {/* <button className="registerWithGoogle" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google logo" />Continuer avec Google
        </button> */}
        <p className="returnToLogin">
          Déjà un compte ?
          <Link id="linkRouter" to="/security/login"> Se Connecter</Link>
        </p>
      </div>
    </div>
  );
}
