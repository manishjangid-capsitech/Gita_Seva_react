/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { LogInModel } from "./LogInoutModel";

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
  const state = location.state as { kalpatruId: string };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const [toggleFav, setToggleFav] = useState<boolean>(false);

  const UserIdentity = localStorage.getItem("UserId") as any;

  const notify = () => {
    isLiked
      ? toast(
          localStorage.getItem("lang") === "hindi"
            ? "पत्रिका को सफलतापूर्वक मेरी पसंद में जोड़ा गया है।"
            : "Magazine has been successfully added to the favourites"
        )
      : toast(
          localStorage.getItem("lang") === "hindi"
            ? "पत्रिका मेरी पसंद से हटा दी गई है।"
            : "Magazine has been removed from favourites"
        );
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
                            >
                              <label
                                onClick={() => {
                                  toggleLike();
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

                        <div style={{ paddingBottom: "20px" }}>
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
                                            bookId: related.id,
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
              ) : (
                // <Loading />
                ""
              )}
            </div>
          </div>
          <LogInModel opens={logIn} onCloses={closeModal} />
        </div>
      </div>
    </div>
  );
};
export default KalpataruDetailPage;
