/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import HomeService from "../Services/Home";
import i18n, { _get_i18Lang } from "../i18n";
import { useTranslation } from "react-i18next";
import { useNavigate, NavLink, Link } from "react-router-dom";
import "../Styles/Home.css";
import Slider from "react-slick";
import AuthorsService from "../Services/Authors";
import bookicon from "../assets/img/book-icon.png";
import audioicon from "../assets/img/audio-icon.png";
import articleicon from "../assets/img/article-icon.png";
import DefaultBook from "../Images/defaultBook.png";
import nolyrics from "../assets/img/icons1.png";
import withlyrics from "../assets/img/icons3.png";
import artical from "../assets/img/article-icon.png";
import { ContactPage } from "./ContactPage";
import playimg from "../assets/img/vol.png";
import RabbitLyrics from "rabbit-lyrics";
import leftArrow from "../assets/img/leftArrow1.png";
import rightArrow from "../assets/img/rightArrow1.png"
import "../Styles/slick.css"
import styles from "../Styles/slick.module.css";
import facebook from "../assets/img/facebook.png";
import instagram from "../assets/img/instagram.png";
import twitter from "../assets/img/twitter.png";
import youtube from "../assets/img/youtube.png";
import IosStore from "../assets/img/ios-app.png";
import androidplaystore from "../assets/img/android-app.png";
import { ImageGroup, Image } from "react-fullscreen-image";
import WithoutLyrics from "../Images/audiolyrics.svg";
import WithLyrics from "../Images/audiowithoutlyrics.svg";
import DefaultArticle from "../Images/article.svg";
import imgdownload from "../assets/audioPlayer/img/gradient.svg";
import $ from "jquery";
import GeetGovindServices from "../Services/GeetGovind";
import KalyansServices from "../Services/Kalyan";
import KalpatsruServices from "../Services/Kalpataru";
import VivekService from "../Services/Vivekvani";
import ArticlesService from "../Services/Articles";
import BooksService from "../Services/Books";
import AudiosService from "../Services/Audios";
import DivineQuotesService from "../Services/DivineQuotes";
import Loading from "../Components/Loading";
import Spinner from "./Spinner";


interface IArticleProps {
  [x: string]: any;
  slug: string;
  name: string;
  articleContent: string;
  id: string;
  author: string;
}

const HomePage = () => {
  const audio = require("../assets/rabbitLyrics/YadaYadaHomePage.mp3");
  const text = require("../assets/defaultAudLyrics.txt");
  const [Articletcontent, setarticleContent] = useState<IArticleProps[]>([]);
  const [fetchArticle, setFetchArticle] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [banners, setbanners] = useState<Array<any> | undefined>(undefined);
  const [specialBooks, setspecialBooks] = useState<Array<any> | undefined>(
    undefined
  );
  const [quotes, setquotes] = useState<Array<any> | undefined>(
    undefined
  );

  const [specialAudios, setspecialAudios] = useState<Array<any> | undefined>(
    undefined
  );
  const [specialPravachans, setspecialPravachans] = useState<
    Array<any> | undefined
  >(undefined);
  const [allauthordata, setallauthordata] = useState<any[]>([]);
  const [specialArticles, setspecialArticles] = useState<
    Array<any> | undefined
  >(undefined);

  const [refresh, setRefresh] = useState(false);
  const [messages, setmessages] = useState<any[] | undefined>(undefined);

  const [defaultlyrics, setDefaultAudLyrics] = useState("");

  const [playing, setPlaying] = React.useState(false);
  const refAudio = React.useRef<HTMLAudioElement>(null);
  const refLrc = React.useRef<any>(null);
  const [hoverId, setHoverId] = useState<number | string>();

  const [magazineData, setMagazineData] = useState<any[] | undefined>(undefined);
  const [kalyanData, setKalyanData] = useState<any[] | undefined>(undefined);
  const [kalpatruData, setKalpatruData] = useState<any[] | undefined>(undefined);
  const [vivekVaniData, setVivekVaniData] = useState<any[] | undefined>(undefined);

  const [articlesBox, setArticlesBox] = useState<any[] | undefined>(undefined);

  const infinite = banners ? React.Children.count(banners.length) > 0 : false;
  const settings = {
    infinite,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dotsClass: "button__bar"
  };

  const settingsWithModules = {
    ...settings,
    dotsClass: styles.button__bar,
  };

  const settingsbook = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    prevArrow: <img src={leftArrow} alt="" height="40px" />,
    nextArrow: <img src={rightArrow} alt="" height="40px" />
  };

  const settingsaudio = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <img src={leftArrow} alt="" height="40px" />,
    nextArrow: <img src={rightArrow} alt="" height="40px" />
  };

  function createMarkuparticle(index: number) {
    return {
      __html: fetchArticle
        ? Articletcontent[index].messageText.length > 90
          ? Articletcontent[index].messageText.slice(0, 90) + ".."
          : Articletcontent[index].messageText
        : null,
    };
  }

  function showBannerTarget(
    bannerFor: number,
    targetId: string,
    slug: string,
    name: string
  ) {
    switch (bannerFor) {
      case 0:
        // None
        break;
      case 1:
        navigate("/books");
        break;
      case 2:
        navigate("/books/" + slug, {
          state: {
            bookId: targetId,
            bookSlug: slug,
            bookName: name
          },
        });
        break;
      case 3:
        navigate("/books/category/" + slug, {
          state: {
            catId: targetId,
            catSlug: slug,
            catName: name
          },
        });
        break;
      case 4:
        navigate("/audios");
        break;
      case 5:
        // PlayAudio(targetId);
        break;
      case 6:
        navigate("/audios/category/" + targetId);
        break;
      case 7:
        navigate("/articles");
        break;
      case 8:
        navigate("/articles/" + targetId);
        break;
      case 9:
        navigate("/articles/category/" + targetId);
        break;
      case 10:
        navigate("/message");
        break;
      case 11:
        navigate("/messageDetail/" + targetId);
        break;
      case 12:
        navigate("/author/" + slug, {
          state: {
            authorId: targetId,
            authorSlug: slug,
          },
        });
        break;
      case 13:
        navigate("/books/author/" + slug, {
          state: {
            authorId: targetId,
            authorSlug: slug,
          },
        });
        break;
      case 14:
        navigate("/audios/author/" + targetId);
        break;
      case 15:
        navigate("/articles/author/" + targetId);
        break;
      case 16:
        navigate("/books/special");
        break;
      case 17:
        navigate("/audios/special");
        break;
      case 18:
        navigate("/articles/special");
        break;
      case 19:
        navigate("/pravachans");
        break;
      case 20:
        navigate("/pravachans/" + targetId);
        break;
      case 21:
        navigate("/pravachans/category/" + targetId);
        break;
      case 22:
        navigate("/pravachans/author/" + targetId, {
          state: {
            authorId: targetId,
            authorName: name,
          },
        });
        break;
      case 23:
        navigate("/pravachans/special");
        break;
      case 24:
        navigate("/books/language/" + targetId, {
          state: {
            langId: targetId,
          },
        });
        break;
      case 25:
        navigate("/audios/language/" + targetId);
        break;
      case 26:
        navigate("/articles/language/" + targetId);
        break;
      case 27:
        navigate("/pravachans/language/" + targetId);
        break;
      case 44:
        navigate("/monthlymagazines/language/" + targetId);
        break;
      case 45:
        navigate("/monthlymagazine");
        break;
      case 46:
        navigate("/monthlymagazine/" + slug);
        break;
      case 47:
        navigate("/monthlymagazine/category/" + targetId);
        break;
      case 48:
        navigate("/monthlymagazine");
        break;
      case 49:
        navigate("/vivekvani/:cat/:langid" + slug, {
          state: {
            bookId: targetId,
            bookSlug: slug,
            bookName: name
          }
        });
        break;
      case 50:
        navigate("/vivekvani/special" + slug, {
          state: {
            bookId: targetId,
            bookSlug: slug,
            bookName: name
          }
        });
        break;
      case 51:
        navigate("/vivekvani/author/:id" + slug, {
          state: {
            bookId: targetId,
            bookSlug: slug,
            bookName: name
          }
        });
        break;
      case 52:
        navigate("/vivekvani");
        break;
      default:
        break;
    }
  }

  function activetab(PId: string) {
    $("#nav-tab > button").removeClass("active");
    $("#" + PId + "-tab").addClass("active");
    $("#nav-tabContent > div").removeClass("show active");
    $("#" + PId).addClass("show active");
  }

  useEffect(() => {
    setRefresh(false);
    ArticlesService.getArticles(
      10,
      20,
      false,
      "",
      "",
      "",
      "",
      "",
      window.location.pathname === "/articles/special" ? true : false
    ).then((res) => {
      if (res.status)
        setArticlesBox(res.result?.items);
      // setarticleContent(res.result.items);
    });
  }, [refresh, i18n.language]);

  const filteredItems = articlesBox?.filter
    (item => item.id === "5d78ecc0e42a7838149ecb29" || item.id === "5d78ea81e42a7838149ecb23" || item.id === "5cb1cb25e3fbda2174b7f26c")
  // .sort((a, b) => b.name.localeCompare(a.name));

  useEffect(() => {
    HomeService.getHomeData(_get_i18Lang(), "").then((res) => {
      if (res?.status) {
        setbanners(res.result?.banners);
        setspecialBooks(res.result?.specialBooks);
        setspecialAudios(res.result?.specialAudios);
        setspecialPravachans(res.result?.specialPravachans);
        setspecialArticles(res.result?.specialArticles);
      }
    });
  }, [refresh, i18n.language]);

  const [isLoading, setLoading] = useState(false);
  const [booklength, setBookLength] = useState("")
  const [audiosLength, setAudiosLength] = useState("")
  const [pravachansLength, setPravachansLength] = useState("")
  const [articleLength, setArticleLength] = useState("")
  const [divineQuoteLength, setDivineLength] = useState("")

  useEffect(() => {
    setLoading(true);
    BooksService.getBooks(
      0,
      1000,
      false,
      "",
      "",
      "",
      "", //sort
      "",
      window.location.pathname === "/books/special" ? true : false
    ).then((res: any) => {
      if (res.status) {
        setBookLength(res.result?.items?.length);
      }
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setLoading(true);
    AudiosService.getAudios(
      0,
      10000,
      false,
      "",
      "",
      "",
      "",
      "",
      window.location.pathname === "/audios/special" ? true : false,
      "audios",
      0,
      "",
      "",
      ""
    ).then((res: any) => {
      if (res.status) setAudiosLength(res.result?.items?.length);
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    AudiosService.getAudios(
      0,
      15000,
      false,
      "",
      "",
      "",
      "0",
      "",
      window.location.pathname === "/pravachans/special" ? true : false,
      "pravachans",
      0,
      "",
      "",
      ""
    ).then((res: any) => {
      if (res.status) setPravachansLength(res?.result?.items?.length)
    });
  }, [refresh, i18n.language, pravachansLength]);

  useEffect(() => {
    setRefresh(false);
    ArticlesService.getArticles(
      0,
      1000,
      false,
      "",
      "",
      "",
      "",
      "",
      window.location.pathname === "/articles/special" ? true : false
    ).then((res) => {
      if (res.status) setArticleLength(res.result?.items?.length);
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    DivineQuotesService.getDivineQuotes(
      "",
      0,
      10000,
    ).then((res) => {
      if (res?.status) {
        setDivineLength(res.result?.items?.length);
      }
    });
  }, [refresh]);


  useEffect(() => {
    HomeService.getQuotesData(0, 6).then((res: any) => {
      if (res?.status) {
        setquotes(res?.result?.items)
      }
    })
  }, [])

  useEffect(() => {
    setRefresh(false);
    AuthorsService.getAuthorData("", 3).then((res) => {
      if (res.status) {
        setallauthordata(res?.result);
      }
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    HomeService.getMessage(_get_i18Lang(), 0, 3).then((res) => {
      if (res.status) {
        setmessages(res.result?.items);
        // setarticleContent(res.result.items);
        setFetchArticle(true);
      }
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    fetch(text)
      .then((response) => response?.text())
      .then((textContent) => {
        var lyrics = textContent.replace(/\[[^\]]+\]/g, "").trim();
        setDefaultAudLyrics(lyrics);
      });
  }, [defaultlyrics]);

  useEffect(() => {
    if (refLrc.current) {
      new RabbitLyrics(refLrc.current, refAudio.current as any);
    }
  }, []);

  useEffect(() => {
    setRefresh(false);
    GeetGovindServices.getMonthlyMagazine(
      0,
      5,
      false,
      "",
      "",
      "",
      "0", //sort
      "",
      window.location.pathname === "/books/special" ? true : false
    ).then((res) => {
      if (res?.status) {
        setMagazineData(res.result?.items);
      }
    })
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    KalyansServices.getKalyans(
      0,
      5,
      false,
      "",
      "",
      "",
      "0", //sort
      "",
      window.location.pathname === "/kalyans/special" ? true : false
    ).then((res) => {
      if (res) {
        setKalyanData(res.result?.items);
      }
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    KalpatsruServices.getKalyansKalpataru(
      0,
      5,
      false,
      "",
      "",
      "",
      "0", //sort
      "",
      window.location.pathname === "/books/special" ? true : false
    ).then((res) => {
      if (res) {
        setKalpatruData(res.result?.items);
      }
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    VivekService.getVanis(
      0,
      5,
      "",
      false,
      "2",
      "",
      "",
      "",
      window.location.pathname === "/vivekvani/special" ? true : false
    ).then((res) => {
      if (res.status) {
        setVivekVaniData(res.result?.items);
      }
    });
  }, [refresh, i18n.language]);

  const [saveActivtab, setSaveActivetab] = useState("")

  useEffect(() => {
    const storedItem = localStorage.getItem('currentActivtab');
    if (storedItem) {
      if (storedItem === "e-books") {
        activetab("e-books")
      }
      else if (storedItem === "audios") {
        activetab("audios")
      }
      else if (storedItem === "pravachans") {
        activetab("pravachans")
      }
      else if (storedItem === "articles") {
        activetab("articles")
      }
      else if (storedItem === "divine-quotes") {
        activetab("divine-quotes")
      }
      else if (storedItem === "magazine") {
        activetab("magazine")
      }
    }
  }, [activetab]);

  return (
    <>
      <div
        className="breadcrumbs-head newcontainer"
        style={{
          display: "none",
          width: "100%",
          marginTop: "-175px",
          background: "none",
          backgroundColor: "#ffedbc",
          height: "240px",
          borderBottom: "2px solid #fff",
        }}
      >
        <div
          className="containers"
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "rgb(209, 21, 1)",
            // marginLeft: "15%",
            top: "155px",
          }}
        >
          <div
            style={{
              fontSize: "19px",
              fontWeight: 600,
              color: "#2d2a29",
              marginTop: "-8px",
            }}
          >
            <span style={{ marginRight: "8px", color: "#2d2a29" }}>
              {t("Home_tr")}
            </span>
          </div>
        </div>
      </div>

      <div className="section1">
        <div className="gst-homebg-image">
          <div>
            <div className="containers">
              <div className="row" style={{ padding: "75px 0 0 0" }}>
                <div id="homeslider" className="main-slider col-8">
                  <div className="bannerwidth">
                    <Slider {...settings}>
                      {banners && banners.length > 0
                        ? banners.map((banner: any) => (
                          <div
                            key={banner.id}
                            style={{
                              height: "332px",
                              border: "1px solid #f3e2e2",
                              padding: "15px",
                              borderRadius: "6px",
                            }}
                            onClick={() => {
                              showBannerTarget(
                                banner.bannerFor,
                                banner.targetId,
                                banner.slug,
                                banner.name
                              );
                            }}
                          >
                            <div>
                              <a>
                                <img
                                  className="imgcenter bannerimg"
                                  src={
                                    banner == null
                                      ? banner
                                      : banner.bannerPath
                                  }
                                  onError={(e) => {
                                    e.currentTarget.src = banner;
                                  }}
                                  alt={banner.name}
                                  title={banner.name}
                                />
                              </a>
                            </div>
                          </div>
                        ))
                        : ""}
                    </Slider>
                    <div
                      className="parentBox"
                    >
                      <div
                        className="bgImg audioBox1"
                        style={{
                          backgroundColor: "#ffc72f",
                        }}
                      >
                        <div
                          id="audio1"
                          style={{ margin: "70px 15px 0 -10px" }}
                        >
                          {playing ? (
                            <img
                              id="startIcon"
                              src={playimg}
                              alt="playimg"
                              style={{
                                color: "rgb(255, 233, 172)",
                                fontSize: "33px",
                                cursor: "pointer",
                                margin: "15px 0px 0px 22px",
                                paddingTop: "25%",
                              }}
                              onClick={() => {
                                refAudio.current?.pause();
                                // stopHomeAudio(2);
                              }}
                            />
                          ) : (
                            <i
                              id="stopIcon"
                              className="fa fa-play-circle"
                              style={{
                                color: "rgb(255, 233, 172)",
                                fontSize: "33px",
                                cursor: "pointer",
                                margin: "15px 0 0 22px",
                                paddingTop: "18%",
                              }}
                              onClick={() => {
                                refAudio.current?.play();
                                // stopHomeAudio(1);
                              }}
                            ></i>
                          )}
                        </div>
                        <audio
                          ref={refAudio}
                          id="audios01"
                          onPlay={() => {
                            setPlaying(true);
                          }}
                          onPause={() => {
                            setPlaying(false);
                          }}
                          src={audio}
                        />
                        <div
                          ref={refLrc}
                          data-audio="#audio1"
                          className="lyrics lyrics-enabled"
                          style={{
                            cursor: "pointer",
                            padding: "18px 11px 0 10px",
                          }}
                        >
                          {defaultlyrics
                            ?.replace(/\r/g, "")
                            ?.split("\n")
                            ?.map((l: any) => {
                              return <span key={l?.id} style={{ fontSize: 23 }}>{l}</span>;
                            })}
                        </div>
                      </div>
                      <div
                        className="audioBox2"
                      >
                        <div
                          className="partTwoDiv"
                          id="div22"
                          style={{
                            overflowY: "hidden",
                            fontSize: "24px",
                            fontFamily: "ChanakyaUni",
                          }}
                        >
                          <div
                            className="line"
                            id="lineDiv1"
                            data-start="2.48"
                            data-end="52.00"
                          >
                            कंस और चाणूरका वध करने वाले, देवकीके आनन्दवर्धन,
                            वसुदेवनन्दन जगद्गुरु श्रीकृष्णचन्द्रकी मैं वन्दना
                            करता हूँ। <br />
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv2"
                            data-start="52.00"
                            data-end="94.31"
                          >
                            मैं अजन्मा और अविनाशी स्वरूप होते हुए भी तथा समस्त
                            प्राणियोंका ईश्वर होते हुए भी अपनी प्रकृतिको अधीन
                            करके अपनी योगमायासे प्रकट होता हूँ।
                            <br />
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv3"
                            data-start="94.31"
                            data-end="133.51"
                          >
                            हे भारत! जब-जब धर्मकी हानि और अधर्मकी वृद्धि होती
                            है, तब-तब ही मैं अपने रूपको रचता हूँ अर्थात्
                            साकाररूपसे लोगोंके सम्मुख प्रकट होता हूँ।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv4"
                            data-start="133.51"
                            data-end="171.84"
                          >
                            साधु पुरुषोंका उद्धार करनेके लिये, पाप-कर्म
                            करनेवालोंका विनाश करनेके लिये और धर्मकी अच्छी तरहसे
                            स्थापना करनेके लिये मैं युग-युगमें प्रकट हुआ करता
                            हूँ।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv5"
                            data-start="171.84"
                            data-end="208.98"
                          >
                            हे अर्जुन! मेरे जन्म और कर्म दिव्य अर्थात् निर्मल और
                            अलौकिक हैं—इस प्रकार जो मनुष्य तत्त्वसे जान लेता है,
                            वह शरीरको त्यागकर फिर जन्मको प्राप्त नहीं होता,
                            किंतु मुझे ही प्राप्त होता है।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv6"
                            data-start="208.98"
                            data-end="245.46"
                          >
                            पहले भी, जिनके राग, भय और क्रोध सर्वथा नष्ट हो गये
                            थे और जो मुझमें अनन्यप्रेमपूर्वक स्थित रहते थे, ऐसे
                            मेरे आश्रित रहनेवाले बहुत-से भक्त उपर्युक्त ज्ञानरूप
                            तपसे पवित्र होकर मेरे स्वरूपको प्राप्त हो चुके हैं।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv7"
                            data-start="245.46"
                            data-end="289.86"
                          >
                            कंस और चाणूरका वध करने वाले, देवकीके आनन्दवर्धन,
                            वसुदेवनन्दन जगद्गुरु श्रीकृष्णचन्द्रकी मैं वन्दना
                            करता हूँ।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv8"
                            data-start="289.86"
                            data-end="306.91"
                          >
                            हरे राम हरे राम राम राम हरे हरे
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv9"
                            data-start="306.91"
                            data-end="Infinity"
                          >
                            हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-4"
                  style={{ float: "right", marginTop: "-6%" }}
                >
                  <div className="homepagebg"></div>
                  <h2 className="messageheader">
                    {t("Article_tr")}
                  </h2>
                  <div className="messagebox"
                  >
                    <div>
                      {filteredItems?.map((article: any, index: number) => {
                        return (

                          <div key={article.id}>
                            <div
                              style={{
                                height: "90px",
                                overflow: "hidden",
                                marginBottom: "5px",
                              }}
                            >
                              <div className="p-list">
                                <div
                                  className="p-head-line"
                                  style={{ cursor: "pointer", marginTop: "15px" }}
                                >
                                  <div
                                    onClick={() => {
                                      navigate(`/articles/` + article.slug, {
                                        state: { articleId: article.id, articleSlug: article?.slug },
                                      });

                                    }}
                                  >
                                    {article.name != null &&
                                      article.name.length > 31
                                      ? article.name.slice(0, 30) + ".."
                                      : article.name}
                                  </div>
                                </div>
                                {/* {article?.articleContent.length > 100 
                                  ? Articletcontent[index].messageText.slice(0, 90) + ".."
                                  : Articletcontent[index].messageText
                                } */}
                                <p
                                  style={{
                                    margin: "0 0 6px 0",
                                    borderBottom: "none",
                                    paddingBottom: "0px",
                                    color: "black",
                                    fontWeight: "500"
                                  }}
                                  dangerouslySetInnerHTML={{ __html: article?.articleContent }}
                                // dangerouslySetInnerHTML={createMarkuparticle(
                                //   index
                                // )}
                                ></p>
                              </div>
                            </div>
                            <div
                              style={{
                                borderBottom: "1px solid #e4d1a9",
                              }}
                            >
                              <p style={{ textAlign: "right" }}>
                                <p
                                  style={{
                                    cursor: "pointer",
                                    color: " #9c4439",
                                    margin: 0,
                                    borderBottom: "none",
                                  }}
                                  onClick={() => {
                                    navigate(`/articles/` + article.slug, {
                                      state: { articleId: article.id, articleSlug: article?.slug },
                                    });
                                  }}
                                >
                                  {t("Read_More_tr")}
                                </p>
                              </p>
                            </div>
                          </div>

                        )
                      }
                      )}
                      <div
                        className="p-subbutton">
                        <div
                          className="btnSubmit"
                          onClick={() => {
                            navigate(`/articles/`);
                          }}
                        >
                          {t("SeeAll_tr")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="messagebottom"></div>
                </div>
              </div>

              {/* महापुरुष परिचय */}

              <div style={{ margin: "3% 0" }}>
                <div style={{ backgroundColor: "#fff0d0", paddingTop: "30px" }}>
                  <h2 className="specialtitle">
                    {t("Legends_Introduction_tr")}
                  </h2>
                  <div
                    className="row"
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    {allauthordata && allauthordata.length > 0
                      ? allauthordata.map((author: any) => (
                        <div key={author?.name} className="col-4 introbox">
                          <h2
                            onClick={() => {
                              navigate(`/author/` + author?.slug, {
                                state: {
                                  authorId: author.id,
                                  authorName: author.name,
                                  authorSlug: author.slug
                                },
                              });
                            }}
                          >
                            {author?.name}
                          </h2>
                          <div
                            className="pravachan-audio-list"
                            style={{
                              backgroundColor: "#fff",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigate(`/books/author/` + author?.slug, {
                                state: {
                                  authorId: author.id,
                                  authorName: author?.name,
                                  authorSlug: author?.slug
                                },
                              });
                            }}
                          >
                            <img alt="bookicon" src={bookicon} />
                            <p className="">{t("E_books_tr")}</p>
                          </div>
                          <div
                            className="pravachan-audio-list"
                            style={{
                              backgroundColor: "#ffcd44",
                            }}
                            onClick={() => {
                              navigate(`/audios/author/` + author?.slug, {
                                state: {
                                  authorId: author.id,
                                  authorName: author?.name,
                                  authorSlug: author?.slug,
                                  type: "audios"
                                },
                              });
                            }}
                          >
                            <img alt="audioicon" src={audioicon} />
                            <p>{t("Audios_tr")}</p>
                          </div>
                          <div
                            className="pravachan-audio-list"
                            style={{
                              backgroundColor: "#ffcd44",
                            }}
                            onClick={() => {
                              navigate(`/pravachans/author/` + author?.slug, {
                                state: {
                                  authorId: author.id,
                                  authorName: author?.name,
                                  authorSlug: author?.slug,
                                },
                              });
                            }}
                          >
                            <img alt="pravachanicon" src={audioicon} />
                            <p>{t("Pravachan_tr")}</p>
                          </div>
                          <div
                            className="pravachan-audio-list"
                            style={{
                              backgroundColor: "#fff",
                            }}
                            onClick={() => {
                              navigate(`/articles/author/` + author.slug, {
                                state: {
                                  authorId: author.id,
                                  authorName: author?.name,
                                  authorSlug: author?.slug
                                },
                              });
                            }}
                          >
                            <img alt="articleicon" src={articleicon} />
                            <p>{t("Article_tr")}</p>
                          </div>
                        </div>
                      ))
                      : ""}
                  </div>
                  <div
                    style={{
                      borderBottom: "4px solid rgb(209, 21, 1)",
                      margin: "-4px 0 0 18px",
                      width: "97%",
                      paddingTop: "55px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="service-tabs clearfix">
          <div className="container">
            <div className="homeNav">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="e-books-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#e-books"
                    type="button"
                    role="tab"
                    aria-controls="e-books"
                    aria-selected="true"
                    onClick={() => {
                      setSaveActivetab("e-books")
                      localStorage.setItem("currentActivtab", "e-books")
                      // activetab("e-books");
                    }}
                  >
                    {t("E_books_tr")}
                  </button>
                  <button
                    className="nav-link"
                    id="audios-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#audios"
                    type="button"
                    role="tab"
                    aria-controls="audios"
                    aria-selected="false"
                    onClick={() => {
                      setSaveActivetab("audios")
                      localStorage.setItem("currentActivtab", "audios")
                      // activetab("audios");
                    }}
                  >
                    {t("Audios_tr")}
                  </button>
                  <button
                    className="nav-link"
                    id="pravachans-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#pravachans"
                    type="button"
                    role="tab"
                    aria-controls="pravachans"
                    aria-selected="false"
                    onClick={() => {
                      setSaveActivetab("pravachans")
                      localStorage.setItem("currentActivtab", "pravachans")
                      // activetab("pravachans");
                    }}
                  >
                    {t("Pravachan_tr")}
                  </button>
                  <button
                    className="nav-link"
                    id="articles-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#articles"
                    type="button"
                    role="tab"
                    aria-controls="articles"
                    aria-selected="false"
                    onClick={() => {
                      setSaveActivetab("articles")
                      localStorage.setItem("currentActivtab", "articles")
                      // activetab("articles");
                    }}
                  >
                    {t("Article_tr")}
                  </button>
                  <button
                    className="nav-link"
                    id="divine-quotes-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#divine-quotes"
                    type="button"
                    role="tab"
                    aria-controls="divine-quotes"
                    aria-selected="false"
                    onClick={() => {
                      setSaveActivetab("divine-quotes")
                      localStorage.setItem("currentActivtab", "divine-quotes")
                      // activetab("divine-quotes");
                    }}
                  >
                    {t("Amrit_Vachan_tr")}
                  </button>
                  <button
                    className="nav-link"
                    id="magazine-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#magazine"
                    type="button"
                    role="tab"
                    aria-controls="magazine"
                    aria-selected="false"
                    onClick={() => {
                      setSaveActivetab("magazine")
                      localStorage.setItem("currentActivtab", "magazine")
                      // activetab("magazine");
                    }}
                  >
                    {t("magazine_tr")}
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="e-books"
                  role="tabpanel"
                  style={{ overflow: "hidden" }}
                  aria-labelledby="e-books-tab"
                >
                  <div className="tab-row">
                    <div className="tabscroll">
                      {specialBooks?.map((specialbook) => {
                        return (
                          <div
                            className="tab-col"
                            key={specialbook.id}
                          >
                            <div
                              className="tab-data-audios"
                              style={{ cursor: "pointer" }}
                            >
                              <a
                                onClick={() => {
                                  // navigate(`/books/special/` + specialbook.slug, {
                                  //   state: {
                                  //     bookId: specialbook.id,
                                  //     bookName: specialbook.name,
                                  //     bookSlug: specialbook?.slug,
                                  //     pathname: window.location?.pathname,
                                  //   },
                                  // });
                                  navigate(`/books/` + specialbook.slug, {
                                    state: {
                                      bookId: specialbook.id,
                                      bookName: specialbook.name,
                                      bookSlug: specialbook?.slug,
                                      // pathname: window.location?.pathname,
                                    },
                                  });
                                }}
                              >
                                <img
                                  style={{
                                    borderRadius: "5px",
                                  }}
                                  className="img-fluid"
                                  src={specialbook.bookThumbPath || DefaultBook}
                                  onError={(e) => {
                                    e.currentTarget.src = DefaultBook;
                                  }}
                                  alt="E-books"
                                  title={specialbook.name}
                                  width="150"
                                  height="212"
                                />
                                <p
                                  className="mb-0 mt-3"
                                  style={{ cursor: "pointer" }}
                                >
                                  {specialbook.name != null &&
                                    specialbook.name.length > 30
                                    ? specialbook.name.slice(0, 15) + "..."
                                    : specialbook.name}
                                  {/* {specialbook.name} */}
                                </p>
                              </a>
                            </div>
                          </div>
                        )
                      }
                      )}
                    </div>
                  </div>
                  <div className="text-center" style={{ margin: "0 41% auto" }}>
                    <Link
                      // to={`/books/special`}
                      to={`/books`}
                      className="view-service-btn"
                      style={{
                        color: "#3D2B31",
                        backgroundColor: "#ff4e2a",
                        borderRadius: "5px",
                        // color: "#fff",
                        cursor: "pointer",
                        fontFamily: "ChanakyaUni",
                        fontSize: "22px",
                        // padding: "5px 12px",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "35px"
                      }}
                    >
                      {/* {t("All_Special_E_books_tr")} */}
                      {t("view_all_tr")}
                      {/* {booklength ?
                        <Spinner />
                        : */}
                      <p style={{
                        margin: "0px 8px",
                        fontWeight: 600
                      }}>{booklength}</p>
                      {/* } */}
                      {t("E_books_tr")}
                    </Link>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="audios"
                  style={{ overflow: "hidden" }}
                  role="tabpanel"
                  aria-labelledby="audios-tab"
                >

                  <div className="tab-row">
                    <div className="tabscroll">
                      {specialAudios?.map((specialaudio, index: number) => {
                        return (
                          <div
                            className="tab-col"
                            key={specialaudio.id}
                          >
                            <div
                              className="tab-data-audios"
                              style={{ cursor: "pointer" }}
                            >
                              <a
                                onClick={() => {
                                  localStorage.setItem("type", "audios");
                                  //navigate(`/audios/${audio.id}`);
                                  navigate(`/audios/${specialaudio.slug}`, {
                                    state: {
                                      audioId: specialaudio.id,
                                      audioslug: specialaudio.slug,
                                      sorting: "0",
                                      index: index,
                                    },
                                  });
                                }}
                              >
                                <img
                                  src={
                                    specialaudio.lyricsHash != null
                                      ? WithLyrics
                                      : WithoutLyrics
                                  }
                                  onError={(e) => {
                                    e.currentTarget.src = WithoutLyrics;
                                  }}
                                  style={{ cursor: "pointer" }}
                                  alt="E-books"
                                  title={specialaudio.name}
                                  onClick={() => {
                                    navigate(`/audios/${specialaudio.slug}`, {
                                      state: {
                                        audioId: specialaudio.id,
                                        audioslug: specialaudio.slug,
                                        sorting: "0",
                                        index: index,
                                      },
                                    });
                                  }}
                                  className="img-fluid"
                                />
                                <p
                                  className="mb-0 mt-3 text-break"
                                  style={{ cursor: "pointer" }}
                                >
                                  {specialaudio.name != null &&
                                    specialaudio.name.length > 25
                                    ? specialaudio.name.slice(0, 20) + "..."
                                    : specialaudio.name}
                                  {/* {specialaudio.name} */}
                                </p>
                              </a>
                            </div>
                          </div>
                        )
                      }
                      )}
                    </div>
                  </div>

                  <div className="text-center" style={{ margin: "0 40% auto" }}>
                    <Link
                      // to={`/audios/special`}
                      to={`/audios`}
                      className="view-service-btn"
                      style={{
                        color: "#3D2B31",
                        backgroundColor: "#ff4e2a",
                        borderRadius: "5px",
                        // color: "#fff",
                        cursor: "pointer",
                        fontFamily: "ChanakyaUni",
                        fontSize: "22px",
                        // padding: "5px 12px",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "35px"
                      }}
                    >
                      {t("view_all_tr")}
                      {/* {audiosLength ?
                        <Spinner />
                        : */}
                      <p style={{
                        margin: " 0px 8px",
                        fontWeight: 600
                      }}>{audiosLength}</p>
                      {/* } */}
                      {t("Audios_tr")}
                      {/* {t("All_Special_Audios_tr")} */}
                    </Link>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="pravachans"
                  style={{ overflow: "hidden" }}
                  role="tabpanel"
                  aria-labelledby="pravachans-tab"
                >
                  <div className="tab-row ">
                    <div className="tabscroll">
                      {specialPravachans?.map(
                        (specialpravachan, index: number) => {
                          return (
                            <div
                              className="tab-col"
                              key={specialpravachan.id}
                            >
                              <div
                                className="tab-data-audios"
                                style={{ cursor: "pointer" }}
                              >
                                <a
                                  onClick={() => {
                                    localStorage.setItem("type", "pravachans");
                                    //navigate(`/audios/${audio.id}`);
                                    navigate(
                                      `/audios/${specialpravachan.slug}`,
                                      {
                                        state: {
                                          audioId: specialpravachan.id,
                                          audioslug: specialpravachan.slug,
                                          sorting: "0",
                                          index: index,
                                        },
                                      }
                                    );
                                  }}
                                >
                                  <img
                                    className="img-fluid"
                                    src={
                                      specialpravachan.lyricsHash != null
                                        ? WithLyrics
                                        : WithoutLyrics
                                    }
                                    onError={(e) => {
                                      e.currentTarget.src = WithoutLyrics;
                                    }}
                                    alt="E-books"
                                    title={specialpravachan.name}
                                    onClick={() => {
                                      //navigate(`/audios/${audio.id}`);
                                      navigate(
                                        `/pravachans/${specialpravachan.slug}`,
                                        {
                                          state: {
                                            pravachanId: specialpravachan.id,
                                            pravachanslug:
                                              specialpravachan.slug,
                                            sorting: "0",
                                            index: index,
                                          },
                                        }
                                      );
                                    }}
                                  />
                                  <p
                                    className="mb-0 mt-3"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {specialpravachan.name != null &&
                                      specialpravachan.name.length > 30
                                      ? specialpravachan.name.slice(0, 15) +
                                      "..."
                                      : specialpravachan.name}
                                    {/* {specialpravachan.name} */}
                                  </p>
                                </a>
                              </div>
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>

                  <div className="text-center" style={{ margin: "0 40% auto" }}>                    
                    <Link
                      to={`/pravachans`}
                      // to={`/pravachans/special`}
                      className="view-service-btn"
                      style={{
                        color: "#3D2B31",
                        backgroundColor: "#ff4e2a",
                        borderRadius: "5px",
                        // color: "#fff",
                        // cursor: pravachansLength ? "no-drop" : "pointer",
                        fontFamily: "ChanakyaUni",
                        fontSize: "22px",
                        // padding: "5px 12px",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "35px"
                      }}
                    >
                      {t("view_all_tr")}
                      {pravachansLength ?
                        <Spinner />
                        :
                        < p style={{
                          margin: "0px 8px",
                          fontWeight: 600
                        }}>{pravachansLength}</p>
                      }
                      {t("Pravachan_tr")}
                      {/* {t("All_Special_Pravachan_tr")} */}
                    </Link>

                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="articles"
                  style={{ overflow: "hidden" }}
                  role="tabpanel"
                  aria-labelledby="articles-tab"
                >
                  <div className="tab-row" style={{ display: "flex", padding: "20px 0 35px 0" }}>
                    {/* <div className="tabscroll"> */}
                    {specialArticles?.map((specialarticle) => {
                      return (
                        <div
                          className="tab-col"
                          key={specialarticle.id}
                        >
                          <div
                            className="tab-data-audios"
                            style={{ cursor: "pointer" }}
                          >
                            <a
                              onClick={() => {
                                navigate(`/articles/special/` + specialarticle.slug, {
                                  state: {
                                    articleId: specialarticle.id,
                                    articleName: specialarticle.name,
                                    articleSlug: specialarticle?.slug,
                                    special: window.location.pathname
                                  },
                                });
                              }}
                            >
                              <img
                                className="img-fluid"
                                src={
                                  (specialarticle.lyricsHash = DefaultArticle)
                                }
                                onError={(e) => {
                                  e.currentTarget.src = DefaultArticle;
                                }}
                                alt="E-books"
                                title={specialarticle.name}
                              />
                              <p className="mb-0 mt-3">
                                {specialarticle.name.length > 50 ? ".." : ""}
                                {specialarticle.name}
                              </p>
                            </a>
                          </div>
                        </div>
                      )
                    }
                    )}
                  </div>

                  <div className="text-center" style={{ margin: "0 40% auto" }}>
                    <Link
                      to={`/articles`}
                      // to={`/articles/special`}
                      className="view-service-btn"
                      style={{
                        color: "#3D2B31",
                        backgroundColor: "#ff4e2a",
                        borderRadius: "5px",
                        // color: "#fff",
                        cursor: "pointer",
                        fontFamily: "ChanakyaUni",
                        fontSize: "22px",
                        // padding: "5px 12px",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "35px"
                      }}
                    >
                      {t("view_all_tr")}
                      {/* {articleLength ?
                        <Spinner /> : */}
                      <p style={{
                        margin: " 0px 8px",
                        fontWeight: 600
                      }}>{articleLength}</p>
                      {/* } */}
                      {t("Article_tr")}
                      {/* {t("All_Special_Article_tr")} */}
                    </Link>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="divine-quotes"
                  role="tabpanel"
                  // style={{ overflow: "hidden" }}
                  aria-labelledby="divine-quotes-tab"
                >
                  <div
                    className="gst-page-content "
                    style={{ gridGap: "26px !important" }}
                  >
                    <ImageGroup>
                      <ul className="images bgcolor">
                        {quotes
                          ?.slice(0, 4)
                          ?.map((divquote: any, index: number) => {
                            return (
                              <li key={divquote?.id}>
                                <Image
                                  src={divquote?.quotesPath}
                                  alt="image"
                                  style={{ width: "90%" }}
                                  onMouseEnter={() => {
                                    setHoverId(index);
                                  }}
                                  onMouseLeave={() => setHoverId("")}
                                />
                                {hoverId === index && (
                                  <a
                                    onMouseEnter={() => {
                                      setHoverId(index);
                                    }}
                                    onMouseLeave={() => setHoverId("")}
                                    id="download"
                                    href={
                                      `${process.env.REACT_APP_API_URL}/api/Quotes/` +
                                      divquote.id +
                                      "/quote?t=" +
                                      "&download_attachment=true"
                                    }
                                    title="Download"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <img
                                      alt="imgdownload"
                                      src={imgdownload}
                                      className="img-fluid"
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        margin: "10px",
                                      }}
                                    />
                                  </a>
                                )}
                              </li>
                            )
                          }
                          )}
                      </ul>
                    </ImageGroup>
                  </div>
                  <div className="text-center" style={{ margin: "30px 39% auto" }}>
                    <Link
                      to={`/divinequote`}
                      className="view-service-btn"
                      style={{
                        color: "#3D2B31",
                        backgroundColor: "#ff4e2a",
                        borderRadius: "5px",
                        // color: "#fff",
                        cursor: "pointer",
                        fontFamily: "ChanakyaUni",
                        fontSize: "22px",
                        // padding: "5px 12px",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "35px"
                      }}
                    >
                      {t("view_all_tr")}
                      <p style={{
                        margin: " 0px 8px",
                        fontWeight: 600
                      }}>
                        {divineQuoteLength}
                      </p>
                      {t("Amrit_Vachan_tr")}
                    </Link>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="magazine"
                  style={{ overflow: "hidden" }}
                  role="tabpanel"
                  aria-labelledby="magazine-tab"
                >
                  <div className="tab-row" style={{
                    textAlign: "center", display: "flex", justifyContent: "center", padding: "20px 0 35px 0"
                  }}>
                    {magazineData?.slice(0, 1)?.map((geetgovind) => {
                      return (
                        <div
                          className="tab-col"
                          key={geetgovind.id}
                        >
                          <div
                            className="tab-data-magazine"
                          >
                            <a
                              onClick={() => {
                                navigate(`/monthlymagazine`)
                              }}
                            >
                              <img
                                className="img-fluid"
                                src={
                                  (geetgovind.monthlyMagazinePath)
                                }
                                onError={(e) => {
                                  e.currentTarget.src = DefaultArticle;
                                }}
                                alt="geetgovind"
                                title={geetgovind.name}
                                style={{ borderRadius: "5px", width: "150px", height: "212px" }}
                              />
                              <p className="mb-0 mt-3" style={{ fontFamily: "ChanakyaUniBold", fontSize: "20px", lineHeight: "22px", textAlign: "center" }}>
                                {geetgovind.name.length > 50 ? ".." : ""}
                                {geetgovind.name}
                              </p>
                            </a>
                          </div>
                        </div>
                      )
                    }
                    )}
                    {kalyanData?.slice(0, 1)?.map((kalyan) => {
                      return (
                        <div
                          className="tab-col"
                          key={kalyan.id}
                        >
                          <div
                            className="tab-data-magazine"
                            style={{ cursor: "pointer" }}
                          >
                            <a
                              onClick={() => {
                                navigate(`/kalyans`);
                              }}
                            >
                              <img
                                className="img-fluid"
                                src={
                                  (kalyan.kalyanThumbPath)
                                }
                                onError={(e) => {
                                  e.currentTarget.src = DefaultArticle;
                                }}
                                alt="kalyan"
                                title={kalyan.name}
                                style={{ borderRadius: "5px", width: "150px", height: "212px" }}
                              />
                              <p className="mb-0 mt-3" style={{ fontFamily: "ChanakyaUniBold", fontSize: "20px", lineHeight: "22px", textAlign: "center" }}>
                                {kalyan.name.length > 50 ? ".." : ""}
                                {kalyan.name}
                              </p>
                            </a>
                          </div>
                        </div>
                      )
                    })}
                    {kalpatruData?.slice(0, 1)?.map((kalpatru) => {
                      return (
                        <div
                          className="tab-col"
                          key={kalpatru.id}
                        >
                          <div
                            className="tab-data-magazine"
                            style={{ cursor: "pointer" }}
                          >
                            <a
                              onClick={() => {
                                navigate(`/kalyanskalpataru`);
                              }}
                            >
                              <img
                                className="img-fluid"
                                src={
                                  (kalpatru.kalyanKalpataruThumbPath)
                                }
                                onError={(e) => {
                                  e.currentTarget.src = DefaultArticle;
                                }}
                                alt="kalpatru"
                                title={kalpatru.name}
                                style={{ borderRadius: "5px", width: "150px", height: "212px" }}
                              />
                              <p className="mb-0 mt-3" style={{ fontFamily: "ChanakyaUniBold", fontSize: "20px", lineHeight: "22px", textAlign: "center" }}>
                                {kalpatru.name.length > 50 ? ".." : ""}
                                {kalpatru.name}
                              </p>
                            </a>
                          </div>
                        </div>
                      )
                    })}
                    {vivekVaniData?.slice(0, 1)?.map((vivekvani) => {
                      return (
                        <div
                          className="tab-col"
                          key={vivekvani.id}
                        >
                          <div
                            className="tab-data-magazine"
                            style={{ cursor: "pointer" }}
                          >
                            <a
                              onClick={() => {
                                navigate(`/vivekvani`);
                              }}
                            >
                              <img
                                className="img-fluid"
                                src={
                                  (vivekvani.vivekVaniThumbPath)
                                }
                                onError={(e) => {
                                  e.currentTarget.src = DefaultArticle;
                                }}
                                alt="vivekvani"
                                title={vivekvani.name}
                                style={{ borderRadius: "5px", width: "150px", height: "212px" }}
                              />
                              <p className="mb-0 mt-3" style={{ fontFamily: "ChanakyaUniBold", fontSize: "20px", lineHeight: "22px", textAlign: "center" }}>
                                {vivekvani.name.length > 50 ? ".." : ""}
                                {vivekvani.name}
                              </p>
                            </a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {/* <div className="text-center" style={{ margin: "25px 0 25px 0" }}>
                    <Link
                      to={`/articles`}
                      className="view-service-btn"
                      style={{
                        color: "#3D2B31",
                        backgroundColor: "#ff4e2a",
                        borderRadius: "5px",
                        // color: "#fff",
                        cursor: "pointer",
                        fontFamily: "ChanakyaUni",
                        fontSize: "22px",
                        padding: "5px 12px",
                      }}
                    >
                      {t("All_Special_Article_tr")}
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section >


        {/* विशेष ई-पुस्तकें */}

        {/* <div
          className="newcontainer"
          style={{ margin: "2% 0 0", height: "550px" }}
        >
          <div className="containers">
            <h2 className="specialtitle">{t("Special_E_books_tr")}</h2>
            <div
              className="row"
            >
              <Slider {...settingsbook}>
                {specialBooks && specialBooks.length > 0
                  ? specialBooks.map((specialBook) => (
                    <div
                      className="sliderbooks"
                      key={`related-${specialBook.id}`}
                      onClick={() => {
                        navigate(`/books/special/` + specialBook.slug, {
                          state: {
                            bookId: specialBook.id,
                            bookName: specialBook.name,
                            bookSlug: specialBook?.slug,
                            pathname: window.location?.pathname,
                          },
                        });
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <a>
                          <img
                            style={{ cursor: "pointer" }}
                            className="imgcenter"
                            src={
                              specialBook.bookThumbPath == null
                                ? DefaultBook
                                : specialBook.bookThumbPath
                            }
                            onError={(e) => {
                              e.currentTarget.src = DefaultBook;
                            }}
                            alt={specialBook.name}
                            title={specialBook.name}
                            width="150"
                            height="212"
                          />
                          <p>{specialBook?.name}</p>
                        </a>
                      </div>
                    </div>
                  ))
                  : ""}
              </Slider>
            </div>
            <div
              style={{
                margin: "auto",
                width: "200px",
                padding: "10px",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              <div
                style={{ padding: "5px 12px" }}
                className="btnSubmit"
                onClick={() => {
                  navigate(`/books/special`);
                }}
              >
                {t("All_Special_E_books_tr")}
              </div>
            </div>
          </div>
        </div> */}

        {/* विशेष ऑडियो */}

        {/* <div
          className="newcontainer"
          style={{
            marginTop: "0px",
            backgroundColor: "#fff6e1",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <div className="containers">
            <h2 className="specialtitle">{t("Special_Audios_tr")}</h2>
            <div className="row">
              <Slider {...settingsaudio}>
                {specialAudios && specialAudios.length > 0
                  ? specialAudios.map((specialAudio) => (
                    <div
                      key={`related-${specialAudio.id}`}
                      onClick={() => {
                        localStorage.setItem("type", "audios");
                        navigate(`/audios/` + specialAudio.slug, {
                          state: {
                            audioId: specialAudio.id,
                            audioName: specialAudio?.name,
                            audioslug: specialAudio.slug,
                          },
                        });
                        window.location.reload();
                      }}
                    >
                      <div
                        className="pravchanslider"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "0 10px",
                        }}
                      >
                        <a
                          style={{
                            margin: "0px 10px",
                            height: "115px",
                            color: "rgb(63, 34, 13)",
                            fontSize: "18px",
                            lineHeight: "22px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            overflow: "hidden",
                            textAlign: "center",
                          }}
                        >
                          {specialAudio.lyricsHash != null ? (
                            <img
                              style={{
                                cursor: "pointer",
                                width: "60px",
                                margin: "5px auto auto",
                              }}
                              className="imgcenter"
                              src={withlyrics}
                              alt={specialAudio.name}
                              title={specialAudio.name}
                            />
                          ) : (
                            <img
                              style={{
                                cursor: "pointer",
                                width: "60px",
                                margin: "5px auto auto",
                              }}
                              className="imgcenter"
                              src={nolyrics}
                              alt={specialAudio.name}
                              title={specialAudio.name}
                            />
                          )}

                          <p>{specialAudio.name}</p>
                        </a>
                      </div>
                    </div>
                  ))
                  : ""}
              </Slider>
            </div>
            <div
              style={{
                margin: "auto",
                width: "197px",
                padding: "10px",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              <div
                style={{ padding: "5px 12px" }}
                className="btnSubmit"
                onClick={() => {
                  navigate(`/audios/special`);
                }}
              >
                {t("All_Special_Audios_tr")}
              </div>
            </div>
          </div>
        </div> */}

        {/* विशेष प्रवचन */}

        {/* <div
          className="newcontainer"
          style={{
            marginTop: "0px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <div className="containers">
            <h2 className="specialtitle">{t("Special_Pravachan_tr")}</h2>
            <div className="row">
              <Slider {...settingsaudio}>
                {specialPravachans && specialPravachans.length > 0
                  ? specialPravachans.map((specialPravachan) => (
                    <div
                      key={`related-${specialPravachan.id}`}
                      onClick={() => {
                        localStorage.setItem("type", "pravachans");
                        navigate(`/pravachans/` + specialPravachan.id, {
                          state: {
                            audioId: specialPravachan.id,
                            audioslug: specialPravachan.name,
                          },
                        });
                        window.location.reload();
                      }}
                    >
                      <div
                        className="pravchanslider"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "0 10px",
                        }}
                      >
                        <a
                          style={{
                            margin: "0px 10px",
                            height: "115px",
                            color: "rgb(63, 34, 13)",
                            fontSize: "18px",
                            lineHeight: "22px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            overflow: "hidden",
                            textAlign: "center",
                          }}
                        >
                          {specialPravachan.lyricsHash != null ? (
                            <img
                              style={{
                                cursor: "pointer",
                                width: "60px",
                                margin: "5px auto auto",
                              }}
                              className="imgcenter"
                              src={withlyrics}
                              alt={specialPravachan.name}
                              title={specialPravachan.name}
                            />
                          ) : (
                            <img
                              style={{
                                cursor: "pointer",
                                width: "60px",
                                margin: "5px auto auto",
                              }}
                              className="imgcenter"
                              src={nolyrics}
                              alt={specialPravachan.name}
                              title={specialPravachan.name}
                            />
                          )}

                          <p>{specialPravachan?.name}</p>
                        </a>
                      </div>
                    </div>
                  ))
                  : ""}
              </Slider>
            </div>
            <div
              style={{
                margin: "auto",
                width: "250px",
                padding: "10px",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              <div
                className="btnSubmit"
                onClick={() => {
                  navigate(`/pravachans/special`);
                }}
              >
                {t("All_Special_Pravachan_tr")}
              </div>
            </div>
          </div>
        </div> */}

        {/* विशेष अनमोल लेख */}

        {/* <div
          className="newcontainer"
          style={{
            marginTop: "0px",
            backgroundColor: "#fff6e1",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <div className="containers">
            <h2 className="specialtitle">{t("Special_Article_tr")}</h2>
            <div className="row">
              <Slider {...settingsaudio}>
                {specialArticles && specialArticles.length > 0
                  ? specialArticles.map((specialArticle) => (
                    <div
                      key={`related-${specialArticle.id}`}
                      onClick={() => {
                        navigate(`/articles/special/` + specialArticle.slug, {
                          state: {
                            articleId: specialArticle.id,
                            articleName: specialArticle.name,
                            articleSlug: specialArticle?.slug,
                            special: window.location.pathname
                          },
                        });
                        window.location.reload();
                      }}
                    >
                      <div
                        className="pravchanslider"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "#fff",
                          height: "121px",
                          margin: "0 10px",
                        }}
                      >
                        <a>
                          <img
                            style={{
                              cursor: "pointer",
                              width: "28px",
                              height: "34px",
                              margin: "5px auto auto",
                            }}
                            className="imgcenter"
                            src={artical}
                            alt={specialArticle.name}
                            title={specialArticle.name}
                          />
                          <p style={{ marginTop: "10px" }}>
                            {specialArticle?.name}
                          </p>
                        </a>
                      </div>
                    </div>
                  ))
                  : ""}
              </Slider>
            </div>
            <div
              style={{
                margin: "auto",
                width: "230px",
                padding: "10px",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              <div
                className="btnSubmit"
                onClick={() => {
                  navigate(`/articles/special`);
                }}
              >
                {t("All_Special_Article_tr")}
              </div>
            </div>
          </div>
        </div> */}

        <div
          className="newcontainer"
          style={{ backgroundColor: "#fff0ce", marginTop: 0, paddingBottom: "40px" }}
        >
          <div className="containers">
            <ContactPage />
          </div>
        </div>
      </div >
    </>
  )
};
export default HomePage;
