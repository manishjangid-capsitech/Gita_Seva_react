/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import DefaultBook from "../Images/defaultBook.png";
import GeetGovindServices from "../Services/GeetGovind";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import { useTranslation } from "react-i18next";
import i18n, { _get_i18Lang } from "../i18n";
import Favfill from "../assets/img/favadd.svg";
import pdfimage from "../Images/PDF.svg";
import Favempty from "../assets/img/fav.svg";
import { BookContentType } from "./Epub";
import { LogInModel, getMonthNameFromNumber } from "./LogInoutModel";
import EpubServices from "../Services/Epub";
import closeicon from "../Images/close-round-border.svg"
import { Breadcrumbs } from "./E-BooksComponent";
import bookmarkIcon from "../Images/Bookmark.svg"

const GeetGovindDetailPage = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [magzineDetail, setMagzineDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const [MagzineId, setMagzineId] = useState("");
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };
  const state = location.state as {
    MonthId: string,
    bookName: string,
    slug: string,
  };

  const [toggleFav, setToggleFav] = useState<boolean>(false);

  const [bookMark, setBookMark] = useState<boolean>(false)
  const [bookMarkData, setBookMarkData] = useState<any[] | undefined | any>(undefined);

  const UserIdentity = localStorage.getItem("UserId") as any;

  const notificationRef = useRef<any>(null);

  const monthName = getMonthNameFromNumber(magzineDetail?.months);

  const [loginState, setLoginState] = useState<string | null>(null);

  const handleLoginStateChange = (newState: any) => {
    setLoginState(newState);
    navigate(
      `/reader/geetgovind/` +
      magzineDetail.slug,
      {
        state: {
          magazineDetailId: state?.MonthId,
          bookName: state?.bookName,
          slug: state?.slug,
          type: BookContentType.magazine,
        },
      }
    );
  };

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
        debugger
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
      <Breadcrumbs
        mainsubBreadCrumb={t("MonthlyMagazine_tr")}
        subBreadCrumb={t("Home_tr")}
        navigatemainsubBreadCrumb={() => {
          navigate(`/home`);
        }}
        subBreadCrumbTwo={t("MonthlyMagazine_tr")}
        navigatesubBreadCrumb={() => {
          navigate(`/geetgovind`)
        }}
        subBreadCrumbThree={magzineDetail?.name}
      />
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
                              width: "131%",
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
                                    <img src={bookmarkIcon} style={{ width: "45px", height: "45px" }} alt="bookmaarkicon" />
                                  </div>
                                  <div>
                                    {bookMark && UserIdentity && (
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
                                              navigate(
                                                `/reader/geetgovind/` +
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

                              <label>
                                {magzineDetail?.pdfPath != null ?
                                  <a href={magzineDetail?.pdfPath} title="pdf" rel="noreferrer" target="_blank" >
                                    <img
                                      src={pdfimage}
                                      alt="pdficon"
                                      style={{ width: "45px", margin: "0 10px 0 0" }}
                                    />
                                  </a>
                                  : ""}
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
                        <div className="bookdecription">
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0', paddingBottom: 0 }}>{t("Year_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{magzineDetail?.years}</label>
                          </div>
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderLeft: 0, borderRight: 0 }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0' }}>{t("Month_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{monthName}</label>
                          </div>
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0' }}>{t("Number_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{magzineDetail?.editionNo}</label>
                          </div>
                        </div>
                        <div className="next-read">
                          <p
                            style={{ cursor: "pointer", display: "inline" }}
                            onClick={() => {
                              setLogIn(true);
                              if (UserIdentity) {
                                navigate(
                                  `/reader/geetgovind/` +
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
                          <div ref={notificationRef} style={{ color: "#ff3d28", fontSize: '20px', marginTop: "10px", height: "20px" }} className="notification-bar"></div>
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
    </div >
  );
};
export default GeetGovindDetailPage;
