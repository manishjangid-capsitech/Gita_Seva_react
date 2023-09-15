/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DefaultBook from "../Images/defaultBook.svg";
import BookDetailService from "../Services/BookDetail";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/BookDetail.css";
import Slider from "react-slick";
import { _get_i18Lang } from "../i18n";
import Favfill from "../assets/img/favadd.png";
import Favempty from "../assets/img/fav.png";
import { BookContentType } from "./Epub";
import { useTranslation } from "react-i18next";
import { userId } from "../Contexts/LocaleContext";
import "react-toastify/dist/ReactToastify.css";
import { LogInModel } from "./LogInoutModel";

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
  // const [bookId, setBookId] = useState("");
  const [relateds, setRelatedBooks] = useState<any[] | undefined>(undefined);
  // const [bookFav, setBookFav] = useState<boolean>(false);
  // const [getBookFav, setGetBookFav] = useState()

  const UserIdentity = localStorage.getItem("UserId") as any;

  const location = useLocation();
  const state = location.state as { bookId: string; bookName: string };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [logIn, setLogIn] = useState<boolean>(false);

  const closeModal = () => {
    setLogIn(false);
  };

  // new file

  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [toggleFav, setToggleFav] = React.useState<boolean>(false);

  const toggleLike = () => {
    if (!isLiked) {
      BookDetailService.addFavourite(state.bookId).then((res) => {
        res.status && setIsLiked(true);
      });
    } else {
      BookDetailService.removeFavourite(state.bookId).then((res) => {
        res.status && setIsLiked(false);
      });
    }
    setToggleFav((x) => !x);
  };

  useEffect(() => {
    BookDetailService.getCurrentBook(
      state.bookId,
      UserIdentity !== "" ? UserIdentity : ""
    ).then((res: any) => {
      setBookDetail(res.result);
      console.log("bookres", res);
      setIsLiked(res.result.isFavourite);
    });
  }, []);

  useEffect(() => {
    setRefresh(false);
    BookDetailService.getRelatedBooks(state.bookId, "").then(
      (res) => {
        if (res.status) {
          setRelatedBooks(res.result);
        }
      }
    );
  }, [refresh]);

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
            {t("E_books_tr")}
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
              <Link
                style={{ marginRight: "6px", color: "#2d2a29" }}
                to="/books"
              >
                / {t("E_books_tr")}
              </Link>
              <span style={{ color: "#2d2a29" }}>/ {bookDetail?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          <div className="row">
            <div>
              {bookDetail ? (
                <div
                  className="containers card-gst"
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    backgroundColor: "#FFFAF0",
                    border: "1px solid #ffd186",
                    boxShadow: "0px 0px 10px 0px #dcd1b8",
                    borderBottom: "#FFFAF0",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                  }}
                >
                  <div className="mat-card row" key={`book-${bookDetail.id}`}>
                    <div style={{ padding: "35px" }}>
                      <div className="single-product col-lg-4 col-xs-12 col-sm-12 col-md-12">
                        <a>
                          <div
                            style={{
                              border: "1px solid #eadfc8",
                              padding: "35px 0",
                              background: "#fff",
                              borderRadius: "5px",
                              textAlign: "center",
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
                        </a>
                      </div>

                      <div className="single-product-author col-lg-8 col-xs-12 col-sm-12 col-md-12">
                        <div className="single-book-heading">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <label
                              style={{
                                fontFamily: "ChanakyaUni",
                                fontSize: "26px",
                                fontWeight: 700,
                                color: "#472d1e",
                                marginTop: "7px",
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
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <LogInModel opens={logIn} onCloses={closeModal} />
          <div className="clsslide row" style={{ paddingBottom: "50px" }}>
            <div>
              <div
                style={{
                  backgroundColor: "#FFFAF0",
                  border: "1px solid #ffd186",
                  //   boxShadow: "0px 0px 10px 0px #dcd1b8",
                  borderTop: "#FFFAF0",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <h1
                  style={{ fontSize: "30px!important" }}
                  className="heading fontfamily"
                >
                  {t("Related_e_books_tr")}
                </h1>

                <div style={{ paddingBottom: "70px" }}>
                  <Slider {...settings}>
                    {relateds && relateds.length > 0
                      ? relateds.map((related) => (
                          <div
                            className="slider-books sidebarmargin"
                            key={`related-${related.id}`}
                            onClick={() => {
                              navigate(`/vivekvani/` + related.slug, {
                                state: {
                                  bookId: related.id,
                                  bookName: related.name,
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
                                    related.bookThumbPath == null
                                      ? DefaultBook
                                      : related.bookThumbPath
                                  }
                                  onError={(e) => {
                                    e.currentTarget.src = DefaultBook;
                                  }}
                                  alt={related.name}
                                  title={related.name}
                                  width="117"
                                  height="165"
                                />
                                <p>
                                  {/* {related.name != null && related.name.length > 20
              ? related.name.slice(0, 25)
              : related.name} */}
                                  {related?.name}
                                </p>
                              </a>
                            </div>
                          </div>
                        ))
                      : ""}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetailPage;
