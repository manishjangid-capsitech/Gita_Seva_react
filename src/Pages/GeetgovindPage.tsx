/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import GeetGovindServices from "../Services/GeetGovind";
import DefaultBook from "../Images/defaultBook.png";
import ListPagination from "../Components/ListPagination";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Books.css";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import Loading from "../Components/Loading";
import Reset from "../Images/reset.png";
import $ from "jquery";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMore from "@mui/icons-material/ExpandMore";

const GeetgovindPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Monthly, setMonthly] = useState<any[] | undefined>(undefined);

  const [refresh, setRefresh] = useState(false);
  const [SortValue, setSortValue] = useState("0");
  const [Language, setLanguage] = useState<any>("");
  const [LanguageId, setLanguageId] = useState<any>("");

  const [pagination, setPagination] = useState({
    pageNo: 1,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  function ResetData() {
    setSortValue("0");
    setLanguageId("");
    setPagination({
      ...pagination,
      pageNo: 0,
    });
    setRefresh(true);
  }

  function ClickOnFilter(cat: string) {
    setRefresh(false);
    GeetGovindServices.getMonthlyMagazine(
      0,
      pagination.recordsPerPage,
      false,
      "",
      "",
      "",
      SortValue,
      LanguageId,
      window.location.pathname === "/books/special" ? true : false
    ).then((res) => {
      if (res) {
        setMonthly(res.result?.items);
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
    ClickOnFilter(LanguageId);
    $(".LanguageList > ul > li > div").removeClass("listActive");
    $("#lan-" + LanguageId).addClass("listActive");
  }, [LanguageId]);

  useEffect(() => {
    setRefresh(false);
    GeetGovindServices.getGeetFilters("monthlymagazine").then((res) => {
      if (res) {
        setLanguage(res?.result?.languages);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    setRefresh(false);
    GeetGovindServices.getMonthlyMagazine(
      pagination.pageNo === 0
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      false,
      "",
      "",
      "",
      SortValue, //sort
      LanguageId,
      window.location.pathname === "/books/special" ? true : false
    ).then((res) => {
      if (res?.status) {
        setMonthly(res.result?.items);
        setPagination({
          ...pagination,
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
              fontFamily: "ChanakyaUniBold"
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
              <Link style={{ marginRight: "8px", color: "#2d2a29" }} to="/">
                {t("Home_tr")}
              </Link>
              <label> / {t("MonthlyMagazine_tr")}</label>
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
                    {/* Kalyan_kalpataru_number_tr */}
                    <Accordion defaultExpanded elevation={0}>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: 0,
                          background: "#FFFAF0",
                          minHeight: "20px"
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
                        {Language && Language.length > 0
                          ? Language?.map((Language: any) => (
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
                    {Monthly && Monthly.length > 0 ? (
                      <div>
                        <div className="row">
                          {Monthly.map((Month) => (
                            <div className="col-lg-3 col-sm-6 col-md-6">
                              <div
                                className="sidebarmargin"
                                key={`book-${Month.id}`}
                                onClick={() => {
                                  navigate(`/monthlymagazine/` + Month.slug, {
                                    state: {
                                      MonthId: Month.id,
                                      bookName: Month?.name,
                                      slug: Month.slug,
                                      label: Month.label
                                    }
                                  })
                                }}
                              >
                                <div className="bookBox">
                                  <a>
                                    <img
                                      style={{
                                        cursor: "pointer",
                                        borderRadius: 0,
                                      }}
                                      src={Month.monthlyMagazineThumbPath}
                                      onError={(e) => {
                                        e.currentTarget.src = DefaultBook;
                                      }}
                                      alt={Month.name}
                                      title={Month.name}
                                      width="117"
                                      height="165"
                                    />
                                    <p style={{ cursor: "pointer" }}>
                                      {Month.name}
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="col-12" style={{ marginTop: "30px", display: pagination.totalRecords <= 12 ? "none" : "block" }}>
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
export default GeetgovindPage;
