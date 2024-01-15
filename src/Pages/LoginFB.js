import { useEffect } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "./Firebase";
import FacebookLogin from "react-facebook-login";

// export const auth = getAuth(app);

// sign in with facebook

export const SignInFB = () => {
    const fbLibrary = () => {
        window.fbAsyncInit = function () {
            // debugger
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

    // useEffect(() => {
    //     fbLibrary();
    // }, []);

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
};