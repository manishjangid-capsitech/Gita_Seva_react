/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import FaqService from "../Services/Faq";
import "../Styles/About.css";
import i18n, { _get_i18Lang } from "../i18n";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMore from "@mui/icons-material/ExpandMore";

const TermsOfUse = () => {
  const { t } = useTranslation();
  const [tearms, setTearms] = React.useState<any>("");

  useEffect(() => {
    FaqService.getFaqData(_get_i18Lang()).then((result) => {
      if (result) {
        setTearms(result.result.items);
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
              fontFamily: "ChanakyaUniBold"
            }}
          >
            {t("general_question_tr")}
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
              <label> / {t("general_question_tr")}</label>
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
          <div
            style={{
              paddingBottom: "9px",
              margin: "40px 0 20px",
              borderBottom: "1px solid #eee",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                fontFamily:
                  "Verda,Helvetica Neue,Helvetica,Arial,sans-serifnaBold",
                color: "#000",
              }}
            >
              Frequently Asked Questions
            </span>
          </div>
          <span
            style={{
              fontSize: "27px",
              fontFamily:
                "Verda,Helvetica Neue,Helvetica,Arial,sans-serifnaBold",
              color: "#000",
              margin: "20px",
            }}
          >
            General questions
          </span>
          {tearms ? (
            tearms.slice(0, 8).map((tearm: any) => (
              <div>
                <div
                  style={{
                    padding: "10px",
                  }}
                >
                  <Accordion elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      style={{
                        height: "10px",
                        borderBottom: "1px solid #ddd",
                        padding: 0,
                      }}
                    >
                      <p
                        style={{
                          color: "#222424",
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                          fontSize: "16px",
                          background: "#fff",
                        }}
                      >
                        {tearm.title}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: 0 }}>
                      <p
                        style={{
                          color: "#222424",
                          fontFamily:
                            "Helvetica Neue, Helvetica, Arial, sans-serif",
                          fontSize: "14px",
                          background: "#fff",
                        }}
                      >
                        {tearm.content}
                      </p>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            ))
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
