/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useRef, useState } from "react";
import i18n, { _get_i18Lang } from "../i18n";
import SearchDataService, { ISearchParams } from "../Services/SearchData";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "../Styles/style.css";
// import "../Styles/PageHeader.css"
import arrowdown from "../assets/img/drop_down.svg";
import arrowdownblack from "../assets/img/dropdownblack.svg";
import { useTranslation } from "react-i18next";
import LoginServices from "../Services/Login";
import { LogInModel, LogOutModel } from "../Pages/LogInoutModel";
import gitalogo from "../Images/logo_Main.png"
import $ from "jquery";


const HeaderPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<ISearchParams>({
    language: _get_i18Lang(),
    productType: "all",
    searchValue: "",
    authorId: "",
  });

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [showLang, setShowLang] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);

  const [audiosdropdown, setAudiosdropdown] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [logIn, setLogIn] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<string | null>(null);

  const closeModal = () => {
    setLogIn(false);
  };

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

  const dropdownRef = useRef(null);

  function toggleLang() {
    setShowLang((wasOpened) => !wasOpened);
  }

  function togglemenu() {
    setMenu((wasOpened) => !wasOpened);
  }

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  function toggleAudiodropdown() {
    setAudiosdropdown((wasOpened) => !wasOpened);
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

  const handleLoginStateChange = (newState: any) => {
    setLoginState(newState);
  };

  const UserIdentity = localStorage.getItem("UserId") as string;
  // const imgs = localStorage.getItem("Image")

  const [imgs, setImgs] = useState<any>("")

  useEffect(() => {
    fetch(
      'https://api.gitaseva.org/v1/api/user/profilepicture?id=' + UserIdentity + '&isThumb=1'
    )
      .then(response => {
        response.status === 404 || response.statusText === "" || setImgs("https://gitaseva.org/assets/img/userWhite.png");
        // Check the Content-Type of the response
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
          // If the response is JSON, parse it
          return response.json();
        } else if (contentType && contentType.includes('text/plain')) {
          // If the response is plain text (e.g., a Base64 string), parse as text
          return response.text();
        } else {
          // If the response is binary (e.g., image data), parse as blob
          return response.blob();
        }
      })
      .then(data => {
        // Step 2: Process the data based on its type
        if (typeof data === 'string') {
          // If data is a Base64 string, decode and create a Blob
          // const binaryString = atob(data);
          // const len = binaryString.length;
          // const bytes = new Uint8Array(len);

          // for (let i = 0; i < len; i++) {
          //   bytes[i] = binaryString.charCodeAt(i);
          // }

          // // Create a Blob from the binary data
          // const blob = new Blob([bytes], { type: 'image/png' });
          // const imageURL = URL.createObjectURL(blob);
          // console.log('imageURL', imageURL);
        } else if (data instanceof Blob) {
          // If data is already a Blob, create a URL for it
          const imageURL = URL.createObjectURL(data);
          setImgs(imageURL);
        } else {
          throw new Error('Unsupported response type');
        }
      })
      .catch(err => {
        console.error('Error fetching the image:', err);
        console.log('Failed to load image');
      });
  }, [UserIdentity])

  useEffect(() => {
    let token = localStorage.getItem("Token")
    if (UserIdentity && token) {
    }
  }, [logIn, loginState, imgs, localStorage, UserIdentity, loginState]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpened, showLang, menu]);

  const handleError = () => {
    setImgs("https://gitaseva.org/assets/img/userWhite.png")
  };
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
                    src={gitalogo}
                    alt="gstlogo"
                  />
                </Link>
              </div>
            </div>
            <div className="headerwidth">
              <div
                style={{
                  display: "flex",
                  float: "right",
                  paddingTop: "15px",
                  marginRight: "3px",
                }}
              >
                <div className="gst-menu">
                  <select
                    className="allCatSearch"
                    // style={{ width: "95px" }}
                    onChange={(e) => {
                      searchValue.productType =
                        e.currentTarget?.value ?? undefined;
                    }}
                  >
                    <option value="all" style={{ color: "#000" }}>
                      {t("all_tr")}
                    </option>
                    <option value="book" style={{ color: "#000" }}>
                      {t("E_books_tr")}
                    </option>
                    <option value="monthlymagazine" style={{ color: "#000" }}>
                      {t("MonthlyMagazine_tr")}
                    </option>
                    <option value="kalyan" style={{ color: "#000" }}>
                      {t("Kalyan_tr")}
                    </option>
                    <option value="kalpataru" style={{ color: "#000" }}>
                      {t("Kalpataru_tr")}
                    </option>
                    <option value="audios" style={{ color: "#000" }}>
                      {t("Audios_tr")}
                    </option>
                    <option value="pravachan" style={{ color: "#000" }}>
                      {t("Pravachan_tr")}
                    </option>
                    <option value="article" style={{ color: "#000" }}>
                      {t("Article_tr")}
                    </option>
                    <option value="vivekvani" style={{ color: "#000" }}>
                      {t("vivek_vani_tr")}
                    </option>
                  </select>
                </div>
                <div className="searchbar" style={{ marginRight: "5px" }}>
                  <form style={{ display: "flex" }}>
                    <input
                      type="search"
                      name="search"
                      className="search-field"
                      value={searchValue.searchValue}
                      style={{ width: "232px", padding: "8px 35px 8px 20px" }}
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
                        padding: "5px 4px 0px 0px",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        position: "absolute",
                        right: "-55px",
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
                      border: "none",
                      cursor: "pointer",
                      marginLeft: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={toggleLang}
                  >
                    {localStorage.getItem("locale") === "hi"
                      ? "हिंदी"
                      : "English "}
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
                          <p>हिंदी</p>
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
                              language: "English",
                            });
                          }}
                        >
                          <p>English</p>
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
                      style={{ color: window?.location.pathname === "/" || window?.location.pathname === "/home" ? "#d11501" : "#472d1e" }}
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
                      onClick={() => {
                        setMenu(false);
                      }}
                      style={({ isActive }) => {
                        return { color: isActive ? "#d11501" : "#472d1e" };
                      }}
                    >
                      {t("E_books_tr")}
                    </NavLink>
                  </li>

                  <li>
                    <div style={{ display: "inline-block" }}>
                      <div
                        style={{
                          fontSize: "22px",
                          fontFamily: "ChanakyaUniBold",
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
                            margin: "-2px 4px 0 5px",
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
                              padding: "10px 9px 0px",
                              zIndex: 1,
                              background: "#FDA63B",
                              borderRadius: "5px",
                            }}
                          >
                            <NavLink
                              id="hmenu_Kalpataru"
                              to="/geetgovind"
                              onClick={() => setMenu(false)}
                              style={({ isActive }) => {
                                return {
                                  color: isActive ? "#d11501" : "#472d1e",
                                  marginTop: "-10px",
                                };
                              }}
                            >
                              {t("MonthlyMagazine_tr")}
                            </NavLink>
                            <NavLink
                              id="menu_klayan"
                              to="/kalyan"
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
                              to="/kalyanakalpataru"
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
                        setAudiosdropdown(false)
                      }}
                    >
                      {t("Audios_tr")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      id="hmenu_satsang"
                      to="/audioPodcast"
                      style={({ isActive }) => {
                        return { color: isActive ? "#d11501" : "#472d1e" };
                      }}
                      onClick={() => {
                        localStorage.setItem("type", "audioPodcast");
                        setMenu(false);
                        setAudiosdropdown(false)
                      }}
                    >
                      {t("daily_satsang_tr")}
                    </NavLink>
                  </li>

                  {/* <li>
                    <div style={{ display: "inline-block" }}>
                      <div
                        style={{
                          fontSize: "22px",
                          fontFamily: "ChanakyaUniBold",
                          fontWeight: 600,
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                        onClick={toggleAudiodropdown}
                      >
                        {t("Audios_tr")}
                        <img
                          src={arrowdownblack}
                          alt="arrowdownblack"
                          style={{
                            height: "12px",
                            width: "11px",
                            margin: "-2px -5px 0 5px",
                          }}
                        />
                      </div>
                      <div>
                        {audiosdropdown && (
                          <div
                            ref={dropdownRef}
                            className="dropdownstyle"
                            style={{
                              display: "grid",
                              position: "absolute",
                              padding: "10px 9px 0px",
                              zIndex: 1,
                              background: "#FDA63B",
                              borderRadius: "5px",
                            }}
                          >
                            <NavLink
                              id="hmenu_audios"
                              to="/audios"
                              style={({ isActive }) => {
                                return { color: isActive ? "#d11501" : "#472d1e" };
                              }}
                              onClick={() => {
                                localStorage.setItem("type", "audios");
                                setMenu(false);
                                setAudiosdropdown(false)
                              }}
                            >
                              {t("Audios_tr")}
                            </NavLink>
                            <NavLink
                              id="hmenu_satsang"
                              to="/audioPodcast"
                              style={({ isActive }) => {
                                return { color: isActive ? "#d11501" : "#472d1e" };
                              }}
                              onClick={() => {
                                localStorage.setItem("type", "audioPodcast");
                                setMenu(false);
                                setAudiosdropdown(false)
                              }}
                            >
                              {t("daily_satsang_tr")}
                            </NavLink>
                          </div>
                        )}
                      </div>
                    </div>
                  </li> */}
                  <li>
                    <NavLink
                      id="menu_vivek"
                      to="/divinequotes"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "#d11501" : "#472d1e",
                          marginTop: "-10px",
                        };
                      }}
                    >
                      {t("Amrit_Vachan_tr")}
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

                <div className="loginmenudd">
                  <a
                    className="link-btn"
                    style={{
                      cursor: "pointer",
                      margin: "15px 0 0 0",
                    }}
                  >
                    {UserIdentity ?
                      <img
                        id="userimg"
                        src={imgs}
                        onError={handleError}
                        title="User Login"
                        className="nousericon"
                        alt="user"
                        onClick={toggle}
                        style={{ width: "40px", height: "40px" }}
                      />
                      :
                      <img
                        id="userimg"
                        src="https://gitaseva.org/assets/img/userWhite.png"
                        title="User Login"
                        className="nousericon"
                        alt="user"
                        onClick={() => {
                          setLogIn(true)
                        }}
                        style={{ width: "40px", height: "40px" }}
                      />
                    }
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
                          onClick={() => {
                            setIsDialogOpen(true);
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
                <LogInModel opens={logIn} onCloses={closeModal} onLoginStateChange={handleLoginStateChange} />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};
export default HeaderPage;