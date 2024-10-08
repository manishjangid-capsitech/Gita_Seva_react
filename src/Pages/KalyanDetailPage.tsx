/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import DefaultBook from "../Images/defaultBook.png";
import KalyansServices from "../Services/Kalyan";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Favfill from "../assets/img/favadd.svg";
import Favempty from "../assets/img/fav.svg";
import { BookContentType } from "./Epub";
import { userId } from "../Contexts/LocaleContext";
import { LogInModel, getMonthNameFromNumber } from "./LogInoutModel";
import leftArrow from "../assets/img/leftArrow1.png";
import rightArrow from "../assets/img/rightArrow1.png"
import closeicon from "../Images/close-round-border.svg"
import EpubServices from "../Services/Epub";
import { Breadcrumbs } from "./E-BooksComponent";
import bookmarkIcon from "../Images/Bookmark.svg"

const KalyanDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [kalyanDetail, setKalyanDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [kalyanId, setKalyanId] = useState("");
  const [relateds, setRelatedKalyans] = useState<any[] | undefined>(undefined);

  const location = useLocation();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const state = location.state as {
    kalyanId: string,
    kalyanSlug: string,
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

  const UserIdentity = localStorage.getItem("UserId") as any;

  const [toggleFav, setToggleFav] = useState<boolean>(false);

  const [bookMark, setBookMark] = useState<boolean>(false)
  const [bookMarkData, setBookMarkData] = useState<any[] | undefined | any>(undefined);

  const notificationRef = useRef<any>(null);

  const showNotification = (message: any) => {
    notificationRef.current.innerText = message;
    notificationRef.current.style.display = 'block';

    setTimeout(() => {
      notificationRef.current.style.display = 'none';
    }, 3000); // Hide the notification after 2 seconds
  };

  const [loginState, setLoginState] = useState<string | null>(null);

  const handleLoginStateChange = (newState: any) => {
    setLoginState(newState);
    navigate(`/reader/kalyan/` + kalyanDetail.slug, {
      state: {
        kalyanDetailId: state?.kalyanId,
        bookName: state?.bookName,
        slug: state?.kalyanSlug,
        type: BookContentType.kalyan,
      },
    });
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
      ? KalyansServices.addKalyanFavourite(kalyanId).then((res) => {
        res.status && setIsLiked(true);
      })
      : KalyansServices.removeKalyanFavourite(kalyanId).then((res) => {
        res.status && setIsLiked(false);
      });
    setToggleFav((x) => !x);
  };

  const monthName = getMonthNameFromNumber(kalyanDetail?.months);

  useEffect(() => {
    if (location.state) {
      setKalyanId(state?.kalyanId);
    }
  }, [kalyanId]);

  useEffect(() => {
    if (kalyanId) {
      setRefresh(false);
      KalyansServices.getcurrentKalyan(
        state?.kalyanId,
        UserIdentity !== "" ? UserIdentity : ""
      ).then((res) => {
        if (res.status) {
          setKalyanDetail(res.result);
          setIsLiked(res.result.isFavourite);
        }
      });
    }
  }, [refresh, i18n.language, kalyanId]);

  useEffect(() => {
    setRefresh(false);
    if (kalyanId) {
      KalyansServices.getRelatedKalyans(kalyanId, "").then((res) => {
        if (res?.status) {
          setRelatedKalyans(res.result);
        }
      });
    }
  }, [refresh, i18n.language, kalyanId]);

  useEffect(() => {
    if (state?.kalyanId) {
      EpubServices.getbookmark(
        "kalyanbookmarks",
        state?.kalyanId
      ).then((res: any) => {
        if (res.status) {
          setBookMarkData(res?.result)
        }
      });
    }
  }, [refresh, i18n.language, userId]);

  return (
    <div
      className="newcontainer"
      style={{
        backgroundColor: "#FFF6E1",
        padding: "1px 0px 4% 0",
        marginTop: 0,
      }}
    >
      <Breadcrumbs
        mainsubBreadCrumb={t("Kalyan_tr")}
        subBreadCrumb={t("Home_tr")}
        navigatemainsubBreadCrumb={() => {
          navigate(`/home`);
        }}
        subBreadCrumbTwo={t("Kalyan_tr")}
        navigatesubBreadCrumb={() => {
          navigate(`/kalyan`)
        }}
        subBreadCrumbThree={kalyanDetail?.name}
      />
      <div className="container">
        <div className="row">
          <div>
            {kalyanDetail ? (
              <div
                className="containers card-gst"
                style={{
                  width: "100%",
                  marginTop: "25px",
                  backgroundColor: "#FFFAF0",
                  boxShadow: "0px 0px 10px 0px #dcd1b8",
                }}
              >
                <div className="mat-card row" key={`book-${kalyanDetail.id}`}>
                  <div style={{ padding: "15px", margin: "0 0 25px 0" }}>
                    <div className="single-product col-lg-3">
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
                          src={kalyanDetail.kalyanThumbPath}
                          onError={(e) => {
                            e.currentTarget.src = DefaultBook;
                          }}
                          alt={kalyanDetail.name}
                          title={kalyanDetail.name}
                          className="bkdetailimg"
                          width="256"
                          height="365"
                        />
                      </div>
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
                              marginTop: "7px",
                            }}
                          >
                            {kalyanDetail.name}
                          </h1>
                          <label
                            onClick={() => {
                              if (!userId) setLogIn(true);
                            }}
                            style={{ display: "flex", margin: 0 }}
                          >
                            <label style={{ display: bookMarkData?.length > 0 ? "block" : "none", marginRight: "10px" }}>
                              <div className="bkmarkicon"
                                onClick={() => {
                                  setBookMark(bookMark === true ? false : true)
                                }}>
                                <div>
                                  <img src={bookmarkIcon} style={{ width: "45px", height: "45px" }} alt="bookmaarkicon" />
                                </div>
                                <div>
                                  {bookMark && userId && (
                                    <div className="bkmarkicon-style">
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
                                            navigate(`/reader/kalyan/` + kalyanDetail.slug, {
                                              state: {
                                                kalyanDetailId: kalyanDetail.id,
                                                bookName: kalyanDetail.name,
                                                slug: kalyanDetail.slug,
                                                location: item?.cfi,
                                                type: BookContentType.kalyan,
                                              },
                                            });
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
                                style={{ width: "45px" }}
                              />
                            </label>
                          </label>
                        </div>
                      </div>
                      {kalyanDetail.author ? (
                        <div>
                          <p>
                            <label>{t("Authors_tr")} </label>
                            {kalyanDetail.author}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {kalyanDetail.kalyanLanguage ? (
                        <div>
                          <p>
                            <label>{t("Language_tr")} </label>
                            {kalyanDetail.kalyanLanguage}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="bookdecription">
                        <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}>
                          <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0', paddingBottom: 0 }}>{t("Year_tr")}</label>
                          <label style={{ fontSize: "23px", color: "#ff731f" }}>{kalyanDetail?.years}</label>
                        </div>
                        <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderLeft: 0, borderRight: 0 }}>
                          <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0' }}>{t("Month_tr")}</label>
                          <label style={{ fontSize: "23px", color: "#ff731f" }}>{monthName}</label>
                        </div>
                        <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}>
                          <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0' }}>{t("Number_tr")}</label>
                          <label style={{ fontSize: "23px", color: "#ff731f" }}>{kalyanDetail?.editionNo}</label>
                        </div>
                      </div>
                      <div className="next-read">
                        <p
                          style={{ cursor: "pointer", display: "inline" }}
                          onClick={() => {
                            setLogIn(true);
                            if (UserIdentity) {
                              navigate(`/reader/kalyan/` + kalyanDetail.slug, {
                                state: {
                                  kalyanDetailId: kalyanDetail.id,
                                  bookName: kalyanDetail.name,
                                  slug: kalyanDetail.slug,
                                  type: BookContentType.kalyan,
                                },
                              });
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
                    <div
                      style={{
                        backgroundColor: "#FFFAF0",
                      }}
                    >
                      <h1
                        style={{ fontSize: "30px!important" }}
                        className="heading-related"
                      >
                        {t("Related_Kalyan_tr")}
                      </h1>

                      <div style={{ paddingBottom: "20px", width: " 97%", left: "18px", position: "relative" }}>
                        <Slider {...settings}>
                          {relateds && relateds.length > 0
                            ? relateds.map((related) => (
                              <div
                                className="slider-books sidebarmargin"
                                key={`related-${related.id}`}
                                onClick={() => {
                                  navigate(`/kalyan/` + related.slug, {
                                    state: {
                                      kalyanId: related.id,
                                      kalyanSlug: related?.slug
                                    },
                                  });
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
                                        related?.kalyanThumbPath
                                        // related.kalyanThumbPath == null
                                        //   ? DefaultBook
                                        //   : related.kalyanThumbPath
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
  );
};
export default KalyanDetailPage;
