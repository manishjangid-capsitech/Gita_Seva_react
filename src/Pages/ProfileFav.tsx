/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ProfileService from "../Services/Profile";
import i18n, { _get_i18Lang } from "../i18n";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import $ from "jquery";
import "../Styles/Profile.css";
import {
  AudioListButton,
  BookListButton,
  FavouriteArticals,
  LogOutModel,
} from "./LogInoutModel";
import PageFooter from "../App/FooterPage";

export interface userinfoEnum {
  name: string;
  email: string;
  baseFile: any;
  address1: any;
  address2: string;
  city: string;
  state: string;
  country: string;
  countrytype: string;
  pinCode: string;
  language: string;
  mobileNo: string;
}

export const ProfileFav = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const UserImage = localStorage.getItem("Image");
  const [bookFav, getBookFav] = useState<any>([]);
  const [kalyan, getKalyan] = useState<any>([]);
  const [kalpatru, getKalpatru] = useState<any>([]);
  const [geetgovind, getGeetGovind] = useState<any>([]);
  const [pravachan, getPravachan] = useState<any>([]);
  const [audio, getAudio] = useState<any>([]);
  const [article, getArticle] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [selectedMenu, setSelectedMenu] = useState<any>("");

  const initialDisplayCount = 4;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    setRefresh(false);
    ProfileService.getfavData(_get_i18Lang(), 0, 1000).then((res: any) => {
      getBookFav(res?.result?.books);
      getKalyan(res?.result?.kalyans);
      getKalpatru(res.result?.kalyansKalpataru);
      getGeetGovind(res?.result?.monthlyMagazine);
      getPravachan(res?.result?.pravachans);
      getAudio(res?.result?.audios);
      getArticle(res?.result?.articles);
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    $(".CategoryList > span").removeClass("#000000");
    $("#profile-" + selectedMenu).addClass("#000000");
  }, [selectedMenu]);

  useEffect(() => {
    if (window.location.pathname === "/profile") {
      $(".CategoryList > span").removeClass("listActive");
      $("#profile-" + selectedMenu).addClass("listActive");
    }
  }, [selectedMenu]);

  function activetab(PId: string) {
    $("#nav-tab > button").removeClass("active");
    $("#" + PId + "-tab").addClass("active");
    $("#nav-tabContent > div").removeClass("show active");
    $("#" + PId).addClass("show active");
  }

  return (
      <div>
        <div
          className="breadcrumbs-head newcontainer"
          style={{
            width: "100%",
            marginTop: "-175px",
            background: "none",
            backgroundColor: "#ffedbc",
            height: "240px",
            borderBottom: "2px solid #fff",
          }}
        >
          <div className="breadcrumbs">
            <div
              className="containers"
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "rgb(209, 21, 1)",
                marginLeft: "14%",
                top: "155px",
              }}
            >
              {t("Profile_tr")}
              <div
                style={{
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "#2d2a29",
                  marginTop: "-8px",
                }}
              >
                <Link style={{ marginRight: "4px", color: "#2d2a29" }} to="/">
                  {t("Home_tr")}
                </Link>
                <span style={{ color: "#2d2a29" }}>/ {t("Profile_tr")}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="newcontainer"
          style={{
            backgroundColor: "#FFF6E1",
            padding: "27px 0 100% 0",
            marginTop: 0,
          }}
        >
          <div className="containers" style={{ height: "800px" }}>
            <div className="row">
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
                          className="nav-link active"
                          id="e-books-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#e-books"
                          type="button"
                          role="tab"
                          aria-controls="e-books"
                          aria-selected="true"
                          onClick={() => {
                            activetab("e-books");
                            navigate(`/profile`);
                          }}
                        >
                          {t("Profile_tr")}
                        </button>
                      </div>
                    </div>
                    <div style={{ borderBottom: "1px solid #f5dca0" }}>
                      <div style={{ margin: "10px 55px 0px 60px" }}>
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
                            padding: "0 35px 0 0",
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
                            activetab("audios");
                            navigate(`/profile/fav`);
                          }}
                        >
                          {t("Favourite_tr")}
                        </button>
                      </div>
                    </div>
                    <div style={{ borderBottom: "1px solid #f5dca0" }}>
                      <div style={{ margin: "10px 38px 0px 60px" }}>
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
                            padding: "0 40px 0 0",
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
                            activetab("pravachans");
                            navigate(`/profile/feedback`);
                          }}
                        >
                          {t("Help_tr")}
                        </button>
                      </div>
                    </div>
                    <div>
                      <div style={{ margin: "10px 105px 0px 60px" }}>
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
                            padding: "0 ",
                            border: "none",
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
                            activetab("articles");
                            setIsDialogOpen(true);
                          }}
                        >
                          {t("LogOut_tr")}
                        </button>
                      </div>
                    </div>
                  </div>
                </nav>
                {/* <ProfileSidebar /> */}
                <LogOutModel open={isDialogOpen} onClose={handleCloseDialog} />
              </div>
              <div className="col-9">
                <div
                  className="tab-pane fade show active"
                  id="e-books"
                  role="tabpanel"
                  style={{
                    overflow: "hidden",
                    boxShadow: "0 0 7px 1px #f5deb1",
                  }}
                  aria-labelledby="e-books-tab"
                >
                  <div className="tab-row">
                    <div className="tabscroll">
                      <div
                        style={{ background: "#FFFAF0", padding: "15px 10px" }}
                      >
                        <BookListButton
                          type="book"
                          title={t("E_books_tr")}
                          books={bookFav}
                          initialDisplayCount={initialDisplayCount}
                          getBook={(book) => {
                            navigate(`/books/` + book.slug, {
                              state: {
                                bookId: book.id,
                                bookName: book.name,
                              },
                            });
                            window.location.reload();
                          }}
                        />
                        <BookListButton
                          type="kalyan"
                          title={t("Kalyan_tr")}
                          books={kalyan}
                          initialDisplayCount={initialDisplayCount}
                          getBook={(kalyan) => {
                            navigate(`/kalyans/` + kalyan.slug, {
                              state: { kalyanId: kalyan.id },
                            });
                          }}
                        />

                        <BookListButton
                          type="kalpatru"
                          title={t("Kalpataru_tr")}
                          books={kalpatru}
                          initialDisplayCount={initialDisplayCount}
                          getBook={(kalpatru) => {
                            navigate(`/kalyanskalpataru/` + kalpatru.slug, {
                              state: { kalpatruId: kalpatru.id },
                            });
                          }}
                        />

                        <BookListButton
                          type="geetgovind"
                          title={t("MonthlyMagazine_tr")}
                          books={geetgovind}
                          initialDisplayCount={initialDisplayCount}
                          getBook={(kalpatru) => {
                            navigate(`/monthlymagazine/` + kalpatru.slug, {
                              state: { MonthId: kalpatru.id },
                            });
                          }}
                        />

                        <AudioListButton
                          title={t("Pravachan_tr")}
                          audios={pravachan}
                          initialDisplayCount={initialDisplayCount}
                          getAudios={(audio) => {
                            localStorage.setItem("type", "pravachans");
                            navigate(`/pravachans/` + audio.slug, {
                              state: {
                                type: pravachan,
                                audioId: audio.id,
                                audioslug: audio.slug,
                              },
                            });
                          }}
                        />

                        <AudioListButton
                          title={t("Audios_tr")}
                          audios={audio}
                          initialDisplayCount={initialDisplayCount}
                          getAudios={(audio) => {
                            localStorage.setItem("type", "audios");
                            navigate(`/audios/` + audio.slug, {
                              state: {
                                type: "audio",
                                audioId: audio.id,
                                audioslug: audio.slug,
                              },
                            });
                          }}
                        />

                        <FavouriteArticals
                          title={t("Article_tr")}
                          article={article}
                          initialDisplayCount={initialDisplayCount}
                          getArtical={(artical) => {
                            navigate(`/articles/` + artical.slug, {
                              state: {
                                articleId: artical.id,
                                articleName: artical.name,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
