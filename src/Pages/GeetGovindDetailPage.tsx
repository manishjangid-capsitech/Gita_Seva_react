/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import DefaultBook from "../Images/defaultBook.png";
import GeetGovindServices from "../Services/GeetGovind";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import { useTranslation } from "react-i18next";
import i18n, { _get_i18Lang } from "../i18n";
import Favfill from "../assets/img/favadd.png";
import Favempty from "../assets/img/fav.png";
import { BookContentType } from "./Epub";
import { LogInModel, getMonthNameFromNumber } from "./LogInoutModel";
import EpubServices from "../Services/Epub";
import closeicon from "../Images/close-round-border.svg"

const GeetGovindDetailPage = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [magzineDetail, setMagzineDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const [MagzineId, setMagzineId] = useState("");
  const state = location.state as { MonthId: string };
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const [toggleFav, setToggleFav] = useState<boolean>(false);

  const [bookMark, setBookMark] = useState<boolean>(false)
  const [bookMarkData, setBookMarkData] = useState<any[] | undefined | any>(undefined);

  const UserIdentity = localStorage.getItem("UserId") as any;

  const notificationRef = useRef<any>(null);

  const monthName = getMonthNameFromNumber(magzineDetail?.months);

  const showNotification = (message: any) => {
    notificationRef.current.innerText = message;
    notificationRef.current.style.display = 'block';

    setTimeout(() => {
      notificationRef.current.style.display = 'none';
    }, 3000); // Hide the notification after 2 seconds
  };

  const notify = () => {
    if (UserIdentity) {
      showNotification(!isLiked
        ?
        localStorage.getItem("lan") === "hindi"
          ? "पत्रिका को सफलतापूर्वक मेरी पसंद में जोड़ा गया है।"
          : "Magazine has been successfully added to the favourites"
        : localStorage.getItem("lan") === "hindi"
          ? "पत्रिका मेरी पसंद से हटा दी गई है।"
          : "Magazine has been removed from favourites"
      )
    }
  };

  const toggleLike = () => {
    !isLiked
      ? GeetGovindServices.addMagzineFavourite(MagzineId).then((res) => {
        res.status && setIsLiked(true);
      })
      : GeetGovindServices.removeMagzineFavourite(MagzineId).then((res) => {
        res.status && setIsLiked(false);
      });
    setToggleFav((x) => !x);
  };

  useEffect(() => {
    if (location.state) {
      setMagzineId(state?.MonthId);
    }
  }, [MagzineId]);

  useEffect(() => {
    if (MagzineId) {
      setRefresh(false);
      GeetGovindServices.getcurrentMagazine(
        state?.MonthId,
        UserIdentity !== "" ? UserIdentity : ""
      ).then((res) => {
        if (res.status) {
          setMagzineDetail(res.result);
          setIsLiked(res?.result?.isFavourite);
        }
      });
    }
  }, [refresh, i18n.language, MagzineId]);

  useEffect(() => {
    if (state?.MonthId) {
      EpubServices.getbookmark(
        "monthlymagazinebookmarks",
        state?.MonthId,
      ).then((res: any) => {
        if (res.status) {
          setBookMarkData(res?.result)
        }
      })
    }
  }, [])

  return (
    <div
      className="newcontainer"
      style={{
        backgroundColor: "#FFF6E1",
        padding: "1px 0px 4% 0",
        marginTop: 0,
      }}
    >
      <div
        className="breadcrumbs-head newcontainer"
        style={{
          width: "100%",
          marginTop: "-175px",
          background: "none",
          backgroundColor: "#ffedbc",
          height: "240px",
          borderBottom: "2px solid #fff",
          paddingTop: 0,
        }}
      >
        <div className="breadcrumbs">
          <div
            className="containers"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "rgb(209, 21, 1)",
              top: "155px",
              fontFamily: "ChanakyaUniBold"
            }}
          >
            {t("MonthlyMagazine_tr")}
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
              <Link
                style={{ margin: "0 5px 0 0", color: "#2d2a29" }}
                to="/monthlymagazine"
              >
                / {t("MonthlyMagazine_tr")}
              </Link>
              <span style={{ color: "#2d2a29" }}>/ {magzineDetail?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          <div className="row">
            <div>
              {magzineDetail ? (
                <div
                  className="containers card-gst"
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    backgroundColor: "#FFFAF0",
                    border: "1px solid #ffd186",
                    boxShadow: "0px 0px 10px 0px #dcd1b8",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    className="mat-card row"
                    key={`book-${magzineDetail.id}`}
                  >
                    <div style={{ padding: "35px", margin: "0 0 25px 0" }}>
                      <div className="single-product col-lg-3">
                        <a>
                          <div
                            style={{
                              border: "1px solid #eadfc8",
                              padding: "30px",
                              background: "#fff",
                              borderRadius: "5px",
                              textAlign: "center",
                              width: "125%",
                            }}
                          >
                            <img
                              src={magzineDetail.monthlyMagazineThumbPath}
                              onError={(e) => {
                                e.currentTarget.src = DefaultBook;
                              }}
                              alt={magzineDetail.name}
                              title={magzineDetail.name}
                              className="bkdetailimg"
                              width="256"
                              height="362"
                            />
                          </div>
                        </a>
                      </div>

                      <div className="single-product-author col-lg-8">
                        <div className="single-book-heading">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <label
                              style={{
                                fontFamily: "ChanakyaUni",
                                fontSize: "40px",
                                color: "#472d1e",
                                marginTop: "7px",
                              }}
                            >
                              {magzineDetail.name}
                            </label>
                            <label
                              onClick={() => {
                                if (!UserIdentity) setLogIn(true);
                              }}

                              style={{ display: "flex", margin: 0 }}
                            >
                              <label style={{ display: bookMarkData?.length > 0 ? "block" : "none", marginRight: "10px" }}>
                                <div className="bkmarkicon"
                                  onClick={() => {
                                    setBookMark(bookMark === true ? false : true)
                                  }}>
                                  <div>
                                    {bookMark && UserIdentity && (
                                      <div style={{
                                        position: "absolute",
                                        backgroundColor: "#fff6e1",
                                        padding: "10px 5px",
                                        top: "56px",
                                        width: "162px",
                                        borderRadius: "5px",
                                        display: "grid",
                                        zIndex: 1,
                                      }}>
                                        <div style={{
                                          display: "flex",
                                          backgroundColor: "#ff6427"
                                        }}>
                                          <p
                                            style={{
                                              color: "#fff",
                                              fontStyle: "normal",
                                              lineHeight: "normal",
                                              borderBottom: "none",
                                              padding: "0 0 0 10%",
                                              margin: 0,
                                            }}>{t("bk_mark_tr")}</p>
                                          <img src={closeicon} style={{ width: "20px", height: "20px", margin: "4px 0 0 10px", cursor: "pointer" }} onClick={() => setBookMark(false)} alt="" />
                                        </div>
                                        <ol style={{ paddingLeft: "20px" }}>
                                          {bookMarkData && bookMarkData?.map((item: any, index: number) => (
                                            <li onClick={() => {
                                              navigate(
                                                `/reader/monthlymagazine/` +
                                                magzineDetail.slug,
                                                {
                                                  state: {
                                                    magazineDetailId: magzineDetail.id,
                                                    bookName: magzineDetail.name,
                                                    slug: magzineDetail.slug,
                                                    location: item?.cfi,
                                                    type: BookContentType.magazine,
                                                  },
                                                }
                                              );
                                            }}>
                                              <p style={{ borderBottom: "none", padding: 0, margin: "0 0 0 5px", color: "#000", cursor: "pointer" }}>{item?.name}</p></li>
                                          ))}
                                        </ol>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </label>

                              <label
                                onClick={() => {
                                  toggleLike();
                                  notify();
                                }}
                              >
                                <img
                                  src={isLiked ? Favfill : Favempty}
                                  alt="Favicon"
                                />
                              </label>
                            </label>
                          </div>
                        </div>
                        {magzineDetail.author ? (
                          <div>
                            <p>
                              <label>{t("Authors_tr")} </label>
                              {magzineDetail.author}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {magzineDetail.monthlyMagazineLanguage ? (
                          <div>
                            <p>
                              <label>{t("Language_tr")} </label>
                              {magzineDetail.monthlyMagazineLanguage}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        <div
                          className="next-read"
                          style={{ marginTop: "50px" }}
                        >
                          <p
                            style={{ cursor: "pointer", display: "inline" }}
                            onClick={() => {
                              setLogIn(true);
                              if (UserIdentity) {
                                navigate(
                                  `/reader/monthlymagazine/` +
                                  magzineDetail.slug,
                                  {
                                    state: {
                                      magazineDetailId: magzineDetail.id,
                                      bookName: magzineDetail.name,
                                      slug: magzineDetail.slug,
                                      label: magzineDetail.label,
                                      type: BookContentType.magazine,
                                    },
                                  }
                                );
                              }
                            }}
                          >
                            {t("read_magazine_tr")}
                          </p>
                          <div ref={notificationRef} style={{ color: "#ff3d28", fontSize: '20px', marginTop: "10px", height:"20px" }} className="notification-bar"></div>
                        </div>
                        <div className="bookdecription">
                          <div className="yearmonth" style={{ borderRight: "none" }}>
                            <span>{t("Year_tr")}</span>
                            <span>{magzineDetail?.years}</span>
                          </div>
                          <div className="yearmonth" style={{ borderRight: "none" }}>
                            <span>{t("Month_tr")}</span>
                            <span>{monthName}</span>
                          </div>
                          <div className="yearmonth">
                            <span>{t("Number_tr")}</span>
                            <span>{magzineDetail?.editionNo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // <Loading />
                ""
              )}
            </div>
          </div>
          {/* <LogInModel opens={logIn} onCloses={closeModal} /> */}
        </div>
      </div>
    </div >
  );
};
export default GeetGovindDetailPage;
