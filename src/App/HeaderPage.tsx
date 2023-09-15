/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useRef, useState } from "react";
import i18n, { _get_i18Lang } from "../i18n";
import { ISearchParams } from "../Services/SearchData";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "../Styles/style.css";
import arrowdown from "../assets/img/drop_down.svg";
import arrowdownblack from "../assets/img/dropdownblack.svg";
import { useTranslation } from "react-i18next";
import LoginServices from "../Services/Login";
import { userId } from "../Contexts/LocaleContext";
import { LogInModel, LogOutModel } from "../Pages/LogInoutModel";

const HeaderPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<ISearchParams>({
    language: _get_i18Lang(),
    productType: "all",
    searchValue: "",
    authorId: "",
  });

  const [image, setImage] = useState("");

  const LoginEmail = localStorage.getItem("EmailForLogin") as any;
  const mobileNumber = localStorage.getItem("LoginphoneNumber") as any;

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [showLang, setShowLang] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  function toggleLang() {
    setShowLang((wasOpened) => !wasOpened);
  }

  function togglemenu() {
    setMenu((wasOpened) => !wasOpened);
  }

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  function changeLocale(l: string) {
    i18n.changeLanguage(l);
    localStorage.setItem("lan", _get_i18Lang());
    localStorage.setItem("locale", l);
    if (localStorage.getItem("locale") === "en") {
      $(".select-lang").removeClass("langwidth");
    } else {
      $(".select-lang").addClass("langwidth");
    }
  }

  useEffect(() => {
    if (LoginEmail != null && LoginEmail !== undefined) {
      LoginServices.getUserLogin("", "", LoginEmail, 2, "", "", "").then(
        (res) => {
          if (res.status) {
            // debugger
            setImage(res?.result?.imageThumbPath);
            localStorage.setItem("UserId", res?.result?.userId);
            localStorage.setItem("userName", res?.result?.name);
            localStorage.setItem("Image", res?.result?.imageThumbPath);
            localStorage.setItem("Email", res?.result?.email);
            localStorage.setItem("Token", res?.result?.token);
            localStorage.setItem("SignKey", res?.result?.signKey);
          }
        }
      );
    }
  }, [LoginEmail]);

  useEffect(() => {
    if (mobileNumber != null) {
      LoginServices.getUserLogin("", mobileNumber, "", 1, "", "", "").then(
        (res) => {
          // debugger;
          setImage(res?.result?.imageThumbPath);
          localStorage.setItem("UserId", res?.result?.userId);
          localStorage.setItem("userName", res?.result?.name);
          localStorage.setItem("Image", res?.result?.imageThumbPath);
          // localStorage.setItem("UserImage", UserImage);
          localStorage.setItem("PhoneNumber", res?.result?.phoneNumber);
          localStorage.setItem("Token", res?.result?.token);
          localStorage.setItem("SignKey", res?.result?.signKey);
        }
      );
    }
  }, [mobileNumber]);

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && isOpened === true) {
      setIsOpened(false);
    }
    if (dropdownRef.current && showLang === true) {
      setShowLang(false);
    }
    if (dropdownRef.current && menu === true) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpened, showLang, menu]);

  return (
    <>
      <div className="gst-header" id="gstheader">
        <div className="containers">
          <p className="shrihari">{t("shrihari_tr")}</p>
          <div className="row">
            <div style={{ width: "15%" }}>
              <div className="gst-logo" style={{ float: "none", width: "55%" }}>
                <Link to="/">
                  <img
                    src="https://gitaseva.org/assets/img/logo_Main.png"
                    alt="gstlogo"
                  />
                </Link>
              </div>
            </div>
            <div style={{ width: "85%" }}>
              <div
                style={{ display: "flex", float: "right", paddingTop: "15px" }}
              >
                <div className="gst-menu">
                  <select
                    className="allCatSearch"
                    style={{ width: "95px" }}
                    onChange={(e) => {
                      searchValue.productType =
                        e.currentTarget?.value ?? undefined;
                    }}
                  >
                    <option value="" selected>
                      {t("all_tr")}
                    </option>
                    <option value="book">{t("E_books_tr")}</option>
                    <option value="monthlymagzine">
                      {t("MonthlyMagazine_tr")}
                    </option>
                    <option value="kalyan">{t("Kalyan_tr")}</option>
                    <option value="kalpataru">{t("Kalpataru_tr")}</option>
                    <option value="audios">{t("Audios_tr")}</option>
                    <option value="pravachan">{t("Pravachan_tr")}</option>
                    <option value="article">{t("Article_tr")}</option>
                  </select>
                </div>
                <div className="searchbar" style={{ marginRight: "5px" }}>
                  <form style={{ display: "flex" }}>
                    <input
                      type="search"
                      name="search"
                      className="search-field"
                      value={searchValue.searchValue}
                      style={{ width: "232px", padding: "8px 35px 8px 30px" }}
                      onChange={(e) => {
                        setSearchValue({
                          ...searchValue,
                          searchValue: e.target.value,
                        });
                      }}
                      onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          navigate(
                            `/searchdata/${searchValue.productType}/${searchValue.searchValue}`,
                            { state: searchValue }
                          );
                        }
                      }}
                    />

                    <img
                      style={{
                        width: "22px",
                        padding: "4px 3px 0 0",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        position: "absolute",
                        right: "-60px",
                        cursor: "pointer",
                      }}
                      src="https://gitaseva.org/assets/img/search-icons.png"
                      alt="search"
                      onClick={() => {
                        navigate(
                          `/searchdata/${searchValue.productType}/${searchValue.searchValue}`,
                          { state: searchValue }
                        );
                      }}
                    />
                  </form>
                </div>

                <div className="gst-menu" style={{ marginLeft: "17px" }}>
                  <div
                    className="allCatSearch"
                    style={{
                      padding: "2px 10px 0 6px",
                      borderRadius: "4px",
                      width: "75px",
                      display: "flex",
                      border: "none",
                      cursor: "pointer",
                      marginLeft: "12px",
                    }}
                    onClick={toggleLang}
                  >
                    {localStorage.getItem("locale") === "hi"
                      ? "हिंदी"
                      : "English"}
                    <img
                      src={arrowdown}
                      alt="arrowdown"
                      style={{
                        height: "12px",
                        width: "11px",
                        margin: "7px 0px 0px 4px",
                      }}
                    />
                  </div>
                  <div>
                    {showLang && (
                      <div
                        ref={dropdownRef}
                        className="dropdownstyle"
                        style={{
                          position: "absolute",
                          zIndex: 1,
                          margin: "5px 0 0 49px",
                        }}
                      >
                        <div
                          className="activelang"
                          style={{
                            margin: "25px 0 0 0",
                            border: "1px solid gray",
                            textAlign: "center",
                            width: "75px",
                            backgroundColor: "#ffb968",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setShowLang(false);
                            changeLocale("hi");
                            setSearchValue({
                              ...searchValue,
                              language: "हिंदी",
                            });
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              color: "#ea7a05",
                              fontSize: "19px",
                              fontWeight: 600,
                            }}
                          >
                            हिंदी
                          </p>
                        </div>
                        <div
                          className="activelang"
                          style={{
                            marginTop: "-4px",
                            border: "1px solid gray",
                            textAlign: "center",
                            backgroundColor: "#ffb968",
                            cursor: "pointer",
                            width: "75px",
                          }}
                          onClick={() => {
                            setShowLang(false);
                            changeLocale("en");
                            setSearchValue({
                              ...searchValue,
                              language: "english",
                            });
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              color: "#ea7a05",
                              fontSize: "19px",
                              fontWeight: 600,
                            }}
                          >
                            english
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="gst-menubar">
                <ul className="list-unstyled hmenu" style={{ display: "flex" }}>
                  <li>
                    <NavLink
                      id="hmenu_home"
                      to={"/home"}
                      onClick={() => setMenu(false)}
                    >
                      <i
                        className="fa fa-home"
                        style={{ fontSize: "22px" }}
                      ></i>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      id="hmenu_about"
                      to="/about"
                      onClick={() => setMenu(false)}
                      style={({ isActive }) => {
                        return { color: isActive ? "#d11501" : "#472d1e" };
                      }}
                    >
                      {t("Introduction_tr")}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      id="hmenu_books"
                      to="/books"
                      onClick={() => setMenu(false)}
                      style={({ isActive }) => {
                        return { color: isActive ? "#d11501" : "#472d1e" };
                      }}
                    >
                      {t("E_books_tr")}
                    </NavLink>
                  </li>

                  <li style={{ display: "contents" }}>
                    <div>
                      <div
                        style={{
                          fontSize: "22px",
                          fontFamily: "ChanakyaUni",
                          fontWeight: 600,
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                        onClick={togglemenu}
                      >
                        {t("magazine_tr")}
                        <img
                          src={arrowdownblack}
                          alt="arrowdownblack"
                          style={{
                            height: "12px",
                            width: "11px",
                            margin: "5px -5px 0 5px",
                          }}
                        />
                      </div>
                      <div>
                        {menu && (
                          <div
                            ref={dropdownRef}
                            className="dropdownstyle"
                            style={{
                              display: "grid",
                              position: "absolute",
                              padding: "5px 9px 0px",
                              zIndex: 1,
                              background: "#FDA63B",
                              borderRadius: "5px",
                            }}
                          >
                            <NavLink
                              id="menu_klayan"
                              to="/kalyans"
                              style={({ isActive }) => {
                                return {
                                  color: isActive ? "#d11501" : "#472d1e",
                                  marginTop: "-10px",
                                };
                              }}
                            >
                              {t("Kalyan_tr")}
                            </NavLink>
                            <NavLink
                              id="menu_Kalpataru"
                              to="/kalyanskalpataru"
                              style={({ isActive }) => {
                                return {
                                  color: isActive ? "#d11501" : "#472d1e",
                                  marginTop: "-10px",
                                };
                              }}
                            >
                              {t("Kalpataru_tr")}
                            </NavLink>
                            <NavLink
                              id="menu_vivek"
                              to="/vivekvani"
                              style={({ isActive }) => {
                                return {
                                  color: isActive ? "#d11501" : "#472d1e",
                                  marginTop: "-10px",
                                };
                              }}
                            >
                              {t("vivek_vani_tr")}
                            </NavLink>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <NavLink
                      id="hmenu_Kalpataru"
                      to="/monthlymagazine"
                      onClick={() => setMenu(false)}
                      style={({ isActive }) => {
                        return { color: isActive ? "#d11501" : "#472d1e" };
                      }}
                    >
                      {t("MonthlyMagazine_tr")}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      id="hmenu_pravachans"
                      to="/pravachans"
                      style={({ isActive }) => {
                        return { color: isActive ? "#d11501" : "#472d1e" };
                      }}
                      onClick={() => {
                        localStorage.setItem("type", "pravachans");
                        setMenu(false);
                      }}
                    >
                      {t("Pravachan_tr")}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      id="hmenu_audios"
                      to="/audios"
                      style={({ isActive }) => {
                        return { color: isActive ? "#d11501" : "#472d1e" };
                      }}
                      onClick={() => {
                        localStorage.setItem("type", "audios");
                        setMenu(false);
                      }}
                    >
                      {t("Audios_tr")}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      id="hmenu_articles"
                      to="/articles"
                      onClick={() => setMenu(false)}
                      style={{ contain: "none !important" }}
                    >
                      {t("Article_tr")}
                    </NavLink>
                  </li>
                </ul>

                <div
                  className="loginmenudd"
                  style={{
                    position: "absolute",
                    padding: "10px 0",
                    right: "0px",
                  }}
                >
                  <a
                    className="link-btn"
                    style={{
                      cursor: "pointer",
                      margin: "15px 0 0 0",
                    }}
                  >
                    {image && userId ? (
                      <img
                        id="userimg"
                        src={
                          image === null && undefined
                            ? "https://gitaseva.org/assets/img/userWhite.png"
                            : image
                        }
                        title="User Login"
                        className="nousericon"
                        alt="user"
                        onClick={toggle}
                        style={{ width: "25px", height: "25px" }}
                      />
                    ) : (
                      <img
                        id="userimg"
                        src="https://gitaseva.org/assets/img/userWhite.png"
                        title="User Login"
                        className="nousericon"
                        alt="user"
                        onClick={() => {
                          setLogIn(true);
                        }}
                        style={{ width: "25px", height: "25px" }}
                      />
                    )}
                  </a>
                  {isOpened && (
                    <div
                      ref={dropdownRef}
                      style={{
                        position: "absolute",
                        backgroundColor: "#ffffff",
                        padding: "10px 5px",
                        left: "15px",
                        top: "56px",
                        width: "146px",
                        borderRadius: "5px",
                        display: "grid",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          fontSize: "22px",
                          marginBottom: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(`/profile`);
                          setIsOpened(false);
                        }}
                      >
                        <img
                          src="https://gitaseva.org/assets/img/profile-icon1.png"
                          alt="favourite"
                          style={{
                            display: "flex",
                            width: "22px",
                            height: "25px",
                            margin: "0 12px",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "Roboto,Helvetica Neue,sans-serif",
                            fontSize: "14px",
                            color: "#000000de",
                            marginTop: "3px",
                          }}
                        >
                          {t("Profile_tr")}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "22px",
                          marginBottom: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setIsOpened(false);
                          navigate(`/profile/fav`);
                        }}
                      >
                        <img
                          src="https://gitaseva.org/assets/img/profile-icon2.png"
                          alt="feedback"
                          style={{
                            display: "flex",
                            width: "22px",
                            height: "25px",
                            margin: "0 12px",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "Roboto,Helvetica Neue,sans-serif",
                            fontSize: "14px",
                            color: "#000000de",
                            marginTop: "3px",
                          }}
                        >
                          {t("Favourite_tr")}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "22px",
                          marginBottom: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setIsOpened(false);
                          navigate(`/profile/feedback`);
                        }}
                      >
                        <img
                          src="https://gitaseva.org/assets/img/profile-icon4.png"
                          alt="profile"
                          style={{
                            display: "flex",
                            width: "22px",
                            height: "25px",
                            margin: "0 12px",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "Roboto,Helvetica Neue,sans-serif",
                            fontSize: "14px",
                            color: "#000000de",
                            marginTop: "3px",
                          }}
                        >
                          {t("Help_tr")}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "22px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src="https://gitaseva.org/assets/img/logout.png"
                          alt="logout"
                          style={{
                            display: "flex",
                            width: "22px",
                            height: "25px",
                            margin: "0 12px",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "Roboto,Helvetica Neue,sans-serif",
                            fontSize: "14px",
                            color: "#000000de",
                            marginTop: "3px",
                          }}
                          onClick={() => {
                            setIsDialogOpen(true);
                          }}
                        >
                          {t("LogOut_tr")}
                        </p>
                      </div>
                    </div>
                  )}
                  <LogOutModel
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                  />
                </div>
                <LogInModel opens={logIn} onCloses={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderPage;
