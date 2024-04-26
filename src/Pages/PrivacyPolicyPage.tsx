/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import PrivacyPolicyService from "../Services/PrivacyPolicy";
import "../Styles/About.css";
import i18n, { _get_i18Lang } from "../i18n";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";

const PrivacyPage = () => {
  const { t } = useTranslation();
  const [policy, setPolicy] = React.useState({
    __html: "",
  });

  useEffect(() => {
    PrivacyPolicyService.getPrivacyPolicyData(_get_i18Lang()).then((result) => {
      if (result) {
        setPolicy({ __html: result.result.content });
      }
    });
  }, [i18n.language]);

  function createMarkup() {
    return { __html: policy.__html };
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
            {t("Privacy_Policy_tr")}
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
              <label> / {t("Privacy_Policy_tr")}</label>
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
          {policy && policy.__html.length > 0 ? (
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
export default PrivacyPage;
