/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ArticlesDetailService from "../Services/ArticlesDetail";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Articles.css";
import artimg from "../Images/atul-assets-img.png";
import i18n, { _get_i18Lang } from "../i18n";
import Favfill from "../assets/img/favadd.png";
import Favempty from "../assets/img/fav.png";
import { LogInModel } from "./LogInoutModel";

const ArticlesDetailPage = (props: any) => {
  const [Articletcontent, setarticleContent] = useState({
    __html: "",
  });
  const { t } = useTranslation();
  const location = useLocation();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const state = location.state as {
    articleId: string;
    authorName: string;
    articleName: string;
  };
  const [ArticlesDetail, setArticlesDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);

  const [logIn, setLogIn] = useState<boolean>(false);
  const [toggleFav, setToggleFav] = useState<boolean>(false);
  const closeModal = () => {
    setLogIn(false);
  };

  const UserIdentity = localStorage.getItem("UserId") as any;

  const toggleLike = () => {
    !isLiked
      ? ArticlesDetailService.addArticlesFavourite(state?.articleId).then(
          (res: any) => {
            setIsLiked(true);
          }
        )
      : ArticlesDetailService.removeArticlesFaviourite(state?.articleId).then(
          (res: any) => {
            setIsLiked(false);
          }
        );
    setToggleFav((x) => !x);
  };

  useEffect(() => {
    if (state?.articleId) {
      setRefresh(false);
      ArticlesDetailService.getArticlesDetail(
        state?.articleId,
        UserIdentity !== "" ? UserIdentity : ""
      ).then((res) => {
        if (res.status) {
          setArticlesDetail(res?.result);
          setarticleContent({ __html: res?.result?.articleContent });
          setIsLiked(res?.result?.isFavourite);
        }
      });
    }
  }, [refresh, i18n.language, state?.articleId]);

  function createMarkup() {
    return { __html: Articletcontent.__html };
  }

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
              marginLeft: "238px",
              top: "155px",
            }}
          >
            {t("Article_tr")}
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
              {state?.authorName ? (
                <Link to={"/"} style={{ marginRight: "8px", color: "#2d2a29" }}>
                  / {state?.authorName}
                </Link>
              ) : (
                ""
              )}
              <Link
                to={"/articles/author/:id"}
                style={{ color: "#2d2a29", marginRight: "6px" }}
              >
                / {t("Article_tr")}
              </Link>
              <span style={{ marginRight: "8px", color: "#2d2a29" }}>
                / {state?.articleName}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingTop: "10px"}}>
        <div>
          {ArticlesDetail ? (
            <div
              key={`articledetail-${ArticlesDetail.id}`}
              style={{ backgroundColor: "#fff6e1", padding: "1px 0px 3% 0", }}
            >
              <div
                style={{
                  backgroundColor: "rgb(255, 250, 240)",
                  boxShadow: "0 0 7px 1px #f5deb1",
                  padding: "30px 40px",
                  margin: "10px 0px",
                }}
              >
                <div className="message-header">
                  <div className="row">
                    <div className="col-md-2">
                      <a>
                        <img
                          src={artimg}
                          onError={(e) => {
                            e.currentTarget.src = artimg;
                          }}
                          alt={ArticlesDetail.name}
                          title={ArticlesDetail.name}
                        />
                      </a>
                    </div>
                    <div className="col-md-10">
                      <div style={{ display: "flex" }}>
                        <h1>{ArticlesDetail.name}</h1>
                        <label
                          style={{ marginLeft: "5%" }}
                          onClick={() => {
                            if (!UserIdentity) setLogIn(true);
                          }}
                        >
                          <label
                            onClick={() => {
                              toggleLike();
                            }}
                          >
                            <img
                              src={isLiked ? Favfill : Favempty}
                              alt="Favicon"
                            />
                          </label>
                        </label>
                      </div>

                      <p>
                        <label>{t("Article_tr")}: </label>
                        {ArticlesDetail.author}
                      </p>
                      <p style={{ borderBottom: "0", marginBottom: "0" }}>
                        <label>{t("Language_tr")} </label>
                        {ArticlesDetail.articleLanguage}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2
                    style={{
                      color: "#ff731f",
                      margin: 0,
                      fontSize: "32px",
                      fontFamily: "ChanakyaUni",
                    }}
                  >
                    {t("Description_tr")}
                  </h2>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontFamily: "ChanakyaUni",
                  }}
                  className="article-content content-font"
                  dangerouslySetInnerHTML={createMarkup()}
                ></div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <LogInModel opens={logIn} onCloses={closeModal} />
    </div>
  );
};
export default ArticlesDetailPage;
