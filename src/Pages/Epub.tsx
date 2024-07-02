/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import BooksService from "../Services/Books";
import VivekService from "../Services/Vivekvani";
import KalyansServices from "../Services/Kalyan";
import KalpataruServices from "../Services/Kalpataru";
import GeetGovindServices from "../Services/GeetGovind";

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

  const [size, setSize] = useState<number>(100);

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
  const [toast, setToast] = useState<{ show: boolean, message: string }>({ show: false, message: '' })
  const { t } = useTranslation();

  const [savedBookMark, setSavedBookMark] = useState<boolean>(false)

  const locationDetail = useLocation();
  const state = locationDetail?.state as {
    bookDetailId: string;
    kalyanDetailId: string;
    kalpatrauDetailId: string;
    magazineDetailId: string;
    vivekvaniDetailId: string;
    bookName: string;
    chapterName: string;
    slug: string;
    type: BookContentType;
    titleName: string;
    location: string;
    reload: string;
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

  console.log("url",url);
  

  // const sublocation = localStorage.getItem("location")
  const [location, setLocation] = useState<any>(undefined);
  const locationChanged = (epubcifi: any) => {

    setLocation(epubcifi)

    if (renditionRef?.current && tocRef?.current) {
      const { displayed, href } = renditionRef?.current?.location?.start;
      const chapter = tocRef?.current?.find((item: any) => item?.href.includes(href));
      setPage(
        `Page ${displayed?.page} of ${displayed?.total} in chapter ${chapter ? chapter?.label : "n/a"
        }`
      );
      setFinalName(chapter ? chapter.label : undefined);
      // var els = $('a[href^="' + href + '"]');
      // const els = document.querySelectorAll(`a[href^="${href}"]`) as NodeListOf<HTMLAnchorElement>;
      //@ts-ignore
      // console.log("--->", els?.prevObject[0]?.body?.innerText);
      // if (els?.length > 0) {

      // var $e = els?.prevObject[0]?.body?.innerText as any
      // var title = els?.prevObject[0]?.body?.innerText?.split("#")[1];       
      // }
    }
    // console.log("title==>",title);
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
          var currchapter = localStorage.getItem("title") as any;
          setFinalName(currchapter)
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
      "100",
    ).then((res) => {
      if (res.status) localStorage.setItem("title", finalName)
    });
  }

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);

  useEffect(() => {
    setTimeout(() => {
      if (state?.location) {
        setLocation(state?.location)
        setFinalName(state?.chapterName)
      }
      else {
        GetLstPosition(state?.bookDetailId);
        setLocation(cfiresult);
      }
      // location ? setLocation(state?.location) : setLocation(cfiresult);
    }, 400);
  }, [state, cfiresult, state?.location]);


  // useEffect(() => { 
  //   setTimeout(() => {
  //     GetLstPosition(state?.bookDetailId);
  //     setLocation(cfiresult);
  //   }, 500);
  // }, [state?.bookDetailId, cfiresult]);

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
        localStorage.setItem("epub-theme", "black");
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
            setFontColor: "#ffffff",
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
        localStorage.setItem("epub-theme", "grey");
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
        localStorage.setItem("epub-theme", "ivory");
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
        localStorage.setItem("epub-theme", "white");
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

  const [finalName, setFinalName] = useState<string>('');

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
      navigate(`/geetgovind/` + state.slug, {
        state: { MonthId: state?.magazineDetailId },
      });
    }
    if (VivekId) {
      navigate(`/vivekvani/` + state?.slug, {
        state: { vivekId: state?.vivekvaniDetailId },
      });
    }
  };

  const [showBKdata, setShowBKdata] = useState<bookmark[] | undefined | any>(
    undefined
  );

  const [showdata, setShowdata] = useState<boolean>(false);
  const [lengthofbkm, setLengthofbkm] = useState<boolean>(false);

  const [bookmarkLimit] = useState(10); // Set the bookmark limit

  const SaveBookMark = async () => {
    // if (newItem.trim() !== '' && items.length < 10) { 
    if (showBKdata?.length < bookmarkLimit) {
      let res;
      if (state?.bookDetailId) {
        res = await EpubServices.savebookmark(
          "bookmarks",
          state?.bookDetailId,
          location,
          finalName
        );
      } else if (state?.kalyanDetailId) {
        res = await EpubServices.savebookmark(
          "kalyanbookmarks",
          state?.kalyanDetailId,
          location,
          finalName
        );
      } else if (state?.kalpatrauDetailId) {
        res = await EpubServices.savebookmark(
          "kalyankalpatarubookmarks",
          state?.kalpatrauDetailId,
          location,
          finalName
        );
      } else if (state?.magazineDetailId) {
        res = await EpubServices.savebookmark(
          "monthlymagazinebookmarks",
          state?.magazineDetailId,
          location,
          finalName
        );
      } else if (state?.vivekvaniDetailId) {
        res = await EpubServices.savevivekvanimark(
          state?.vivekvaniDetailId,
          location,
          finalName
        );
      }

      if (res?.status) {
        setSavedBookMark(!savedBookMark);
        showNotification(localStorage.getItem("lan") === "hindi"
          ? "बुकमार्क को सफलतापूर्वक जोड़ा गया |"
          : "Bookmark added successfully")
      }
    } else {
      setSavedBookMark(!savedBookMark)
      showNotification(localStorage.getItem("lan") === "hindi"
        ? "आपने इस पुस्तक के लिए अधिकतम बुकमार्क सीमा पार कर ली है। नए जोड़ने के लिए कृपया कुछ बुकमार्क हटाएँ |"
        : "You have exceeded the maximum bookmark limit fir this book. Please delete a few to add new ones")
    }
  };

  const showNotification = (message: any) => {
    setToast({ show: true, message })
    const cleartimeout = setTimeout(() => {
      setToast({ show: false, message: "" })
    }, 2000); // Hide the notification after 2 seconds
    return () => clearTimeout(cleartimeout);
  };

  const RemoveBookMark = async () => {
    let res;
    if (state?.bookDetailId) {
      res = await EpubServices.removebookmark(
        "bookmarks",
        state?.bookDetailId,
        location
      )
    }
    if (state?.kalyanDetailId) {
      res = await EpubServices.removebookmark(
        "kalyanbookmarks",
        state?.kalyanDetailId,
        location
      )
    }
    if (state?.kalpatrauDetailId) {
      res = await EpubServices.removebookmark(
        "kalyankalpatarubookmarks",
        state?.kalpatrauDetailId,
        location
      )
    }
    if (state?.magazineDetailId) {
      res = await EpubServices.removebookmark(
        "monthlymagazinebookmarks",
        state?.magazineDetailId,
        location
      )
    }
    if (state?.vivekvaniDetailId) {
      res = await EpubServices.deletevivekmark(
        "vivekvanimarks",
        state?.vivekvaniDetailId,
        location
      )
    }

    if (res?.status) {
      setSavedBookMark(!savedBookMark);
      showNotification(localStorage.getItem("lan") === "hindi"
        ? "बुकमार्क को सफलतापूर्वक हटाया गया |"
        : "Bookmark removed successfully")
    }
  }

  const getSavedBook = () => {
    if (state.bookDetailId) {
      EpubServices.getbookmark(
        "bookmarks",
        state?.bookDetailId
      ).then((res: any) => {
        if (res.status) {
          setShowBKdata(res?.result);
          {
            res.result.length > 0
              ? setLengthofbkm(true)
              : setLengthofbkm(false);
          }
        }
      });
    }
    if (state?.kalyanDetailId) {
      EpubServices.getbookmark(
        "kalyanbookmarks",
        state?.kalyanDetailId
      ).then((res: any) => {
        if (res.status) {
          setShowBKdata(res?.result);
          {
            res.result.length > 0
              ? setLengthofbkm(true)
              : setLengthofbkm(false);
          }
        }
      });
    }
    if (state?.kalpatrauDetailId) {
      EpubServices.getbookmark(
        "kalyankalpatarubookmarks",
        state?.kalpatrauDetailId
      ).then((res: any) => {
        if (res.status) {
          setShowBKdata(res?.result);
          {
            res.result.length > 0
              ? setLengthofbkm(true)
              : setLengthofbkm(false);
          }
        }
      });
    }
    if (state?.magazineDetailId) {
      EpubServices.getbookmark(
        "monthlymagazinebookmarks",
        state?.magazineDetailId,
      ).then((res: any) => {
        if (res.status) {
          setShowBKdata(res?.result);
          {
            res.result.length > 0
              ? setLengthofbkm(true)
              : setLengthofbkm(false);
          }
        }
      });
    }
    if (state?.vivekvaniDetailId) {
      EpubServices.getvivekvanimark(
        state?.vivekvaniDetailId,
      ).then((res: any) => {
        if (res.status) {
          setShowBKdata(res?.result);
          {
            res.result.length > 0
              ? setLengthofbkm(true)
              : setLengthofbkm(false);
          }
        }
      });
    }
  }

  useEffect(() => {
    getSavedBook();
  }, [savedBookMark]);

  const handleDelete = async (dataCfi: any) => {
    let res;
    if (state?.bookDetailId) {
      res = await EpubServices.removebookmark(
        "bookmarks",
        state?.bookDetailId,
        dataCfi
      )
    }
    if (state?.kalyanDetailId) {
      res = await EpubServices.removebookmark(
        "kalyanbookmarks",
        state?.kalyanDetailId,
        dataCfi
      )
    }
    if (state?.kalpatrauDetailId) {
      res = await EpubServices.removebookmark(
        "kalyankalpatarubookmarks",
        state?.kalpatrauDetailId,
        dataCfi
      )
    }
    if (state?.magazineDetailId) {
      res = await EpubServices.removebookmark(
        "monthlymagazinebookmarks",
        state?.magazineDetailId,
        dataCfi
      )
    }
    if (state?.vivekvaniDetailId) {
      res = await EpubServices.deletevivekmark(
        "vivekvanimarks",
        state?.vivekvaniDetailId,
        dataCfi)
    }

    if (res?.status) {
      setSavedBookMark(!savedBookMark)
      showNotification(localStorage.getItem("lan") === "hindi"
        ? "बुकमार्क को सफलतापूर्वक हटाया गया |"
        : "Bookmark removed successfully")
    }
  };

  const [bookName, setBookName] = useState<string>("")

  useEffect(() => {
    if (state?.bookDetailId) {
      BooksService.getCurrentBook(
        state?.bookDetailId,
        ""
      ).then((res: any) => {
        setBookName(res?.result?.name)
      });
    }
    if (state?.kalyanDetailId) {
      KalyansServices.getcurrentKalyan(
        state?.kalyanDetailId,
        ""
      ).then((res) => {
        setBookName(res?.result?.name)
      });
    }
    if (state?.kalpatrauDetailId) {
      KalpataruServices.getcurrentKalpatarul(
        state?.kalpatrauDetailId,
        ""
      ).then((res) => {
        setBookName(res?.result?.name)
      });
    }
    if (state?.magazineDetailId) {
      GeetGovindServices.getcurrentMagazine(
        state?.magazineDetailId,
        ""
      ).then((res) => {
        setBookName(res?.result?.name)
      });
    }
    if (state?.vivekvaniDetailId) {
      VivekService.VikekDetailService(
        state.vivekvaniDetailId,
        ""
      ).then((res: any) => {
        setBookName(res?.result?.name)
      });
    }
  }, [bookName]);

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
          <label id="BName" style={{ fontSize: "larger" }}>
            {bookName ? bookName : state?.bookName} : {finalName}
          </label>
        </div>

        <div className="p-2 bd-highlight col-example">
          <div style={{ flex: "100%", marginTop: "7px" }}>
            <div style={{ flex: "100%", display: "flex" }}>
              <div
                id="bookmark-list"
                style={{ border: "none" }}
                onClick={() => setShowdata(prev => !prev)}
              ></div>
              <div
                id={`bkicon  ${finalName}`}
                className={showBKdata?.find((i: any) => i?.cfi === location) ? "bookmarkicon-fill" : "bookmarkicon"}
                onClick={() => {
                  !showBKdata?.find((i: any) => i?.cfi === location) ? SaveBookMark() : RemoveBookMark();
                }}
              ></div>
              <img
                alt=""
                style={{ width: "22px" }}
                src={min}
                onClick={() => {
                  changeSize(Math.max(50, size - 10));
                }}
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
                showBKdata?.map((data: any, index: number) => {
                  return (
                    <div
                      style={{ display: "flex", justifyContent: "space-between" }}
                      key={index}
                    >
                      <li
                        className="bklistitem"
                        key={data.id}
                        onClick={() => {
                          setLocation(data?.cfi);
                          setFinalName(data?.name);
                          setShowdata(false);
                        }}
                      >
                        {data?.name}
                      </li>
                      <label
                        onClick={() => {
                          handleDelete(data?.cfi)
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
                  )
                }
                )}
            </ul>
          </div>
        ) : (
          <div style={{ display: "none", position: "relative" }}></div>
        )}
      </div>

      <div
        style={{
          // margin: "50px 40% auto",
          // padding: "10px",
          textAlign: "center",
          zIndex: 1,
          position: "absolute",
        }}
      >
        {toast.show && <div
          className="modal-content"
          style={{
            backgroundColor: "#FF8B33",
            color: "#fff",
            fontSize: "22px",
            fontFamily: "ChanakyaUni",
            margin: "0 10px",
          }}
        >{toast.message}</div>}
      </div>

      <div style={{ height: "93vh" }} className="myReader">
        <EpubReader
          location={location}
          locationChanged={locationChanged}
          // heading={(h) => setFinalName(h)}
          // subHeading={(h) => setFinalName(h)}
          //styles={ownStyles}
          //url='https://gerhardsletten.github.io/react-reader/files/alice.epub'
          url={url}
          epubInitOptions={{ requestHeaders: head }}
          tocChanged={(toc: any) => {
            // if (!finalName) setFinalName('')
            tocRef.current = toc;
          }}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.fontSize(`${size}%`);
            rendition.themes.register("custom", {
              body: {
                // background: colortheme,
                // background: colortheme,
                color:
                  CurrentTheme === "black" || "gray"
                    ? "#ffffff"
                    : "#000000",
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
