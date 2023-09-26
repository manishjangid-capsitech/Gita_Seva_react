/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ProfileService from "../Services/Profile";
import { _get_i18Lang } from "../i18n";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import $ from "jquery";
import HomeService from "../Services/Home";
import { Button } from "react-bootstrap";
import "../Styles/Profile.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import ProfileSidePanel from "./ProfileSidePanel";

export interface userinfoEnum {
  name: string;
  email: string;
  baseFile: any;
  address1: any;
  address2: string;
  city: string;
  state: string;
  country: string;
  countrytype: string;
  pinCode: string;
  language: string;
  mobileNo: string;
}

interface contactProps {
  name: string;
  phoneNumber: string;
  email: string;
  feedbacktype: string;
  comment: string;
}

export const ProfileContact = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const colors = "#FF9800";

  const [showModel, setShowModel] = useState<boolean>(false);

  const currentLanguage = _get_i18Lang();

  const [data, setData] = useState<contactProps>({
    name: "",
    phoneNumber: "",
    email: "",
    feedbacktype: "",
    comment: "",
  });

  const [error, setError] = React.useState<{
    show: boolean;
    number: string | undefined;
    name: string | undefined;
    email: string | undefined;
    note: string | undefined;
  }>({
    show: false,
    number: undefined,
    name: undefined,
    email: undefined,
    note: undefined,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleValidation();
    // if (!error.email || !error.number && !error.name && !error.note ) {
    let newEntry = {
      ...data,
      feedbacktype: parseInt(data.feedbacktype),
    };

    if (data.name !== "" && data.comment !== "") {
      if (data.comment.length > 0) {
        newEntry.comment = "message from Gita seva trust: " + newEntry.comment;
        HomeService.sendFeedback(
          data.name,
          data.phoneNumber,
          data.email,
          data.feedbacktype,
          data.comment
        ).then((result: any) => {
          if (result.status) {
            // setShowContactModel(true);
            setData({
              name: "",
              phoneNumber: "",
              email: "",
              comment: "",
              feedbacktype: "1",
            });
          }
        });
      }
    }
  };

  const handleValidation = () => {
    setError((e) => ({
      ...e,
      note:
        data.comment?.trim() === ""
          ? "Please enter a valid message"
          : undefined,
    }));
  };

  useEffect(() => {
    ProfileService.getProfile(_get_i18Lang())
      .then((res) => {
        setData({
          ...data,
          name: res.result.name,
          phoneNumber: res.result.phoneNumber,
          email: res.result?.email,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
            {t("Profile_tr")}
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
              <span style={{ color: "#2d2a29" }}>/ {t("Profile_tr")}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="newcontainer"
        style={{
          backgroundColor: "#FFF6E1",
          padding: "1% 0 3% 0",
          marginTop: 0,
        }}
      >
        <div className="containers">
          <div className="row">
            <ProfileSidePanel color={colors} />
            <div className="col-9">
              <div
                className="tab-content"
                id="nav-tabContent"
                style={{ boxShadow: "0 0 7px 1px #f5deb1" }}
              >
                <div
                  className="tab-pane fade show active"
                  id="e-books"
                  role="tabpanel"
                  style={{ overflow: "hidden" }}
                  aria-labelledby="e-books-tab"
                >
                  <div className="tab-row">
                    <div className="tabscroll">
                      <div
                        style={{
                          background: "#fffaf0",
                          padding: "10px 20px",
                          boxShadow: "0 0 7px 1px #f5deb1!important",
                          height: "555px",
                          // width: "130%",
                          fontFamily: "ChanakyaUni",
                        }}
                      >
                        <div style={{ display: "grid" }}>
                          <span
                            style={{
                              color: "#d11501",
                              fontSize: "32px",
                              margin: "0 0 10px",
                              fontStyle: "normal",
                              fontFamily: "ChanakyaUniBold",
                              //   marginTop: "30px",
                            }}
                          >
                            {t("contact_tr")}
                          </span>
                          <div
                            style={{
                              //   border: "1px solid #e8d7d7",
                              //   padding: "20px",
                              //   borderRadius: "10px",
                              padding: "20px",
                              borderRadius: "10px",
                              width: "80%",
                              margin: "0 0 0 115px",
                            }}
                          >
                            <form>
                              <div className="row" style={{ display: "flex" }}>
                                <div style={{ display: "flex" }}>
                                  {/* <span
                                    style={{
                                      //   fontSize: "22px",
                                      marginLeft: "10px",
                                      color: "#777",
                                      float: "left",
                                      //   width: "20%",
                                      //   color: "#472d1e",
                                      fontWeight: 400,
                                      width: "115px",
                                      //   margin: 0,
                                      fontSize: "23px",
                                      fontFamily: "ChanakyaUni",
                                    }}
                                  >
                                    {t("Name_tr")}
                                  </span> */}
                                  <input
                                    style={{
                                      width: "500px",
                                      height: "35px",
                                      fontSize: "22px",
                                      marginRight: "22px",
                                      marginBottom: "15px",
                                      border: "1px solid gray",
                                      borderRadius: "4px",
                                    }}
                                    name="name"
                                    id="name"
                                    placeholder={t("Name_tr")}
                                    autoComplete="off"
                                    onChange={(e) => {
                                      setError((e) => ({
                                        ...e,
                                        name: undefined,
                                      }));
                                      let v =
                                        e.currentTarget?.value ?? undefined;
                                      setData({
                                        ...data,
                                        name: v,
                                      });
                                    }}
                                    value={data.name}
                                    className="contactContent"
                                    onBlur={(e) => {
                                      let value =
                                        e.currentTarget?.value ?? undefined;
                                      if (value === undefined || value === "") {
                                        setError((e) => ({
                                          ...e,
                                          name: "Please enter a valid name",
                                        }));
                                      } else {
                                        setData({
                                          ...data,
                                          name: value?.trim(),
                                        });
                                      }
                                    }}
                                  />
                                  {/* {error.name && (
                                    <small
                                      style={{
                                        color: "red",
                                        marginLeft: 5,
                                        fontSize: "18px",
                                      }}
                                    >
                                      {error.name}
                                    </small>
                                  )} */}
                                </div>
                                <div>
                                  <input
                                    style={{
                                      width: "500px",
                                      height: "35px",
                                      fontSize: "22px",
                                      marginRight: "22px",
                                      background:
                                        data.phoneNumber.length > 0
                                          ? "#E9ECEF"
                                          : "#fff",
                                      border: "1px solid gray",
                                      borderRadius: "4px",
                                    }}
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    type="number"
                                    maxLength={10}
                                    max={10}
                                    placeholder={t("Mobile_No_tr")}
                                    onClick={() => {
                                      setShowModel(true);
                                    }}
                                    value={data.phoneNumber}
                                    className="input contactContent"
                                    // onBlur={(e) => {
                                    //   let value =
                                    //     e.currentTarget?.value ?? undefined;
                                    //   if (
                                    //     value !== undefined &&
                                    //     value.length !== 10
                                    //   ) {
                                    //     setError((e) => ({
                                    //       ...e,
                                    //       number:
                                    //         "Please enter 10 digit mobile number",
                                    //     }));
                                    //   } else {
                                    //     setData({
                                    //       ...data,
                                    //       phoneNumber: value?.trim(),
                                    //     });
                                    //   }
                                    // }}
                                  />
                                </div>
                              </div>
                              <div
                                className="row"
                                style={{ marginTop: "15px" }}
                              >
                                <div>
                                  <input
                                    style={{
                                      width: "500px",
                                      height: "35px",
                                      fontSize: "22px",
                                      marginRight: "22px",
                                      marginBottom: "15px",
                                      background:
                                        data.email.length > 0
                                          ? "#E9ECEF"
                                          : "#fff",
                                      border: "1px solid gray",
                                      borderRadius: "4px",
                                    }}
                                    name="email"
                                    type="email"
                                    placeholder={t("E_Mail_tr")}
                                    onClick={() => {
                                      setShowModel(true);
                                    }}
                                    value={data.email}
                                    className="contactContent"
                                    required
                                  />
                                  {/* {error.email && (
                                    <small
                                      style={{
                                        color: "red",
                                        marginLeft: 5,
                                        fontSize: "18px",
                                      }}
                                    >
                                      {error.email}
                                    </small>
                                  )} */}
                                </div>
                                <div>
                                  <select
                                    style={{
                                      width: "500px",
                                      height: "35px",
                                      fontSize: "22px",
                                      marginRight: "22px",
                                      // padding: "0 0 0 10px",
                                      // marginBottom: "15px",
                                    }}
                                    name="contactType"
                                    defaultValue={"1"}
                                    value={data.feedbacktype}
                                    className="contactContent"
                                    onChange={(e) => {
                                      let v =
                                        e.currentTarget?.value ?? undefined;
                                      setData({
                                        ...data,
                                        feedbacktype: v,
                                      });
                                    }}
                                  >
                                    <option value="1">
                                      {t("generalQuery_tr")}
                                    </option>
                                    <option value="2">{t("E_books_tr")}</option>
                                    <option value="3"> {t("Audios_tr")}</option>
                                    <option value="4">
                                      {t("Pravachan_tr")}
                                    </option>
                                    <option value="5">{t("Article_tr")}</option>
                                    <option value="6">{t("Kalyan_tr")}</option>
                                    <option value="7">
                                      {t("Kalyan_Kalpataru_tr")}
                                    </option>
                                    <option value="8">
                                      {t("MonthlyMagazine_tr")}
                                    </option>
                                    <option value="9">{t("other_tr")}</option>
                                  </select>
                                </div>
                              </div>
                              <div
                                className="row"
                                style={{ marginTop: "15px" }}
                              >
                                <div
                                  //   className="col-12"
                                  style={{ display: "grid" }}
                                >
                                  <textarea
                                    name="messageContent"
                                    placeholder={t("your_suggestions_tr")}
                                    onChange={(e) => {
                                      setError((e) => ({
                                        ...e,
                                        note: undefined,
                                      }));
                                      let v =
                                        e.currentTarget?.value ?? undefined;
                                      setData({
                                        ...data,
                                        comment: v,
                                      });
                                    }}
                                    value={data.comment}
                                    className="contactContent"
                                    style={{
                                      width: "500px",
                                      // height: "35px",
                                      fontSize: "22px",
                                      marginRight: "22px",
                                      marginBottom: "15px",
                                      height: "100px",
                                    }}
                                    onBlur={(e) => {
                                      let value =
                                        e.currentTarget?.value ?? undefined;
                                      if (value === undefined || value === "") {
                                        setError((e) => ({
                                          ...e,
                                          note: "Please enter a valid message",
                                        }));
                                      } else {
                                        setData({
                                          ...data,
                                          comment: value?.trim(),
                                        });
                                      }
                                    }}
                                  />
                                  {error.note && (
                                    <small
                                      style={{
                                        color: "red",
                                        marginLeft: 5,
                                        fontSize: "18px",
                                      }}
                                    >
                                      {error.note}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div style={{ textAlign: "center" }}>
                                <button
                                  className="inputbutton"
                                  onClick={handleSubmit}
                                  formNoValidate
                                >
                                  {t("send_message_tr")}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <Dialog open={showModel}>
                          <DialogContent>
                            <DialogContentText>
                              <div>
                                <label
                                  style={{
                                    fontSize: "16px",
                                    textAlign: "center",
                                    color: "#000",
                                    width: "225px",
                                    margin: "0 0 -20px 0",
                                    padding: "8px 0",
                                    minHeight: "52px",
                                    fontFamily: "ChanakyaUni",
                                    scrollbarWidth: "none",
                                  }}
                                >
                                  {currentLanguage === "hindi" ? (
                                    <label>
                                      क्या आप प्रोफ़ाइल अपडेट करना चाहते हैं{" "}
                                    </label>
                                  ) : (
                                    <label>
                                      Are You sure to update profile?{" "}
                                    </label>
                                  )}
                                </label>
                              </div>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              onClick={() => {
                                setShowModel(false);
                                navigate(`/profile`);
                              }}
                              style={{
                                backgroundColor: "#f44336",
                                color: "#fff",
                                padding: "5px 20px",
                              }}
                              autoFocus
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={() => {
                                setShowModel(false);
                              }}
                              style={{
                                boxShadow:
                                  "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
                                color: "#212121",
                                boxSizing: "border-box",
                                border: "1px solid #E8E8E8",
                                background: "#fff",
                                padding: "5px 20px",
                              }}
                              autoFocus
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
