/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import { useTranslation } from "react-i18next";
import i18n, { _get_i18Lang } from "../i18n";
import { useEffect, useState } from "react";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import facebook from "../assets/img/facebook.png";
import instagram from "../assets/img/instagram.png";
import twitter from "../assets/img/twitter.png";
import youtube from "../assets/img/youtube.png";
import IosStore from "../assets/img/ios-app.png";
import androidplaystore from "../assets/img/android-app.png";
import AuthorsService from "../Services/Authors";
import "../Styles/style.css"

const FooterPage = () => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);

  const [MenuId, setMenuId] = useState("");
  const [MenuName, setMenuName] = useState("");
  const [authors, setAuthors] = useState<any[]>([]);

  const getCurrentYear = () => new Date().getFullYear();

  const [currentYear, setCurrentYear] = useState(getCurrentYear);

  function changeLocale(l: string) {
    i18n.changeLanguage(l);
    localStorage.setItem("lan", _get_i18Lang());
    localStorage.setItem("locale", l);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newYear = getCurrentYear();
      if (newYear !== currentYear) {
        setCurrentYear(newYear);
      }
    }, 1000 * 60 * 60 * 24); // Check every 24 hours

    return () => clearInterval(interval);
  }, [currentYear]);

  useEffect(() => {
    setRefresh(false)
    AuthorsService.getAuthorData("", 3).then((res) => {
      if (res) {
        setAuthors(res?.result);
      }
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    changeLocale(localStorage.getItem("locale") === "en" ? "en" : "hi");
  }, [refresh]);

  function menuid(menuname: string) {
    $(".header-menu > ul > li > a").removeClass("listActive");
    $("#menu_" + menuname).addClass("listActive");

    if (menuname === "about") {
      setMenuName(t("Introduction_tr"));
    } else if (menuname === "books") {
      setMenuName(t("E_books_tr"));
    } else if (menuname === "pravachans") {
      setMenuName(t("Pravachan_tr"));
    } else if (menuname === "audio") {
      setMenuName(t("Audios_tr"));
    } else if (menuname === "articles") {
      setMenuName(t("Article_tr"));
    } else if (menuname === "divinequotes") {
      setMenuName(t("Amrit_Vachan_tr"));
    }
  }

  useEffect(() => {
    setRefresh(false);
    changeLocale(localStorage.getItem("locale") === "en" ? "en" : "hi");
    $(".footer-menu > ul > li > a").removeClass("listActive");
  }, []);

  useEffect(() => {
    menuid(MenuId);
  }, [MenuId]);

  return (
    <div style={{ marginTop: 'auto' }}>
      <div className="gst-footer">
        <div className="containers">
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "30%" }}>
              <h2>{t("Legends_Introduction_tr")}</h2>
              <div style={{ display: "grid" }}>
                {authors?.map((author: any) => (
                  <div key={author?.id}>
                    <NavLink
                      className="ftmenulink"
                      to={"/author/" + author?.slug}
                      state={{ authorId: author.id, authorName: author.name, authorSlug: author?.slug }}
                      style={({ isActive }) => {
                        return { color: isActive ? "#d11501" : "#472d1e" };
                      }}
                    >
                      <label
                        key={author?.id}
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          borderBottom: "1px solid #ffd78c",
                          paddingBottom: "5px",
                          cursor: "pointer"
                        }}
                      >
                        {author?.name}
                      </label>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: "25%", margin: "0 15px" }}>
              <h2>{t("Subject_tr")}</h2>
              <div className="footermenu">
                <NavLink
                  to="/books"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("E_books_tr")}
                </NavLink>
                <p className="footermenucoma">,</p>
                <NavLink
                  to="/articles"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("Article_tr")}
                </NavLink>
              </div>
              <div className="footermenu">
                <NavLink
                  to="/pravachans"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                  onClick={() => {
                    localStorage.setItem("type", "pravachans");
                  }}
                >
                  {t("Pravachan_tr")}
                </NavLink>
                <p className="footermenucoma">,</p>
                <NavLink
                  to="/audio"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                  onClick={() => {
                    localStorage.setItem("type", "audios");
                  }}
                >
                  {t("Audios_tr")}
                </NavLink>
              </div>
              <div className="footermenu">
                <NavLink
                  to="/audioPodcast"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                  onClick={() => {
                    localStorage.setItem("type", "audioPodcast");
                  }}
                >
                  {t("daily_satsang_tr")}
                </NavLink>
              </div>
              <div className="footermenu">
                <NavLink
                  to="/kalyan"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("Kalyan_tr")}
                </NavLink>
                <p className="footermenucoma">,</p>
                <NavLink
                  to="/kalyanakalpataru"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("Kalpataru_tr")}
                </NavLink>
              </div>
              <div className="footermenu">
                <NavLink
                  to="/geetgovind"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("MonthlyMagazine_tr")}
                </NavLink>
                <p className="footermenucoma">,</p>
                <NavLink
                  to="/vivekvani"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("vivek_vani_tr")}
                </NavLink>
              </div>

              <div className="footermenu">
                <NavLink
                  to="/divinequotes"
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("Amrit_Vachan_tr")}
                </NavLink>
              </div>
            </div>
            <div className="" style={{ width: "20%" }}>
              <h2>{t("Our_Policies_tr")}</h2>
              <div className="footermenu" style={{ display: "grid" }}>
                <NavLink
                  to={"/privacypolicy"}
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("Privacy_Policy_tr")}
                </NavLink>
              </div>
              <div className="footermenu" style={{ display: "grid" }}>
                <NavLink
                  to={"/termsofuse"}
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("Terms_of_Use_tr")}
                </NavLink>
              </div>
              <div className="footermenu" style={{ display: "grid" }}>
                <NavLink
                  to={"/faq"}
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("general_question_tr")}
                </NavLink>
              </div>
              <div className="footermenu" style={{ display: "grid" }}>
                <NavLink
                  to={"/promotion"}
                  className="ftmenulink"
                  style={({ isActive }) => {
                    return { color: isActive ? "#d11501" : "#472d1e" };
                  }}
                >
                  {t("promotion_tr")}
                </NavLink>
              </div>
            </div>
            <div style={{ width: "25%" }}>
              <div
                style={{
                  float: "left",
                  textAlign: "center",
                  backgroundColor: "#fb8c1c",
                  padding: "5px",
                  borderRadius: "6px",
                  marginLeft: "25px",
                  color: "#fff",
                  display: "grid",
                }}
              >
                <img
                  src="https://gitaseva.org/assets/img/QR_AppDownload.png"
                  alt=""
                />
                <span>Scan to download the App</span>
              </div>
            </div>
            <div style={{ width: "20%" }}>
              <div className="app-icon">
                <div className="socialicons">
                  <a
                    href="https://www.facebook.com/gitasevaapp"
                    target="_blank"
                  >
                    <img alt="facebook" src={facebook} />
                  </a>
                  <a
                    href="https://www.instagram.com/gitasevaapp"
                    target="_blank"
                  >
                    <img alt="instagram" src={instagram} />
                  </a>
                  <a href="https://twitter.com/gitasevaapp" target="_blank">
                    <img alt="twitter" src={twitter} />
                  </a>
                  <a
                    href="https://www.youtube.com/gitasevaapp"
                    target="_blank"
                  >
                    <img alt="youtube" src={youtube} />
                  </a>
                </div>
                <a
                  href="https://itunes.apple.com/us/app/gita-seva-app/id1418594830"
                  target="_blank"
                >
                  <img
                    alt="ios-app"
                    src={IosStore}
                    style={{ marginBottom: "12px", paddingBottom: "12px" }}
                  />
                </a>
                <br />
                <a
                  href="https://play.google.com/store/apps/details?id=ct.android.gitasevakotlin"
                  target="_blank"
                >
                  <img alt="android-app" src={androidplaystore} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          color: "#3f220d",
          fontSize: "13px",
          fontFamily: "Arial",
          padding: "25px 0 5px 0",
          backgroundColor: "#fee3a3",
          borderTop: "1px solid #fff2d3",
        }}
      >
        <p className="gst-copyright">
          © Copyright
          <span style={{ margin: "0 3px" }}> | </span>
          <span style={{ color: "#fe7921" }}>Gita Seva Trust</span>
          <span style={{ margin: "0 5px" }}> | </span>
          All Rights Reserved 2017 - {currentYear}
          <span style={{ paddingLeft: "30%" }}>
            Web Developed & Managed By:
            <a
              href="http://www.capsitech.com/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Capsitech
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};
export default FooterPage;
