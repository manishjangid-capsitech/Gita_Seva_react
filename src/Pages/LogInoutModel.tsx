import React, { useState } from "react";
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
import SignWithOtp, { SignInWithFB, auth } from "./AuthSocial";
import loginLogo from "../assets/img/loginLogo.png";
import signingoogle from "../assets/img/signingoogle.svg";
import signinfacebook from "../assets/img/loginwithfacebook.svg";
import signinmobileno from "../assets/img/loginwithmobileno.png";
import "../Styles/Login.css";
import "../Styles/Profile.css";
import DefaultBook from "../Images/defaultBook.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import WithoutLyrics from "../Images/audiolyrics.svg";
import WithLyrics from "../Images/audiowithoutlyrics.svg";
import articalIcon from "../assets/img/article-icon.png";

interface LogOutModalProps {
  open: boolean;
  onClose: () => void;
}
interface LogInModalProps {
  opens: boolean;
  onCloses: () => void;
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
            localStorage.removeItem("UserId");
            localStorage.removeItem("userName");
            localStorage.removeItem("Image");
            localStorage.removeItem("email");
            localStorage.removeItem("mobileNo");
            localStorage.removeItem("Token");
            if (window.location.pathname?.includes("profile")) navigate(`/`);
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
}) => {
  const { t } = useTranslation();
  const [phoneModel, setPhoneModel] = useState<boolean>(false);
  const provider = new GoogleAuthProvider();
  return (
    <>
      <Modal show={opens} onClose={onClose} style={{ padding: "0 50px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-grid" }}>
            <img src={loginLogo} alt="" />
            <label
              style={{
                fontSize: "30px",
                textAlign: "center",
                padding: "0 0 10px",
                fontFamily: "ChanakyaUni",
                color: "#212121",
                marginLeft: "25px",
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
                    localStorage.setItem("EmailForLogin", email);
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
          <div
            className="loginbuttons"
            style={{ cursor: "pointer" }}
            onClick={SignInWithFB}
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
            <label style={{ marginBottom: "0px" }}>
              {t("login_With_Facebook_tr")}
            </label>
          </div>
          <div className="loginbuttons" onClick={() => setPhoneModel(true)}>
            {/* <SignWithOtp /> */}
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
            <label style={{ marginBottom: "0px" }}>
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
          <Modal show={phoneModel} style={{ paddingLeft: "8px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-grid" }}>
                <img src={loginLogo} alt="" />
                <label
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    padding: "0 0 10px",
                    fontFamily: "ChanakyaUni",
                    color: "#212121",
                    marginLeft: "25px",
                  }}
                >
                  {t("login_option_tr")}
                </label>
              </div>
            </div>
            <div className="loginbuttons" style={{ border: "none" }}>
              <SignWithOtp />
            </div>
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
  type: "kalyan" | "kalpatru" | "geetgovind" | "book";
  books: any[];
  initialDisplayCount: number;
  title: string;
  getBook: (value: any) => void;
}) => {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

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
      // case "prabachan":
      //   imgpath = book.kalyanKalpataruThumbPath ?? DefaultBook;
      //   break;
      default:
        imgpath = DefaultBook;
    }
    return imgpath;
  };

  return (
    <div>
      {books.length > 0 && (
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
                            style={{ cursor: "pointer", borderRadius: "5px" }}
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
          </div>
          {books.length > 4 && (
            <div
              style={{
                textAlign: "center",
                margin: "20px 0 0 0",
              }}
            >
              {displayCount < books.length ? (
                <button className="favitems" onClick={showMoreBooks}>
                  Show More
                </button>
              ) : (
                <button className="favitems" onClick={showLessBooks}>
                  Show Less
                </button>
              )}
            </div>
          )}
        </div>
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
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const showMoreAudios = () => {
    setDisplayCount(displayCount + 5); // Increase by a certain number
  };

  const showLessAudios = () => {
    setDisplayCount(initialDisplayCount); // Reset to initial display count
  };

  return (
    <div>
      {audios.length > 0 && (
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
                  <div className="col-3" style={{ marginTop: "15px" }}>
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
          {audios.length > 4 && (
            <div
              style={{
                textAlign: "center",
                margin: "20px 0 0 0",
              }}
            >
              {displayCount < audios.length ? (
                <button className="favitems" onClick={showMoreAudios}>
                  Show More
                </button>
              ) : (
                <button className="favitems" onClick={showLessAudios}>
                  Show Less
                </button>
              )}
            </div>
          )}
        </div>
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
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const showMoreButton = () => {
    setDisplayCount(displayCount + 5); // Increase by a certain number
  };

  const showLessButton = () => {
    setDisplayCount(initialDisplayCount); // Reset to initial display count
  };

  return (
    <div>
      {article.length > 0 && (
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
                <div className="col-3" style={{ marginTop: "15px" }}>
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
          {article.length > 4 && (
            <div
              style={{
                textAlign: "center",
                margin: "20px 0 0 0",
              }}
            >
              {displayCount < article.length ? (
                <button className="favitems" onClick={showMoreButton}>
                  Show More
                </button>
              ) : (
                <button className="favitems" onClick={showLessButton}>
                  Show Less
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ProfileSidebar = () =>
  //   {
  //   title,
  //   getNavigate,
  // }: {
  //   title: string;
  //   getNavigate: (value: any) => void;
  // }
  {
    const UserImage = localStorage.getItem("Image");
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const handleCloseDialog = () => {
      setIsDialogOpen(false);
    };
    return (
      <div
        className="col-3"
        style={{
          backgroundColor: "#FFFAF0",
          padding: "16px",
          boxShadow: "0 0 7px 1px #f5deb1",
        }}
      >
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#fb8c1c",
            padding: "7px",
            borderRadius: "2px",
          }}
        >
          {UserImage ? (
            <img
              id="userimg"
              src={UserImage}
              title="User Login"
              alt="user"
              style={{ width: "200px", height: "200px" }}
            />
          ) : (
            <img
              id="userimg"
              src="https://gitaseva.org/assets/img/profile-image1.png"
              title="User Login"
              className="nousericon"
              alt="user"
              style={{ width: "200px", height: "200px" }}
            />
          )}
          <h6
            style={{
              fontFamily: "ChanakyaUni",
              color: "#fff6e1",
              margin: "15px 0 -5px",
              fontSize: "21px",
            }}
          >
            {localStorage.getItem("userName")}
          </h6>
        </div>

        <nav>
          <div
            className="nav nav-tabs"
            id="nav-tab"
            role="tablist"
            style={{ display: "grid", border: "none" }}
          >
            <div style={{ borderBottom: "1px solid #f5dca0" }}>
              <div style={{ margin: "10px 100px 0px 60px" }}>
                <img
                  src="https://gitaseva.org/assets/img/profile-icon1.png"
                  alt="profile"
                  style={{
                    height: "22px",
                    width: "20px",
                    marginTop: "5px",
                  }}
                />
                {/* {MenuItem.map((menu: any) => {
                return ( */}
                <button
                  style={{
                    color: "#472D1E",
                    fontSize: "25px",
                    fontFamily: "ChanakyaUni",
                    padding: "0 16px",
                    border: "none",
                    background: "#FFFAF0",
                    borderBottom: "1px solid #f5dca0",
                  }}
                  className="nav-link active"
                  id="e-books-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#e-books"
                  type="button"
                  role="tab"
                  aria-controls="e-books"
                  aria-selected="true"
                  onClick={() => {
                    // getNavigate(`/Profile`);
                    navigate(`/profile`);
                  }}
                >
                  {t("Profile_tr")}
                  {/* {menu.name} */}
                </button>
                {/* );
              })} */}
              </div>
            </div>
            <div style={{ borderBottom: "1px solid #f5dca0" }}>
              <div style={{ margin: "10px 75px 0px 60px" }}>
                <img
                  src="https://gitaseva.org/assets/img/profile-icon2.png"
                  alt="profile"
                  style={{
                    height: "22px",
                    width: "20px",
                    marginTop: "5px",
                  }}
                />
                <button
                  style={{
                    color: "#FF984D",
                    fontSize: "25px",
                    fontFamily: "ChanakyaUni",
                    padding: "0 16px",
                    border: "none",
                    // fontWeight: 600,
                    background: "#FFFAF0",
                    borderBottom: "1px solid #f5dca0",
                  }}
                  className="nav-link"
                  id="audios-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#audios"
                  type="button"
                  role="tab"
                  aria-controls="audios"
                  aria-selected="false"
                  onClick={() => {
                    navigate(`/profile/fav`);
                  }}
                >
                  {t("Favourite_tr")}
                </button>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid #f5dca0" }}>
              <div style={{ margin: "10px 62px 0px 60px" }}>
                <img
                  src="https://gitaseva.org/assets/img/profile-icon4.png"
                  alt="profile"
                  style={{
                    height: "22px",
                    width: "20px",
                    marginTop: "5px",
                  }}
                />
                <button
                  style={{
                    color: "#472D1E",
                    fontSize: "25px",
                    fontFamily: "ChanakyaUni",
                    padding: "0 16px",
                    border: "none",
                    // fontWeight: 600,
                    background: "#FFFAF0",
                    borderBottom: "1px solid #f5dca0",
                  }}
                  className="nav-link"
                  id="pravachans-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#pravachans"
                  type="button"
                  role="tab"
                  aria-controls="pravachans"
                  aria-selected="false"
                  onClick={() => {
                    navigate(`/profile/feedback`);
                  }}
                >
                  {t("Help_tr")}
                </button>
              </div>
            </div>
            <div style={{ margin: "10px 90px 0px 60px" }}>
              <img
                src="https://gitaseva.org/assets/img/logout.png"
                alt="profile"
                style={{
                  height: "22px",
                  width: "20px",
                  marginTop: "5px",
                }}
              />
              <button
                style={{
                  color: "#472D1E",
                  fontSize: "25px",
                  fontFamily: "ChanakyaUni",
                  padding: "0 16px",
                  // fontWeight: 600,
                  background: "#FFFAF0",
                }}
                className="nav-link"
                id="articles-tab"
                data-bs-toggle="tab"
                data-bs-target="#articles"
                type="button"
                role="tab"
                aria-controls="articles"
                aria-selected="false"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                {t("LogOut_tr")}
              </button>
            </div>
          </div>
        </nav>
        <LogOutModel open={isDialogOpen} onClose={handleCloseDialog} />
      </div>
    );
  };

export const UploadProfileImage = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event: any) => {
    const uploadedImage = event.target.files[0];
    const imageURL = URL?.createObjectURL(uploadedImage) as any;
    setImage(uploadedImage);
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {/* {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '100px' }} />} */}
      {/* {image && (
        <button onClick={() => alert('Image Saved!')}>
          Save Image
        </button>
      )} */}
    </>
  );
};
