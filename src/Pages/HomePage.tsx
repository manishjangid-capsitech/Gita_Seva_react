/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
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
import { ContactPage } from "./ContactPage";
import RabbitLyrics from "rabbit-lyrics";
import leftArrow from "../assets/img/leftArrow1.png";
import rightArrow from "../assets/img/rightArrow1.png"
import "../Styles/slick.css"
import styles from "../Styles/slick.module.css";
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
import Spinner from "./Spinner";
import LyricsComponent from "../Components/LyricsComponent";
import geethindi from "../Images/Geet-Govind-Hindi-Cover.jpg";
import geetenglish from "../Images/Geet-Govind-English-Cover.jpg";
import kalyancover from "../Images/Kalyan-Cover.jpg"
import kalpatrucover from "../Images/Kalyana-Kalpataru-Cover.jpg"
import VivekvaniCover from "../Images/Vivek-vani-cover.jpg"
import { Specialmagzine } from "./LogInoutModel";


interface IArticleProps {
  [x: string]: any;
  slug: string;
  name: string;
  articleContent: string;
  id: string;
  author: string;
}

const HomePage = () => {
  const text = require("../assets/defaultAudLyrics.txt");
  const [Articletcontent, setarticleContent] = useState<IArticleProps[] | any>([]);
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

  const [playing, setPlaying] = useState(false);
  const refAudio = useRef<HTMLAudioElement>(null);
  const refLrc = useRef<any>(null);
  const [hoverId, setHoverId] = useState<number | string>();


  const [fetchArticle, setFetchArticle] = useState(false);
  const [articlesBox, setArticlesBox] = useState<any[] | undefined>(undefined);

  const [isLoading, setLoading] = useState(false);
  const [booklength, setBookLength] = useState("")
  const [audiosLength, setAudiosLength] = useState("")
  const [pravachanLength, setPravachanLength] = useState<any>("")
  const [articleLength, setArticleLength] = useState("")
  const [divineQuoteLength, setDivineLength] = useState("")

  const infinite = banners ? React.Children.count(banners?.length) > 0 : false;
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

  function createMarkuparticle(index: number) {
    return {
      __html: fetchArticle
        ? Articletcontent[index]?.articleContent?.length > 90
          ? Articletcontent[index]?.articleContent?.slice(0, 150) + ".."
          // ? Articletcontent[index]?.articleContent?.slice(233, 400) + ".."
          : Articletcontent[index]?.articleContent
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
        navigate("/geetgovind");
        break;
      case 46:
        navigate("/geetgovind/" + slug);
        break;
      case 47:
        navigate("/geetgovind/category/" + targetId);
        break;
      case 48:
        navigate("/geetgovind");
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
      if (res.status) {
        setArticlesBox(res?.result?.items?.filter
          ((item: any) => item.id === "5d78ecc0e42a7838149ecb29" || item.id === "5d78ea81e42a7838149ecb23" || item.id === "5cb1cb25e3fbda2174b7f26c"));
        setarticleContent(res?.result?.items?.filter
          ((item: any) => item.id === "5d78ecc0e42a7838149ecb29" || item.id === "5d78ea81e42a7838149ecb23" || item.id === "5cb1cb25e3fbda2174b7f26c"));
        setFetchArticle(true);
      }
    });
  }, [refresh, i18n.language]);

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
      false,
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
      "",
      "",
      false,
      "pravachans",
      0,
      "",
      "",
      ""
    ).then((res: any) => {
      if (res.status)
        setPravachanLength(res?.result?.items?.length)
    });
  }, [refresh, i18n.language, pravachanLength]);

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
    DivineQuotesService.getDivineQuotes("", 0, 2000).then((res: any) => {
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

  const [saveActivtab, setSaveActivetab] = useState("")

  useEffect(() => {
    const storedItem = localStorage.getItem('currentActivetab');
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
                    <LyricsComponent />
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
                      {articlesBox?.map((article: any, index: number) => {
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
                                  <div style={{ fontSize: "22px" }}
                                    onClick={() => {
                                      navigate(`/articles/` + article.slug, {
                                        state: { articleId: article.id, articleSlug: article?.slug },
                                      });

                                    }}
                                  >
                                    {article.name != null &&
                                      article.name.length > 100
                                      ? article.name.slice(50, 60) + ".."
                                      : article.name}
                                  </div>
                                </div>
                                <p
                                  style={{
                                    margin: "0 0 6px 0",
                                    borderBottom: "none",
                                    paddingBottom: "0px",
                                    color: "#3f220d",
                                  }}
                                  className="htmlContent"
                                  dangerouslySetInnerHTML={createMarkuparticle(
                                    index
                                  )}
                                ></p>
                              </div>
                            </div>
                            <div
                              style={{
                                borderBottom: "1px solid #e4d1a9",
                              }}
                            >
                              <p style={{ textAlign: "right" }}>
                                <a
                                  style={{
                                    cursor: "pointer",
                                    color: " #9c4439",
                                    margin: 0,
                                    borderBottom: "none",
                                    fontSize: "18px"
                                  }}
                                  onClick={() => {
                                    navigate(`/articles/` + article.slug, {
                                      state: { articleId: article.id, articleSlug: article?.slug },
                                    });
                                  }}
                                >
                                  {t("Read_More_tr")}
                                </a>
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
                            navigate(`/articles`);
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
                              localStorage.setItem("type", "audios")
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
                              localStorage.setItem("type", "pravachans")
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
                <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{ display: "flex", justifyContent: "space-around" }}>
                  <button
                    className="nav-link"
                    id="e-books-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#e-books"
                    type="button"
                    role="tab"
                    aria-controls="e-books"
                    aria-selected="true"
                    onClick={() => {
                      setSaveActivetab("e-books")
                      localStorage.setItem("currentActivetab", "e-books")
                      // activetab("e-books");
                    }}
                  >
                    {t("E_books_tr")}
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
                      localStorage.setItem("currentActivetab", "magazine")
                      // activetab("magazine");
                    }}
                  >
                    {t("magazine_tr")}
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
                      localStorage.setItem("currentActivetab", "audios")
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
                      localStorage.setItem("currentActivetab", "pravachans")
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
                      localStorage.setItem("currentActivetab", "articles")
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
                      localStorage.setItem("currentActivetab", "divine-quotes")
                      // activetab("divine-quotes");
                    }}
                  >
                    {t("Amrit_Vachan_tr")}
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
                      {t("all_tr")}

                      <p style={{
                        margin: "0px 8px"
                      }}>{booklength}</p>
                      {t("E_books_tr")}
                      <p style={{ margin: "0 0 0 10px" }}>{t("view_tr")}</p>
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
                      {specialAudios && specialAudios.length > 0 && specialAudios?.map((specialaudio, index: number) => {
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
                      {t("all_tr")}
                      <p style={{
                        margin: " 0px 8px"
                      }}>{audiosLength}</p>
                      {t("Audios_tr")}
                      <p style={{ margin: "0 0 0 10px" }}>{t("view_tr")}</p>
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
                        // cursor: pravachanLength ? "no-drop" : "pointer",
                        fontFamily: "ChanakyaUni",
                        fontSize: "22px",
                        // padding: "5px 12px",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "35px"
                      }}
                    >
                      {t("all_tr")}
                      {/* {pravachanLength ?
                        <h6>...</h6> : */}
                      <p style={{
                        margin: "0px 8px"
                      }}>{pravachanLength}</p>
                      {/* } */}
                      {t("Pravachan_tr")}
                      <p style={{ margin: "0 0 0 10px" }}>{t("view_tr")}</p>
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
                      {t("all_tr")}
                      {/* {articleLength ?
                        <Spinner /> : */}
                      <p style={{
                        margin: "0px 8px"
                      }}>{articleLength}</p>
                      {/* } */}
                      {t("Article_tr")}
                      <p style={{ margin: "0 0 0 10px" }}>{t("view_tr")}</p>
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
                      <ul className="images bgcolor" style={{
                        // width: "90%",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gridGap: "20px",
                        listStyle: "inside",
                        margin: 0,
                        padding: 0,
                        height: "180px"
                      }}>
                        {quotes
                          ?.slice(0, 5)
                          ?.map((divquote: any, index: number) => {
                            return (
                              <li key={divquote?.id}>
                                <Image
                                  src={divquote?.quotesPath}
                                  alt="image"
                                  style={{ width: "80%" }}
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
                      to={`/divinequotes`}
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
                        marginBottom: "35px",
                        marginTop: "50px"
                      }}
                    >
                      {t("all_tr")}
                      <p style={{
                        margin: "0px 8px"
                      }}>
                        {divineQuoteLength}
                      </p>
                      {t("Amrit_Vachan_tr")}
                      <p style={{ margin: "0 0 0 10px" }}>{t("view_tr")}</p>
                    </Link>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="magazine"
                  role="tabpanel"
                  aria-labelledby="magazine-tab"
                  style={{ overflow: "hidden" }}
                >
                  <div className="tab-row"
                    style={{
                      textAlign: "center", display: "flex", justifyContent: "center", padding: "20px 0 35px 0"
                    }}>

                    <Specialmagzine
                      magzinetitle={t("MonthlyMagazine_lang_hindi_tr")}
                      clickevent={() => {
                        navigate(`/geetgovind`, {
                          state: {
                            language: "hindi"
                          }
                        })
                      }}
                      magzinecoverimage={geethindi} />

                    <Specialmagzine
                      magzinetitle={t("MonthlyMagazine_lang_english_tr")}
                      clickevent={() => {
                        navigate(`/geetgovind`, {
                          state: {
                            language: "english"
                          }
                        })
                      }}
                      magzinecoverimage={geetenglish} />

                    <Specialmagzine
                      magzinetitle={t("Kalyan_lang_tr")}
                      clickevent={() => {
                        navigate(`/kalyan`);
                      }}
                      magzinecoverimage={kalyancover} />

                    <Specialmagzine
                      magzinetitle={t("Kalpataru_lang_tr")}
                      clickevent={() => {
                        navigate(`/kalyanakalpataru`);
                      }}
                      magzinecoverimage={kalpatrucover} />

                    <Specialmagzine
                      magzinetitle={t("vivek_vani_lang_tr")}
                      clickevent={() => {
                        navigate(`/vivekvani`);
                      }}
                      magzinecoverimage={VivekvaniCover} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >
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
