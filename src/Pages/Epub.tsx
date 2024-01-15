/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "react-i18next";
import "../Styles/Epub.css";
import { useState, useEffect, useRef } from "react";
import { EpubReader } from "../Components/EpubReader";
import * as CryptoJS from "crypto-js";
import { useLocation, useNavigate, Link } from "react-router-dom";
import $, { data } from "jquery";
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
  vivek,
}

interface bookmark {
  id: number;
  name: string;
  // Add other properties as needed
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
  const [cfiresult, setcfi] = useState<any>("0");

  const tocRef = useRef<any>(undefined);

  const changeSize = (newSize: any) => {
    setSize(newSize);
  };

  const [colortheme, setTheme] = useState<any | String>(undefined);
  const [fontcolor, setFontColor] = useState<any | String>(undefined);
  const [themecolor, setThemeColor] = useState("white");

  const { t } = useTranslation();

  const [bkmarkSaved, setBkmarkSaved] = useState<boolean>(false);

  const locationDetail = useLocation();
  const state = locationDetail?.state as {
    bookDetailId: string;
    kalyanDetailId: string;
    kalpatrauDetailId: string;
    magazineDetailId: string;
    vivekvaniDetailId: string;
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
      case BookContentType.vivek:
        value = `vivekVanis/${state?.vivekvaniDetailId}`;
        break;
      default:
        break;
    }
    return value;
  };

  const [url, setUrl] = useState(

    `${process.env.REACT_APP_API_URL}/api/${getUrlBytype(
      state.type
    )}/epubstrem/`
    // `${process.env.REACT_APP_API_URL}/api/${state?.magazineDetailId}/epubstrem/`
    // `${process.env.REACT_APP_API_URL}/api/MonthlyMagazines/633aa65c695a0c595f8579b9/epubstrem/`
    // `${process.env.REACT_APP_API_URL}/api/MonthlyMagazines/633aa65c695a0c595f8579b9/epubstrem/`
    // `${process.env.REACT_APP_API_URL}/api/VivekVanis/64de212fd06c418558f180f2/epubstrem/`
    //`http://localhost:55049/v1/api/VivekVanis/64de212fd06c418558f180f2/epubstrem/`
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
        `Page ${displayed?.page} of ${displayed?.total} in chapter ${chapter ? chapter?.label : "n/a"
        }`
      );
      setFinalName(chapter ? chapter.label : undefined);
    }
    if (tocRef.current) {
      const chapterName = tocRef?.current.item;
      setFinalName(chapterName)
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
      "monthlymagazinelastposition" ||
      "vivekvanilastposition",
      state?.bookDetailId ||
      state?.kalyanDetailId ||
      state?.kalpatrauDetailId ||
      state?.magazineDetailId ||
      state?.vivekvaniDetailId
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
      "monthlymagazinelastposition" ||
      "vivekvanilastposition",
      state?.bookDetailId ||
      state?.kalyanDetailId ||
      state?.kalpatrauDetailId ||
      state?.magazineDetailId ||
      state?.vivekvaniDetailId,
      location,
      "100"
    ).then((res) => { });
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
  }, []);

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.register("custom", {
        body: {
          // background: colortheme,
          // background: colortheme,
          color: fontcolor,
        },
      });
      renditionRef.current.themes.select("custom");
      if (themecolor === "black") {
        localStorage.setItem("epub-theme", "black")
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
            // background: "#000000",
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
        localStorage.setItem("epub-theme", "grey")
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
            // background: "#464646",
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
        localStorage.setItem("epub-theme", "ivory")
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
            // background: "#fffcda",
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
        localStorage.setItem("epub-theme", "white")
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
            // background: "#ffffff",
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
  }, [colortheme, fontcolor, state?.bookDetailId, cfiresult]);

  var iframe = document?.getElementsByTagName("iframe");
  const Name =
    iframe[0]?.contentWindow?.document?.getElementsByClassName(
      "Chapter-Heading"
    )[0]?.innerHTML ||
    iframe[0]?.contentWindow?.document?.getElementsByClassName("Heading")[0]
      ?.innerHTML;

  const [finalName, setFinalName] = useState<string>("");
  const newString = `${Name}`;
  // const setFinalName = newString?.split("<")[0]
  useEffect(() => {
    setFinalName(newString?.split("<")[0]);
  }, [finalName]);

  const navigate = useNavigate();

  const BookId = state?.bookDetailId;
  const KalyanId = state?.kalyanDetailId;
  const KalpataruId = state?.kalpatrauDetailId;
  const MagazineId = state?.magazineDetailId;
  const VivekId = state?.vivekvaniDetailId;
  const closebutton = () => {
    if (BookId) {
      navigate(-1);
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
    if (VivekId) {
      navigate(`/vivekvani/` + state?.slug, {
        state: { vivekId: state?.vivekvaniDetailId },
      });
    }
  };

  const SaveBkMark = async () => {
    let res = await EpubServices.savebookmark(state?.bookDetailId ||
      state?.kalyanDetailId ||
      state?.kalpatrauDetailId ||
      state?.magazineDetailId ||
      state?.vivekvaniDetailId, location, finalName);
    if (res) {
      res.status && setBkmarkSaved(true);
    }

  }

  function RemoveBkMark() {
    EpubServices.removebookmark(state?.bookDetailId ||
      state?.kalyanDetailId ||
      state?.kalpatrauDetailId ||
      state?.magazineDetailId ||
      state?.vivekvaniDetailId, location).then(
        (res: any) => {
          res.status && setBkmarkSaved(false);
        }
      );
  }

  const [showBKdata, setShowBKdata] = useState<bookmark[] | undefined>(
    undefined
  );

  const [showdata, setShowdata] = useState<boolean>(false);
  const [lengthofbkm, setLengthofbkm] = useState<boolean>(false)

  useEffect(() => {
    if (showdata) {
      EpubServices.getbookmark(
        state?.bookDetailId ||
        state?.kalyanDetailId ||
        state?.kalpatrauDetailId ||
        state?.magazineDetailId ||
        state?.vivekvaniDetailId,).then((res: any) => {
          if (res.status) {
            setShowBKdata(res?.result);
            {
              res.result.length > 0 ?
                setLengthofbkm(true) :
                setLengthofbkm(false)
            }
          }
        });
    }
  }, [showdata]);

  const handleDelete = (dataCfi: any) => {
    EpubServices.removebookmark(state?.bookDetailId ||
      state?.kalyanDetailId ||
      state?.kalpatrauDetailId ||
      state?.magazineDetailId ||
      state?.vivekvaniDetailId, dataCfi).then(
        (res: any) => {
          res.status && setBkmarkSaved(false);
        }
      );
  };

  const [getcfi, setGetcfi] = useState<string>("")

  useEffect(() => {
    console.log("bkmarkSaved", bkmarkSaved);
    console.log("getcfi", getcfi);
    getcfi === location ? setBkmarkSaved(true) : setBkmarkSaved(false);
  }, [location, getcfi])

  useEffect(() => {
    showBKdata?.map((data: any) => {
      // debugger
      setGetcfi(data.cfi)
      if (data.name === "undefined") {
        // setBookmarkName(Bookmark.index)
      }
    })
  }, [location]);
  const CurrentTheme = localStorage.getItem("epub-theme") as any;

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
          <label style={{ fontSize: "larger" }}>
            {state?.bookName} : {finalName === "undefined" ? "" : finalName}
          </label>
        </div>

        <div className="p-2 bd-highlight col-example">
          <div style={{ flex: "100%", marginTop: "7px" }}>
            <div style={{ flex: "100%", display: "flex" }}>
              <div
                id="bookmark-list"
                onClick={() => {
                  setShowdata(showdata ? false : true)
                }}
              ></div>
              <div
                id="bkicon"
                className={bkmarkSaved ? "bookmarkicon-fill" : "bookmarkicon"}
                onClick={() => {
                  (!bkmarkSaved ? SaveBkMark() : RemoveBkMark())
                }}
              ></div>
              <img
                alt=""
                style={{ width: "22px" }}
                src={min}
                onClick={() => changeSize(Math.max(50, size - 10))}
              />
              <div
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  fontSize: "18px",
                }}
              >
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
                width="18px"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  saveLstPositionAndClose();
                  closebutton();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {showdata === true && lengthofbkm === true ? (
          <div
            style={{
              width: "18%",
              height: "auto",
              position: "absolute",
              right: "5px",
              zIndex: 1,
              background: "antiquewhite",
            }}
          >
            <ul className="bklistul" style={{ listStyle: "none" }}>
              {showBKdata &&
                showBKdata?.map((data: any, index: number) => (
                  <div style={{ display: "flex", justifyContent: "space-between" }} key={index}>
                    <li
                      className="bklistitem"
                      key={data.id}
                      onClick={() => {
                        setLocation(data.cfi);
                        setFinalName(data.name);
                        setShowdata(false)
                      }}
                    >
                      {data?.name}
                    </li>
                    <label
                      onClick={() => {
                        handleDelete(data.cfi);
                        setShowdata(false)
                      }}
                      className="bookmark_del fa fa-trash"
                      style={{
                        marginRight: "40px",
                        color: "red",
                        border: "none",
                        background: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                    ></label>
                  </div>
                ))}
            </ul>
          </div>
        ) : (
          <div style={{ display: "none", position: "relative" }}></div>
        )}
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
                // background: colortheme,
                color: CurrentTheme === 'black' || CurrentTheme === "gray" ? "#ffffff" : "#000000",
                // link.style.color = (localStorage.getItem('CurrentTheme') == 'black' || localStorage.getItem('CurrentTheme') == 'grey') ? '#ffffff' : '#000000';
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
