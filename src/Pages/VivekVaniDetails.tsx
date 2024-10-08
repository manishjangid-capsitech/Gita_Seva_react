/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import DefaultBook from "../Images/defaultBook.png";
import VivekService from "../Services/Vivekvani";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import Slider from "react-slick";
import { _get_i18Lang } from "../i18n";
import Favfill from "../assets/img/favadd.svg";
import Favempty from "../assets/img/fav.svg";
import { BookContentType } from "./Epub";
import { useTranslation } from "react-i18next";
import { userId } from "../Contexts/LocaleContext";
import "react-toastify/dist/ReactToastify.css";
import { LogInModel, getMonthNameFromNumber } from "./LogInoutModel";
import { toast } from "react-toastify";
import EpubServices from "../Services/Epub";
import closeicon from "../Images/close-round-border.svg"
import { Breadcrumbs } from "./E-BooksComponent";
import bookmarkIcon from "../Images/Bookmark.svg"

export interface ISingleBook {
  bookLanguageId: string;
  bookLastPosition: string;
  slug: string;
  bookHash: string;
  name: string;
  id: string;
  bookThumbPath: string;
  author: string;
  bookLanguage: string;
  bookPath: string;
  filePath: string;
  isFavourite: boolean;
  description: string;
}

const VivekvaniDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [vaniDetail, setVaniDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [relateds, setRelatedBooks] = useState<any[] | undefined>(undefined);

  const UserIdentity = localStorage.getItem("UserId") as any;

  const [bookMark, setBookMark] = useState<boolean>(false)
  const [bookMarkData, setBookMarkData] = useState<any[] | undefined | any>(undefined);

  const location = useLocation();
  const state = location.state as {
    vivekId: string;
    bookName: string;
    vivekSlug: string
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [toggleFav, setToggleFav] = React.useState<boolean>(false);

  const notificationRef = useRef<any>(null);

  const monthName = getMonthNameFromNumber(vaniDetail?.months);

  const [loginState, setLoginState] = useState<string | null>(null);

  const handleLoginStateChange = (newState: any) => {
    setLoginState(newState);

    navigate(
      `/reader/vivekvanis/` + vaniDetail.slug,
      {
        state: {
          vivekvaniDetailId: state?.vivekId,
          bookName: state?.bookName,
          slug: state?.vivekSlug,
          type: BookContentType.vivek,
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
      ? VivekService.addFavourite(state.vivekId).then((res) => {
        res.status && setIsLiked(true);
      })
      : VivekService.removeFavourite(state.vivekId).then((res) => {
        res.status && setIsLiked(false);
      });

    setToggleFav((x) => !x);
  };

  useEffect(() => {
    VivekService.VikekDetailService(
      state.vivekId,
      UserIdentity !== "" ? UserIdentity : ""
    ).then((res: any) => {
      setVaniDetail(res.result);
      setIsLiked(res.result.isFavourite);
    });
  }, []);

  useEffect(() => {
    setRefresh(false);
    VivekService.getRelatedVanis(state.vivekId, _get_i18Lang(), "").then(
      (res) => {
        if (res.status) {
          setRelatedBooks(res.result);
        }
      }
    );
  }, [refresh]);

  useEffect(() => {
    if (state?.vivekId) {
      EpubServices.getvivekvanimark(
        state?.vivekId,
      ).then((res: any) => {
        if (res.status) {
          setBookMarkData(res?.result)
        }
      });
    }
  }, [refresh, userId])

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
        mainsubBreadCrumb={t("vivek_vani_tr")}
        subBreadCrumb={t("Home_tr")}
        navigatemainsubBreadCrumb={() => {
          navigate(`/home`);
        }}
        subBreadCrumbTwo={window.location.pathname === "/vivekvani/special"
          ? t("Special_vivek_vani_tr")
          : t("vivek_vani_tr")}
        navigatesubBreadCrumb={() => {
          navigate(`/vivekvani`)
        }}
        subBreadCrumbThree={vaniDetail?.name}
      />
      <div className="container">
        <div>
          <div className="row">
            <div>
              {vaniDetail ? (
                <div
                  className="containers card-gst"
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    backgroundColor: "#FFFAF0",
                    boxShadow: "0px 0px 10px 0px #dcd1b8",
                  }}
                >
                  <div className="mat-card row" key={`book-${vaniDetail.id}`}>
                    <div style={{ padding: "15px" }}>
                      <div className="single-product col-lg-3">
                        <a>
                          <div
                            style={{
                              border: "1px solid #eadfc8",
                              padding: "35px 0",
                              background: "#fff",
                              borderRadius: "5px",
                              textAlign: "center",
                              width: "125%",
                            }}
                          >
                            <img
                              src={
                                vaniDetail.vivekVaniThumbPath === null
                                  ? DefaultBook
                                  : vaniDetail.vivekVaniThumbPath
                              }
                              onError={(e) => {
                                e.currentTarget.src = DefaultBook;
                              }}
                              alt={vaniDetail.name}
                              title={vaniDetail.name}
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
                                fontSize: "26px",
                                fontWeight: 700,
                                color: "#472d1e",
                                marginTop: "7px",
                              }}
                            >
                              {vaniDetail.name}
                            </label>
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
                                              navigate(
                                                `/reader/vivekvanis/` + vaniDetail.slug,
                                                {
                                                  state: {
                                                    vivekvaniDetailId: vaniDetail.id,
                                                    bookName: vaniDetail.name,
                                                    slug: vaniDetail.slug,
                                                    location: item?.cfi,
                                                    type: BookContentType.vivek,
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
                                  alt="img"
                                  style={{ width: "45px" }}
                                />
                              </label>
                            </label>
                          </div>
                        </div>
                        {vaniDetail.author ? (
                          <div>
                            <p>
                              <label>{t("Authors_tr")}</label>
                              {vaniDetail.author}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {vaniDetail.vivekVaniLanguage ? (
                          <div>
                            <p>
                              <label>{t("Language_tr")} </label>
                              {vaniDetail.vivekVaniLanguage}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="bookdecription">
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0', paddingBottom: 0 }}>{t("Year_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{vaniDetail?.years}</label>
                          </div>
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderLeft: 0, borderRight: 0 }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0' }}>{t("Month_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{monthName}</label>
                          </div>
                          <div className="yearmonth" style={{ display: "flex", justifyContent: "center", border: "1px solid #ffaf68", paddingTop: "15px", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}>
                            <label style={{ color: "#472d1e", fontSize: "23px", fontFamily: "ChanakyaUni", margin: '0 40% 0 0' }}>{t("Number_tr")}</label>
                            <label style={{ fontSize: "23px", color: "#ff731f" }}>{vaniDetail?.editionNo}</label>
                          </div>
                        </div>
                        <div className="next-read">
                          <p
                            style={{ cursor: "pointer", display: "inline" }}
                            onClick={() => {
                              setLogIn(true);
                              if (UserIdentity) {
                                navigate(
                                  `/reader/vivekvanis/` + vaniDetail.slug,
                                  {
                                    state: {
                                      vivekvaniDetailId: vaniDetail.id,
                                      bookName: vaniDetail.name,
                                      slug: vaniDetail.slug,
                                      label: vaniDetail.label,
                                      type: BookContentType.vivek,
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
                    {relateds && relateds.length > 0 ?
                      <div>
                        <h1
                          style={{ fontSize: "30px!important" }}
                          className="heading-related"
                        >
                          {t("Related_e_books_tr")}
                        </h1>

                        <div style={{ paddingBottom: "20px", display: "flex" }}>
                          <Slider {...settings}>
                            {relateds && relateds.length > 0
                              ? relateds.map((related) => (
                                <div
                                  style={{ display: "flex" }}
                                  className="slider-books sidebarmargin"
                                  key={`related-${related.id}`}
                                  onClick={() => {
                                    navigate(`/vivekvani/` + related.slug, {
                                      state: {
                                        vivekvaniId: related.id,
                                        bookName: related.name,
                                      },
                                    });
                                    window.location.reload();
                                  }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <a>
                                      <img
                                        style={{ cursor: "pointer" }}
                                        className="imgcenter"
                                        src={
                                          related.vivekVaniThumbPath == null
                                            ? DefaultBook
                                            : related.vivekVaniThumbPath
                                        }
                                        onError={(e) => {
                                          e.currentTarget.src = DefaultBook;
                                        }}
                                        alt={related.name}
                                        title={related.name}
                                        width="117"
                                        height="165"
                                      />
                                      <p>{related?.name}</p>
                                    </a>
                                  </div>
                                </div>
                              ))
                              : ""}
                          </Slider>
                        </div>
                      </div>
                      :
                      ""
                    }
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
export default VivekvaniDetailPage;
