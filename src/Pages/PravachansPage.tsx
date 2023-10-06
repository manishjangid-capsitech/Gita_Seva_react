/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Reset from "../Images/reset.png";
import AudiosService from "../Services/Audios";
import AuthorsService from "../Services/Authors";
import WithoutLyrics from "../Images/audiolyrics.svg";
import WithLyrics from "../Images/audiowithoutlyrics.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import ListPagination from "../Components/ListPagination";
import "../Styles/Audios.css";
import "../Styles/Sidebar.css";
import { useTranslation } from "react-i18next";
import i18n, { _get_i18Lang } from "../i18n";
import imgdownload from "../Images/downloadpravachan.svg";
import imgpause from "../assets/audioPlayer/img/yellowplay.svg";
import Loading from "../Components/Loading";
import { useUser } from "../Contexts/UserContext";
import Favadd from "../assets/img/favouritefilled.png";
import Favicon from "../assets/img/pravachanfavbtn.png";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { LogInModel } from "./LogInoutModel";

const PravachansPage = () => {
  const { isSelected, setItemColored } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [audios, setAudios] = useState<any[] | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [SortValue, setSortValue] = useState("4");
  const [Type, setType] = useState<any | undefined>(undefined);
  const [SortMonthValue, setSortMonthValue] = useState<string>("0");
  const [SortYearValue, setSortYearValue] = useState<string>("0");
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [Lyrics, setLyrics] = useState<any>("");
  const [LyricsId, setLyricsId] = useState<any>("");
  const [Category, setCategory] = useState<any>("");
  const [CategoryId, setCategoryId] = useState<any>("");
  const [Preacher, setPreacher] = useState<any>("");
  const [PreacherId, setPreacherId] = useState<any>("");
  const UserIdentity = localStorage.getItem("UserId") as any;

  const [pagination, setPagination] = useState({
    pageNo: 0,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  const location = useLocation();
  const state = location.state as { authorId: string; authorName: string };

  const [logIn, setLogIn] = useState<boolean>(false);
  const closeModal = () => {
    setLogIn(false);
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const [bread, showBread] = useState("");
  const [toggleFav, setToggleFav] = useState<boolean>(false);

  const handleItemClick = (index: any) => {
    setActiveIndex(index);
  };

  function ResetData() {
    setPreacherId("");
    setCategoryId("");
    setLyricsId("");
    setSortValue("4");
    setSortMonthValue("0");
    setSortYearValue("0");
    setActiveIndex(null);
    setPagination({
      ...pagination,
      pageNo: 0,
    });
    setRefresh(true);
  }

  const [pravachanId, setPravachanId] = useState("");

  const toggleLike = (audioId: any) => {
    !isLiked
      ? AudiosService.addPravachanFavourite(audioId).then((res) => {
        setAudios(
          audios?.map((a: any) => {
            if (a.id === res.result?.productId) {
              res.status && setIsLiked(true);
            }
            return a;
          })
        );
      })
      : AudiosService.removePravachanFaviourite(audioId).then((res) => {
        setAudios(
          audios?.map((a: any) => {
            if (a.id === audioId) {
              res.status && setIsLiked(false);
            }
            return a;
          })
        );
      });
    setToggleFav((x) => !x);
  };

  function ClickOnFilter(par: string, cat: string, lyric: string) {
    setRefresh(false);
    setType("pravachans");
    AudiosService.getAudios(
      0,
      pagination.recordsPerPage,
      false,
      CategoryId,
      PreacherId || state?.authorId,
      "",
      SortValue,
      "",
      window.location.pathname === "/pravachans/special" ? true : false,
      Type,
      LyricsId,
      SortMonthValue,
      SortYearValue,
      ""
    ).then((res) => {
      if (res) {
        setAudios(res?.result?.items);

        setPagination({
          ...pagination,
          pageNo: 1,
          totalRecords: res?.result?.totalRecords,
        });
      }
    });
  }

  useEffect(() => {
    if (SortYearValue === "0") {
      setSortMonthValue("0");
    }
  }, [SortMonthValue, SortYearValue]);

  useEffect(() => {
    AudiosService.getPravachanFilters("pravachan").then((res) => {
      if (res) {
        setPreacher(res.result.authors);
        setCategory(res.result.categories);
        setLyrics(res.result);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    ClickOnFilter(PreacherId, CategoryId, LyricsId);
    $(".CategoryList > ul > li > div").removeClass("listActive");
    $("#par-" + PreacherId).addClass("listActive");

    $(".Authorlist > ul > li > div").removeClass("listActive");
    $("#aut-" + CategoryId).addClass("listActive");

    $(".LanguageList > span").removeClass("listActive");
    $("#lan-" + 1).addClass("listActive");
  }, [PreacherId, SortMonthValue, SortYearValue, CategoryId, LyricsId]);

  useEffect(() => {
    setItemColored(true);
    ResetData();
  }, [isSelected, setItemColored]);

  useEffect(() => {
    AuthorsService.GetAuthorDataById(state?.authorId, "").then((res) => {
      showBread(res?.result?.name);
    });
  }, [i18n.language, refresh]);

  useEffect(() => {
    setRefresh(false);
    setType("pravachans");
    AudiosService.getAudios(
      pagination.pageNo === 0
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      false,
      CategoryId,
      PreacherId ? PreacherId : "" || state?.authorId ? state?.authorId : "",
      "",
      SortValue,
      "",
      window.location.pathname === "/pravachans/special" ? true : false,
      Type,
      LyricsId,
      SortMonthValue,
      SortYearValue,
      UserIdentity
    ).then((res) => {
      if (res.status) setAudios(res.result?.items);
      setIsLiked(res?.result?.items.isFavourite);
      setPagination({
        ...pagination,
        // recordsPerPage: 12,
        totalRecords: res.result?.totalRecords,
      });
    });
  }, [SortValue, i18n.language, refresh]);

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
            {state?.authorName ? (
              <span>{bread}</span>
            ) : window.location.pathname === "/pravachans/special" ? (
              t("Special_Pravachan_tr")
            ) : (
              t("Pravachan_tr")
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
                  to={"/author/ + "}
                  state={{
                    authorId: state?.authorId,
                    authorName: state?.authorName,
                  }}
                  style={{ marginRight: "8px", color: "#2d2a29" }}
                >
                  / {bread}
                </Link>
              ) : (
                ""
              )}
              <span style={{ color: "#2d2a29" }}>
                {window.location.pathname === "/pravachans/special" ? (
                  <span>/ {t("Special_Pravachan_tr")}</span>
                ) : (
                  <span>/ {t("Pravachan_tr")}</span>
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
          height: "1440px",
          marginTop: -"3px",
          paddingTop: "1px",
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
                  <div>
                    <div
                      className="cardbackground"
                      style={{ cursor: "pointer" }}
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
                      <div
                        className="filteryearmonth"
                        style={{
                          marginTop: "15px",
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <div style={{ width: "30%" }}>
                          <span>{t("Year_tr")}</span>
                        </div>

                        <div style={{ width: "70%" }}>
                          <select
                            onChange={(e) => {
                              setSortYearValue(e.target.value);
                            }}
                            value={SortYearValue}
                          >
                            <option value="0">All</option>
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                            <option value="1993">1993</option>
                            <option value="1994">1994</option>
                            <option value="1995">1995</option>
                            <option value="1996">1996</option>
                            <option value="1997">1997</option>
                            <option value="1998">1998</option>
                            <option value="1999">1999</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                      className="filteryearmonth"
                      style={{
                        paddingTop: "5px",
                        alignItems: "baseline",
                        display: "flex",
                      }}
                    >
                      <div style={{ width: "30%" }}>
                        <span>{t("Month_tr")}</span>
                      </div>
                      <div style={{ width: "70%" }}>
                        <select
                          disabled={SortYearValue !== "0" ? false : true}
                          onChange={(e) => {
                            setSortMonthValue(e.target.value);
                          }}
                          value={SortMonthValue}
                        >
                          <option value="0">All</option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ backgroundColor: "#fffaec" }}>
                      {/* Preacher */}
                      <Accordion
                        defaultExpanded
                        elevation={0}
                        style={{ display: state?.authorId ? "none" : "block" }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          style={{
                            background: "#FFFAF0",
                            height: "10px",
                          }}
                        >
                          <h2 className="filtertitle">{t("Preacher_tr")}</h2>
                        </AccordionSummary>

                        <AccordionDetails
                          style={{
                            display: "block",
                            background: "#FFFAF0",
                            padding: 0,
                          }}
                        >
                          {Preacher && Preacher.length > 0
                            ? Preacher?.map((preacher: any) => (
                              <div
                                key={`c-${preacher.id}`}
                                className="CategoryList"
                                onClick={() => {
                                  setPreacherId(preacher.id);
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
                                      id={`par-${preacher.id}`}
                                    >
                                      {preacher.name}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            ))
                            : ""}
                        </AccordionDetails>
                      </Accordion>
                      {/* Pravachanlist  */}
                      <Accordion elevation={0}>
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
                            ? Category?.map((categorie: any) => (
                              <div
                                key={`c-${categorie.id}`}
                                className="Authorlist"
                                onClick={() => {
                                  setCategoryId(categorie.id);
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
                                      id={`aut-${categorie.id}`}
                                    >
                                      {categorie.name}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            ))
                            : ""}
                        </AccordionDetails>
                      </Accordion>
                      {/* lyrics & without lyrics */}
                      <Accordion elevation={0}>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          style={{
                            height: "10px",
                            background: "#FFFAF0",
                          }}
                        >
                          <h2 className="filtertitle">{t("Lyrics_tr")}</h2>
                        </AccordionSummary>

                        <AccordionDetails
                          style={{
                            display: "block",
                            background: "#FFFAF0",
                            padding: 0,
                          }}
                        >
                          <div className="LyricsList">
                            <ul style={{ margin: 0 }}>
                              <li
                                key={1}
                                onClick={() => {
                                  handleItemClick(1);
                                  setLyricsId(1);
                                }}
                              >
                                <div
                                  style={{
                                    color:
                                      activeIndex === 1 ? "#FF2E12" : "#545454",
                                    cursor: "pointer",
                                    fontSize: "21px",
                                    fontWeight: 400,
                                    fontFamily: "ChanakyaUni",
                                  }}
                                >
                                  {t("Lyrics_tr")}
                                </div>
                              </li>
                              <li
                                key={2}
                                onClick={() => {
                                  handleItemClick(2);
                                  setLyricsId(2);
                                }}
                              >
                                <div
                                  style={{
                                    color:
                                      activeIndex === 2 ? "#FF2E12" : "#545454",
                                    cursor: "pointer",
                                    fontSize: "21px",
                                    fontWeight: 400,
                                    fontFamily: "ChanakyaUni",
                                  }}
                                >
                                  {t("Without_Lyrics_tr")}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
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
                  <div className="sidebarmargin">
                    <div className="align-items-center row">
                      <div className="col-6">
                        <div className="filter1" style={{ marginTop: "10px" }}>
                          <span>
                            {t("Total_Records_tr")} : {pagination.totalRecords}
                          </span>
                        </div>
                      </div>
                      <div
                        className="filter1 col-6"
                        style={{ textAlign: "right" }}
                      >
                        <div className="filter1" style={{ textAlign: "right" }}>
                          <span>{t("Sort_tr")}</span>
                          <select
                            value={SortValue}
                            onChange={(e) => {
                              setSortValue(e.target.value);
                            }}
                            style={{
                              width: "178px",
                              backgroundColor: "rgb(255, 242, 213)",
                            }}
                          >
                            <option value="4">{t("ascending_date_tr")}</option>
                            <option value="5">{t("descending_date_tr")}</option>
                            <option value="0">{t("General_tr")}</option>
                            <option value="3">{t("Popular_tr")}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {audios && audios.length > 0 ? (
                    <div>
                      {audios.map((audio, i) => (
                        <div key={`audio-${audio.id}`}>
                          <div className="sidebarmargin">
                            <div
                              className="pravchanBox"
                              style={{ display: "flex", padding: "15px 20px" }}
                            >
                              <div style={{ marginRight: "25px" }}>
                                <a>
                                  <img
                                    className="audioicon"
                                    src={
                                      audio.lyricsHash != null
                                        ? WithLyrics
                                        : WithoutLyrics
                                    }
                                    onError={(e) => {
                                      e.currentTarget.src = WithoutLyrics;
                                    }}
                                    alt={audio.name}
                                    title={audio.name}
                                    onClick={() => {
                                      navigate(`/pravachans/` + audio.slug, {
                                        state: {
                                          audioId: audio.id,
                                          audioslug: audio.slug,
                                          sorting: SortValue,
                                          index: i,
                                          audiocat: CategoryId,
                                        },
                                      });
                                    }}
                                  />
                                </a>
                              </div>
                              <div style={{ width: "100%" }}>
                                <a style={{ cursor: "pointer" }}>
                                  <p
                                    style={{
                                      fontSize: "25px",
                                      paddingTop: "3px",
                                      fontWeight: "600",
                                    }}
                                    onClick={() => {
                                      navigate(`/pravachans/` + audio.slug, {
                                        state: {
                                          audioId: audio.id,
                                          audioslug: audio.slug,
                                          sorting: SortValue,
                                          index: i,
                                          audiocat: CategoryId,
                                        },
                                      });
                                    }}
                                  >
                                    <p>
                                      {audio.name != null &&
                                        audio.name.length > 100
                                        ? audio.name.slice(0, 80) + "..."
                                        : audio.name}
                                    </p>
                                  </p>
                                  <p
                                    onClick={() => {
                                      navigate(`/pravachans/` + audio.slug, {
                                        state: {
                                          audioId: audio.id,
                                          audioslug: audio.slug,
                                          sorting: SortValue,
                                          index: i,
                                          audiocat: CategoryId,
                                        },
                                      });
                                    }}
                                  >
                                    {audio.description}
                                  </p>
                                  <p>{audio.pravachanLength}</p>
                                </a>
                              </div>
                              <div
                                onClick={() => {
                                  if (!UserIdentity) setLogIn(true);
                                }}
                              >
                                <label
                                  id={`${audio.id}`}
                                  onClick={() => {
                                    if (!UserIdentity && logIn)
                                      toggleLike(audio?.id);
                                  }}
                                >
                                  <img
                                    src={isLiked ? Favadd : Favicon}
                                    alt="Favadd"
                                    style={{
                                      width: "36px",
                                      marginRight: "8px",
                                      marginTop: "2px",
                                    }}
                                  />
                                </label>
                              </div>
                              <div className="btns">
                                <div className="buttonres">
                                  <a
                                    id="download"
                                    title="Download"
                                    href={
                                      `${process.env.REACT_APP_API_URL}/api/Pravachans/` +
                                      audio.id +
                                      "/pravachan?t=" +
                                      "&download_attachment=true"
                                    }
                                  >
                                    <img
                                      alt="download"
                                      src={imgdownload}
                                      className="downloadbtn"
                                    ></img>
                                  </a>
                                </div>
                                <div
                                  style={{
                                    cursor: "pointer",
                                    paddingLeft: "5px",
                                  }}
                                >
                                  <img
                                    alt=""
                                    onClick={() => {
                                      navigate(`/pravachans/` + audio.slug, {
                                        state: {
                                          audioId: audio.id,
                                          audioslug: audio.slug,
                                          sorting: SortValue,
                                          index: i,
                                          audiocat: CategoryId,
                                        },
                                      });
                                    }}
                                    title="Play"
                                    src={imgpause}
                                    className="playbtn"
                                  ></img>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
                      {/* <Loading /> */}
                      {audios?.length === 0 ? (
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
        </div>
      </div>
      <LogInModel opens={logIn} onCloses={closeModal} />
    </>
  );
};
export default PravachansPage;
