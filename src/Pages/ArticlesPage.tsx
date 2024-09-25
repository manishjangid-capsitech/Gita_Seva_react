/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Reset from "../Images/reset.png";
import WithoutLyrics from "../Images/audiolyrics.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import ListPagination from "../Components/ListPagination";
import "../Styles/Audios.css";
import "../Styles/Sidebar.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Loading from "../Components/Loading";
import articalIcon from "../assets/img/article-icon.png";
import AuthorsService from "../Services/Authors";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArticlesService from "../Services/Articles";
import { LogInModel } from "./LogInoutModel";

const ArticlesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [SortValue, setSortValue] = useState("3");
  const [Category, setCategory] = useState<any>("");
  const [CategoryId, setCategoryId] = useState<any>("");
  const [Authors, setAuthors] = useState<any>("");
  const [AuthorsId, setAuthorsId] = useState<any>("");
  const [bread, showBread] = useState("");

  const [articles, setArticles] = useState<any[] | undefined>(undefined);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  const location = useLocation();
  const state = location.state as { authorId: string; authorName: string, authorSlug: string };
  const UserIdentity = localStorage.getItem("UserId") as any;

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const [loginState, setLoginState] = useState<string | null>(null);

  const handleLoginStateChange = (newState: any) => {
    setLoginState(newState);
    {
      articles?.map((article: any) => (
        navigate(`/articles/` + article?.slug, {
          state: {
            articleId: article?.id,
            articleName: article?.name,
            articleSlug: article?.slug,
            authorId: state?.authorId,
            authorName: state?.authorName,
            special: window?.location?.pathname,
          },
        })
      ))
    };
  }

  function ResetData() {
    setCategoryId("");
    setAuthorsId("");
    setSortValue("3");
    setPagination({
      ...pagination,
      pageNo: 0,
    });
    setRefresh(true);
  }

  function ClickOnFilter(CategoryId: string, AuthorsId: string) {
    setRefresh(false);
    ArticlesService.getArticles(
      pagination.pageNo,
      pagination.recordsPerPage,
      false,
      CategoryId,
      AuthorsId || state?.authorId,
      "",
      SortValue,
      "",
      window.location.pathname === "/articles/special" ? true : false
    ).then((res) => {
      if (res) {
        setArticles(res.result?.items);
        setPagination({
          ...pagination,
          totalRecords: res.result?.totalRecords,
        });
      }
    });
  }

  useEffect(() => {
    ClickOnFilter(CategoryId, AuthorsId);
    $(".CategoryList > ul > li > div").removeClass("listActive");
    $("#cat-" + CategoryId).addClass("listActive");

    $(".Authorlist > ul > li > div").removeClass("listActive");
    $("#aut-" + AuthorsId).addClass("listActive");
  }, [CategoryId, AuthorsId]);

  useEffect(() => {
    ArticlesService.getFilters("article").then((res) => {
      if (res) {
        setCategory(res.result?.categories);
        setAuthors(res.result?.authors);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    setRefresh(false);
    ArticlesService.getArticles(
      pagination.pageNo === 0
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      false,
      CategoryId,
      AuthorsId || state?.authorId,
      "",
      SortValue,
      "",
      window.location.pathname === "/articles/special" ? true : false
    ).then((res) => {
      if (res) setArticles(res.result?.items);
      setPagination({
        ...pagination,
        totalRecords: res.result?.totalRecords,
      });
    });
  }, [refresh, SortValue, i18n.language]);

  useEffect(() => {
    AuthorsService.GetAuthorDataById(state?.authorId, "").then((res) => {
      showBread(res?.result?.name);
    });
  }, [i18n.language, refresh]);

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
              fontFamily: "ChanakyaUniBold"
            }}
          >
            {state?.authorName ? (
              <label>{bread}</label>
            ) : window.location.pathname === "/articles/special" ? (
              t("Special_Article_tr")
            ) : (
              t("Article_tr")
            )}
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
              {state?.authorName ? (
                <Link
                  to={"/author/" + state?.authorSlug}
                  state={{
                    authorId: state?.authorId,
                    authorName: state?.authorName,
                    authorSlug: state?.authorSlug
                  }}
                  style={{ marginRight: "8px", color: "#2d2a29" }}
                >
                  / {bread}
                </Link>
              ) : (
                ""
              )}
              <span style={{ color: "#2d2a29" }}>
                {window.location.pathname === "/articles/special" ? (
                  <span>/ {t("Special_Article_tr")}</span>
                ) : (
                  <span>/ {t("Article_tr")}</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fontfamily"
        style={{
          userSelect: "none",
          backgroundColor: "rgb(255, 246, 225)",
          padding: "1px 0 3% 0",
        }}
      >
        <div className="containers">
          <div
            className="gst-page-content pagecontentbackground"
            style={{ backgroundColor: "#FFF6E1" }}
          >
            <div className="row">
              <div className="col-lg-3">
                <div
                  style={{
                    display: "block",
                    padding: "16px",
                    borderRadius: "4px",
                    background: "#FFFAF0",
                    boxShadow: "0 0 7px 1px #f5deb1",
                    fontFamily: "ChanakyaUni",
                    height: "100%",
                  }}
                >
                  <div className="cardbackground" style={{ cursor: "pointer" }}>
                    <span className="boxheadtitle">{t("Filter_tr")}</span>
                    <img
                      alt="reset"
                      src={Reset}
                      className="resetimg"
                      onClick={() => {
                        ResetData();
                      }}
                    />
                  </div>

                  <div style={{ backgroundColor: "#fffaec" }}>
                    <Accordion defaultExpanded elevation={0}>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: 0,
                          background: "#FFFAF0",
                          minHeight: "25px"
                        }}
                      >
                        <h2 className="filtertitle">{t("Article_List_tr")}</h2>
                      </AccordionSummary>

                      <AccordionDetails
                        style={{
                          display: "block",
                          background: "#FFFAF0",
                          padding: "10px 0 0 0"
                        }}
                      >
                        {Category && Category.length > 0
                          ? Category?.map((Category: any) => (
                            <div
                              key={`c-${Category.id}`}
                              className="CategoryList"
                              onClick={() => {
                                setCategoryId(Category.id);
                              }}
                            >
                              <ul style={{ margin: 0 }}>
                                <li>
                                  <div
                                    style={{
                                      fontSize: "21px",
                                      cursor: "pointer",
                                      fontWeight: 400,
                                      color: "#545454",
                                      fontFamily: "ChanakyaUni",
                                    }}
                                    id={`cat-${Category.id}`}
                                  >
                                    {Category.name}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          ))
                          : ""}
                      </AccordionDetails>
                    </Accordion>
                    {/* writer  */}
                    <Accordion
                      elevation={0}
                      style={{ display: state?.authorId ? "none" : "block" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: 0,
                          background: "#FFFAF0",
                          minHeight: "40px"
                        }}
                      >
                        <h2 className="filtertitle">{t("Authors_tr")}</h2>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{
                          display: "block",
                          background: "#FFFAF0",
                          padding: "10px 0 0 0"
                        }}
                      >
                        {Authors && Authors.length > 0
                          ? Authors?.map((Author: any) => (
                            <div
                              key={`c-${Author.id}`}
                              className="Authorlist"
                              onClick={() => {
                                setAuthorsId(Author.id);
                              }}
                            >
                              <ul style={{ margin: 0 }}>
                                <li>
                                  <div
                                    style={{
                                      fontSize: "21px",
                                      cursor: "pointer",
                                      fontWeight: 400,
                                      color: "#545454",
                                      fontFamily: "ChanakyaUni",
                                    }}
                                    id={`aut-${Author.id}`}
                                  >
                                    {Author.name}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          ))
                          : ""}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div
                  className="detailbg"
                  style={{
                    display: "block",
                    padding: "16px",
                    borderRadius: "4px",
                    background: "rgb(255, 250, 240)",
                    boxShadow: "rgb(245, 222, 177) 0px 0px 7px 1px",
                    height: "100%",
                    fontFamily: "ChanakyaUni",
                  }}
                >
                  <div className="">
                    <div className="row">
                      <div className="filter1 col-6">
                        <span
                          style={{
                            fontFamily: "ChanakyaUni,NalandaTim,Tunga",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            color: "#54422d",
                            margin: "6px 15px 0 0",
                          }}
                        >
                          {t("Total_Records_tr")} : {pagination.totalRecords}
                        </span>
                      </div>
                      <div
                        className="filter1 col-6"
                        style={{ textAlign: "right" }}
                      >
                        <span>{t("Sort_tr")}</span>
                        <select
                          style={{ backgroundColor: "rgb(255, 242, 213)" }}
                          value={SortValue}
                          onChange={(e) => {
                            setSortValue(e.target.value);
                          }}
                        >
                          <option value="2">{t("Latest_tr")}</option>
                          <option value="0">{t("General_tr")}</option>
                          <option value="1">{t("Title_tr")}</option>
                          <option value="3">{t("Popular_tr")}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {articles && articles.length > 0 ? (
                    <>
                      <div>
                        <div className="row">
                          {articles?.map((article) => (
                            <div
                              className="col-lg-4"
                              style={{ marginTop: "28px" }}
                              key={`art-${article?.id}`}
                            >
                              <div
                                style={{
                                  transition: "all .5s ease",
                                  textAlign: "center",
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",
                                  padding: "20px 30px",
                                  boxShadow: "0 0 10px 0 #dcd1b8",
                                  height: "145px",
                                  margin: "6px 0 22px",
                                }}
                                onClick={() => {
                                  if (UserIdentity) {
                                    if (window.location.pathname === `/articles`) {
                                      navigate(`/articles/` + article?.slug, {
                                        state: {
                                          articleId: article?.id,
                                          articleName: article?.name,
                                          articleSlug: article?.slug,
                                          authorId: state?.authorId,
                                          authorName: state?.authorName,
                                          special: window?.location?.pathname,
                                        },
                                      });
                                    }
                                    if (window.location.pathname === `/articles/special`) {
                                      navigate(`/articles/special/` + article?.slug, {
                                        state: {
                                          articleId: article?.id,
                                          articleName: article?.name,
                                          articleSlug: article?.slug,
                                          authorId: state?.authorId,
                                          authorName: state?.authorName,
                                          special: window?.location?.pathname,
                                        },
                                      });
                                    }
                                    if (window.location.pathname === `/articles/author/` + state?.authorSlug) {
                                      navigate(`/articles/author/` + state?.authorSlug + "/" + article?.slug, {
                                        state: {
                                          articleId: article?.id,
                                          articleName: article?.name,
                                          articleSlug: article?.slug,
                                          authorId: state?.authorId,
                                          authorName: state?.authorName,
                                          authorSlug: state?.authorSlug,
                                          special: window?.location?.pathname,
                                        },
                                      });
                                    }
                                  }
                                  else {
                                    setLogIn(true)
                                  }
                                }}
                              >
                                <div>
                                  <a style={{ cursor: "pointer", }}>
                                    <img
                                      style={{
                                        width: "28px",
                                        height: "34px",

                                        borderRadius: 0,
                                      }}
                                      src={articalIcon}
                                      onError={(e) => {
                                        e.currentTarget.src = WithoutLyrics;
                                      }}
                                      alt={article.name}
                                      title={article.name}
                                      width="60"
                                    // onClick={() => { }}
                                    />
                                    <p
                                      style={{
                                        color: "#3f220d",
                                        fontSize: "18px",
                                        lineHeight: "22px",
                                        margin: "20px 0 0",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {article.name}
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12" style={{ marginTop: "30px", display: pagination.totalRecords <= 12 ? "none" : "block" }}>
                        <ListPagination
                          totalRecords={pagination.totalRecords}
                          recordsPerPage={pagination.recordsPerPage}
                          onClick={(p) => {
                            setPagination({
                              ...pagination,
                              pageNo: p,
                            });
                            setRefresh(true);
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="ebooks-category resultnotfound">
                      <Loading />
                      {t("result_not_found_tr")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <LogInModel
          opens={logIn}
          onCloses={closeModal}
          onLoginStateChange={handleLoginStateChange}
        />
      </div>
    </>
  );
};
export default ArticlesPage;
