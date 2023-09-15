/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DefaultBook from "../Images/defaultBook.svg";
import KalyansServices from "../Services/Kalyan";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import i18n, { _get_i18Lang } from "../i18n";
import Favadd from "../assets/img/favadd.png";
import Favicon from "../assets/img/fav.png";
import { BookContentType } from "./Epub";
import { userId } from "../Contexts/LocaleContext";
import { useUser } from "../Contexts/UserContext";
import { toast } from "react-toastify";
import { LogInModel } from "./LogInoutModel";

// "/assets/img/favadd.png"

const KalyanDetailPage = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [kalyanDetail, setKalyanDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [kalyanId, setKalyanId] = useState("");
  const [relateds, setRelatedKalyans] = useState<any[] | undefined>(undefined);

  const location = useLocation();
  const { fav, setFav } = useUser();
  const state = location.state as { kalyanId: string };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const UserIdentity = localStorage.getItem("UserId") as any;

  function FavKalyanAdd() {
    KalyansServices.addKalyanFavourite(kalyanId).then((res) => {
      setFav(true);
      toast(
        localStorage.getItem("lang") === "hindi"
          ? "पत्रिका को सफलतापूर्वक मेरी पसंद में जोड़ा गया है।"
          : "Magazine has been successfully added to the favourites"
      );
    });
    return;
  }

  function FavKalyanRemove() {
    KalyansServices.removeKalyanFavourite(kalyanId).then((res) => {
      setFav(false);
      toast(
        localStorage.getItem("lang") === "hindi"
          ? "पत्रिका मेरी पसंद से हटा दी गई है।"
          : "Magazine has been removed from favourites"
      );
    });
    return;
  }

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
        if (res) {
          setKalyanDetail(res.result);
          setFav(res.result.isFavourite)
        }
      });
    }
  }, [refresh, i18n.language, kalyanId]);

  useEffect(() => {
    setRefresh(false);
    if (kalyanId) {
      KalyansServices.getRelatedKalyans(kalyanId, "").then((res) => {
        if (res) {
          setRelatedKalyans(res.result);
        }
      });
    }
  }, [refresh, i18n.language, kalyanId]);

  return (
    <div
      className="newcontainer"
      style={{ backgroundColor: "#FFF6E1", padding: "1px 0", marginTop: 0 }}
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
            {t("Kalyan_tr")}
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
                to="/kalyans"
              >
                / {t("Kalyan_tr")}
              </Link>
              <span style={{ color: "#2d2a29" }}>/ {kalyanDetail?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          style={
            {
              // margin: "10px 0",
              // border: "1px solid #ffd186",
              // boxShadow: "0px 0px 10px 0px #dcd1b8",
              // backgroundColor: "#FFFAF0"
            }
          }
        >
          <div className="row">
            <div>
              {kalyanDetail ? (
                <div
                  className="containers card-gst"
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    backgroundColor: "#FFFAF0",
                    border: "1px solid #ffd186",
                    boxShadow: "0px 0px 10px 0px #dcd1b8",
                    borderBottom: "#FFFAF0",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                  }}
                >
                  <div className="mat-card row" key={`book-${kalyanDetail.id}`}>
                    <div style={{ padding: "35px" }}>
                      <div className="single-product col-lg-4 col-xs-12 col-sm-12 col-md-12">
                        <a>
                          <div
                            style={{
                              border: "1px solid #eadfc8",
                              padding: "30px",
                              background: "#fff",
                              borderRadius: "5px",
                              textAlign: "center",
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
                              height="362"
                            />
                          </div>
                        </a>
                      </div>

                      <div className="single-product-author col-lg-8 col-xs-12 col-sm-12 col-md-12">
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
                              {kalyanDetail.name}
                            </label>
                            <label
                              onClick={() => {
                                if (!userId) setLogIn(true);
                              }}
                            >
                              {userId && fav ? (
                                <label
                                  onClick={() => {
                                    FavKalyanRemove();
                                  }}
                                >
                                  <img src={Favadd} alt="Favadd" />
                                </label>
                              ) : (
                                <label
                                  onClick={() => {
                                    FavKalyanAdd();
                                  }}
                                >
                                  <img src={Favicon} alt="Favicon" />
                                </label>
                              )}
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
                                  `/reader/kalyans/` + kalyanDetail.slug,
                                  {
                                    state: {
                                      kalyanDetailId: kalyanDetail.id,
                                      bookName: kalyanDetail.name,
                                      slug: kalyanDetail.slug,
                                      label: kalyanDetail.label,
                                      type: BookContentType.kalyans,
                                    },
                                  }
                                );
                              }
                            }}
                          >
                            {t("read_magazine_tr")}
                          </p>
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
          <LogInModel opens={logIn} onCloses={closeModal} />
          <div className="clsslide row" style={{ paddingBottom: "50px" }}>
            <div>
              <div
                style={{
                  backgroundColor: "#FFFAF0",
                  border: "1px solid #ffd186",
                  //   boxShadow: "0px 0px 10px 0px #dcd1b8",
                  borderTop: "#FFFAF0",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <h1
                  style={{ fontSize: "30px!important" }}
                  className="heading fontfamily"
                >
                  {t("Related_Kalyan_tr")}
                </h1>

                <div style={{ paddingBottom: "70px" }}>
                  <Slider {...settings}>
                    {relateds && relateds.length > 0
                      ? relateds.map((related) => (
                          <div
                            className="slider-books sidebarmargin"
                            key={`related-${related.id}`}
                            onClick={() => {
                              navigate(`/kalyans/` + related.slug, {
                                state: {
                                  bookId: related.id,
                                  bookName: related.name,
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
                                    related.kalyanThumbPath == null
                                      ? DefaultBook
                                      : related.kalyanThumbPath
                                  }
                                  onError={(e) => {
                                    e.currentTarget.src = DefaultBook;
                                  }}
                                  alt={related.name}
                                  title={related.name}
                                  width="150"
                                  height="212"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KalyanDetailPage;
