/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import BooksService from "../Services/Books";
import DefaultBook from "../Images/defaultBook.png";
import ListPagination from "../Components/ListPagination";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Books.css";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import Loading from "../Components/Loading";
import { useUser } from "../Contexts/UserContext";
import Reset from "../Images/reset.png";
import $ from "jquery";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AuthorsService from "../Services/Authors";

const BooksPage = () => {
  const { isSelected, setItemColored } = useUser();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [books, setBooks] = useState<any[] | undefined>(undefined);

  const [refresh, setRefresh] = useState(false);
  const [SortValue, setSortValue] = useState("3");
  const [language, setLanguage] = useState<any>("");
  const [LanguageId, setLanguageId] = useState<any>("");
  const [Author, setAuthor] = useState<any>("");
  const [AuthorId, setAuthorId] = useState<any>("");
  const [Category, setCategory] = useState<any>("");
  const [CategoryId, setCategoryId] = useState<any>("");
  const [writer, setWriter] = React.useState<any>("");
  const [bread, showBread] = useState("");
  const [pagination, setPagination] = useState({
    pageNo: 1,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  const location = useLocation();
  const state = location.state as {
    authorId: string;
    authorName: string;
    authorSlug: string;
    langId: string;
    catId: string;
    catSlug: string;
    catName: string;
  };

  function ResetData() {
    setSortValue("3");
    setLanguageId("");
    setAuthorId("");
    setCategoryId("");
    setPagination({
      ...pagination,
      pageNo: 0,
    });
    setRefresh(true);
  }

  function ClickOnFilter(lan: string, cat: string, aut: string) {
    setRefresh(false);
    BooksService.getBooks(
      0,
      pagination.recordsPerPage,
      false,
      CategoryId || state?.catId,
      AuthorId || state?.authorId,
      "",
      SortValue,
      LanguageId || state?.langId,
      window.location.pathname === "/books/special" ? true : false
    ).then((res) => {
      if (res) {
        setBooks(res.result?.items);
        setPagination({
          ...pagination,
          pageNo: 1,
          recordsPerPage: 12,
          totalRecords: res.result?.totalRecords,
        });
      }
    });
  }

  useEffect(() => {
    ClickOnFilter(CategoryId, AuthorId, LanguageId);
    $(".Authorlist > ul > li > div").removeClass("listActive");
    $("#aut-" + AuthorId).addClass("listActive");
    $(".CategoryList > ul > li > div").removeClass("listActive");
    $("#cat-" + CategoryId).addClass("listActive");
    $(".LanguageList > ul > li > div").removeClass("listActive");
    $("#lan-" + LanguageId).addClass("listActive");
  }, [CategoryId, AuthorId, LanguageId]);

  useEffect(() => {
    setItemColored(true);
    ResetData();
  }, [isSelected, setItemColored]);

  useEffect(() => {
    setRefresh(false);
    BooksService.getFilters("book").then((res) => {
      if (res.status) {
        setLanguage(res?.result?.languages);
        setAuthor(res?.result?.authors);
        setCategory(res?.result?.categories);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    setRefresh(false);
    BooksService.getBooks(
      pagination.pageNo === 0
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage,
      false,
      CategoryId || state?.catId,
      AuthorId || state?.authorId,
      "",
      SortValue, //sort
      LanguageId,
      window.location.pathname === "/books/special" ? true : false
    ).then((res) => {
      if (res.status) {
        setBooks(res.result?.items);
        if (state?.authorId !== "") {
          setWriter(res?.result?.items[0]?.author);
        }
        setPagination({
          ...pagination,
          totalRecords: res.result?.totalRecords,
        });
      }
    });
  }, [refresh, i18n.language, SortValue, pagination?.totalRecords]);

  useEffect(() => {
    if (state?.authorId) {
      AuthorsService.GetAuthorDataById(state?.authorId, "").then((res: any) => {
        showBread(res?.result?.name);
      });
    } else if (state?.langId) {
      BooksService.GetLanguageDataById(state?.langId).then((res) => {
        showBread(res?.result?.name);
        setLanguageId(res.result?.id);
      });
    } else if ((window.location.pathname === "/books/special") === true) {
      showBread(t("Special_E_books_tr"));
    } else showBread(t("E_books_tr"));
  }, [i18n.language]);

  return (
    <>
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
              fontFamily: "ChanakyaUniBold"
            }}
          >
            {state?.authorId ? <span>{writer}</span> : <span>{bread}</span>}
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
              {state?.authorId ? (
                <>
                  <Link
                    to={"/author/" + state?.authorSlug}
                    state={{
                      authorId: state?.authorId,
                      authorName: state?.authorName,
                      authorSlug: state?.authorSlug
                    }}
                    style={{ marginRight: "8px", color: "#2d2a29" }}
                  >
                    / {writer}
                  </Link>
                  <label style={{ marginRight: "8px", color: "#2d2a29" }}>
                    / {t("E_books_tr")}
                  </label>
                </>
              ) : (
                <>
                  <span style={{ marginRight: "8px", color: "#2d2a29" }}>
                    / {bread}
                  </span>
                  {state?.langId ? (
                    <label style={{ marginRight: "8px", color: "#2d2a29" }}>
                      / {t("E_books_tr")}
                    </label>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="fontfamily"
        style={{
          userSelect: "none",
          backgroundColor: "rgb(255, 246, 225)",
          padding: "1px 0 3% 0",
        }}
      >
        <div className="containers">
          <div
            className="gst-page-content pagecontentbackground"
            style={{ backgroundColor: "#FFF6E1" }}
          >
            <div className="row">
              <div className="col-lg-3">
                <div
                  style={{
                    display: "block",
                    padding: "16px",
                    borderRadius: "4px",
                    background: "#FFFAF0",
                    boxShadow: "0 0 7px 1px #f5deb1",
                    fontFamily: "ChanakyaUni",
                    height: "100%",
                  }}
                >
                  <div
                    className="cardbackground"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span className="boxheadtitle">{t("Filter_tr")}</span>
                    <img
                      alt="reset"
                      src={Reset}
                      className="resetimg"
                      onClick={() => {
                        ResetData();
                      }}
                    />
                  </div>
                  <div>
                    {/* category */}
                    <Accordion elevation={0} defaultExpanded style={{ display: state?.authorId ? "none" : "block" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: 0,
                          background: "#FFFAF0",
                          minHeight: "25px",
                        }}
                      >
                        <h2 className="filtertitle">{t("E_books_list_tr")}</h2>
                      </AccordionSummary>

                      <AccordionDetails
                        style={{
                          display: "block",
                          background: "#FFFAF0",
                          padding: "10px 0 0 0"
                        }}
                      >
                        {Category && Category.length > 0
                          ? Category?.map((category: any) => (
                            <div
                              key={category.id}
                              // key={`c-${category.id}`}
                              className="CategoryList"
                              onClick={() => {
                                setCategoryId(category.id);
                              }}
                            >
                              <ul style={{ margin: 0 }}>
                                <li>
                                  <div
                                    style={{
                                      fontSize: "21px",
                                      cursor: "pointer",
                                      fontWeight: 400,
                                      color: "#545454",
                                      fontFamily: "ChanakyaUni",
                                    }}
                                    id={`cat-${category.id}`}
                                  >
                                    {category.name}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          ))
                          : ""}
                      </AccordionDetails>
                    </Accordion>
                    {/* author  */}

                    <Accordion
                      elevation={0}
                      // defaultExpanded={defaultExpandedValue}
                      style={{ display: state?.authorId ? "none" : "block" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: 0,
                          background: "#FFFAF0",
                          minHeight: "39px",
                          margin: "0 0 -7px 0",
                        }}
                      >
                        <h2 className="filtertitle">{t("Authors_tr")}</h2>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{
                          display: "block",
                          background: "#FFFAF0",
                          padding: "10px 0 0 0",
                        }}
                      >
                        {Author && Author.length > 0
                          ? Author?.map((author: any) => (
                            <div
                              key={author?.id}
                              // key={`c-${author.id}`}
                              className="Authorlist"
                              onClick={() => {
                                setAuthorId(author?.id);
                              }}
                            >
                              <ul style={{ margin: "-3px 0 0 0" }}>
                                <li>
                                  <div
                                    style={{
                                      fontSize: "21px",
                                      cursor: "pointer",
                                      fontWeight: 400,
                                      color: "#545454",
                                      fontFamily: "ChanakyaUni",
                                      margin: "8px 0 0 0"
                                    }}
                                    id={`aut-${author.id}`}
                                  >
                                    {author.name}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          ))
                          : ""}
                      </AccordionDetails>
                    </Accordion>
                    {/* language */}
                    <Accordion elevation={0} defaultExpanded={state?.authorId ? true : false}>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        style={{
                          height: "10px",
                          background: "#FFFAF0",
                        }}
                      >
                        <h2 className="filtertitle">{t("Languages_tr")}</h2>
                      </AccordionSummary>

                      <AccordionDetails
                        style={{
                          display: "block",
                          background: "#FFFAF0",
                          padding: "10px 0 0 0"
                        }}
                      >
                        {language &&
                          language.length > 0 &&
                          language?.map((Language: any) => (
                            <div
                              key={`c-${Language.id}`}
                              className="LanguageList"
                              onClick={() => {
                                setLanguageId(Language.id);
                              }}
                            >
                              <ul style={{ margin: 0 }}>
                                <li>
                                  <div
                                    style={{
                                      fontSize: "21px",
                                      cursor: "pointer",
                                      fontWeight: 400,
                                      color: "#545454",
                                      fontFamily: "ChanakyaUni",
                                    }}
                                    id={`lan-${Language.id}`}
                                  >
                                    {Language.name}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div
                  className="detailbg"
                  style={{
                    display: "block",
                    padding: "16px",
                    borderRadius: "4px",
                    background: "#FFFAF0",
                    boxShadow: "0 0 7px 1px #f5deb1",
                    height: "100%",
                    fontFamily: "ChanakyaUni",
                  }}
                >
                  <div className="sidebarmargin">
                    <div
                      className="align-items-center row"
                      style={{ margin: "-10px -10px 25px -10px" }}
                    >
                      <div className="col-6">
                        <div className="filter1" style={{ marginTop: "10px" }}>
                          <label>
                            {t("Total_Records_tr")} : {pagination.totalRecords}
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="filter1" style={{ textAlign: "right" }}>
                          <label>{t("Sort_tr")} </label>
                          <select
                            style={{ backgroundColor: "#FFF2D5" }}
                            value={SortValue}
                            onChange={(e) => {
                              setSortValue(e.target.value);
                            }}
                          >
                            <option value="3">{t("Popular_tr")}</option>
                            <option value="2">{t("Latest_tr")}</option>
                            <option value="0">{t("General_tr")}</option>
                            <option value="1">{t("Title_tr")}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {books && books.length > 0 ? (
                      <div>
                        <div className="row">
                          {books.map((book) => (
                            <div key={book?.id} className="col-lg-3">
                              <div
                                className="sidebarmargin"
                                // key={`book-${book.id}`}
                                onClick={() => {
                                  if (window.location.pathname === `/books`) {
                                    navigate(`/books/` + book.slug, {
                                      state: {
                                        bookId: book.id,
                                        bookName: book.name,
                                        bookSlug: book?.slug,
                                        pathname: location?.pathname
                                      },
                                    });
                                  }
                                  if (window?.location?.pathname === `/books/special`) {
                                    navigate(`/books/special/` + book.slug, {
                                      state: {
                                        bookId: book.id,
                                        bookName: book.name,
                                        bookSlug: book?.slug,
                                        pathname: location?.pathname,
                                        special: true,
                                      },
                                    });
                                  }
                                  if (state?.authorId) {
                                    navigate(`/books/author/` + state?.authorSlug + "/" + book?.slug, {
                                      state: {
                                        bookId: book.id,
                                        bookName: book.name,
                                        bookSlug: book?.slug,
                                        authorId: state?.authorId,
                                        authorName: state?.authorName || bread,
                                        authorSlug: state?.authorSlug,
                                      },
                                    });
                                  } if (state?.langId) {
                                    navigate(`/books/language/` + state?.langId + "/" + book?.slug, {
                                      // "/books/language/:langId/:id"
                                      state: {
                                        bookId: book.id,
                                        bookName: book.name,
                                        bookSlug: book?.slug,
                                        langId: state?.langId,
                                      },
                                    });
                                  } if (state?.catId) {
                                    navigate(`/books/category/` + state?.catSlug + "/" + book?.slug, {
                                      state: {
                                        bookId: book.id,
                                        bookName: book.name,
                                        bookSlug: book?.slug,
                                        catId: state?.catId,
                                        catName: state.catName,
                                        catSlug: state?.catSlug
                                      },
                                    });
                                  }
                                }}
                              >
                                <div className="bookBox">
                                  <a>
                                    <img
                                      style={{
                                        cursor: "pointer",
                                        borderRadius: 0,
                                      }}
                                      src={book.bookThumbPath}
                                      onError={(e) => {
                                        e.currentTarget.src = DefaultBook;
                                      }}
                                      alt={book.name}
                                      title={book.name}
                                      width="117"
                                      height="165"
                                    />
                                    <p style={{ cursor: "pointer" }}>
                                      {book.name}
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="col-12" style={{ marginTop: "30px", display: pagination.totalRecords <= 12 ? "none" : "block" }}>
                          <ListPagination
                            totalRecords={pagination.totalRecords}
                            recordsPerPage={pagination.recordsPerPage}
                            currentPage={pagination.pageNo}
                            onClick={(p) => {
                              setPagination({
                                ...pagination,
                                pageNo: p,
                              });
                              setRefresh(true);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="ebooks-category resultnotfound">
                        {books?.length === 0 ? (
                          <label>{t("result_not_found_tr")}</label>
                        ) : (
                          <Loading />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BooksPage;
