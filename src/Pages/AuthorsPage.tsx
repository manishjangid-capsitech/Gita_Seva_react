/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import AuthorService from "../Services/Authors";
import DefaultBook from "../Images/defaultBook.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Authors.css";
import i18n, { _get_i18Lang } from "../i18n";
import { useTranslation } from "react-i18next";
import Loading from "../Components/Loading";
import bookicon from "../assets/img/book-icon.png";
import audioicon from "../assets/img/audio-icon.png";
import articleicon from "../assets/img/article-icon.png";
import pravachanIcon from "../assets/img/audio-icon3.png";
import Slider from "react-slick";
import nolyrics from "../assets/img/icons1.png";
import withlyrics from "../assets/img/icons3.png";
import artical from "../assets/img/article-icon.png";

const AuthorsDataPage = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const settingsAudio = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const settingsArticle = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [autId, setAutId] = useState<any>("");
  const [name, setName] = useState("");
  const [authorIntro, setAuthorIntro] = useState<any>({
    __html: "",
  });
  const [books, setBooks] = useState<Array<any> | undefined>(undefined);
  const [audios, setAudios] = useState<Array<any> | undefined>(undefined);
  const [pravachans, setPravachans] = useState<Array<any> | undefined>(
    undefined
  );
  const [articles, setArticles] = useState<Array<any> | undefined>(undefined);

  const location = useLocation();
  const state = location.state as { authorId: string };

  function createMarkup() {
    return { __html: authorIntro.__html };
  }
  useEffect(() => {
    if (location.state) {
      setAutId(state?.authorId);
    }
  }, [autId, location.state, state?.authorId, refresh]);

  useEffect(() => {
    setRefresh(false);
    AuthorService.GetAuthorDataById(state?.authorId, "").then(
      (res) => {
        if (res) {
          setName(res?.result?.name);
          setAuthorIntro({ __html: res?.result?.authorContent });
          setBooks(res?.result?.books);
          setPravachans(res?.result?.pravachans);
          setAudios(res?.result?.audios);
          setArticles(res?.result?.articles);
        }
      }
    );
  }, [refresh, i18n.language, autId]);

  return (
    <div style={{ backgroundColor: "#fff6e1" }}>
      <div
        className="breadcrumbs-head newcontainer"
        style={{
          width: "100%",
          marginTop: "-175px",
          background: "none",
          backgroundColor: "#ffedbc",
          height: "240px",
          borderBottom: "2px solid #fff",
          paddingTop: 0
        }}
      >
        <div className="breadcrumbs">
          <div
            className="containers"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "rgb(209, 21, 1)",
              marginLeft: "14%",
              top: "155px",
            }}
          >
            {t("Legends_Introduction_tr")}
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
              <label> / {t("Legends_Introduction_tr")}</label>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 0 50px" }}>
        <div
          className="containers"
          style={{
            padding: "30px 30px 50px 40px",
            marginLeft: "14%",
            background: "#fffaf0",
            boxShadow: "0 0 7px 1px #ece8dd",
            borderRadius: "2px",
            height: "100%",
          }}
        >
          <div className="row">
            <div className="col-lg-8" style={{ padding: 0 }}>
              <h5
                style={{
                  fontSize: "40px",
                  color: "#212529",
                  margin: "0 0 8px 0",
                  fontWeight: 500,
                }}
              >
                {name}
              </h5>
              {authorIntro && authorIntro.__html.length > 0 ? (
                <p
                  style={{
                    fontSize: "24px",
                    fontFamily: "font-weight: 500;",
                    color: "#3f22od",
                    margin: "0 0 16px 0",
                  }}
                  dangerouslySetInnerHTML={createMarkup()}
                ></p>
              ) : (
                <div className="ebooks-category resultnotfound">
                  <Loading />
                  {t("result_not_found_tr")}
                </div>
              )}
            </div>
            <div
              className="col-4 introbox"
              style={{ display: "grid", height: 0 }}
            >
              <div
                className="cat"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/books/author/` + autId, {
                    state: {
                      authorId: autId,
                      authorName: name
                    },
                  });
                }}
              >
                <img alt="bookicon" src={bookicon} />
                <a>{t("E_books_tr")}</a>
              </div>
              <div
                className="cat"
                onClick={() => {
                  navigate(`/audios/author/` + autId, {
                    state: {
                      authorId: autId,
                      authorName: name
                    },
                  });
                }}
                style={{
                  background:
                    "linear-gradient(to bottom, #ffedbc 0%, #fffcf4 100% )",
                  cursor: "pointer",
                }}
              >
                <img alt="audioicon" src={audioicon} />
                <a>{t("Audios_tr")}</a>
              </div>
              <div
                className="cat"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/pravachans/author/` + autId, {
                    state: {
                      authorId: autId,
                      authorName: name

                    },
                  });
                }}
              >
                <img alt="pravachanicon" src={pravachanIcon} />
                <a>{t("Pravachan_tr")}</a>
              </div>
              <div
                className="cat"
                onClick={() => {
                  navigate(`/articles/author/` + autId, {
                    state: {
                      authorId: autId,
                      authorName: name
                    },
                  });
                }}
                style={{
                  background:
                    "linear-gradient(to bottom, #ffedbc 0%, #fffcf4 100% )",
                  cursor: "pointer",
                }}
              >
                <img alt="articleicon" src={articleicon} />
                <a>{t("Article_tr")}</a>
              </div>
            </div>
          </div>

          {/* विशेष ई-पुस्तकें */}

          <div style={{ marginTop: "5%" }}>
            <div>
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                  marginBottom: "35px",
                  fontFamily: "ChanakyaUni",
                }}
                className="boxheadtitle"
              >
                {t("E_books_tr")}
              </h2>
              <div className="row" style={{ width: "100%" }}>
                <Slider {...settings}>
                  {books && books.length > 0
                    ? books.map((book) => (
                        <div
                          className="sliderbooks"
                          key={`related-${book.id}`}
                          onClick={() => {
                            navigate(`/books/` + book.slug, {
                              state: {
                                bookId: book.id,
                                bookName: book.name,
                              },
                            });
                            window.location.reload();
                          }}
                        >
                          <div>
                            <a>
                              <img
                                style={{ cursor: "pointer" }}
                                className="imgcenter"
                                src={
                                  book.bookThumbPath == null
                                    ? DefaultBook
                                    : book.bookThumbPath
                                }
                                onError={(e) => {
                                  e.currentTarget.src = DefaultBook;
                                }}
                                alt={book.name}
                                title={book.name}
                                width="150"
                                height="212"
                              />
                              <p>{book?.name}</p>
                            </a>
                          </div>
                        </div>
                      ))
                    : ""}
                </Slider>
              </div>
              <div
                style={{
                  margin: "30px 42% auto",
                  width: "158px",
                  padding: "10px",
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                <div
                  className="btnSubmit"
                  style={{
                    fontFamily: "ChanakyaUni",
                    fontSize: "22px",
                    padding: "6px 0",
                  }}
                  onClick={() => {
                    navigate(`/books/author/` + autId, {
                      state: {
                        authorId: autId, authorName: name
                      },
                    });
                  }}
                >
                  {t("All_e_books_tr")}
                </div>
              </div>
            </div>
          </div>

          {/* विशेष ऑडियो */}

          <div
            style={{
              marginTop: "0px",
              paddingTop: "50px",
            }}
          >
            <div>
              <h2
                className="boxheadtitle"
                style={{
                  textAlign: "center",
                  fontFamily: "ChanakyaUni",
                  fontSize: "30px",
                }}
              >
                {t("Audios_tr")}
              </h2>
              {audios && audios.length > 5 ? (
                <div className="row" style={{ width: "100%" }}>
                  <Slider {...settingsAudio}>
                    {audios.map((audio) => (
                      <div
                        key={`related-${audio.id}`}
                        onClick={() => {
                          navigate(`/audios/` + audio.slug, {
                            state: {
                              bookId: audio.id,
                              bookName: audio.name,
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
                          <a>
                            {audio.lyricsHash != null ? (
                              <img
                                style={{
                                  cursor: "pointer",
                                  width: "60px",
                                  margin: "5px auto auto",
                                }}
                                className="imgcenter"
                                src={withlyrics}
                                alt={audio.name}
                                title={audio.name}
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
                                alt={audio.name}
                                title={audio.name}
                              />
                            )}

                            <p
                              style={{
                                margin: "0 10px",
                                height: "65px",
                                color: "#3f220d",
                                fontSize: "18px",
                                lineHeight: "22px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                overflow: "hidden",
                                textAlign: "center",
                              }}
                            >
                              {audio?.name}
                            </p>
                          </a>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <div
                  className="row"
                  style={{ width: "100%", left: "1%", position: "relative" }}
                >
                  {audios?.map((audio) => (
                    <div
                      key={`related-${audio.id}`}
                      onClick={() => {
                        navigate(`/audios/` + audio.slug, {
                          state: {
                            bookId: audio.id,
                            bookName: audio.name,
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
                          padding: "10px 0 35px 0",
                        }}
                      >
                        <a>
                          <img
                            style={{
                              cursor: "pointer",
                              width: "60px",
                              margin: "5px auto auto",
                            }}
                            className="imgcenter"
                            src={withlyrics}
                            alt={audio.name}
                            title={audio.name}
                          />
                          <p>{audio?.name}</p>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                  className="btnSubmit"
                  style={{
                    fontFamily: "ChanakyaUni",
                    fontSize: "22px",
                  }}
                  onClick={() => {
                    navigate(`/audios/author/` + autId, {
                      state: {
                        authorId: autId, authorName: name
                      },
                    });
                  }}
                >
                  {t("All_audios_tr")}
                </div>
              </div>
            </div>
          </div>

          {/* विशेष प्रवचन */}

          <div
            style={{
              marginTop: "0px",
              padding: "50px 0",
            }}
          >
            <div>
              <h2
                className="boxheadtitle"
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                  margin: "10px 0px 35px",
                  fontFamily: "ChanakyaUni",
                }}
              >
                {t("Pravachan_tr")}
              </h2>
              <div className="row" style={{ width: "100%" }}>
                <Slider {...settingsAudio}>
                  {pravachans && pravachans.length > 0
                    ? pravachans.map((pravachan) => (
                        <div
                          key={`related-${pravachan.id}`}
                          onClick={() => {
                            navigate(`/audios/` + pravachan.slug, {
                              state: {
                                bookId: pravachan.id,
                                bookName: pravachan.name,
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
                            <a>
                              {pravachan.lyricsHash != null ? (
                                <img
                                  style={{
                                    cursor: "pointer",
                                    width: "60px",
                                    margin: "5px auto auto",
                                  }}
                                  className="imgcenter"
                                  src={withlyrics}
                                  alt={pravachan.name}
                                  title={pravachan.name}
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
                                  alt={pravachan.name}
                                  title={pravachan.name}
                                />
                              )}

                              <p
                                style={{
                                  margin: "0 10px",
                                  height: "65px",
                                  color: "#3f220d",
                                  fontSize: "18px",
                                  lineHeight: "22px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  overflow: "hidden",
                                  textAlign: "center",
                                }}
                              >
                                {pravachan?.name}
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
                  width: "225px",
                  padding: "10px",
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                <div
                  className="btnSubmit"
                  style={{ fontFamily: "ChanakyaUni", fontSize: "22px" }}
                  onClick={() => {
                    navigate(`/pravachans/author/` + autId, {
                      state: {
                        authorId: autId, authorName: name
                      },
                    });
                  }}
                >
                  {t("All_Special_Pravachan_tr")}
                </div>
              </div>
            </div>
          </div>

          {/* विशेष अनमोल लेख */}

          <div
            style={{
              marginTop: "0px",
              paddingTop: "50px",
            }}
          >
            <div>
              <h2
                className="boxheadtitle"
                style={{
                  fontFamily: "ChanakyaUni",
                  fontSize: "30px",
                  textAlign: "center",
                }}
              >
                {t("Article_tr")}
              </h2>
              {articles && articles.length > 5 ? (
                <div
                  className="row"
                  style={{ width: "100%", left: "1%", position: "relative" }}
                >
                  <Slider {...settingsAudio}>
                    {articles?.map((article) => (
                      <div
                        key={`related-${article.id}`}
                        onClick={() => {
                          navigate(`/audios/` + article.slug, {
                            state: {
                              bookId: article.id,
                              bookName: article.name,
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
                            marginRight: "15px",
                          }}
                        >
                          <a>
                            <img
                              style={{
                                cursor: "pointer",
                                width: "28px",
                                height: "34px",
                                margin: "10px auto",
                              }}
                              className="imgcenter"
                              src={artical}
                              alt={article.name}
                              title={article.name}
                            />
                            <p
                              style={{
                                color: "#3f220d",
                                fontSize: "18px",
                                lineHeight: "27px",
                                margin: "20px 0 0",
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontFamily: "ChanakyaUni",
                              }}
                            >
                              {article?.name}
                            </p>
                          </a>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <div
                  className="row"
                  style={{ width: "100%", left: "1%", position: "relative" }}
                >
                  <Slider {...settingsArticle}>
                    {articles?.map((article) => (
                      <div
                        key={`related-${article.id}`}
                        onClick={() => {
                          navigate(`/audios/` + article.slug, {
                            state: {
                              bookId: article.id,
                              bookName: article.name,
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
                            marginRight: "15px",
                          }}
                        >
                          <a>
                            <img
                              style={{
                                cursor: "pointer",
                                width: "28px",
                                height: "34px",
                                margin: "10px auto",
                              }}
                              className="imgcenter"
                              src={artical}
                              alt={article.name}
                              title={article.name}
                            />
                            <p
                              style={{
                                color: "#3f220d",
                                fontSize: "18px",
                                lineHeight: "27px",
                                margin: "20px 0 0",
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontFamily: "ChanakyaUni",
                              }}
                            >
                              {article?.name}
                            </p>
                          </a>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
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
                  className="btnSubmit"
                  style={{ fontFamily: "ChanakyaUni", fontSize: "22px" }}
                  onClick={() => {
                    navigate(`/articles/author/` + autId, {
                      state: {
                        authorId: autId, authorName: name
                      },
                    });
                  }}
                >
                  {t("All_Special_Article_tr")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthorsDataPage;
