/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import HomeService from "../Services/Home";
import i18n, { _get_i18Lang } from "../i18n";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
            special: window.location.pathname,
          },
        });
        break;
      case 3:
        navigate("/books/category/" + targetId, {
          state: {
            catId: targetId,
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
        navigate("/author/ +", {
          state: {
            authorId: targetId,
          },
        });
        break;
      case 13:
        navigate("/books/author/" + targetId, {
          state: {
            authorId: targetId,
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
        navigate("/vivekvani" + targetId);
        break;
      case 50:
        navigate("/vivekvani/special" + slug);
        break;
      case 51:
        navigate("/vivekvani/author/:id" + targetId);
        break;
      case 52:
        navigate("/vivekvani/:cat/:langid" + targetId);
        break;
      case 53:
        navigate("/vivekvani/" + targetId, {
          state: {
            vivekId: targetId,
            vivekName: name,
          },
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    HomeService.getHomeData(_get_i18Lang(), "").then((res) => {
      if (res) {
        setbanners(res.result?.banners);
        setspecialBooks(res.result?.specialBooks);
        setspecialAudios(res.result?.specialAudios);
        setspecialPravachans(res.result?.specialPravachans);
        setspecialArticles(res.result?.specialArticles);
      }
    });
  }, [refresh, i18n.language]);

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
        setarticleContent(res.result.items);
        setFetchArticle(true);
      }
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    fetch(text)
      .then((response) => response?.text())
      .then((textContent) => {
        var lyrics = textContent.replace(/\[[^\]]+\]/g, "").trim();
        // console.log(lyrics);
        setDefaultAudLyrics(lyrics);
      });
  }, [defaultlyrics]);

  useEffect(() => {
    if (refLrc.current) {
      new RabbitLyrics(refLrc.current, refAudio.current as any);
    }
  }, []);

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
                            key={`banner-${banner.id}`}
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
                                stopHomeAudio(2);
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
                                stopHomeAudio(1);
                              }}
                            ></i>
                          )}
                        </div>
                        <audio
                          ref={refAudio}
                          id="audios"
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
                    {t("AmritVachan_tr")}
                  </h2>
                  <div className="messagebox"
                  >
                    <div>
                      {messages?.map((message: any, index: number) => (
                        <div key={`message-${message.id}`}>
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
                                    navigate(`/messages/` + message.slug, {
                                      state: { messageId: message.id },
                                    });
                                  }}
                                >
                                  {message.name != null &&
                                    message.name.length > 31
                                    ? message.name.slice(0, 30) + ".."
                                    : message.name}
                                </div>
                              </div>
                              <p
                                style={{
                                  margin: "0 0 6px 0",
                                  borderBottom: "none",
                                  paddingBottom: "0px",
                                }}
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
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: " #9c4439",
                                  margin: 0,
                                  borderBottom: "none",
                                }}
                                onClick={() => {
                                  navigate(`/messages/` + message.slug, {
                                    state: { messageId: message.id },
                                  });
                                }}
                              >
                                {t("Read_More_tr")}
                              </p>
                            </p>
                          </div>
                        </div>
                      ))}
                      <div
                        className="p-subbutton">
                        <div
                          className="btnSubmit"
                          onClick={() => {
                            navigate(`/messages/`);
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
                              navigate(`/author/` + author?.id, {
                                state: {
                                  authorId: author.id,
                                  authorName: author.name,
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
                              navigate(`/books/author/` + author?.id, {
                                state: {
                                  authorId: author.id,
                                  authorName: author?.name,
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
                              navigate(`/audios/author/` + author.id, {
                                state: {
                                  authorId: author.id,
                                  authorName: author?.name,
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
                              navigate(`/pravachans/author/` + author.id, {
                                state: {
                                  authorId: author.id,
                                  authorName: author?.name,
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
                              navigate(`/articles/author/` + author.id, {
                                state: {
                                  authorId: author.id,
                                  authorName: author?.name,
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

        {/* विशेष ई-पुस्तकें */}

        <div
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
                        navigate(`/books/special/` + specialBook.id, {
                          state: {
                            bookId: specialBook.id,
                            bookName: specialBook.name,
                            pathname: window.location?.pathname,
                          },
                        });
                        window.location.reload();
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
        </div>

        {/* विशेष ऑडियो */}

        <div
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
                        navigate(`/audios/` + specialAudio.id, {
                          state: {
                            audioId: specialAudio.id,
                            audioslug: specialAudio.name,
                          },
                        });
                        window.location.reload();
                      }}
                    >
                      <div
                        className="pravchanBox"
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
        </div>

        {/* विशेष प्रवचन */}

        <div
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
                        className="pravchanBox"
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
        </div>

        {/* विशेष अनमोल लेख */}

        <div
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
                        navigate(`/articles/special/` + specialArticle.id, {
                          state: {
                            articleId: specialArticle.id,
                            articleName: specialArticle.name,
                            special: window.location.pathname
                          },
                        });
                        window.location.reload();
                      }}
                    >
                      <div
                        className="pravchanBox"
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
        </div>
        <div
          className="newcontainer"
          style={{ backgroundColor: "#fff0ce", marginTop: 0, height: "510px" }}
        >
          <div className="containers">
            <ContactPage />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
