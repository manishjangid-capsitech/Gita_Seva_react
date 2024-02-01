/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import SearchDataService from "../Services/SearchData";
import ListPagination from "../Components/ListPagination";
import { Link, useNavigate } from "react-router-dom";
import WithoutLyrics from "../Images/audiolyrics.svg";
import WithLyrics from "../Images/audiowithoutlyrics.svg";
import DefaultArticle from "../Images/article-icon.png";
import { useTranslation } from "react-i18next";
import "../Styles/Search.css";
import Loading from "../Components/Loading";
import i18n from "../i18n";

const SearchDataPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Searchdata, setSearchdata] = useState<any[] | undefined>(undefined);
  const [pagination, setPagination] = useState({
    pageNo: 1,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  const [len, setLen] = useState("");

  const params: any = window.history.state;

  const [refresh, setRefresh] = useState(false);

  const [load, setLoad] = useState(false);

  window.onload = function pageLoad() {
    if (load) {
      window.location.reload();
      setLoad(false);
    }
  };

  useEffect(() => {
    if (params?.usr !== undefined) {
      SearchDataService.searchData({
        language: params?.usr.language,
        productType: params?.usr.productType,
        searchValue: params?.usr.searchValue,
        authorId: params?.usr?.authorId,
      }).then((res) => {
        if (res.status) {
          setLen(res?.result?.length);
          setSearchdata(res?.result);
          setPagination({
            ...pagination,
            recordsPerPage: 12,
            totalRecords: res?.result?.length,
          });
        }
      });
    }
  }, [params, i18n.language]);

  return (
    <>
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
            {t("Search_tr")}
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
              <span style={{ color: "#2d2a29" }}>/ {t("Search_tr")}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fontfamily"
        style={{
          userSelect: "none",
          backgroundColor: "rgb(255, 246, 225)",
          marginTop: -"3px",
          padding: "1px 0 3% 0",
        }}
      >
        <div className="containers">
          <div className="row">
            <div
              className="col-6"
              style={{
                textAlign: "center",
                fontSize: "25px",
                fontFamily: "ChanakyaUniBold",
                color: "rgb(209, 21, 1)",
                display: "flex",
              }}
            >
              {t("Search_tr")} :
              <div
                style={{
                  marginLeft: "15px",
                  color: "#472d1e",
                  fontFamily: "ChanakyaUni",
                  fontSize: "28px",
                  marginTop: "-4px",
                }}
              >
                {params?.usr.searchValue}
              </div>
            </div>
            <div className="col-6">
              <div
                className="filter1"
                style={{ marginTop: "10px", textAlign: "right" }}
              >
                <span>
                  {t("Total_Records_tr")} : {len}
                </span>
              </div>
            </div>
          </div>

          <div className="gst-page-content">
            <div
              className="listcolor"
              style={{ padding: "35px", background: "#fffaf0" }}
            >
              {Searchdata &&
                Searchdata !== undefined &&
                Searchdata.length > 0 ? (
                <div className="row">
                  {Searchdata.map((search: any, i) => (
                    <div
                      className="col-lg-12"
                      key={`searchbook-${search.id}`}
                      onClick={() => {
                        if (search.product === "book") {
                          navigate("/books/" + search.slug,
                            {
                              state: {
                                bookId: search.id,
                                bookSlug: search.slug,
                                index: i,
                                searched: window.location.pathname,
                              },
                            })
                        }
                        if (search.product === "kalyan") {
                          navigate("/kalyans/" + search.slug,
                            {
                              state: {
                                kalyanId: search.id,
                                kalyanSlug: search?.slug,
                                index: i,
                                searched: window.location.pathname,
                              },
                            })
                        }
                        if (search.product === "kalyankalpataru") {
                          navigate("/kalyanskalpataru/" + search.slug,
                            {
                              state: {
                                kalpatruId: search.id,
                                kalpatruSlug: search.slug,
                                index: i,
                                searched: window.location.pathname,
                              },
                            })
                        }
                        if (search.product === "geetgovind") {
                          navigate("/monthlymagazine/" + search.slug,
                            {
                              state: {
                                MonthId: search.id,
                                monthSlug: search.slug,
                                index: i,
                                searched: window.location.pathname,
                              },
                            })
                        }
                        if (search.product === "vivekvani") {
                          navigate("/vivekvani/" + search.slug,
                            {
                              state: {
                                vivekId: search.id,
                                vivekSlug: search.slug,
                                index: i,
                                searched: window.location.pathname,
                              },
                            })
                        }
                        if (search.product === "audio") {
                          navigate(`/audios/` + search.id,
                            // `/audios/${search.id}`,
                            {
                              state: {
                                audioId: search.id,
                                audioslug: search.slug,
                                index: i,
                                searched: window.location.pathname,
                              },
                            })                          
                        }
                        if (search.product === "pravachan") {
                          navigate(`/pravachans/` + search?.id,
                            {
                              state: {
                                audioId: search.id,
                                audioslug: search.slug,
                                index: i,
                                searched: window.location.pathname,
                              },
                            })
                        }

                        // onClick={() => {
                        //   localStorage.setItem("type", "pravachans");
                        //   navigate(`/pravachans/` + specialPravachan.id, {
                        //     state: {
                        //       audioId: specialPravachan.id,
                        //       audioslug: specialPravachan.name,
                        //     },
                        //   });
                        //   window.location.reload();
                        // }}

                        if (search.product === "article") {
                          navigate(`/articles/` + search.slug,
                            {
                              state: {
                                articleId: search.id,
                                articleSlug: search.slug,
                                index: i,
                                searched: window.location.pathname,
                              },
                            })
                        }
                      }}
                    >
                      <div
                        className="row cardBody"
                        style={{
                          textAlign: "left",
                          margin: "0px 0px 25px",
                        }}
                      >
                        <div className="col-lg-1" style={{ paddingTop: "5px" }}>
                          <a style={{ cursor: "pointer" }}>
                            <img
                              src={
                                search.product === "book" || search.product === "kalyan" || search.product === "kalyankalpataru" || search.product === "monthlymagzine" || search.product === "vivekvani"
                                  ? `${search?.thumbPath}`
                                  : search.product === "audio" ||
                                    search.product === "pravachan"
                                    ? search.lyricsHash != null &&
                                      search.lyricsHash !== ""
                                      ? WithLyrics
                                      : WithoutLyrics
                                    : `${DefaultArticle}`
                              }
                              alt={search.name}
                              style={{
                                fontSize: "15px",
                                height: "70px",
                                width: "60px",
                              }}
                              title={search.name}
                              height="70px"
                              width="60px"
                            />
                          </a>
                        </div>
                        <div className="col-lg-11 searchData">
                          <p
                            className="searchData"
                            style={{ cursor: "pointer" }}
                          >
                            {search.name}
                          </p>
                          <p style={{ cursor: "pointer" }}>{search.author}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <ListPagination
                    totalRecords={pagination.totalRecords}
                    recordsPerPage={pagination.recordsPerPage}
                    currentPage={pagination.pageNo}
                    onClick={(p) => {
                      setPagination({
                        ...pagination,
                        pageNo: p,
                      });
                      setRefresh(true);
                    }}
                  />
                </div>
              ) : (
                <div className="ebooks-category resultnotfound">
                  {Searchdata?.length === 0 ? (
                    <label>{t("result_not_found_tr")}</label>
                  ) : (
                    <Loading />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};
export default SearchDataPage;
