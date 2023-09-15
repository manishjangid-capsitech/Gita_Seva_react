/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DefaultBook from "../Images/defaultBook.svg";
import GeetGovindServices from "../Services/GeetGovind";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import { useTranslation } from "react-i18next";
import i18n, { _get_i18Lang } from "../i18n";
import Favadd from "../assets/img/favadd.png";
import Favicon from "../assets/img/fav.png";
import { BookContentType } from "./Epub";
import { useUser } from "../Contexts/UserContext";
import { toast } from "react-toastify";
import { LogInModel } from "./LogInoutModel";

const GeetGovindDetailPage = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [magzineDetail, setMagzineDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [MagzineId, setMagzineId] = useState("");

  const location = useLocation();
  const state = location.state as { MonthId: string };
  const { fav, setFav } = useUser();

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };
  const UserIdentity = localStorage.getItem("UserId") as any;

  function FavMagzineAdd() {
    GeetGovindServices.addMagzineFavourite(MagzineId).then((res) => {
      setFav(true);
      toast(
        localStorage.getItem("lang") === "hindi"
          ? "पत्रिका को सफलतापूर्वक मेरी पसंद में जोड़ा गया है।"
          : "Magazine has been successfully added to the favourites"
      );
    });
    return;
  }

  function FavMagzineRemove() {
    GeetGovindServices.removeMagzineFavourite(MagzineId).then((res) => {
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
        if (res) {
          setMagzineDetail(res.result);
          setFav(res?.result?.isFavourite);
        }
      });
    }
  }, [refresh, i18n.language, MagzineId]);

  return (
    <div
      className="newcontainer"
      style={{
        backgroundColor: "#FFF6E1",
        padding: "1px 0 85px 0",
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
                              {magzineDetail.name}
                            </label>
                            <label
                              onClick={() => {
                                if (!UserIdentity) setLogIn(true);
                              }}
                            >
                              {UserIdentity && fav ? (
                                <label
                                  onClick={() => {
                                    FavMagzineRemove();
                                  }}
                                >
                                  <img src={Favadd} alt="Favadd" />
                                </label>
                              ) : (
                                <label
                                  onClick={() => {
                                    FavMagzineAdd();
                                  }}
                                >
                                  <img src={Favicon} alt="Favicon" />
                                </label>
                              )}
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
export default GeetGovindDetailPage;
