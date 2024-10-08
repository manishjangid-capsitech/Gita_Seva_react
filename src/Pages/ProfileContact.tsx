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
    name: localStorage.getItem("UserName") || "",
    phoneNumber: localStorage.getItem("Phone") || "",
    email: localStorage.getItem("Email") || "",
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
  console.log("error.name", error.name);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleValidation();
    if (!error.email || !error.number && !error.name && !error.note) {
      let newEntry = {
        ...data,
        feedbacktype: parseInt(data.feedbacktype),
      };

      if (data.name !== "" && data.comment !== "") {
        if (data?.comment?.length > 0) {
          newEntry.comment = newEntry.comment;
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
    }
  };

  const handleValidation = () => {
    setError((e) => ({
      ...e,
      name: data.name?.trim() === "" ? "Please enter a valid name" : undefined,
      number: data.phoneNumber?.trim() === ""
        ? "Please enter a valid mobile number"
        : undefined,
      email: data.email?.trim() === ""
        ? "Please enter a valid email address"
        : error.email === undefined
          ? undefined
          : error.email,
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
  }, [data.feedbacktype, localStorage.getItem("UserId")]);

  console.log("localStorage.getItem('Email')", localStorage.getItem('Email'));


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
              fontFamily: "ChanakyaUniBold"
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
          padding: "25px 0 3% 0",
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
                  <div className="" style={{ display: "flex", paddingTop: "20px" }}>
                    <div className="" >
                      <div
                        style={{
                          background: "#fffaf0",
                          padding: "0px 10px 20px 20px",
                          boxShadow: "0 0 7px 1px #f5deb1!important",
                          height: "555px",
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
                            }}
                          >
                            {t("contact_tr")}
                          </span>
                          <div
                            style={{
                              padding: "20px",
                              borderRadius: "10px",
                              width: "80%",
                              margin: "0 0 0 115px",
                            }}
                          >
                            <form>
                              <div className="row" style={{ display: "flex" }}>
                                <div style={{ display: "grid", marginBottom: "15px" }}>
                                  <input
                                    style={{
                                      width: "500px",
                                      height: "35px",
                                      fontSize: "22px",
                                      paddingLeft: "15px",
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
                                  {error.name && (
                                    <small
                                      style={{ color: "red", margin: "3px 0px -12px 5px", fontSize: "18px" }}
                                    >
                                      {error.name}
                                    </small>
                                  )}
                                </div>
                                <div>
                                  {/* {localStorage.getItem("Phone") ?
                                    <label className="contactContent" style={{ width: "500px", height: "35px", padding: "4px 0 0 15px", background: "#efefef" }}>{localStorage.getItem('Phone') || t("Mobile_No_tr")}</label>
                                    : */}
                                  <div style={{ display: "grid", marginBottom: "15px", }}>
                                    <input
                                      style={{
                                        width: "500px",
                                        height: "35px",
                                        fontSize: "22px",
                                        paddingLeft: "15px",
                                        background:
                                          data?.phoneNumber?.length > 0
                                            ? "#E9ECEF"
                                            : "#fff",
                                        border: "1px solid gray",
                                        borderRadius: "4px",
                                      }}
                                      name="phoneNumber"
                                      id="phoneNumber"
                                      type="number"
                                      disabled={localStorage.getItem("PhoneNumberSe") === "true"}
                                      maxLength={10}
                                      max={10}
                                      placeholder={t("Mobile_No_tr")}
                                      onClick={() => {
                                        setShowModel(true);
                                      }}
                                      value={data.phoneNumber}
                                      className="input contactContent"
                                    />
                                    {error.number && (
                                      <small
                                        style={{ color: "red", margin: "3px 0 -12px 5px", fontSize: "18px" }}
                                      >
                                        {error.number}
                                      </small>
                                    )}
                                  </div>
                                  {/* } */}
                                </div>
                              </div>
                              <div
                                className="row"
                              >
                                <div style={{ display: "grid", marginBottom: "15px" }}>
                                  <input
                                    style={{
                                      width: "500px",
                                      height: "35px",
                                      fontSize: "22px",
                                      paddingLeft: "15px",

                                      background:
                                        data?.email?.length > 0
                                          ? "#E9ECEF"
                                          : "#fff",
                                      border: "1px solid gray",
                                      borderRadius: "4px",
                                    }}
                                    name="email"
                                    type="email"
                                    disabled={localStorage.getItem("EmailIdSe") === "true"}
                                    placeholder={t("E_Mail_tr")}
                                    onClick={() => {
                                      setShowModel(true);
                                    }}
                                    value={data.email}
                                    className="contactContent"
                                    required
                                  />
                                  {error.email && (
                                    <small
                                      style={{ color: "red", margin: "3px 0 -12px 5px", fontSize: "18px" }}
                                    >
                                      {error.email}
                                    </small>
                                  )}
                                </div>
                                <div>
                                  <select
                                    style={{
                                      width: "500px",
                                      height: "35px",
                                      fontSize: "22px",
                                      padding: "0 0 0 12px",
                                      borderRadius: "4px",
                                    }}
                                    name="feedbacktype"
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
                                    <option value="9">{t("vivek_vani_tr")}</option>
                                    <option value="10">{t("other_tr")}</option>
                                  </select>
                                </div>
                              </div>
                              <div
                                className="row"
                                style={{ marginTop: "15px" }}
                              >
                                <div style={{ display: "grid" }}>
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
                                      fontSize: "22px",
                                      paddingLeft: "15px",
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
