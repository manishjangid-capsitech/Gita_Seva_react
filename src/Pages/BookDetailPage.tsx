/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import DefaultBook from "../Images/defaultBook.png";
import BooksService from "../Services/Books";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import Slider from "react-slick";
import i18n, { _get_i18Lang } from "../i18n";
import Favfill from "../assets/img/favadd.png";
import Favempty from "../assets/img/fav.png";
import { BookContentType } from "./Epub";
import { useTranslation } from "react-i18next";
import { userId } from "../Contexts/LocaleContext";
import "react-toastify/dist/ReactToastify.css";
import { LogInModel } from "./LogInoutModel";
import { toast } from "react-toastify";
import leftArrow from "../assets/img/leftArrow1.png";
import rightArrow from "../assets/img/rightArrow1.png";
import EpubServices from "../Services/Epub";
import closeicon from "../Images/close-round-border.svg";
import Loading from "../Components/Loading";

const BookDetailPage = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bookDetail, setBookDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [relateds, setRelatedBooks] = useState<any[] | undefined>(undefined);

  const UserIdentity = localStorage.getItem("UserId") as any;

  const location = useLocation();
  const state = location.state as {
    bookSlug: string;
    bookId: string;
    bookName: string;
    authorId: string;
    authorName: string;
    authorSlug: string;
    special: string;
    langId: string;
    catId: string;
    catName: string;
    catSlug: string;
    index: number;
    searched: string;
    pathname: string;
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <img src={leftArrow} alt="" height="40px" />,
    nextArrow: <img src={rightArrow} alt="" height="40px" />,
  };

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [toggleFav, setToggleFav] = useState<boolean>(false);
  const [lang, showLang] = useState("");
  const [bookMark, setBookMark] = useState<boolean>(false);
  const [bookMarkData, setBookMarkData] = useState<any[] | undefined | any>(
    undefined
  );

  const notificationRef = useRef<any>(null);

  const showNotification = (message: any) => {
    notificationRef.current.innerText = message;
    notificationRef.current.style.display = "block";

    setTimeout(() => {
      notificationRef.current.style.display = "none";
    }, 3000); // Hide the notification after 2 seconds
  };

  const notify = () => {
    if (UserIdentity) {
      showNotification(
        !isLiked
          ? localStorage.getItem("lan") === "hindi"
            ? "पुस्तक को सफलतापूर्वक मेरी पसंद में जोड़ा गया है।"
            : "Book has been successfully added to the favourites"
          : localStorage.getItem("lan") === "hindi"
            ? "पुस्तक मेरी पसंद से हटा दी गई है।"
            : "Book has been removed from favourites"
      );
    }
  };

  const toggleLike = () => {
    !isLiked
      ? BooksService.addFavourite(state?.bookId).then((res) => {
        res.status && setIsLiked(true);
      })
      : BooksService.removeFavourite(state?.bookId).then((res) => {
        res.status && setIsLiked(false);
      });
    setToggleFav((x) => !x);
  };

  const [loginState, setLoginState] = useState<string | null>(null);

  const handleLoginStateChange = (newState: any) => {
    setLoginState(newState);
    navigate(`/reader/books/` + state?.bookSlug, {
      state: {
        bookDetailId: state?.bookId,
        bookName: state?.bookName,
        slug: state?.bookSlug,
        label: state?.bookId,
        type: BookContentType.books,
      },
    });
  };

  const [description, setDescription] = useState({
    __html: "",
  });

  function createMarkup() {
    return { __html: description.__html };
  }

  useEffect(() => {
    setRefresh(false);
    BooksService.getCurrentBook(
      state?.bookId,
      UserIdentity !== "" ? UserIdentity : ""
    ).then((res: any) => {
      setDescription({ __html: res?.result?.description });
      setBookDetail(res.result);
      setIsLiked(res?.result?.isFavourite);
    });
  }, [refresh, i18n.language, logIn]);

  useEffect(() => {
    if (state?.bookId) {
      EpubServices.getbookmark("bookmarks", state?.bookId).then((res: any) => {
        if (res.status) {
          setBookMarkData(res?.result);
        }
      });
    }
  }, [refresh, i18n.language, userId]);

  useEffect(() => {
    setRefresh(false);
    BooksService.getRelatedBooks(state?.bookId, "").then((res) => {
      if (res.status) {
        setRelatedBooks(res.result);
      }
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    BooksService.GetLanguageDataById(state?.langId).then((res) => {
      showLang(res?.result?.name);
    });
  }, [i18n.language]);

  return (
    <div
      className="newcontainer"
      style={{ backgroundColor: "#FFF6E1", padding: "1px 0", marginTop: 0 }}
    >
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
              fontFamily: "ChanakyaUniBold",
            }}
          >
            {window.location.pathname === "/profile/fav" + state?.bookSlug &&
              t("E_books_tr")}
            {window.location?.pathname === "/books/" + state?.bookSlug &&
              t("E_books_tr")}
            {window.location?.pathname === "/books/special/" + state?.bookSlug &&
              t("Special_E_books_tr")}
            {state?.authorId !== undefined && <span>{state?.authorName}</span>}
            {state?.langId !== undefined && <span>{lang}</span>}
            {state?.catId ? t("E_books_tr") : ""}
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
              {window.location?.pathname === "/books/" + state?.bookSlug ? (
                <Link
                  to={"/books"}
                  style={{ marginRight: "6px", color: "#2d2a29" }}
                >
                  / {t("E_books_tr")}
                </Link>
              ) : (
                ""
              )}
              {window.location?.pathname ===
                "/books/special/" + state?.bookSlug ? (
                <Link
                  to={"/books/special"}
                  style={{ marginRight: "6px", color: "#2d2a29" }}
                >
                  / {t("Special_E_books_tr")}
                </Link>
              ) : (
                ""
              )}

              {state?.authorId !== undefined ? (
                <>
                  <Link
                    to={"/author/" + state?.authorSlug}
                    state={{
                      authorId: state?.authorId,
                      authorName: state?.authorName,
                      authorSlug: state?.authorSlug,
                    }}
                    style={{ marginRight: "6px", color: "#2d2a29" }}
                  >
                    {/* author name in hindi and english */}/{" "}
                    {state?.authorName}
                  </Link>
                  <Link
                    to={"/books/author/" + state?.authorSlug}
                    state={{
                      authorId: state?.authorId,
                      authorName: state?.authorName,
                      authorSlug: state?.authorSlug,
                    }}
                    style={{ marginRight: "6px", color: "#2d2a29" }}
                  >
                    / {t("E_books_tr")}
                  </Link>
                </>
              ) : (
                ""
              )}
              {state?.catId !== undefined && (
                <Link
                  to={"/books/category/+"}
                  state={{
                    catId: state?.catId,
                  }}
                  style={{ marginRight: "8px", color: "#2d2a29" }}
                >
                  / {t("E_books_tr")}
                </Link>
              )}
              {state?.langId !== undefined && (
                <>
                  <Link
                    to={"/books/language/ +"}
                    state={{
                      langId: state?.langId,
                    }}
                    style={{ marginRight: "8px", color: "#2d2a29" }}
                  >
                    / {lang}
                  </Link>
                  <Link
                    to={"/books/language/ +"}
                    state={{
                      langId: state?.langId,
                    }}
                    style={{ marginRight: "8px", color: "#2d2a29" }}
                  >
                    / {t("E_books_tr")}
                  </Link>
                </>
              )}
              <span>/ {bookDetail?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div style={{ marginBottom: "75px" }}>
          <div className="row">
            <div>
              {bookDetail ? (
                <div
                  className="containers card-gst"
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    backgroundColor: "#FFFAF0",
                    boxShadow: "0px 0px 10px 0px #dcd1b8",
                  }}
                >
                  <div className="mat-card row" key={`book-${bookDetail.id}`}>
                    <div style={{ padding: "15px" }}>
                      <div className="single-product col-lg-3">
                        <div
                          style={{
                            border: "1px solid #eadfc8",
                            padding: "30px",
                            background: "#fff",
                            borderRadius: "5px",
                            textAlign: "center",
                            width: "125%",
                          }}
                        >
                          <img
                            src={bookDetail.bookPath}
                            onError={(e) => {
                              e.currentTarget.src = DefaultBook;
                            }}
                            alt={bookDetail.name}
                            title={bookDetail.name}
                            className="bkdetailimg"
                            width="256"
                            height="362"
                          />
                        </div>
                      </div>

                      <div className="single-product-author col-8">
                        <div className="single-bookdetail-heading">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <label
                              style={{
                                fontFamily: "ChanakyaUni,NalandaTim,Tunga",
                                fontSize: "30px",
                                fontWeight: 700,
                                color: "#472d1e",
                                margin: "12px 0 0",
                                fontStyle: "normal",
                              }}
                            >
                              {bookDetail.name}
                            </label>
                            <label
                              onClick={() => {
                                if (!UserIdentity) setLogIn(true);
                              }}
                              style={{ display: "flex", margin: 0 }}
                            >
                              <label
                                style={{
                                  display:
                                    bookMarkData?.length > 0 ? "block" : "none",
                                  marginRight: "10px",
                                }}
                              >
                                <div
                                  className="bkmarkicon"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setBookMark(
                                      bookMark === true ? false : true
                                    );
                                  }}
                                >
                                  <div>
                                    {bookMark && userId && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          backgroundColor: "#fff6e1",
                                          padding: "10px 5px",
                                          top: "56px",
                                          width: "162px",
                                          borderRadius: "5px",
                                          display: "grid",
                                          zIndex: 1,
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            backgroundColor: "#ff6427",
                                          }}
                                        >
                                          <p
                                            style={{
                                              color: "#fff",
                                              fontStyle: "normal",
                                              lineHeight: "normal",
                                              borderBottom: "none",
                                              padding: "0 0 0 10%",
                                              margin: 0,
                                            }}
                                          >
                                            {t("bk_mark_tr")}
                                          </p>
                                          <img
                                            src={closeicon}
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                              margin: "4px 0 0 10px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => setBookMark(false)}
                                            alt=""
                                          />
                                        </div>
                                        <ol style={{ paddingLeft: "20px" }}>
                                          {bookMarkData &&
                                            bookMarkData?.map(
                                              (item: any, index: number) => (
                                                <li
                                                  onClick={() => {
                                                    navigate(
                                                      `/reader/books/` +
                                                      bookDetail?.slug,
                                                      {
                                                        state: {
                                                          bookDetailId:
                                                            bookDetail?.id,
                                                          bookName:
                                                            bookDetail?.name,
                                                          slug: bookDetail?.slug,
                                                          location: item?.cfi,
                                                          chapterName: item?.name,
                                                          type: BookContentType.books,
                                                        },
                                                      }
                                                    );
                                                  }}
                                                >
                                                  <p
                                                    style={{
                                                      borderBottom: "none",
                                                      padding: 0,
                                                      margin: "0 0 0 5px",
                                                      color: "#000",
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    {item?.name}
                                                  </p>
                                                </li>
                                              )
                                            )}
                                        </ol>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </label>
                              <label
                                onClick={() => {
                                  toggleLike();
                                  notify();
                                }}
                              >
                                <img
                                  src={isLiked ? Favfill : Favempty}
                                  alt="img"
                                />
                              </label>
                            </label>
                          </div>
                        </div>

                        {bookDetail.author ? (
                          <div>
                            <p>
                              <label>{t("Authors_tr")}</label>
                              {bookDetail.author}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {bookDetail.bookLanguage ? (
                          <div>
                            <p>
                              <label>{t("Language_tr")} </label>
                              {bookDetail.bookLanguage}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="next-read">
                          <p
                            style={{ cursor: "pointer", display: "inline" }}
                            onClick={() => {
                              if (UserIdentity) {
                                navigate(`/reader/books/` + bookDetail?.slug, {
                                  state: {
                                    bookDetailId: bookDetail?.id,
                                    bookName: bookDetail?.name,
                                    slug: bookDetail?.slug,
                                    label: bookDetail?.label,
                                    type: BookContentType.books,
                                  },
                                });
                              } else {
                                setLogIn(true);
                              }
                            }}
                          >
                            {t("Read_the_book_tr")}
                          </p>
                          <div
                            className="notification-bar"
                            ref={notificationRef}
                            style={{
                              color: "#ff3d28",
                              fontSize: "20px",
                              marginTop: "10px",
                              height: "25px"
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {description === null &&
                    <div style={{ margin: "0 45px 5% 40px" }}>
                      <h1 style={{
                        color: "#ff731f",
                        fontSize: "30px",
                        margin: "10px 0 20px",
                        fontStyle: "normal",
                        fontWeight: 700
                      }}> विवरण
                      </h1>
                      <div>
                        {description ? (
                          <div className="">
                            <div
                              style={{
                                color: " #472d1e",
                                fontFamily: "ChanakyaUni, NalandaTim, Tunga",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                margin: 0,
                                textAlign: "justify",
                                lineHeight: "36px"
                              }}
                              dangerouslySetInnerHTML={createMarkup()}
                            ></div>
                          </div>
                        ) : (
                          <div className="ebooks-category resultnotfound">
                            <Loading />
                            {t("result_not_found_tr")}
                          </div>
                        )}
                      </div>
                    </div>
                  }
                  <div className="clsslide">
                    {relateds && relateds?.length > 5 ? (
                      <div>
                        <h1
                          style={{ fontSize: "30px!important" }}
                          className="heading-related"
                        >
                          {t("Related_e_books_tr")}
                        </h1>

                        <div
                          style={{
                            paddingBottom: "20px",
                            width: " 97%",
                            left: "18px",
                            position: "relative",
                          }}
                        >
                          <Slider {...settings}>
                            {relateds && relateds?.length > 0
                              ? relateds.map((related) => (
                                <div
                                  style={{ display: "flex" }}
                                  className="slider-books sidebarmargin"
                                  key={`related-${related.id}`}
                                  onClick={() => {
                                    if (
                                      window.location.pathname ===
                                      `/books/` + state?.bookSlug
                                    ) {
                                      navigate(`/books/` + related?.slug, {
                                        state: {
                                          bookId: related?.id,
                                          bookName: related?.name,
                                          bookSlug: related?.slug,
                                          special: window?.location?.pathname,
                                          pathname:
                                            window?.location?.pathname,
                                        },
                                      });
                                    }
                                    if (
                                      window.location.pathname ===
                                      `/books/special/` + state?.bookSlug
                                    ) {
                                      navigate(
                                        `/books/special/` + related?.slug,
                                        {
                                          state: {
                                            bookId: related?.id,
                                            bookName: related?.name,
                                            bookSlug: related?.slug,
                                            special: window?.location?.pathname,
                                            pathname:
                                              window?.location?.pathname,
                                          },
                                        }
                                      );
                                    }
                                    if (
                                      window.location.pathname ===
                                      "/books/author/" +
                                      state?.authorSlug +
                                      "/" +
                                      state?.bookSlug
                                    ) {
                                      navigate(
                                        "/books/author/" +
                                        state?.authorSlug +
                                        "/" +
                                        related?.slug,
                                        {
                                          state: {
                                            bookId: related?.id,
                                            bookName: related?.name,
                                            bookSlug: related?.slug,
                                            authorId: state?.authorId,
                                            authorName: state?.authorName,
                                            authorSlug: state?.authorSlug,
                                            pathname:
                                              window?.location?.pathname,
                                          },
                                        }
                                      );
                                    }
                                    if (
                                      window?.location?.pathname ===
                                      `/books/category/` +
                                      state?.catSlug +
                                      "/" +
                                      state?.bookSlug
                                    ) {
                                      navigate(
                                        `/books/category/` +
                                        state?.catSlug +
                                        "/" +
                                        related?.slug,
                                        {
                                          state: {
                                            bookId: related?.id,
                                            bookName: related?.name,
                                            catId: state?.catId,
                                            catSlug: state?.catSlug,
                                            bookSlug: related?.slug,
                                            pathname:
                                              window?.location?.pathname,
                                          },
                                        }
                                      );
                                    }
                                    if (
                                      window?.location?.pathname ===
                                      `/books/language/` +
                                      state?.langId +
                                      "/" +
                                      state?.bookSlug
                                    ) {
                                      navigate(
                                        `/books/language/` +
                                        state?.langId +
                                        "/" +
                                        related.slug,
                                        {
                                          state: {
                                            bookId: related?.id,
                                            bookName: related?.name,
                                            bookSlug: related?.slug,
                                            langId: state?.langId,
                                            pathname:
                                              window?.location?.pathname,
                                          },
                                        }
                                      );
                                    }
                                    window.location.reload();
                                  }}
                                >
                                  <div>
                                    <img
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      className="imgcenter"
                                      src={
                                        related?.bookThumbPath == null
                                          ? DefaultBook
                                          : related?.bookThumbPath
                                      }
                                      onError={(e) => {
                                        e.currentTarget.src = DefaultBook;
                                      }}
                                      alt={related?.name}
                                      title={related?.name}
                                      width="150"
                                      height="212"
                                    />
                                    <p>{related?.name}</p>
                                  </div>
                                </div>
                              ))
                              : ""}
                          </Slider>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <LogInModel
        opens={logIn}
        onCloses={closeModal}
        onLoginStateChange={handleLoginStateChange}
      />
    </div>
  );
};
export default BookDetailPage;
