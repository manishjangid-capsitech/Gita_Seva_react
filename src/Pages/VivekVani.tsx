/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import BooksService from "../Services/Books";
import VivekService from "../Services/Vivekvani";
import DefaultBook from "../Images/defaultBook.png";
import ListPagination from "../Components/ListPagination";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Books.css";
import i18n, { _get_i18Lang } from "../i18n";
import { useTranslation } from "react-i18next";
import Loading from "../Components/Loading";
import { useUser } from "../Contexts/UserContext";
import Reset from "../Images/reset.png";
import $ from "jquery";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMore from "@mui/icons-material/ExpandMore";

const VivekvaniPage = () => {
  const { isSelected, setItemColored } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [vivek, setVivek] = useState<any[] | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [SortValue, setSortValue] = useState("3");
  const [language, setLanguage] = useState<any>("");
  const [LanguageId, setLanguageId] = useState<any>("");
  const [Author, setAuthor] = useState<any>("");
  const [AuthorId, setAuthorId] = useState<any>("");
  const [Category, setCategory] = useState<any>("");
  const [CategoryId, setCategoryId] = useState<any>("");
  const [writer, setWriter] = React.useState<any>("");

  const [pagination, setPagination] = useState({
    pageNo: 1,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  function ResetData() {
    setSortValue("3");
    setLanguageId("");
    setAuthorId("");
    setCategoryId("");
    setPagination({
      ...pagination,
      pageNo: 0,
    });
  }

  const location = useLocation();
  const state = location.state as { authorId: string; authorName: string };

  function ClickOnFilter(lan: string, cat: string, aut: string) {
    setRefresh(false);
    VivekService.getVanis(
      pagination.pageNo === 1
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      CategoryId,
      false,
      SortValue, //sort
      AuthorId || state?.authorId,
      "",
      LanguageId,
      window.location.pathname === "/vivekvani/special" ? true : false
    ).then((res) => {
      if (res.status) {
        setVivek(res.result?.items);
        setPagination({
          ...pagination,
          pageNo: 1,
          recordsPerPage: 12,
          totalRecords: res.result?.totalRecords,
        });
      }
    });
  }

  useEffect(() => {
    ClickOnFilter(CategoryId, AuthorId, LanguageId);
    $(".Authorlist > ul > li > div").removeClass("listActive");
    $("#aut-" + AuthorId).addClass("listActive");
    $(".CategoryList > ul > li > div").removeClass("listActive");
    $("#cat-" + CategoryId).addClass("listActive");
    $(".LanguageList > ul > li > div").removeClass("listActive");
    $("#lan-" + LanguageId).addClass("listActive");
  }, [CategoryId, AuthorId, LanguageId]);

  useEffect(() => {
    setItemColored(true);
    ResetData();
  }, [isSelected, setItemColored]);

  useEffect(() => {
    setRefresh(false);
    BooksService.getFilters("book").then((res) => {
      if (res) {
        setLanguage(res?.result?.languages);
        setAuthor(res?.result?.authors);
        setCategory(res?.result?.categories);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    setRefresh(false);
    VivekService.getVanis(
      pagination.pageNo === 1
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      CategoryId,
      false,
      SortValue,
      AuthorId || state?.authorId,
      "",
      LanguageId,
      window.location.pathname === "/vivekvani/special" ? true : false
    ).then((res) => {
      if (res.status) {
        setVivek(res.result?.items);
        setWriter(res?.result?.items[0]?.author);
        setPagination({
          ...pagination,
          recordsPerPage: 12,
          totalRecords: res.result?.totalRecords,
        });
      }
    });
  }, [refresh, i18n.language, SortValue]);

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
            {writer
              ? writer
              : window.location.pathname === "/vivekvani/special"
              ? t("Special_vivek_vani_tr")
              : t("vivek_vani_tr")}
            <div
              style={{
                fontSize: "19px",
                fontWeight: 600,
                color: "#2d2a29",
                marginTop: "-8px",
              }}
            >
              <Link style={{ marginRight: "8px", color: "#2d2a29" }} to="/">
                {t("Home_tr")}
              </Link>
              <label>/ {t("vivek_vani_tr")}</label>
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
                  <div
                    className="cardbackground"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
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
                  <div>
                    {/* category */}
                    <Accordion elevation={0} defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: "10px",
                          background: "#FFFAF0",
                        }}
                      >
                        <h2 className="filtertitle">{t("Category_tr")}</h2>
                      </AccordionSummary>

                      <AccordionDetails
                        style={{
                          display: "block",
                          background: "#FFFAF0",
                          padding: 0,
                        }}
                      >
                        {Category && Category.length > 0
                          ? Category?.map((category: any) => (
                              <div
                                key={`cat-${category.id}`}
                                className="CategoryList"
                                onClick={() => {
                                  setCategoryId(category.id);
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
                                      id={`cat-${category.id}`}
                                    >
                                      {category.name}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            ))
                          : ""}
                      </AccordionDetails>
                    </Accordion>
                    {/* author  */}

                    <Accordion
                      elevation={0}
                      style={{ display: state?.authorId ? "none" : "block" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: "10px",
                          background: "#FFFAF0",
                        }}
                      >
                        <h2 className="filtertitle">{t("Authors_tr")}</h2>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{
                          display: "block",
                          background: "#FFFAF0",
                          padding: 0,
                        }}
                      >
                        {Author && Author.length > 0
                          ? Author?.map((author: any) => (
                              <div
                                key={`c-${author.id}`}
                                className="Authorlist"
                                onClick={() => {
                                  setAuthorId(author?.id);
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
                                      id={`aut-${author.id}`}
                                    >
                                      {author.name}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            ))
                          : ""}
                      </AccordionDetails>
                    </Accordion>
                    {/* language */}
                    <Accordion elevation={0}>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: "10px",
                          background: "#FFFAF0",
                        }}
                      >
                        <h2 className="filtertitle">{t("Languages_tr")}</h2>
                      </AccordionSummary>

                      <AccordionDetails
                        style={{
                          display: "block",
                          background: "#FFFAF0",
                          padding: 0,
                        }}
                      >
                        {language &&
                          language.length > 0 &&
                          language?.map((Language: any) => (
                            <div
                              key={`c-${Language.id}`}
                              className="LanguageList"
                              onClick={() => {
                                setLanguageId(Language.id);
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
                                    id={`lan-${Language.id}`}
                                  >
                                    {Language.name}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          ))}
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
                    background: "#FFFAF0",
                    boxShadow: "0 0 7px 1px #f5deb1",
                    height: "100%",
                    fontFamily: "ChanakyaUni",
                  }}
                >
                  <div className="sidebarmargin">
                    <div
                      className="align-items-center row"
                      style={{ margin: "-10px -10px 25px -10px" }}
                    >
                      <div className="col-6">
                        <div className="filter1" style={{ marginTop: "10px" }}>
                          <label>
                            {t("Total_Records_tr")} : {pagination.totalRecords}
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="filter1" style={{ textAlign: "right" }}>
                          <label>{t("Sort_tr")} </label>
                          <select
                            style={{ backgroundColor: "#FFF2D5" }}
                            value={SortValue}
                            onChange={(e) => {
                              setSortValue(e.target.value);
                            }}
                          >
                            <option value="3">{t("Popular_tr")}</option>
                            <option value="2">{t("Latest_tr")}</option>
                            <option value="0">{t("General_tr")}</option>
                            <option value="1">{t("Title_tr")}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {vivek && vivek.length > 0 ? (
                      <div>
                        <div className="row">
                          {vivek.map((viveks) => (
                            <div className="col-lg-3 col-sm-6 col-md-6">
                              <div
                                className="Authorlist"
                                key={`aut-${viveks.id}`}
                                onClick={() => {
                                  navigate(`/vivekvani/` + viveks.slug, {
                                    state: {
                                      vivekId: viveks.id,
                                      vivekName: viveks.name,
                                    },
                                  });
                                }}
                              >
                                <div className="bookBox">
                                  <a>
                                    <img
                                      style={{
                                        cursor: "pointer",
                                        borderRadius: 0,
                                      }}
                                      src={viveks.vivekVaniThumbPath}
                                      onError={(e) => {
                                        e.currentTarget.src = DefaultBook;
                                      }}
                                      alt={viveks.name}
                                      title={viveks.name}
                                      width="117"
                                      height="165"
                                    />
                                    <p style={{ cursor: "pointer" }}>
                                      {viveks.name}
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="col-12" style={{ marginTop: "30px" }}>
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
                      </div>
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
        </div>
      </div>
    </>
  );
};
export default VivekvaniPage;
