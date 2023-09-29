/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import React from "react";
import AboutService from "../Services/About";
import "../Styles/About.css";
import i18n, { _get_i18Lang } from "../i18n";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { t } = useTranslation();
  const [about, setAbout] = React.useState({
    __html: "",
  });

  function createMarkup() {
    return { __html: about.__html };
  }

  React.useEffect(() => {
    AboutService.getAboutData(_get_i18Lang()).then((result) => {
      if (result) {
        setAbout({ __html: result.result.aboutGSTContent });
      }
    });
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
            }}
          >
            {t("Introduction_tr")}
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
              <label> / {t("Introduction_tr")}</label>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          userSelect: "none",
          backgroundColor: "#fff6e1",
          padding: "1px 0 50px",
        }}
      >
        <div className="container">
          {about && about.__html.length > 0 ? (
            <div className="gst-page-content aboutcolor">
              <div
                className="abouttext"
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
    </>
  );
};
export default AboutPage;
