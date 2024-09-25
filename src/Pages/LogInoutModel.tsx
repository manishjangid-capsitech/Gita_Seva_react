import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { _get_i18Lang } from "../i18n";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SignInWithFB, auth } from "./AuthSocial";
import loginLogo from "../assets/img/loginLogo.png";
import signingoogle from "../assets/img/signingoogle.svg";
import signinfacebook from "../assets/img/loginwithfacebook.svg";
import signinmobileno from "../assets/img/loginwithmobileno.png";
import "../Styles/Login.css";
import "../Styles/Profile.css";
import DefaultBook from "../Images/defaultBook.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import WithoutLyrics from "../Images/audiolyrics.svg";
import WithLyrics from "../Images/audiowithoutlyrics.svg";
import articalIcon from "../assets/img/article-icon.png";
import LoginServices from "../Services/Login";
import 'react-phone-number-input/style.css'
import bookmarkedicon from "../Images/bookmarked.svg"


interface LogOutModalProps {
  open: boolean;
  onClose: () => void;
}

interface LogInModalProps {
  opens: boolean;
  onCloses: () => void;
  onLoginStateChange: (newState: string) => void;
}

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export const LogOutModel: React.FC<LogOutModalProps> = ({ open, onClose }) => {
  const currentLanguage = _get_i18Lang();
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          <div>
            <label
              style={{
                fontSize: "16px",
                textAlign: "center",
                color: "#000",
                width: "225px",
                margin: "0 0 -20px 0",
                padding: "8px 0",
                minHeight: "52px",
                fontFamily: "ChanakyaUni",
                scrollbarWidth: "none",
              }}
            >
              {currentLanguage === "hindi" ? (
                <label>क्या आप गीता सेवा से लॉगआउट करना चाहते हैं?</label>
              ) : (
                <label>Are you sure you want to Logout?</label>
              )}
            </label>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            localStorage.clear();
            localStorage.removeItem("Phone")
            localStorage.removeItem("UserId");
            localStorage.removeItem("userName");
            localStorage.removeItem("Image");
            localStorage.removeItem("email");
            localStorage.removeItem("mobileNo");
            localStorage.removeItem("Token");
            if (window.location.pathname?.includes("profile")) navigate(`/`);
            window.location.reload();
            onClose();
          }}
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "5px 20px",
          }}
          autoFocus
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
          style={{
            boxShadow:
              "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
            color: "#212121",
            boxSizing: "border-box",
            border: "1px solid #E8E8E8",
            background: "#fff",
            padding: "5px 20px",
          }}
          autoFocus
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const LogInModel: React.FC<LogInModalProps> = ({
  opens,
  onCloses: onClose,
  onLoginStateChange,
}) => {
  const { t } = useTranslation();
  const [phoneModel, setPhoneModel] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const provider = new GoogleAuthProvider();
  const currlang = localStorage.getItem("lan");
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("");
  const [formattedValue, setFormattedValue] = useState<any>(91);
  const [confirmation, setConfirmation] = React.useState<any>();
  const [result, setResult] = React.useState<string>('');
  const [isOtp, setIsOTP] = React.useState<boolean>(false);
  const [enterOtp, setEnterOtp] = useState('');
  const [pnModel, setPnModel] = useState(false);

  const [notification, setNotification] = useState(false);

  // const [notificationresendotp, setNotificationresendotp] = useState(false);

  const [inputElement, setInputElement] = useState<HTMLInputElement>();

  const RESEND_OTP_TIME_LIMIT = 2 * 60; // 2 minutes in seconds
  // const RESEND_OTP_TIME_LIMIT = 30; // 30 seconds minutes in seconds

  const [timeLeft, setTimeLeft] = useState(RESEND_OTP_TIME_LIMIT);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const resendLimit = 4;
  const resends = localStorage.getItem('resends') as any;

  const signInWithPhoneNumber = async (phone: string) => {
    if (phone !== '') {
      try {
        const confirmation = LoginServices.sendOtp(phone, '1').then((res: any) => {
          console.log("result for start time for count down", res);

          localStorage.setItem('oldid', JSON.stringify(res.result));
          setResult(res.result);
          // console.log("localStorage",localStorage.setItem('resends', resends ? (parseInt(resends) + 1).toString() : '1'));

          res.resuult && localStorage.setItem('resends', resends ? (parseInt(resends) + 1).toString() : '1');
        });
        setConfirmation(confirmation);
        setIsOTP(true);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log('false otp');
    }
  };

  const confirmOTP = async (code: any) => {
    try {
      LoginServices.validOtp(result, enterOtp).then((res: any) => {
        if (res?.result === false) {
          setNotification(true);
        }
        if (res.status && res.result) {
          LoginServices.getUserLogin(
            formattedValue,
            phoneNumber,
            '',
            1,
            "",
            "",
            ""
          ).then((res: any) => {
            localStorage.setItem("Email", "");
            localStorage.setItem("UserId", res?.result?.userId);
            localStorage.setItem("userName", res?.result?.name);
            localStorage.setItem("Image", res?.result?.imageThumbPath);
            localStorage.setItem("Phone", phoneNumber);
            localStorage.setItem("Token", res?.result?.token);
            localStorage.setItem("SignKey", res?.result?.signKey);
            onLoginStateChange("loggedIn");
            // localStorage.setItem("loginType", "PhoneNumberSe");
            if (res?.status) localStorage.setItem("PhoneNumberSe", res?.status)
          });
          onClose();
          setPhoneModel(false);
        } else {
          console.log("res.result is false");
        }
      });
      await confirmation.confirm(code);
    } catch (error) {
      console.log("error", error);
    }
  };

  const calculateTimeLeft = () => {
    const firstResendTimestamp = localStorage.getItem('firstResendTimestamp');
    if (firstResendTimestamp) {
      const now = new Date().getTime();
      const firstResendTime = new Date(parseInt(firstResendTimestamp)).getTime();
      const timePassed = now - firstResendTime;
      // const timeLeft = 24 * 60 * 60 * 1000 - timePassed;
      const timeLeft = 60 * 10000 - timePassed;
      return timeLeft > 0 ? timeLeft : null;
    }
    return null;
  };

  const handleResendOTP = async () => {
    const firstResendTimestamp = localStorage.getItem('firstResendTimestamp');
    const now = new Date().getTime();

    if (!firstResendTimestamp) {
      localStorage.setItem('firstResendTimestamp', now.toString());
    }

    if (resends && parseInt(resends) >= resendLimit) {
      const timeLeft = calculateTimeLeft();
      if (timeLeft !== null) {
        // setNotificationresendotp(true)
        // alert(`You have reached the maximum resend attempts. Try again in ${Math.ceil(timeLeft / (60 * 60 * 1000))} hours.`);
        return;
      } else {
        localStorage.setItem('resends', '1');
        localStorage.setItem('firstResendTimestamp', now.toString());
      }
    } else {
      localStorage.setItem('resends', resends ? (parseInt(resends) + 1).toString() : '1');
      setPnModel(true);
      // Reset the timer
      setTimeLeft(RESEND_OTP_TIME_LIMIT);
      setIsButtonDisabled(true);
    }
    await signInWithPhoneNumber(phoneNumber);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const resetTimer = () => {
    setTimeLeft(RESEND_OTP_TIME_LIMIT);
    setIsButtonDisabled(true);
    // setResendAttempts(0);
  };

  const formatPhoneNumber = (phoneNumber: any) => {
    const firstPart = phoneNumber?.slice(0, 2); // First two digits
    const lastPart = phoneNumber?.slice(-2); // Last two digits
    const maskedPart = 'xxxxxx'; // Masked middle part

    return `${firstPart}${maskedPart}${lastPart}`;
  };

  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  const handleFBLogin = () => {
    // FB.login((response: { authResponse: any; }) => {
    //   console.log("response", response);
    //   if (response?.authResponse) {
    //     debugger
    //     console.log("Welcome! Fetching your information...");
    //     window?.FB?.api('/me', function (response: { name: string; }) {
    //       console?.log('Good to see you, ' + response.name + '.');
    //     });
    //   } else {
    //     console?.log("User cancelled login or did not fully authorize.");
    //   }
    // }, { scope: 'public_profile,email' });
    window.FB.login(function (response: any) {
      console.log("response", response);

      // Handle the response
    });
  };

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '291301805425699', // replace with your Facebook app ID
        cookie: true,
        xfbml: true,
        version: 'v10.0' // Replace with the latest API version
      });

      // FB.login(function(response: any) {
      //   console.log("response",response);

      //   // Handle the response
      // });
    };
  }, [handleFBLogin]);

  useEffect(() => {
    if (phoneModel) {
      resetTimer();
    }
    setPnModel(false);
  }, [phoneModel]);

  useEffect(() => {
    if (inputElement) {
      inputElement?.focus();
    }
  }, [inputElement]);

  useEffect(() => {
    if (phoneNumber !== undefined && phoneNumber?.length === 10) {
      if (timeLeft === 0) {
        setIsButtonDisabled(false);
        return;
      }

      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft, confirmation]);

  useEffect(() => {
    // Set a timeout to remove the item after 24 hours (24 * 60 * 60 * 1000 milliseconds)
    const timeoutId = setTimeout(() => {
      setPhoneModel(false);
      localStorage.removeItem('resends');
    }, 24 * 60 * 60 * 1000)
    // }, 60 * 10000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [localStorage, resends]);

  return (
    <>
      <Modal
        show={opens}
        onClose={onClose}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-grid" }}>
            <img
              src={loginLogo}
              alt=""
              style={{ marginLeft: "50px", paddingBottom: "15px" }}
            />
            <div
              style={{
                width: "320px",
                height: "70px",
                background: "#FCF0E2",
                borderRadius: "5px",
                boxShadow: "#000 0px 0px 5px -1px",
                textAlign: "center"
              }}
            >
              {currlang === "hindi" ? (
                <p
                  style={{
                    fontFamily: "ChanakyaUni",
                    fontSize: "19px",
                    color: "#000",
                    lineHeight: "20px",
                    padding: "8px",
                    fontWeight: 500,
                  }}
                >
                  इस सुविधा का उपयोग करने के लिए आपको लॉगिन करने की आवश्यकता है।
                  यह पूर्णतः नि:शुल्क तथा सुरक्षित है।
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: "ChanakyaUni",
                    fontSize: "20px",
                    color: "#000",
                    lineHeight: "20px",
                    padding: "12px",
                    fontWeight: 500,
                  }}
                >
                  You must login to use this feature. It is completely free and
                  secure.
                </p>
              )}
            </div>
            <label
              style={{
                fontSize: "30px",
                textAlign: "center",
                padding: "10px 0 0 0",
                fontFamily: "ChanakyaUni",
                color: "#212121",
              }}
            >
              {t("login_option_tr")}
            </label>
          </div>
        </div>
        <div className="textCenter">
          <div
            className="loginbuttons"
            style={{ cursor: "pointer" }}
            onClick={async () => {
              await signInWithPopup(auth, provider)
                .then((result) => {
                  const email = result?.user?.email;
                  if (email) {
                    LoginServices.getUserLogin("", "", email, 2, "", "", "").then(
                      (res: any) => {
                        if (res?.status) localStorage.setItem("EmailIdSe", res.status)
                        if (res.status) {
                          localStorage.setItem("UserId", res?.result?.userId);
                          localStorage.setItem("userName", res?.result?.name);
                          localStorage.setItem("Image", res?.result?.imageThumbPath);
                          localStorage.setItem("Email", res?.result?.email);
                          localStorage.setItem("Token", res?.result?.token);
                          localStorage.setItem("SignKey", res?.result?.signKey);
                          onLoginStateChange("loggedIn");
                        }
                      }
                    );
                    onClose();
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <img
              src={signingoogle}
              alt="signingoogle"
              width="18px"
              height="18px"
              style={{
                marginRight: "8px",
                marginLeft: "17px",
                marginTop: "3px",
              }}
            />
            <label style={{ marginBottom: "0px", cursor: "pointer" }}>
              {t("login_with_google_tr")}
            </label>
          </div>
          {/* facebook login */}
          <div
            className="loginbuttons"
            style={{
              cursor: "pointer",
               display: "none"
            }}
            // onClick={ () => SignInWithFB()}
            onClick={handleFBLogin}
          >
            <img
              src={signinfacebook}
              alt="signinfacebook"
              width="18px"
              height="18px"
              style={{
                marginRight: "8px",
                marginLeft: "17px",
                marginTop: "3px",
              }}
            />
            <label style={{ marginBottom: "0px", cursor: "pointer" }}>
              {t("login_With_Facebook_tr")}
              {/* <SignInFB /> */}
            </label>
          </div>
          <div className="loginbuttons" onClick={() => setPhoneModel(true)} style={{ cursor: "pointer" }}>
            <img
              src={signinmobileno}
              alt="signinmobileno"
              width="18px"
              height="18px"
              style={{
                marginRight: "8px",
                marginLeft: "17px",
                marginTop: "3px",
              }}
            />
            <label style={{ marginBottom: "0px", cursor: "pointer" }}>
              {t("login_With_MobileNo_tr")}
            </label>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="dark" onClick={() => onClose()}>
            {t("Cancel_tr")}
          </Button>
        </Modal.Footer>
      </Modal>
      {phoneModel && (
        <>
          <Modal show={phoneModel} style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "grid", justifyContent: "center" }}>
                <img src={loginLogo} alt="" style={{ marginLeft: "15%" }} />
                <label
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    padding: "0 0 10px",
                    fontFamily: "ChanakyaUni",
                    color: "#212121",
                  }}
                >
                  {t("login_With_MobileNo_tr")}
                </label>
              </div>
            </div>

            <div style={{ margin: "5% 5" }}>
              <div className="loginbuttons" style={{ border: "none", marginLeft: "12%", padding: "6% 0", cursor: "pointer" }}>
                {pnModel ?
                  <div style={{ margin: "5% 4px" }}>
                    <div
                      style={{
                        width: "320px",
                        background: "#FCF0E2",
                        borderRadius: "5px",
                        boxShadow: "#000 0px 0px 5px -1px",
                        textAlign: "center"
                      }}>
                      <p
                        style={{
                          fontFamily: "ChanakyaUni",
                          fontSize: "19px",
                          color: "#000",
                          lineHeight: "20px",
                          padding: "8px",
                          fontWeight: 500,
                        }}
                      >
                        {currlang === "hindi" ?
                          "कृपया SMS के माध्यम से +91 " + formattedPhoneNumber + " पर भेजा गया ओटीपी (OTP) दर्ज करें।"
                          :
                          "Please enter the One Time Password (OTP) sent to +91 " + formattedPhoneNumber + " via sms."
                        }
                      </p>
                    </div>
                    <label style={{ fontSize: "22px", fontFamily: 'ChanakyaUni' }}>{t("enter_otp_tr")}</label>
                    <div style={{ width: "max-content" }}>
                      <input
                        autoFocus
                        value={enterOtp}
                        type="number"
                        maxLength={10}
                        placeholder={t("enter_otp_tr")}
                        style={{ border: "1px solid #EB7D16", borderRadius: "5px" }}
                        onChange={(e) => {
                          let v = e.currentTarget?.value ?? undefined;
                          setEnterOtp(v);
                        }}
                      />
                      <button onClick={confirmOTP}
                        style={{
                          margin: "5px 0 0 25px",
                          borderRadius: "5px",
                          color: "black",
                          borderColor: "burlywood"
                        }}>Confirm</button>

                      <div style={{ display: "flex" }}>
                        <p style={{ margin: "10px 18px 0 0" }}>Time left to resend OTP: {formatTime(timeLeft)}</p>
                        <label onClick={handleResendOTP}
                          style={{
                            margin: "8px 0 0 0",
                            borderRadius: "5px",
                            color: "black",
                            border: "1px solid #EB7D16",
                            padding: "0 5px",
                            display: isButtonDisabled ? "none" : "block"
                          }}>
                          Resend OTP
                        </label>
                      </div>
                    </div>
                    {notification && <div style={{ color: "red" }}>{t("otp_validation")}</div>}
                    {resends >= resendLimit === true &&
                      <div style={{ color: "red" }}>
                        {localStorage.getItem('lan') === "hindi"
                          ? "आपने ओटीपी अनुरोधों की सीमा, जो 4 गुना पर सेट है, पार कर ली है। कृपया बाद में पुनः प्रयास करें/24 घंटे बाद प्रयास करें ।"
                          : "You have exceeded the limit of OTP requests, which is set to 4 times. Please try again later / try after 24 hours ।."
                        }
                      </div>
                    }
                  </div>
                  :
                  <div>
                    <div
                      style={{
                        width: "320px",
                        background: "#FCF0E2",
                        borderRadius: "5px",
                        boxShadow: "#000 0px 0px 5px -1px",
                        textAlign: "center",
                      }}>
                      <p
                        style={{
                          fontFamily: "ChanakyaUni",
                          fontSize: "19px",
                          color: "#000",
                          lineHeight: "20px",
                          padding: "8px",
                          fontWeight: 500,
                        }}
                      >
                        {currlang === "hindi" ?
                          "कृपया अपना दस अंकों का मोबाइल नंबर बिना +91 या 0 लगाये दर्ज करें |"
                          :
                          "Please enter only 10 digit mobile number without any country code +91 or 0"
                        }
                      </p>
                    </div>
                    <div>
                      <input ref={(input: any) => setInputElement(input)} type="number" maxLength={10} placeholder={t("enter_mobile_no")} value={phoneNumber} style={{ border: "1px solid #EB7D16", borderRadius: "5px" }}
                        onChange={(e) => {
                          let v = e.currentTarget?.value ?? undefined;
                          setFormattedValue(`+${countryCode + v}`);
                          // if (/^\d*$/.test(v) && v?.length === 10) {
                          setPhoneNumber(v);
                          // }
                        }}
                      />
                      <button style={{
                        margin: "5px 0 0 25px",
                        borderRadius: "5px",
                        color: "black",
                        borderColor: "burlywood"
                      }} onClick={() => {
                        if (resends >= resendLimit === false) {
                          if (phoneNumber !== undefined && phoneNumber?.length === 10) {
                            signInWithPhoneNumber(phoneNumber);
                            setPnModel(true);
                          }
                        }
                      }}>Login</button>
                    </div>
                    {resends >= resendLimit === true &&
                      <div style={{ color: "red" }}>
                        {localStorage.getItem('lan') === "hindi"
                          ? "आपने ओटीपी अनुरोधों की सीमा, जो 4 गुना पर सेट है, पार कर ली है। कृपया बाद में पुनः प्रयास करें/24 घंटे बाद प्रयास करें ।"
                          : "You have exceeded the limit of OTP requests, which is set to 4 times. Please try again later / try after 24 hours."
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
            <Modal.Footer>
              <Button variant="dark" onClick={() => {
                setPhoneModel(false);
              }}>
                {t("back_tr")}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export const BookListButton = ({
  books,
  initialDisplayCount,
  type,
  title,
  getBook,
}: {
  books: any[];
  initialDisplayCount: number;
  type: "kalyan" | "kalpatru" | "geetgovind" | "book" | "vivek";
  title: string;
  getBook: (value: any) => void;
}) => {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const { t } = useTranslation();

  const showMoreBooks = () => {
    setDisplayCount(displayCount + 5); // Increase by a certain number
  };

  const showLessBooks = () => {
    setDisplayCount(initialDisplayCount); // Reset to initial display count
  };

  const getValueType = (type: any, book: any) => {
    let imgpath = "";
    switch (type) {
      case "book":
        imgpath = book.bookThumbPath ?? DefaultBook;
        break;
      case "kalyan":
        imgpath = book.kalyanThumbPath ?? DefaultBook;
        break;
      case "kalpatru":
        imgpath = book.kalyanKalpataruThumbPath ?? DefaultBook;
        break;
      case "geetgovind":
        imgpath = book.monthlyMagazineThumbPath ?? DefaultBook;
        break;
      case "vivek":
        imgpath = book.vivekVaniThumbPath ?? DefaultBook;
        break;
      default:
        imgpath = DefaultBook;
    }
    return imgpath;
  };

  return (
    <div>
      {books?.length > 0 ? (
        <div>
          <div>
            <p
              style={{
                fontFamily: "ChanakyaUni",
                fontWeight: 700,
                fontStyle: "normal",
                color: "#b42a38",
                fontSize: "26px",
                margin: "0 0 10px",
              }}
            >
              {title}
            </p>
            <div className="row" style={{ marginBottom: "21px" }}>
              {books.slice(0, displayCount).map((book: any) => (
                <div className="col-3" style={{ marginTop: "15px" }}>
                  <div
                    className="favebooks"
                    key={`related-${book.id}`}
                    onClick={() => {
                      getBook(book);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <img
                          style={{
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                          className="imgcenter"
                          src={getValueType(type, book)}
                          onError={(e) => {
                            e.currentTarget.src = DefaultBook;
                          }}
                          alt={book.name}
                          title={book.name}
                          width="117"
                          height="165"
                        />
                        <p>
                          {book?.name?.length > 40
                            ? book?.name.slice(0, 40) + "..."
                            : book?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {books?.length > 4 && (
            <div
              style={{
                textAlign: "center",
                margin: "20px 0 0 0",
              }}
            >
              {displayCount < books?.length ? (
                <button className="favitems" onClick={showMoreBooks}>
                  {t("all_tr")} {books?.length} {t("E_books_tr")} {t("view_tr")}
                </button>
              ) : (
                <button className="favitems" onClick={showLessBooks}>
                  {t("show_less_tr")}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const MarkList = ({
  initialDisplayCount,
  bookMarks,
  marktitle,
  getMarks,
}: {
  initialDisplayCount: number;
  bookMarks: any[];
  marktitle: string;
  getMarks: (value: any) => void;
}) => {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const showMoreBooks = () => {
    setDisplayCount(displayCount + 5); // Increase by a certain number
  };

  const showLessBooks = () => {
    setDisplayCount(initialDisplayCount); // Reset to initial display count
  };

  const { t } = useTranslation();

  return (
    <div>
      {bookMarks?.length > 0 ? (
        <div>
          <div>
            <p
              style={{
                fontFamily: "ChanakyaUni",
                fontWeight: 700,
                fontStyle: "normal",
                color: "#b42a38",
                fontSize: "26px",
                margin: "0 0 10px",
              }}
            >
              {marktitle}
            </p>
            <div className="row" style={{ marginBottom: "21px" }}>
              {bookMarks.slice(0, displayCount).map((mark: any) => (
                <div className="col-3" style={{ marginTop: "15px" }}>
                  <div
                    className="favebooks"
                    key={`related-${mark.id}`}
                    onClick={() => {
                      getMarks(mark);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <img src={bookmarkedicon} alt="" style={{ margin: "0 0 -52px 80px", width: "20px", position: "relative" }} />
                        <img
                          style={{
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                          className="imgcenter"
                          src={mark.path}
                          onError={(e) => {
                            e.currentTarget.src = DefaultBook;
                          }}
                          alt={mark.name}
                          title={mark.name}
                          width="117"
                          height="165"
                        />
                        <p>
                          {mark?.name?.length > 40
                            ? mark?.name.slice(0, 40) + "..."
                            : mark?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {bookMarks?.length > 4 && (
            <div
              style={{
                textAlign: "center",
                margin: "20px 0 0 0",
              }}
            >
              {displayCount < bookMarks?.length ? (
                <button className="favitems" onClick={showMoreBooks}>
                  {t("all_tr")} {bookMarks?.length} {t("bk_mark_tr")} {t("view_tr")}
                </button>
              ) : (
                <button className="favitems" onClick={showLessBooks}>
                  {t("show_less_tr")}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const AudioListButton = ({
  audios,
  initialDisplayCount,
  title,
  getAudios,
}: {
  audios: any[];
  initialDisplayCount: number;
  title: string;
  getAudios: (value: any) => void;
}) => {

  const { t } = useTranslation();
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const showMoreAudios = () => {
    setDisplayCount(displayCount + 5); // Increase by a certain number
  };

  const showLessAudios = () => {
    setDisplayCount(initialDisplayCount); // Reset to initial display count
  };

  return (
    <div>
      {audios?.length > 0 ? (
        <div>
          <div>
            <div>
              <p
                style={{
                  fontFamily: "ChanakyaUni",
                  fontWeight: 700,
                  fontStyle: "normal",
                  color: "#b42a38",
                  fontSize: "26px",
                  margin: "0 0 10px",
                }}
              >
                {title}
              </p>
              <div className="row" style={{ marginBottom: "21px" }}>
                {audios.slice(0, displayCount).map((audio: any) => (
                  <div
                    className="col-3"
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="favpagebooks"
                      key={`related-${audio.id}`}
                      onClick={() => {
                        getAudios(audio);
                      }}
                      style={{
                        backgroundColor: "#feba03",
                        backgroundImage:
                          "linear-gradient(#ffd04d,#feba03,#ffbb04)",
                        transition: "all .5s ease",
                        textAlign: "center",
                        borderRadius: "6px",
                        padding: "20px 30px",
                        boxShadow: "0 0 10px 0 #fff",
                        height: "145px",
                        margin: "0 0 22px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <img
                            className="audioicon"
                            src={
                              audio.lyricsHash != null
                                ? WithLyrics
                                : WithoutLyrics
                            }
                            onError={(e) => {
                              e.currentTarget.src = WithoutLyrics;
                            }}
                            alt={audio.name}
                            title={audio.name}
                            onClick={() => {
                              getAudios(audio);
                            }}
                          />
                          <p>
                            {audio?.name?.length > 40
                              ? audio?.name.slice(0, 40) + "..."
                              : audio?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {audios?.length > 4 && (
            <div
              style={{
                textAlign: "center",
                margin: "20px 0 0 0",
              }}
            >
              {displayCount < audios?.length ? (
                <button className="favitems" onClick={showMoreAudios}>
                  {t("all_tr")} {audios?.length} {t("Audios_tr")} {t("view_tr")}
                </button>
              ) : (
                <button className="favitems" onClick={showLessAudios}>
                  {t("show_less_tr")}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const FavouriteArticals = ({
  article,
  initialDisplayCount,
  title,
  getArtical,
}: {
  article: any[];
  initialDisplayCount: number;
  title: string;
  getArtical: (value: any) => void;
}) => {

  const { t } = useTranslation();

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const showMoreButton = () => {
    setDisplayCount(displayCount + 5); // Increase by a certain number
  };

  const showLessButton = () => {
    setDisplayCount(initialDisplayCount); // Reset to initial display count
  };

  return (
    <div>
      {article?.length > 0 ? (
        <div>
          <div>
            <p
              style={{
                fontFamily: "ChanakyaUni",
                fontWeight: 700,
                fontStyle: "normal",
                color: "#b42a38",
                fontSize: "26px",
                margin: "0 0 10px",
              }}
            >
              {title}
            </p>
            <div className="row" style={{ marginBottom: "21px" }}>
              {article.slice(0, displayCount).map((artical: any) => (
                <div
                  className="col-3"
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="favpagebooks"
                    onClick={() => {
                      getArtical(artical);
                    }}
                    style={{
                      textAlign: "center",
                      padding: "20px 30px",
                      height: "145px",
                      margin: "0 0 22px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <img
                          style={{
                            width: "28px",
                            height: "34px",
                            cursor: "pointer",
                            borderRadius: 0,
                          }}
                          src={articalIcon}
                          alt="articalimg"
                          width="60"
                        />
                        <p>
                          {artical?.name?.length > 30
                            ? artical?.name.slice(0, 30) + "..."
                            : artical?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {article?.length > 4 && (
            <div
              style={{
                textAlign: "center",
                margin: "20px 0 0 0",
              }}
            >
              {displayCount < article?.length ? (
                <button className="favitems" onClick={showMoreButton}>
                  {t("all_tr")} {article?.length} {t("Article_tr")} {t("view_tr")}
                </button>
              ) : (
                <button className="favitems" onClick={showLessButton}>
                  {t("show_less_tr")}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const Month = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const getMonthNameFromNumber = (monthNumber: any) => {
  if (localStorage.getItem("lan") === "english") {
    switch (monthNumber) {
      case Month.January:
        return 'January';
      case Month.February:
        return 'February';
      case Month.March:
        return 'March';
      case Month.April:
        return 'April';
      case Month.May:
        return 'May';
      case Month.June:
        return 'June';
      case Month.July:
        return 'July';
      case Month.August:
        return 'August';
      case Month.September:
        return 'September';
      case Month.October:
        return 'October';
      case Month.November:
        return 'November';
      case Month.December:
        return 'December';
      default:
        return 'Invalid Month';
    }
  } else {
    switch (monthNumber) {
      case Month.January:
        return 'जनवरी';
      case Month.February:
        return 'फरवरी';
      case Month.March:
        return 'मार्च';
      case Month.April:
        return 'अप्रैल';
      case Month.May:
        return 'मई';
      case Month.June:
        return 'जून';
      case Month.July:
        return 'जुलाई';
      case Month.August:
        return 'अगस्त';
      case Month.September:
        return 'सितंबर';
      case Month.October:
        return 'अक्टूबर';
      case Month.November:
        return 'नवंबर';
      case Month.December:
        return 'दिसंबर';
      default:
        return 'Invalid Month';
    }
  }
};

export const Specialmagzine = ({
  magzinecoverimage,
  magzinetitle,
  clickevent,
}: {
  magzinecoverimage: any;
  magzinetitle: string;
  clickevent: () => void;
}) => {

  return (
    <div
      className="tab-col"
    >
      <div
        className="tab-data-magazine"
      // style={{
      //   display: "-webkit-box", justifyContent: "center", padding: "20px", textAlign: "center"
      // }}
      >
        <div
          onClick={() => {
            clickevent();
          }}
        >
          <img
            className="img-fluid"
            src={magzinecoverimage}
            alt="coverimage"
            style={{ borderRadius: "5px", width: "150px", height: "212px" }}
          />
          <p className="mb-0 mt-3 magzinetitle">
            {magzinetitle}
          </p>
        </div>
      </div>
    </div>
  );
};