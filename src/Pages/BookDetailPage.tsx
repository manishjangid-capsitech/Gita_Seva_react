/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DefaultBook from "../Images/defaultBook.png";
import BookDetailService from "../Services/BookDetail";
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

export interface ISingleBook {
  bookLanguageId: string;
  bookLastPosition: string;
  slug: string;
  bookHash: string;
  name: string;
  id: string;
  bookThumbPath: string;
  author: string;
  bookLanguage: string;
  bookPath: string;
  filePath: string;
  isFavourite: boolean;
  description: string;
}

const BookDetailPage = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bookDetail, setBookDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [relateds, setRelatedBooks] = useState<any[] | undefined>(undefined);

  const UserIdentity = localStorage.getItem("UserId") as any;

  const location = useLocation();
  const state = location.state as {
    bookId: string;
    bookName: string;
    authorId: string;
    authorName: string;
    special: string;
    langId: string;
    catId: string;
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [toggleFav, setToggleFav] = useState<boolean>(false);

  function notify() {
    if (!isLiked) {
      toast(
        localStorage.getItem("lang") === "hindi"
          ? "पुस्तक को सफलतापूर्वक मेरी पसंद में जोड़ा गया है।"
          : "Book has been successfully added to the favourites"
      );
    } else {
      toast(
        localStorage.getItem("lang") === "hindi"
          ? "पुस्तक मेरी पसंद से हटा दी गई है।"
          : "Book has been removed from favourites"
      );
    }
  }

  const toggleLike = () => {
    !isLiked
      ? BookDetailService.addFavourite(state.bookId).then((res) => {
          res.status && setIsLiked(true);
        })
      : BookDetailService.removeFavourite(state.bookId).then((res) => {
          res.status && setIsLiked(false);
        });
    setToggleFav((x) => !x);
  };

  useEffect(() => {
    setRefresh(false);
    BookDetailService.getCurrentBook(
      state.bookId,
      UserIdentity !== "" ? UserIdentity : ""
    ).then((res: any) => {
      setBookDetail(res.result);
      setIsLiked(res.result.isFavourite);
    });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    BookDetailService.getRelatedBooks(state.bookId, "").then((res) => {
      if (res.status) {
        setRelatedBooks(res.result);
      }
    });
  }, [refresh, i18n.language]);

  const [lang, showLang] = useState("");
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
              // marginLeft: "15%",
              top: "155px",
            }}
          >
            {state?.special === "/books" && t("E_books_tr")}
            {state?.catId !== undefined && t("E_books_tr")}
            {state?.special === "/books/special" && t("Special_E_books_tr")}
            {state?.authorId && <span>{bookDetail?.author}</span>}
            {state?.langId !== undefined && <span>{lang}</span>}
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
              {state?.special === "/books" && (
                <span style={{ marginRight: "6px" }}>/ {t("E_books_tr")}</span>
              )}
              {state?.special === "/books/special" && (
                <Link
                  to={"/books/special"}
                  style={{ marginRight: "8px", color: "#2d2a29" }}
                >
                  / {t("Special_E_books_tr")}
                </Link>
              )}
              {state?.authorId && (
                <>
                  <Link
                    to={"/author/ +"}
                    state={{
                      authorId: state?.authorId,
                      authorName: state?.authorName,
                    }}
                    style={{ marginRight: "8px", color: "#2d2a29" }}
                  >
                    / {bookDetail?.author}
                  </Link>
                  <Link
                    to={"/books/author/ +"}
                    state={{
                      authorId: state?.authorId,
                      authorName: state?.authorName,
                    }}
                    style={{ marginRight: "8px", color: "#2d2a29" }}
                  >
                    / {t("E_books_tr")}
                  </Link>
                </>
              )}
              {state?.catId !== undefined && (
                <Link
                  to={"/books"}
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
                    <div style={{ padding: "15px", margin: "0 0 25px 0" }}>
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
                                fontFamily: "ChanakyaUni",
                                fontSize: "30px",
                                fontWeight: 700,
                                color: "#472d1e",
                                margin: "12px 0 0",
                              }}
                            >
                              {bookDetail.name}
                            </label>
                            <label
                              onClick={() => {
                                if (!userId) setLogIn(true);
                              }}
                            >
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
                              setLogIn(true);
                              if (UserIdentity) {
                                navigate(`/reader/books/` + bookDetail.slug, {
                                  state: {
                                    bookDetailId: bookDetail.id,
                                    bookName: bookDetail.name,
                                    slug: bookDetail.slug,
                                    label: bookDetail.label,
                                    type: BookContentType.books,
                                  },
                                });
                              }
                            }}
                          >
                            {t("Read_the_book_tr")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="clsslide">
                    <div>
                      <h1
                        style={{ fontSize: "30px!important" }}
                        className="heading-related"
                      >
                        {t("Related_e_books_tr")}
                      </h1>

                      <div style={{ paddingBottom: "20px" }}>
                        <Slider {...settings}>
                          {relateds && relateds.length > 0
                            ? relateds.map((related) => (
                                <div
                                  className="slider-books sidebarmargin"
                                  key={`related-${related.id}`}
                                  onClick={() => {
                                    navigate(`/books/` + related.slug, {
                                      state: {
                                        bookId: related.id,
                                        bookName: related.name,
                                      },
                                    });
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
                                        related.bookThumbPath == null
                                          ? DefaultBook
                                          : related.bookThumbPath
                                      }
                                      onError={(e) => {
                                        e.currentTarget.src = DefaultBook;
                                      }}
                                      alt={related.name}
                                      title={related.name}
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
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <LogInModel opens={logIn} onCloses={closeModal} />
    </div>
  );
};
export default BookDetailPage;
