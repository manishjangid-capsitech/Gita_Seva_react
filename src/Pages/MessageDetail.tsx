/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import MessagesServices from "../Services/Messages";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Articles.css";
import messageimg from "../assets/img/msgBoard1.png";
import i18n, { _get_i18Lang } from "../i18n";

const MessageDetailPage = (props: any) => {
  const [messagecontent, setMessageContent] = useState({
    __html: "",
  });
  const { t } = useTranslation();

  const [messageDetail, setMessageDetail] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [messageId, setMessageId] = useState("");

  const location = useLocation();
  const state = location.state as { messageId: string };

  useEffect(() => {
    if (location.state) {
      setMessageId(state?.messageId);
    }
  }, [location.state, messageId, state?.messageId]);

  useEffect(() => {
    if (messageId) {
      setRefresh(false);
      MessagesServices.getmessageDetail(messageId).then((res) => {
        if (res.status) {
          setMessageDetail(res?.result);
          setMessageContent({ __html: res?.result?.messageContent });
        }
      });
    }
  }, [refresh, messageId, i18n.language]);

  function createMarkup() {
    return { __html: messagecontent.__html };
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
            {t("AmritVachan_tr")}
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
              <Link style={{ color: "#2d2a29" }} to={"/messages"}>
                / {t("AmritVachan_tr")}
              </Link>
              <span style={{ color: "#2d2a29" }}> / {messageDetail?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          {messageDetail ? (
            <div
              key={`articledetail-${messageDetail.id}`}
              style={{ backgroundColor: "#fff6e1", padding: "20px 0 50px" }}
            >
              <div
                style={{
                  backgroundColor: "rgb(255, 250, 240)",
                  border: "1px solid rgb(255, 209, 134)",
                  padding: "30px 40px",
                  boxShadow: "rgb(220, 209, 184) 0px 0px 10px 0px",
                }}
              >
                <div className="message-header">
                  <div style={{ float: "left", marginRight: "35px" }}>
                    <a>
                      <img
                        src={messageimg}
                        onError={(e) => {
                          e.currentTarget.src = messageimg;
                        }}
                        alt={messageDetail.name}
                        title={messageDetail.name}
                      />
                    </a>
                  </div>
                  <div style={{ paddingTop: "45px" }}>
                    <h1>{messageDetail.name}</h1>
                  </div>
                </div>
                <div
                  style={{ fontSize: "22px", background: "#FFFAF0" }}
                  className="article-content content-font fontfamily"
                  dangerouslySetInnerHTML={createMarkup()}
                ></div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};
export default MessageDetailPage;
