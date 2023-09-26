/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SearchDataService from "../Services/SearchData";
import ListPagination from "../Components/ListPagination";
import { Link, useNavigate } from "react-router-dom";
import WithoutLyrics from "../Images/audiolyrics.svg";
import WithLyrics from "../Images/audiowithoutlyrics.svg";
import DefaultArticle from "../Images/article-icon.png";
import { useTranslation } from "react-i18next";
import "../Styles/Search.css";
import Loading from "../Components/Loading";

const SearchDataPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Searchdata, setSearchdata] = useState<any[] | undefined>(undefined);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  const [len, setLen] = useState("");

  const params: any = window.history.state;

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
        authorId: params?.usr?.authorId
      }).then((res) => {
        if (res) {
          setLen(res?.result?.length);
          setSearchdata(res?.result);
          setPagination({
            pageNo: 1,
            recordsPerPage: 12,
            totalRecords: res?.result?.length,
          });
        }
      });
    }
  }, [params]);

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
        }}
      >
        <div className="breadcrumbs">
          <div
            className="containers"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "rgb(209, 21, 1)",
              marginLeft: "238px",
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
          height: "1410px",
          marginTop: -"3px",
          paddingTop: "1px",
        }}
      >
        <div className="containers">
          <div
            className="row"
          >
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
            <div className="listcolor" style={{ padding: "35px", background: '#fffaf0' }}>
              {Searchdata && Searchdata !== undefined && Searchdata.length > 0 ? (
                <div className="row" style={{}}>
                  {Searchdata.map((search: any, i) => (
                    <div
                      className="col-lg-12"
                      key={`searchbook-${search.id}`}
                      onClick={() => {
                        navigate(
                          search.product === "book"
                            ? `/books/` + search.slug
                            : search.product === "article"
                              ? `/articles/` + search.slug
                              : search.product === "audio"
                                ? `/audios/${search.id}`
                                : search.product === "pravachan"
                                  ? `/audios/${search.id}`
                                  : "/books/" + search.slug,
                          {
                            state: {
                              audioId: search.id,
                              audioslug: search.slug,
                              bookId: search.id,
                              articleId: search.id,
                              index: i
                            },
                          }
                        );
                      }}
                    >
                      <div
                        className="row cardBody"
                        style={{
                          textAlign: 'left',
                          margin: '0px 0px 25px'
                        }}
                      >
                        <div
                          className="col-lg-2 col-md-3 col-sm-3"
                          style={{ paddingTop: "5px" }}
                        >
                          <a style={{ cursor: "pointer" }}>
                            <img
                              src={
                                search.product === "book"
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
                        <div className="col-lg-10 col-md-9 col-sm-9 searchData">
                          <p className="searchData" style={{ cursor: "pointer" }}>
                            {search.name}
                          </p>
                          <p style={{ cursor: "pointer" }}>{search.author}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* <ListPagination
                totalRecords={pagination.totalRecords}
                recordsPerPage={pagination.recordsPerPage}
                currentPage={pagination.pageNo}
                onClick={(p) => {
                  setPagination({
                    ...pagination,
                    pageNo: p,
                  });
                  setRefresh((x:any)=>!x);
                }}
              /> */}
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
      </div>
    </>
  );
};
export default SearchDataPage;
