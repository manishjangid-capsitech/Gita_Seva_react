import { useTranslation } from "react-i18next";
import React from "react";
import TermsOfUseService from "../Services/TermsOfUse";
import "../Styles/About.css";
import i18n, { _get_i18Lang } from "../i18n";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
  const { t } = useTranslation();
  const [tearms, setTearms] = React.useState({
    __html: "",
  });

  React.useEffect(() => {
    TermsOfUseService.getTermsOfUseData(_get_i18Lang()).then((result) => {
      if (result) {
        setTearms({ __html: result.result.content });
      }
    });
  }, [i18n.language]);

  function createMarkup() {
    return { __html: tearms.__html };
  }

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
        }}
      >
        <div className="breadcrumbs">
          <div
            className="containers"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "rgb(209, 21, 1)",
              marginLeft: "235px",
              top: "155px",
            }}
          >
            {t("Terms_of_Use_tr")}
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
              <label> / {t("Terms_of_Use_tr")}</label>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          userSelect: "none",
          backgroundColor: "#fff",
          padding: "20px 0 50px",
        }}
      >
        <div className="container">
          {tearms && tearms.__html.length > 0 ? (
            <div>
              <div
                className=""
                style={{padding:0}}
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
export default TermsOfUse;
