import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';

import "../css/LandingPage.css";
import logo from "../assets/logoLimo.svg";
import Illustration from "../assets/IllusLandingPage.svg";
import FooterBackground from "../assets/landingFotterBack.svg";
import arrowDown from "../assets/arrowDown.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import blob4 from "../assets/blob4.svg";

export default function LandingPage() {

  useEffect(() => {
    $(".smooth-scroll").on('click', function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function () {
          window.location.hash = hash;
        });
      }
    });
  }, []);

  return (
    <div>
      <div className="landingHeader">
        <img src={logo} alt="limo logo" loading="lazy" />
        <h1 id="Title">Limo</h1>
      </div>
      <div className="landingBody">
        <p id="Accroche">Découvrez une nouvelle langue à travers vos passions</p>
        <p id="joinus">
          Rejoignez notre communauté d'échange linguistique dès maintenant !
        </p>
        <img id="illustration" src={Illustration} alt="Illustration" loading="lazy" />
        <img id="footerBackground" src={FooterBackground} alt="Footer" loading="lazy" />
        <Link id="StartButton" to="/security/register">Commencer maintenant</Link>
        <Link id="ConnectButton" to="/security/login">Se Connecter</Link>
        <a href="#pres1" className="smooth-scroll"><img id="arrowDown" src={arrowDown} alt="arrowDown" /></a>
        <p id="pres1">Nous sommes convaincus que l'apprentissage d'une langue va bien au-delà des simples règles grammaticales et vocabulaires. Cela vous permet de découvrir le monde à travers les yeux d'une autre personne.</p>
        <img id="blob1" src={blob1} alt="blob1" loading="lazy" />
        <p id="pres2">Notre application a été conçue pour vous aider à améliorer vos compétences linguistiques tout en découvrant de nouvelles cultures et passions.</p>
        <img id="blob2" src={blob2} alt="blob2" loading="lazy" />
        <p id="pres3">Connectez-vous avec des locuteurs natifs de votre langue cible qui partagent vos centres d’intérêts.</p>
        <img id="blob3" src={blob3} alt="blob3" loading="lazy" />
        <p id="pres4">Que vous soyez passionné par la gastronomie, la musique ou tout autre sujet, vous pouvez trouver des partenaires d'échange qui partagent votre passion. Cela rendra vos conversations plus intéressantes, plus engageantes et plus amusantes !</p>
        <img id="blob4" src={blob4} alt="blob4" loading="lazy" />
      </div>
      <div className="landingFooter">
        <p id="mentionsLegales" className="footerItem">Mention Légales</p>
        <p id="Politique" className="footerItem">Politique de confidentialités</p>
        <p id="copyright" className="footerItem">© 2023 Limo - Tous droits réservés</p>
      </div>
    </div>
  );
}
