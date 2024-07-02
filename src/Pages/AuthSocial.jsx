/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "./Firebase";
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useUser } from "../Contexts/UserContext";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import leftArrow from "../assets/img/leftArrow1.png";
import FacebookLogin from "react-facebook-login";

export const auth = getAuth(app);

export const SignInWithFB = () => {
  const fbLibrary = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '291301805425699', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v8.0',
      });
      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  useEffect(() => {
    fbLibrary();
  }, []);

  const responseFacebook = (response) => {
    // Handle the response when the user logs in with Facebook
    console.log(response);
  };
  return (
    <FacebookLogin
      appId="291301805425699" // Replace with your Facebook App ID
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="facebook-login-button"
      textButton="Login with Facebook"
    />
  );
}