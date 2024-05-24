/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import DefaultBook from "../Images/defaultBook.png";
import KalpataruServices from "../Services/Kalpataru";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import i18n, { _get_i18Lang } from "../i18n";
import Favfill from "../assets/img/favadd.png";
import Favempty from "../assets/img/fav.png";
import { BookContentType } from "./Epub";
import { LogInModel, getMonthNameFromNumber } from "./LogInoutModel";
import leftArrow from "../assets/img/leftArrow1.png";
import rightArrow from "../assets/img/rightArrow1.png"
import closeicon from "../Images/close-round-border.svg"
import EpubServices from "../Services/Epub";

const KalpataruDetailPage = (props: any) => {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const navigate = useNavigate();
  const [kalpatrauDetail, setKalpatrauDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [kalpatruId, setKalpatruId] = useState("");
  const [relateds, setRelatedKalpatrau] = useState<any[] | undefined>(
    undefined
  );

  const location = useLocation();
  const state = location.state as {
    kalpatruId: string,
    kalpatruSlug: string,
    bookName: string,
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <img src={leftArrow} alt="" height="40px" />,
    nextArrow: <img src={rightArrow} alt="" height="40px" />
  };

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const [toggleFav, setToggleFav] = useState<boolean>(false);

  const UserIdentity = localStorage.getItem("UserId") as any;

  const [bookMark, setBookMark] = useState<boolean>(false)
  const [bookMarkData, setBookMarkData] = useState<any[] | undefined | any>(undefined);

  const [loginState, setLoginState] = useState<string | null>(null);

  const handleLoginStateChange = (newState: any) => {
    setLoginState(newState);

    navigate(
      `/reader/kalyanskalpataru/` +
      kalpatrauDetail.slug,
      {
        state: {
          kalpatrauDetailId: state?.kalpatruId,
          bookName: state?.bookName,
          slug: state?.kalpatruSlug,
          type: BookContentType.kalpatru,
        },
      }
    );
  };

  const notificationRef = useRef<any>(null);

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
      ? KalpataruServices.addKalpatruFavourite(kalpatruId).then((res) => {
        res.status && setIsLiked(true);
      })
      : KalpataruServices.removeKalpatruFavourite(kalpatruId).then((res) => {
        res.status && setIsLiked(false);
      });
    setToggleFav((x) => !x);
  };

  useEffect(() => {
    if (location.state) {
      setKalpatruId(state?.kalpatruId);
    }
  }, [kalpatruId]);

  const monthName = getMonthNameFromNumber(kalpatrauDetail?.months);

  useEffect(() => {
    if (kalpatruId) {
      setRefresh(false);
      KalpataruServices.getcurrentKalpatarul(
        state?.kalpatruId,
        UserIdentity !== "" ? UserIdentity : ""
      ).then((res) => {
        if (res) {
          setKalpatrauDetail(res.result);
          setIsLiked(res?.result?.isFavourite);
        }
      });
    }
  }, [refresh, i18n.language, kalpatruId]);

  useEffect(() => {
    setRefresh(false);
    if (kalpatruId) {
      KalpataruServices.getRelatedKalpatrau(kalpatruId, "").then((res) => {
        if (res) {
          setRelatedKalpatrau(res.result);
        }
      });
    }
  }, [refresh, i18n.language, kalpatruId]);

  useEffect(() => {
    if (state?.kalpatruId) {
      EpubServices.getbookmark(
        "kalyankalpatarubookmarks",
        state?.kalpatruId
      ).then((res: any) => {
        if (res.status) {
          setBookMarkData(res?.result)
        }
      });
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
            {t("Kalpataru_tr")}
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
                to="/kalyanskalpataru"
              >
                / {t("Kalpataru_tr")}
              </Link>
              <span style={{ color: "#2d2a29" }}>
                / {kalpatrauDetail?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          <div className="row">
            <div>
              {kalpatrauDetail ? (
                <div
                  className="containers card-gst"
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    backgroundColor: "#FFFAF0",
                    boxShadow: "0px 0px 10px 0px #dcd1b8",
                  }}
                >
                  <div
                    className="mat-card row"
                    key={`book-${kalpatrauDetail.id}`}
                  >
                    <div style={{ padding: "15px", margin: "0 0 25px 0" }}>
                      <div className="single-product col-lg-3">
                        <a>
                          <div
                            style={{
                              border: "1px solid #eadfc8",
                              padding: "30px",
                              background: "#fff",
                              borderRadius: "5px",
                              textAlign: "center",
                              width: "137%",
                            }}
                          >
                            <img
                              src={kalpatrauDetail.kalyanKalpataruThumbPath}
                              onError={(e) => {
                                e.currentTarget.src = DefaultBook;
                              }}
                              alt={kalpatrauDetail.name}
                              title={kalpatrauDetail.name}
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
                            <h1
                              style={{
                                fontFamily: "ChanakyaUni",
                                fontSize: "40px",
                                color: "#472d1e",
                                margin: "0 0 8px",
                              }}
                            >
                              {kalpatrauDetail.name}
                            </h1>
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
                                                `/reader/kalyanskalpataru/` +
                                                kalpatrauDetail.slug,
                                                {
                                                  state: {
                                                    kalpatrauDetailId: kalpatrauDetail.id,
                                                    bookName: kalpatrauDetail.name,
                                                    slug: kalpatrauDetail.slug,
                                                    location: item?.cfi,
                                                    type: BookContentType.kalpatru,
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
                                  notify()
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
                        {kalpatrauDetail.author ? (
                          <div>
                            <p>
                              <label>{t("Authors_tr")} </label>
                              {kalpatrauDetail.author}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {kalpatrauDetail.kalyanKalpataruLanguage ? (
                          <div>
                            <p>
                              <label>{t("Language_tr")} </label>
                              {kalpatrauDetail.kalyanKalpataruLanguage}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="bookdecription">
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0', paddingBottom: 0 }}>{t("Year_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{kalpatrauDetail?.years}</label>
                          </div>
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderLeft: 0, borderRight: 0 }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0' }}>{t("Month_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{monthName}</label>
                          </div>
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0' }}>{t("Number_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{kalpatrauDetail?.editionNo}</label>
                          </div>
                        </div>
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
                                  `/reader/kalyanskalpataru/` +
                                  kalpatrauDetail.slug,
                                  {
                                    state: {
                                      kalpatrauDetailId: kalpatrauDetail.id,
                                      bookName: kalpatrauDetail.name,
                                      slug: kalpatrauDetail.slug,
                                      label: kalpatrauDetail.label,
                                      type: BookContentType.kalpatru,
                                    },
                                  }
                                );
                              }
                            }}
                          >
                            {t("read_magazine_tr")}
                          </p>
                          <div ref={notificationRef} style={{ color: "#ff3d28", fontSize: '20px', marginTop: "10px", height: "20px" }} className="notification-bar"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clsslide row">
                    <div>
                      <div>
                        <h1 className="heading-related">
                          {t("Related_Kalyan_Kalpataru_tr")}
                        </h1>

                        <div style={{ paddingBottom: "20px", width: " 97%", left: "18px", position: "relative" }}>
                          <Slider {...settings}>
                            {relateds && relateds.length > 0
                              ? relateds.map((related) => (
                                <div
                                  className="slider-books sidebarmargin"
                                  key={`related-${related.id}`}
                                  onClick={() => {
                                    navigate(
                                      `/kalyanskalpataru/` + related.slug,
                                      {
                                        state: {
                                          kalpatruId: related.id,
                                          bookName: related.name,
                                        },
                                      }
                                    );
                                    window.location.reload();
                                  }}
                                >
                                  <div>
                                    <a>
                                      <img
                                        style={{
                                          cursor: "pointer",
                                          borderRadius: 0,
                                        }}
                                        className="imgcenter"
                                        src={
                                          related.kalyanKalpataruThumbPath ==
                                            null
                                            ? DefaultBook
                                            : related.kalyanKalpataruThumbPath
                                        }
                                        onError={(e) => {
                                          e.currentTarget.src = DefaultBook;
                                        }}
                                        alt={related.name}
                                        title={related.name}
                                        width="150"
                                        height="212"
                                      />
                                      <p style={{ fontFamily: "ChanakyaUniBold" }}>{related?.name}</p>
                                    </a>
                                  </div>
                                </div>
                              ))
                              : ""}
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <LogInModel opens={logIn} onCloses={closeModal} onLoginStateChange={handleLoginStateChange} />
        </div>
      </div>
    </div>
  );
};
export default KalpataruDetailPage;
