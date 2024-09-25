/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import app from "./Firebase";
import 'react-phone-input-2/lib/style.css';
import FacebookLogin from "react-facebook-login";

export const auth = getAuth(app);

export const SignInWithFB = () => {
  const fbLibrary = () => {
    debugger
    window.fbAsyncInit = function () {
      debugger
      window.FB.init({
        appId: '291301805425699', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v8.0',
      });
      // window.FB.AppEvents.logPageView();
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
    debugger
    fbLibrary();
  }, []);

  const responseFacebook = (response) => {
    debugger
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