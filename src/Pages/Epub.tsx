/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "react-i18next";
import "../Styles/Epub.css";
import React, { useState, useEffect, useRef } from "react";
import { EpubReader } from "../Components/EpubReader";
import * as CryptoJS from "crypto-js";
import { Router, useLocation, useNavigate, Link } from "react-router-dom";
import $ from "jquery";
import EpubServices from "../Services/Epub";
import plus from "../Images/plus.svg";
import min from "../Images/min.svg";
import reload from "../Images/refresh.svg";
import close from "../Images/close.svg";

export enum BookContentType {
  books,
  kalyans,
  kalpatru,
  magazine,
  vivekvani,
}
const EpubPage = () => {
  var signKey = localStorage.getItem("SignKey");

  var token = localStorage.getItem("Token");

  var userid = localStorage.getItem("UserId");

  var currentdate = new Date();
  var todayDate = currentdate
    .toISOString()
    .replace("T", " ")
    .substring(0, 16)
    .replace(".", "")
    .replace(":", "")
    .replace("-", "")
    .replace(" ", "")
    .replace("-", "");

  //= "624acfc1f84c9ee51564703f";
  //localStorage.getItem("UserId") == "" ? "" : localStorage.getItem("UserId");

  var url_file = "";
  var xhr = new XMLHttpRequest();
  const epubViewStyles = {
    viewHolder: {
      position: "relative",
      height: "100%",
      width: "100%",
    },
    view: {
      height: "100%",
    },
  };

  const [size, setSize] = useState(100);

  const renditionRef = useRef<any>(undefined);

  const getSecureKey = (url: any) => {
    let securekey =
      userid +
      "|" +
      todayDate +
      "|" +
      decodeURI(url) +
      "|" +
      signKey +
      "|Android";

    var hash = CryptoJS?.HmacSHA256(securekey, signKey as any);
    securekey = CryptoJS?.enc?.Base64?.stringify(hash);
    return encodeURI(securekey);
  };

  const [page, setPage] = useState("");
  const [cfiresult, setcfi] = useState<any>("");

  const tocRef = useRef<any>(undefined);

  const changeSize = (newSize: any) => {
    setSize(newSize);
  };

  const [colortheme, setTheme] = useState<any | String>(undefined);
  const [fontcolor, setFontColor] = useState<any | String>(undefined);
  const [themecolor, setThemeColor] = React.useState("white");

  const { t } = useTranslation();

  const [about, setEpub] = React.useState({
    __html: "",
  });

  const locationDetail = useLocation();
  const state = locationDetail?.state as {
    vivekvaniDetailId: string;
    bookDetailId: string;
    kalyanDetailId: string;
    kalpatrauDetailId: string;
    magazineDetailId: string;
    bookName: string;
    slug: string;
    type: BookContentType;
  };

  const getUrlBytype = (type: BookContentType) => {
    let value = "";
    switch (type) {
      case BookContentType.books:
        value = `books/${state?.bookDetailId}`;
        break;
      case BookContentType.kalyans:
        value = `kalyans/${state?.kalyanDetailId}`;
        break;
      case BookContentType.kalpatru:
        value = `kalyanskalpataru/${state?.kalpatrauDetailId}`;
        break;
      case BookContentType.magazine:
        value = `MonthlyMagazines/${state?.magazineDetailId}`;
        break;
      case BookContentType.vivekvani:
        value = `vivekvani/${state?.vivekvaniDetailId}`;
        break;
      default:
        break;
    }
    return value;
  };

  const [url, setUrl] = React.useState(
    `${process.env.REACT_APP_API_URL}/api/${getUrlBytype(
      state.type
    )}/epubstrem/`
    // `${process.env.REACT_APP_API_URL}/api/${state?.magazineDetailId}/epubstrem/`
    // `${process.env.REACT_APP_API_URL}/api/MonthlyMagazines/633aa65c695a0c595f8579b9/epubstrem/`
    //`http://localhost:55049/v1/api/books/6285140c81021b3600e67d88/epubstrem/`
  );

  const [location, setLocation] = useState<any>(undefined);

  const locationChanged = (epubcifi: any) => {
    // epubcifi =
    // "epubcfi(/6/2[The-Secrets-of-Gita]!/4[The-Secrets-of-Gita]/2/2[toc_marker-1]/2/1:0)";
    // epubcifi is a internal string used by epubjs to point to a location in an epub.
    //  It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);

    if (renditionRef?.current && tocRef?.current) {
      const { displayed, href } = renditionRef?.current?.location?.start;
      const chapter = tocRef?.current?.find((item: any) => item?.href === href);
      setPage(
        `Page ${displayed?.page} of ${displayed?.total} in chapter ${
          chapter ? chapter?.label : "n/a"
        }`
      );
    }
  };

  const head = {
    Authorization: "Bearer " + token,
    "X-Signature": getSecureKey(url),
    "X-Plateform": "1",
    "X-Value": todayDate,
  };

  function clickOnTheme(disp: boolean) {
    if (disp) {
      $("#divTheme").removeClass("hidetheme");
    } else {
      $("#divTheme").addClass("hidetheme");
    }
  }

  function GetLstPosition(bookId: string) {
    EpubServices.getLastPosition(
      "lastposition" ||
        "kalyanlastposition" ||
        "kalyankalpatarulastposition" ||
        "monthlymagazinelastposition",
      state?.bookDetailId ||
        state.kalyanDetailId ||
        state?.kalpatrauDetailId ||
        state.magazineDetailId ||
        state.vivekvaniDetailId
    ).then((res) => {
      if (res.status) {
        if (res.result != null && res.result !== "") {
          setcfi(res.result.cfi);
        }
      }
    });
  }

  function saveLstPositionAndClose() {
    EpubServices.SaveLastPositionAndClose(
      "lastposition" ||
        "kalyanlastposition" ||
        "kalyankalpatarulastposition" ||
        "monthlymagazinelastposition",
      state?.bookDetailId ||
        state.kalyanDetailId ||
        state?.kalpatrauDetailId ||
        state.magazineDetailId ||
        state?.vivekvaniDetailId,
      location,
      "100"
    ).then((res) => {});
  }

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);

  useEffect(() => {
    setTimeout(() => {
      GetLstPosition(state?.bookDetailId);
      setLocation(cfiresult);
    }, 400);
  }, [state?.bookDetailId, cfiresult]);

  useEffect(() => {
    clickOnTheme(false);
  });

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.register("custom", {
        body: {
          // background: colortheme,
          background: colortheme,
          color: fontcolor,
        },
      });
      renditionRef.current.themes.select("custom");
      if (themecolor === "black") {
        $("#titlebar").removeClass("theme-grey");
        $("#titlebar").removeClass("theme-grey");
        $("#titlebar").removeClass("titlebar_color");
        $("#titlebar").addClass("theme-grey");

        $("#test-div").removeClass("theme-white");
        $("#test-div").removeClass("theme-ivory");
        $("#test-div").removeClass("theme-grey");
        $("#test-div").addClass("theme-black");

        $("#test-toc-div").removeClass("theme-white");
        $("#test-toc-div").removeClass("theme-ivory");
        $("#test-toc-div").removeClass("theme-grey");
        $("#test-toc-div").addClass("theme-black");

        $("#test-toc-div button").removeClass("theme-white");
        $("#test-toc-div button").removeClass("theme-ivory");
        $("#test-toc-div button").removeClass("theme-grey");
        $("#test-toc-div button").addClass("theme-black");

        $("#tocwidth").removeClass("theme-white");
        $("#tocwidth").removeClass("theme-ivory");
        $("#tocwidth").removeClass("theme-grey");
        $("#tocwidth").addClass("theme-black");

        renditionRef.current.themes.default({
          // "p.TXT": { color: `${fontcolor}!important` },
          "*": {
            "-webkit-transition": "transform 0.5s ease",
            "-moz-transition": "tranform 0.5s ease",
            "-o-transition": "transform 0.5s ease",
            "-ms-transition": "transform 0.5s ease",
            transition: "transform 0.5s ease",
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
          },
          body: {
            background: "#000000",
            "overflow-wrap": "break-word",
            hyphens: "auto",
          },
          html: {
            "-webkit-filter": "invert(1) hue-rotate(180deg)",
            filter: "invert(1) hue-rotate(180deg)",
          },
          img: {
            "-webkit-filter": "invert(1) hue-rotate(180deg)",
            filter: "invert(1) hue-rotate(180deg)",
          },
        });
      } else if (themecolor === "grey") {
        $("#titlebar").removeClass("theme-grey");
        $("#titlebar").removeClass("theme-black");
        $("#titlebar").removeClass("titlebar_color");
        $("#titlebar").addClass("theme-black");

        $("#test-div").removeClass("theme-white");
        $("#test-div").removeClass("theme-ivory");
        $("#test-div").removeClass("theme-black");
        $("#test-div").addClass("theme-grey");

        $("#test-toc-div").removeClass("theme-white");
        $("#test-toc-div").removeClass("theme-ivory");
        $("#test-toc-div").removeClass("theme-black");
        $("#test-toc-div").addClass("theme-grey");

        $("#test-toc-div button").removeClass("theme-white");
        $("#test-toc-div button").removeClass("theme-ivory");
        $("#test-toc-div button").removeClass("theme-black");
        $("#test-toc-div button").addClass("theme-grey");

        $("#tocwidth").removeClass("theme-white");
        $("#tocwidth").removeClass("theme-ivory");
        $("#tocwidth").removeClass("theme-black");
        $("#tocwidth").addClass("theme-grey");
        renditionRef.current.themes.default({
          // "p.TXT": { color: `${fontcolor}!important` },
          "*": {
            "-webkit-transition": "transform 0.5s ease",
            "-moz-transition": "tranform 0.5s ease",
            "-o-transition": "transform 0.5s ease",
            "-ms-transition": "transform 0.5s ease",
            transition: "transform 0.5s ease",
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
          },
          body: {
            background: "#464646",
            "overflow-wrap": "break-word",
            hyphens: "auto",
          },
          html: {
            "-webkit-filter": "invert(1) hue-rotate(180deg)",
            filter: "invert(1) hue-rotate(180deg)",
          },
          img: {
            "-webkit-filter": "invert(1) hue-rotate(180deg)",
            filter: "invert(1) hue-rotate(180deg)",
          },
        });
      } else if (themecolor === "ivory") {
        $("#titlebar").removeClass("theme-grey");
        $("#titlebar").removeClass("theme-black");
        $("#titlebar").removeClass("titlebar_color");
        $("#titlebar").addClass("titlebar_color");

        $("#test-div").removeClass("theme-white");
        $("#test-div").removeClass("theme-ivory");
        $("#test-div").removeClass("theme-black");
        $("#test-div").addClass("theme-ivory");

        $("#test-toc-div").removeClass("theme-white");
        $("#test-toc-div").removeClass("theme-ivory");
        $("#test-toc-div").removeClass("theme-black");
        $("#test-toc-div").addClass("theme-ivory");

        $("#test-toc-div button").removeClass("theme-white");
        $("#test-toc-div button").removeClass("theme-ivory");
        $("#test-toc-div button").removeClass("theme-black");
        $("#test-toc-div button").addClass("theme-ivory");

        $("#tocwidth").removeClass("theme-white");
        $("#tocwidth").removeClass("theme-ivory");
        $("#tocwidth").removeClass("theme-black");
        $("#tocwidth").addClass("theme-ivory");
        renditionRef.current.themes.default({
          // "p.TXT": { color: `${fontcolor}!important` },
          "*": {
            "-webkit-transition": "transform 0.5s ease",
            "-moz-transition": "tranform 0.5s ease",
            "-o-transition": "transform 0.5s ease",
            "-ms-transition": "transform 0.5s ease",
            transition: "transform 0.5s ease",
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
          },
          body: {
            background: "#fffcda",
            "overflow-wrap": "break-word",
            hyphens: "auto",
          },
          html: {
            "-webkit-filter": "invert(0) hue-rotate(0)",
            filter: "invert(0) hue-rotate(0)",
          },
          img: {
            "-webkit-filter": "invert(0) hue-rotate(0)",
            filter: "invert(0) hue-rotate(0)",
          },
        });
      } else if (themecolor === "white") {
        $("#titlebar").removeClass("theme-grey");
        $("#titlebar").removeClass("theme-black");
        $("#titlebar").removeClass("titlebar_color");
        $("#titlebar").addClass("titlebar_color");

        $("#test-div").removeClass("theme-grey");
        $("#test-div").removeClass("theme-ivory");
        $("#test-div").removeClass("theme-black");
        $("#test-div").addClass("theme-white");

        $("#test-toc-div").removeClass("theme-grey");
        $("#test-toc-div").removeClass("theme-ivory");
        $("#test-toc-div").removeClass("theme-black");
        $("#test-toc-div").addClass("theme-white");

        $("#test-toc-div button").removeClass("theme-grey");
        $("#test-toc-div button").removeClass("theme-ivory");
        $("#test-toc-div button").removeClass("theme-black");
        $("#test-toc-div button").addClass("theme-white");

        $("#tocwidth").removeClass("theme-grey");
        $("#tocwidth").removeClass("theme-ivory");
        $("#tocwidth").removeClass("theme-black");
        $("#tocwidth").addClass("theme-white");
        renditionRef.current.themes.default({
          // "p.TXT": { color: `${fontcolor}!important` },
          "*": {
            "-webkit-transition": "transform 0.5s ease",
            "-moz-transition": "tranform 0.5s ease",
            "-o-transition": "transform 0.5s ease",
            "-ms-transition": "transform 0.5s ease",
            transition: "transform 0.5s ease",
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
          },
          body: {
            background: "#ffffff",
            "overflow-wrap": "break-word",
            hyphens: "auto",
          },
          html: {
            "-webkit-filter": "invert(0) hue-rotate(0)",
            filter: "invert(0) hue-rotate(0)",
          },
          img: {
            "-webkit-filter": "invert(0) hue-rotate(0)",
            filter: "invert(0) hue-rotate(0)",
          },
        });
      }
    }
    // return GetSignKey();
  }, [colortheme, fontcolor, themecolor, state?.bookDetailId, cfiresult]);

  var iframe = document?.getElementsByTagName("iframe");
  const Name =
    iframe[0]?.contentWindow?.document?.getElementsByClassName(
      "Chapter-Heading"
    )[0]?.innerHTML ||
    iframe[0]?.contentWindow?.document?.getElementsByClassName("Heading")[0]
      ?.innerHTML;

  const newString = `${Name}`;
  const finalName = newString?.split("<")[0];

  const viewerRef = useRef(null);
  const navigate = useNavigate();

  const BookId = state?.bookDetailId;
  const KalyanId = state?.kalyanDetailId;
  const KalpataruId = state?.kalpatrauDetailId;
  const MagazineId = state?.magazineDetailId;
  const VivekvaniId = state?.vivekvaniDetailId;

  const closebutton = () => {
    if (BookId) {
      navigate(`/books/` + state.slug, {
        state: { bookId: state?.bookDetailId },
      });
    }
    if (KalyanId) {
      navigate(`/kalyans/` + state.slug, {
        state: { kalyanId: state?.kalyanDetailId },
      });
    }
    if (KalpataruId) {
      navigate(`/kalyanskalpataru/` + state.slug, {
        state: { kalpatruId: state?.kalpatrauDetailId },
      });
    }
    if (MagazineId) {
      navigate(`/monthlymagazine/` + state.slug, {
        state: { MonthId: state?.magazineDetailId },
      });
    }
    if (VivekvaniId) {
      console.log("Id", VivekvaniId);
      navigate(`/vivekvani/` + state.slug, {
        state: { vivekId: state?.vivekvaniDetailId },
      });
    }
  };

  return (
    <div>
      <div
        className="d-flex bd-highlight example-parent"
        id="titlebar"
        style={{ backgroundColor: "#ff8b33", color: "#ffffff" }}
      >
        <div className="p-2 bd-highlight col-example"></div>
        <div
          className="p-2 flex-grow-1 bd-highlight col-example"
          style={{
            marginTop: "5px",
            marginLeft: "25px",
          }}
        >
          <label>
            {state?.bookName} : {finalName === "undefined" ? "" : finalName}
          </label>
        </div>

        <div className="p-2 bd-highlight col-example">
          <div style={{ flex: "100%", marginTop: "7px" }}>
            <div style={{ flex: "100%", display: "flex" }}>
              <img
                alt=""
                style={{ width: "22px" }}
                src={min}
                onClick={() => changeSize(Math.max(50, size - 10))}
              />
              <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                {size}%
              </div>
              <img
                alt="plus"
                style={{ width: "22px", marginRight: "13px" }}
                src={plus}
                onClick={() => changeSize(Math.min(130, size + 10))}
              />
              <img
                alt="reload"
                style={{ width: "19px" }}
                src={reload}
                onClick={() => {
                  setTheme("#ffffff");
                  setFontColor("#000000");
                  clickOnTheme(false);
                  setThemeColor("white");
                  setSize(100);
                }}
              />
              <div
                className="icon-theme"
                onClickCapture={() => {
                  clickOnTheme(true);
                }}
              >
                <div id="theme">
                  <div id="divTheme" className="col">
                    <div className="row" style={{ margin: 0 }}>
                      <a
                        id="btnThemeWhite"
                        className="theme-btn-white"
                        onClick={() => {
                          setThemeColor("white");
                          setTheme("#ffffff");
                          setFontColor("#000000");
                          clickOnTheme(false);
                        }}
                      ></a>
                    </div>
                    <div className="row" style={{ margin: 0 }}>
                      <a
                        id="btnThemeIvory"
                        className="theme-btn-ivory"
                        onClick={() => {
                          setThemeColor("ivory");
                          setTheme("#fffcda");
                          setFontColor("#000000");
                          clickOnTheme(false);
                        }}
                      />
                    </div>
                    <div className="row" style={{ margin: 0 }}>
                      <a
                        id="btnThemeGrey"
                        className="theme-btn-grey"
                        onClick={() => {
                          setThemeColor("grey");
                          setTheme("#464646");
                          setFontColor("#ffffff");
                          clickOnTheme(false);
                        }}
                      />
                    </div>
                    <div className="row" style={{ margin: 0 }}>
                      <a
                        id="btnThemeBlack"
                        className="theme-btn-black"
                        onClick={() => {
                          setThemeColor("black");
                          clickOnTheme(false);
                          setTheme("#000000");
                          setFontColor("#ffffff");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt="close"
                src={close}
                onClick={() => {
                  saveLstPositionAndClose();
                  closebutton();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "93vh" }} className="myReader">
        <EpubReader
          location={location}
          locationChanged={locationChanged}
          //styles={ownStyles}
          //url='https://gerhardsletten.github.io/react-reader/files/alice.epub'
          url={url}
          epubInitOptions={{ requestHeaders: head }}
          tocChanged={(toc) => {
            tocRef.current = toc;
          }}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.fontSize(`${size}%`);

            rendition.themes.register("custom", {
              body: {
                // background: colortheme,
                background: colortheme,
                color: "#000000",
                fontfamily: "ChanakyaUni",
              },
            });
            rendition.themes.select("custom");
          }}
          epubOptions={{
            infinite: true,
            overflow: undefined,
            // manager: "continuous",
          }}
        />
      </div>
    </div>
  );
};
export default EpubPage;
