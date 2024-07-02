/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import AudiosService from "../Services/Audios";
import AuthorsService from "../Services/Authors";
import WithoutLyrics from "../Images/audiolyrics.svg";
import WithLyrics from "../Images/audiowithoutlyrics.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Reset from "../Images/reset.png";
import ListPagination from "../Components/ListPagination";
import "../Styles/Audios.css";
import "../Styles/Sidebar.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import $ from "jquery";
import imgpause from "../assets/audioPlayer/img/yellowplay.svg";
import Loading from "../Components/Loading";
import { useUser } from "../Contexts/UserContext";
import imgdownload from "../Images/downloadpravachan.svg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { LogInModel } from "./LogInoutModel";
import { SideBar } from "./SubMenu";

const AudiosPage = () => {
  const { isSelected } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [audios, setAudios] = useState<any[] | undefined>(undefined);

  const [refresh, setRefresh] = useState(false);

  const [SortValue, setSortValue] = useState("3");

  const [categories, setCategories] = useState<any[]>([]);
  const [CategoryId, setCategoryId] = useState("");
  const [Lyrics, setLyrics] = useState<any>("");
  const [LyricsId, setLyricsId] = useState<any>("");
  const [Singer, setSinger] = useState<any>("");
  const [SingerId, setSingerId] = useState<any>("");

  const [audiohash, setAudioHash] = useState("");

  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index: any) => {
    setActiveIndex(index);
  };

  const [pagination, setPagination] = useState({
    pageNo: 0,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };
  const UserIdentity = localStorage.getItem("UserId") as any;
  const location = useLocation();

  const [loginState, setLoginState] = useState<string | null>(null);

  const handleLoginStateChange = (newState: any) => {
    setLoginState(newState);
    {
      audios?.map((audio, i) => (
        navigate(`/audios/` + audio?.slug, {
          state: {
            audioId: audio.id,
            audioslug: audio.slug,
            sorting: SortValue,
            index: i,
            audiocat: CategoryId,
          },
        })
      ))
    }
  };

  const state = location.state as {
    authorId: string;
    authorName: string;
    type: string;
  };
  const [bread, showBread] = useState<string>("");

  function ResetData() {
    setCategoryId("");
    setSingerId("");
    setLyricsId("");
    setSortValue("3");
    setActiveIndex(null);
    setPagination({
      ...pagination,
      pageNo: 0,
    });
    setRefresh(true);
  }

  function ClickOnFilter(
    SingerId: string,
    CategoryId: string,
    LyricsId: number
  ) {
    setRefresh(false);
    AudiosService.getAudios(
      0,
      pagination.recordsPerPage,
      false,
      CategoryId,
      SingerId || state?.authorId,
      "",
      SortValue,
      "",
      window.location.pathname === "/audios/special" ? true : false,
      "audio",
      LyricsId,
      "",
      "",
      ""
    ).then((res) => {
      if (res) {
        setAudios(res.result?.items);
        setPagination({
          ...pagination,
          pageNo: 1,
          totalRecords: res.result?.totalRecords,
        });
      }
    });
  }

  const downloadAudio = (pravachanPath: any) => {
    const imageUrl = pravachanPath;
    const link = document.createElement('a');
    link.href = imageUrl; link.download = 'image.jpg';
    document.body.appendChild(link); link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    ClickOnFilter(SingerId, CategoryId, LyricsId);
    $(".CategoryList > ul > li > div").removeClass("listActive");
    $("#cat-" + CategoryId).addClass("listActive");

    $(".Authorlist > ul > li > div").removeClass("listActive");
    $("#sin-" + SingerId).addClass("listActive");
    if (LyricsId === "") {
      $(".LanguageList > ul > li > div").removeClass("listActive");
      $("#lan-" + 0).addClass("listActive");
    }
    if (LyricsId === "lyrics0") {
      $(".LanguageList > ul > li > div").removeClass("listActive");
      $("#lan-" + 1).addClass("listActive");
    }
  }, [SingerId, CategoryId, LyricsId]);

  useEffect(() => {
    AudiosService.getFilters("audio").then((res) => {
      if (res.status) {
        setSinger(res.result.authors);
        setLyrics(res.result);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    AudiosService.getAudioCategories().then((res) => {
      if (res.status) {
        debugger
        console.log("setCategories",res.result);
        
        setCategories(res.result);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    ResetData();
  }, [isSelected]);

  useEffect(() => {
    setRefresh(false);
    AudiosService.getAudios(
      pagination.pageNo === 0
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      false,
      CategoryId,
      SingerId || state?.authorId,
      "",
      SortValue,
      "",
      window.location.pathname === "/audios/special" ? true : false,
      "audios" || state?.type,
      LyricsId,
      "",
      "",
      UserIdentity
    ).then((res) => {
      if (res.status) setAudios(res.result?.items);
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

  useEffect(() => {
    if (CategoryId !== "") {
      setSortValue("0")
    }
  }, [CategoryId])

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
            ) : window.location.pathname === "/audios/special" ? (
              t("Special_Audios_tr")
            ) : (
              t("Audios_tr")
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
                /{" "}
                {window.location.pathname === "/audios/special"
                  ? t("Special_Audios_tr")
                  : t("Audios_tr")}
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

                    <div style={{ backgroundColor: "#fffaec" }}>
                      {/* audio list */}
                      <Accordion defaultExpanded elevation={0}>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          style={{
                            height: 0,
                            background: "#FFFAF0",
                            minHeight: "20px",
                          }}
                        >
                          <h2 className="filtertitle">{t("audioList_tr")}</h2>
                        </AccordionSummary>

                        <AccordionDetails
                          style={{ display: "block", background: "#FFFAF0" }}
                        >
                          <div style={{ marginTop: "-10px" }}>
                            <SideBar
                              items={categories!}
                              onClick={(value: any) => {
                                if (value) {
                                  if (value.items === null)
                                    setCategoryId(value.id);
                                }
                              }}
                              onRefresh={ResetData}
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      {/* Preacher  */}
                      <Accordion
                        elevation={0}
                        style={{ display: state?.authorId ? "none" : "block" }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          style={{
                            height: 0,
                            background: "#FFFAF0",
                            minHeight: "39px",
                            margin: "0 0 -7px 0",
                          }}
                        >
                          <h2 className="filtertitle">{t("Singer_tr")}</h2>
                        </AccordionSummary>
                        <AccordionDetails
                          style={{
                            display: "block",
                            background: "#FFFAF0",
                            padding: 0,
                          }}
                        >
                          {Singer && Singer.length > 0
                            ? Singer?.map((Singer: any) => (
                              <div
                                key={`c-${Singer.id}`}
                                className="Authorlist"
                                onClick={() => {
                                  setSingerId(Singer.id);
                                }}
                              >
                                <ul style={{ margin: "5px 0 0 0" }}>
                                  <li>
                                    <div
                                      style={{
                                        fontSize: "21px",
                                        cursor: "pointer",
                                        fontWeight: 400,
                                        color: "#545454",
                                        fontFamily: "ChanakyaUni",
                                      }}
                                      id={`sin-${Singer.id}`}
                                    >
                                      {Singer.name}
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
                            height: 0,
                            background: "#FFFAF0",
                            minHeight: "39px",
                            margin: "0 0 -7px 0",
                          }}
                        >
                          <h2 className="filtertitle">{t("Lyrics_tr")}</h2>
                        </AccordionSummary>

                        <AccordionDetails
                          style={{
                            display: "block",
                            background: "#FFFAF0",
                            padding: 0,
                            marginTop: "5px",
                          }}
                        >
                          <div className="">
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
                                        activeIndex === 1
                                          ? "#FF2E12"
                                          : "#545454",
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
                                        activeIndex === 2
                                          ? "#FF2E12"
                                          : "#545454",
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
                            <option value="0">{t("General_tr")}</option>
                            <option value="3">{t("Popular_tr")}</option>
                            <option value="2">{t("Latest_tr")}</option>
                            <option value="1">{t("Title_tr")}</option>
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
                              style={{ display: "flex", padding: "15px 20px", cursor: "pointer" }}
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
                                      if (UserIdentity) {
                                        navigate(`/audios/` + audio.slug, {
                                          state: {
                                            audioId: audio.id,
                                            audioslug: audio.slug,
                                            sorting: SortValue,
                                            index: i,
                                            audiocat: CategoryId,
                                          },
                                        });
                                      } else {
                                        setLogIn(true);
                                      }
                                    }}
                                  />
                                </a>
                              </div>
                              <div style={{ width: "100%" }}>
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    if (UserIdentity) {
                                      navigate(`/audios/` + audio.slug, {
                                        state: {
                                          audioId: audio.id,
                                          audioslug: audio.slug,
                                          sorting: SortValue,
                                          index: i,
                                          audiocat: CategoryId,
                                        },
                                      });
                                    } else {
                                      setLogIn(true);
                                    }
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "25px",
                                      paddingTop: "3px",
                                      fontWeight: "600",
                                      textAlign: "unset",
                                    }}
                                  >
                                    <p>
                                      {audio.name != null &&
                                        audio.name.length > 100
                                        ? audio.name.slice(0, 80) + "..."
                                        : audio.name}
                                    </p>
                                  </p>
                                  <label>{audio.description}</label>
                                  <label>{audio.audioLength}</label>
                                </a>
                              </div>

                              <div className="btns">
                                <div className="buttonres">
                                  <a
                                    id="download"
                                    title="Download"
                                    onClick={() => {
                                      if (UserIdentity) {
                                        downloadAudio(`${process.env.REACT_APP_API_URL}/api/Audio/` +
                                          audio?.id +
                                          "/audio?t=" +
                                          "&download_attachment=true")
                                      } else {
                                        setLogIn(true);
                                      }
                                    }}                                   
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
                                      if (UserIdentity) {
                                        navigate(`/audios/` + audio.slug, {
                                          state: {
                                            audioId: audio.id,
                                            audioslug: audio.slug,
                                            sorting: SortValue,
                                            index: i,
                                            audiocat: CategoryId,
                                          },
                                        });
                                      } else {
                                        setLogIn(true);
                                      }
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
      <LogInModel opens={logIn} onCloses={closeModal} onLoginStateChange={handleLoginStateChange} />
    </>
  );
};
export default AudiosPage;
