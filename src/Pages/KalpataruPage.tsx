/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import KalpatsruServices from "../Services/Kalpataru";
import DefaultBook from "../Images/defaultBook.png";
import ListPagination from "../Components/ListPagination";
import { Link, useNavigate } from "react-router-dom";
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
import { Breadcrumbs } from "./E-BooksComponent";

const KalpataruPage = () => {
  const { isSelected, setItemColored } = useUser();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [kalpatru, setKalpatru] = useState<any[] | undefined>(undefined);

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
    setRefresh(true)
  }

  function ClickOnFilter(cat: string) {
    setRefresh(false);
    KalpatsruServices.getKalyansKalpataru(
      0,
      pagination.recordsPerPage,
      false,
      CategoryId,
      "",
      "",
      SortValue,
      "",
      window.location.pathname === "/kalyanakalpataru/special" ? true : false
    ).then((res) => {
      if (res) {
        setKalpatru(res.result?.items);
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
    KalpatsruServices.getFilters(_get_i18Lang(), "kalyankalpataru").then(
      (res) => {
        if (res) {
          setCategory(res?.result?.categories);
        }
      }
    );
  }, [i18n.language]);

  useEffect(() => {
    setRefresh(false);
    KalpatsruServices.getKalyansKalpataru(
      pagination.pageNo === 0
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      false,
      CategoryId,
      "",
      "",
      SortValue, //sort
      "",
      window.location.pathname === "/kalyanakalpataru/special" ? true : false
    ).then((res) => {
      if (res) {
        setKalpatru(res.result?.items);
        setPagination({
          ...pagination,
          totalRecords: res.result?.totalRecords,
        });
      }
    });
  }, [refresh, i18n.language, SortValue]);

  return (
    <>
      <Breadcrumbs
        mainsubBreadCrumb= {t("Kalpataru_tr")}
        subBreadCrumb={t("Home_tr")}
        navigatemainsubBreadCrumb={() => {
          navigate(`/home`);
        }}
        subBreadCrumbTwo= {t("Kalpataru_tr")}
        navigatesubBreadCrumb={() => {
        }}
      />
      
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
                          minHeight: "25px"
                        }}
                      >
                        <h2 className="filtertitle" style={{ fontFamily: "ChanakyaUniBold" }}>
                          {t("Kalyan_kalpataru_number_tr")}
                        </h2>
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
                    {kalpatru && kalpatru.length > 0 ? (
                      <div>
                        <div className="row">
                          {kalpatru.map((kalpatru) => (
                            <div className="col-lg-3 col-sm-6 col-md-6">
                              <div
                                className="sidebarmargin"
                                key={`book-${kalpatru.id}`}
                                onClick={() => {
                                  navigate(
                                    `/kalyanakalpataru/` + kalpatru.slug,
                                    {
                                      state: {
                                        kalpatruId: kalpatru.id,
                                        kalpatruSlug: kalpatru.slug,
                                        bookName: kalpatru?.name,
                                      },
                                    }
                                  );
                                }}
                              >
                                <div className="bookBox">
                                  <a>
                                    <img
                                      style={{
                                        cursor: "pointer",
                                        borderRadius: 0,
                                      }}
                                      src={kalpatru.kalyanKalpataruThumbPath}
                                      onError={(e) => {
                                        e.currentTarget.src = DefaultBook;
                                      }}
                                      alt={kalpatru.name}
                                      title={kalpatru.name}
                                      width="117"
                                      height="165"
                                    />
                                    <p style={{ cursor: "pointer" }}>
                                      {kalpatru.name != null &&
                                        kalpatru.name.length > 50
                                        ? kalpatru.name.slice(0, 50)
                                        : kalpatru.name}
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
export default KalpataruPage;
