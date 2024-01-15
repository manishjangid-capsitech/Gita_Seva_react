/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
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
import LoginServices from "../Services/Login";
import FacebookLogin from "react-facebook-login";

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

// sign in with facebook

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
};
// sign in with mobile number
const SignWithOtp = () => {
  const { setPhoneModel } = useUser();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        // const mobileNumber = result?.user?.phoneNumber;
        localStorage.setItem("LoginphoneNumber", result?.user?.phoneNumber);
        setUser(result.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <div>
          {showOTP ? (
            <>
              <>
                <div>
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button onClick={onOTPVerify} className="bg-emerald-600 w-full">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            </>
          ) : (
            <div style={{ marginLeft: "30px" }}>
              <div>
                <img
                  src={leftArrow}
                  alt="leftArrow"
                  onClick={() => {
                    setPhoneModel(false);
                  }}
                />
              </div>
              <label
                htmlFor=""
                className="font-bold text-xl text-white text-center"
              >
                Verify your phone number
              </label>
              <label
                style={{
                  fontSize: "22px",
                  fontWeight: 500,
                  lineHeight: "25px",
                  paddingBottom: "8px",
                  display: "block",
                  fontFamily: "ChanakyaUni",
                }}
              >
                Enter Your Mobile Number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} inputProps={{
                required: true,
              }} />
              <button
                onClick={onSignup}
                style={{ marginLeft: "12px" }}
                className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span
                  style={{
                    color: "black",
                    border: "none",
                    margin: "0 8px",
                  }}
                >
                  Send OTP
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignWithOtp;
