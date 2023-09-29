/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import KalyansServices from "../Services/Kalyan";
import DefaultBook from "../Images/defaultBook.png";
import ListPagination from "../Components/ListPagination";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Books.css";
import i18n from "../i18n";
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

const KalyansPage = () => {
  const { isSelected, setItemColored } = useUser();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [kalyan, setKalyan] = useState<any[] | undefined>(undefined);

  const [refresh, setRefresh] = useState(false);
  const [SortValue, setSortValue] = useState("0");
  const [Category, setCategory] = useState<any>("");
  const [CategoryId, setCategoryId] = useState<any>("");

  const [pagination, setPagination] = useState({
    pageNo: 1,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  function ResetData() {
    setSortValue("0");
    setCategoryId("");
    setPagination({
      ...pagination,
      pageNo: 0,
    });
  }

  function ClickOnFilter(cat: string) {
    setRefresh(false);
    KalyansServices.getKalyans(
      0,
      pagination.recordsPerPage,
      false,
      CategoryId,
      "",
      "",
      SortValue,
      "",
      window.location.pathname === "/kalyans/special" ? true : false
    ).then((res) => {
      if (res) {
        setKalyan(res.result?.items);
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
    ClickOnFilter(CategoryId);
    $(".CategoryList > ul > li > div").removeClass("listActive");
    $("#cat-" + CategoryId).addClass("listActive");
  }, [CategoryId]);

  useEffect(() => {
    setItemColored(true);
    ResetData();
  }, [isSelected, setItemColored]);

  useEffect(() => {
    setRefresh(false);
    KalyansServices.getFilters("kalyan").then((res: any) => {
      if (res) {
        setCategory(res?.result?.categories);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    setRefresh(false);
    KalyansServices.getKalyans(
      pagination.pageNo === 1
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      false,
      CategoryId,
      "",
      "",
      SortValue, //sort
      "",
      window.location.pathname === "/kalyans/special" ? true : false
    ).then((res) => {
      if (res) {
        setKalyan(res.result?.items);
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
            {t("Kalyan_tr")}
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
              <label> / {t("Kalyan_tr")}</label>
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
                    {/*  Kalyan_Point  */}
                    <Accordion elevation={0} defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: "10px",
                          background: "#FFFAF0",
                        }}
                      >
                        <h2 className="filtertitle">{t("Kalyan_Points_tr")}</h2>
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
                                key={`c-${category.id}`}
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
                    {kalyan && kalyan.length > 0 ? (
                      <div>
                        <div className="row">
                          {kalyan.map((kalyan) => (
                            <div className="col-lg-3 col-sm-6 col-md-6">
                              <div
                                className="sidebarmargin"
                                key={`kalyan-${kalyan.id}`}
                                onClick={() => {
                                  navigate(`/kalyans/` + kalyan.slug, {
                                    state: { kalyanId: kalyan.id },
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
                                      src={kalyan.kalyanThumbPath}
                                      onError={(e) => {
                                        e.currentTarget.src = DefaultBook;
                                      }}
                                      alt={kalyan.name}
                                      title={kalyan.name}
                                      width="117"
                                      height="165"
                                    />
                                    <p style={{ cursor: "pointer" }}>
                                      {kalyan.name != null &&
                                      kalyan.name.length > 50
                                        ? kalyan.name.slice(0, 50)
                                        : kalyan.name}
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
export default KalyansPage;
