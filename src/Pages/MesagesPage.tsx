/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import WithoutLyrics from "../Images/audiolyrics.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import ListPagination from "../Components/ListPagination";
import "../Styles/Audios.css";
import "../Styles/Sidebar.css";
import { useTranslation } from "react-i18next";
import i18n, { _get_i18Lang } from "../i18n";
import Loading from "../Components/Loading";
import messageIcon from "../assets/img/msgBoard.png";
import MessagesServices from "../Services/Messages";

const MessagesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const [messages, setMessages] = useState<any[] | undefined>(undefined);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    recordsPerPage: 12,
    totalRecords: 0,
  });

  useEffect(() => {
    setRefresh(false);
    MessagesServices.getmessage(
      pagination.pageNo === 0
        ? 0
        : pagination.recordsPerPage * pagination.pageNo - 12,
      pagination.recordsPerPage
    ).then((res) => {
      if (res.status) setMessages(res.result?.items);
      setPagination({
        ...pagination,
        totalRecords: res.result?.totalRecords,
      });
    });
  }, [refresh, i18n.language]);

  return (
    <>
      <div
        className="breadcrumbs-head newcontainer"
        style={{
          width: "100%",
          marginTop: "-175px",
          paddingTop: 0,
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
              top: "155px",
              fontFamily: "ChanakyaUniBold"
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
              <span style={{ color: "#2d2a29" }}>/ {t("AmritVachan_tr")}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fontfamily"
        style={{
          userSelect: "none",
          backgroundColor: "rgb(255, 246, 225)",
          height: "1045px",
          marginTop: -"3px",
          paddingTop: "1px",
        }}
      >
        <div className="containers">
          <div
            className="gst-page-content pagecontentbackground"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="detailbg"
                  style={{
                    display: "block",
                    padding: "30px",
                    borderRadius: "4px",
                    background: "rgb(255, 250, 240)",
                    boxShadow: "rgb(245, 222, 177) 0px 0px 7px 1px",
                    height: "100%",
                    fontFamily: "ChanakyaUni",
                  }}
                >
                  {messages && messages.length > 0 ? (
                    <>
                      <div>
                        <div className="row">
                          {messages.map((message) => (
                            <div
                              className="col-lg-3"
                              key={`art-${message?.id}`}
                            >
                              <div
                                style={{
                                  transition: "all .5s ease",
                                  textAlign: "center",
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",
                                  padding: "20px 30px",
                                  boxShadow: "0 0 10px 0 #dcd1b8",
                                  height: "145px",
                                  margin: "6px 0 22px",
                                }}
                                onClick={() => {
                                  navigate(`/messages/` + message.slug, {
                                    state: { messageId: message.id },
                                  });
                                }}
                              >
                                <div>
                                  <a>
                                    <img
                                      style={{
                                        width: "37px",
                                        height: "38px",
                                        cursor: "pointer",
                                        borderRadius: 0,
                                      }}
                                      src={messageIcon}
                                      onError={(e) => {
                                        e.currentTarget.src = WithoutLyrics;
                                      }}
                                      alt={message.name}
                                      title={message.name}
                                      onClick={() => { }}
                                    />
                                    <p
                                      style={{
                                        color: "#3f220d",
                                        fontSize: "18px",
                                        lineHeight: "22px",
                                        margin: "20px 0 0",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {message.name}
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12" style={{ marginTop: "30px" }}>
                        <ListPagination
                          totalRecords={pagination.totalRecords}
                          recordsPerPage={pagination.recordsPerPage}
                          onClick={(p) => {
                            setPagination({
                              ...pagination,
                              pageNo: p,
                            });
                            setRefresh(true);
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="ebooks-category resultnotfound">
                      <Loading />
                      {t("result_not_found_tr")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessagesPage;
