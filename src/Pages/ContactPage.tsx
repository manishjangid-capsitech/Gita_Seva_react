import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import HomeService from "../Services/Home";
import { _get_i18Lang } from "../i18n";
import "../Styles/Home.css";

interface contactProps {
  name: string;
  phoneNumber: string;
  email: string;
  messageContent: string;
  contactType: string;
  userId: string;
  medium: 1;
  deviceDetails: string;
}

export const ContactPage = () => {
  const { t } = useTranslation();
  const [showModel, setShowModel] = useState(false);
  const currentLanguage = _get_i18Lang();

  const [data, setData] = useState<contactProps>({
    name: "",
    phoneNumber: "",
    email: "",
    messageContent: "",
    contactType: "1",
    userId: "",
    medium: 1,
    deviceDetails: "",
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

  const isValidEmail = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleValidation();
    if (!error.email && !error.name && !error.note && !error.number) {
      let newEntry = {
        ...data,
        contactType: parseInt(data.contactType),
      };

      if (
        data.name !== "" &&
        data.email !== "" &&
        data.phoneNumber !== "" &&
        data.messageContent !== ""
      ) {
        if (data.messageContent.length > 0 && data.phoneNumber.length === 10) {
          newEntry.messageContent =
            "message from swamiji: " + newEntry.messageContent;
          HomeService.postcontact(newEntry).then((result: any) => {
            if (result.status) {
              setShowModel(true);
              setData({
                name: "",
                phoneNumber: "",
                email: "",
                messageContent: "",
                contactType: "1",
                userId: "",
                medium: 1,
                deviceDetails: "",
              });
            }
          });
        }
      }
    } else {
    }
  };

  const handleValidation = () => {
    setError((e) => ({
      ...e,
      name: data.name?.trim() === "" ? "Please enter a valid name" : undefined,
      number:
        data.phoneNumber?.trim() === ""
          ? "Please enter a valid mobile number"
          : undefined,
      email:
        data.email?.trim() === ""
          ? "Please enter a valid email address"
          : error.email === undefined
          ? undefined
          : error.email,
      note:
        data.messageContent?.trim() === ""
          ? "Please enter a valid message"
          : undefined,
    }));
  };

  return (
    <div className="row">
      <div className="col-12">
        <div style={{ display: "grid" }}>
          <span
            style={{
              color: "#d11501",
              fontSize: "32px",
              margin: "20px 0px 10px",
              fontStyle: "normal",
              fontFamily: "ChanakyaUniBold",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            {t("contact_tr")}
          </span>
          <div
            style={{
              border: "1px solid #e8d7d7",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <form>
              <div className="row" style={{ display: "flex" }}>
                <div className="col-lg-6 col-md-12 col-xs-12">
                  <input
                    name="name"
                    id="name"
                    placeholder={t("Name_tr")}
                    autoComplete="off"
                    onChange={(e) => {
                      setError((e) => ({ ...e, name: undefined }));
                      let v = e.currentTarget?.value ?? undefined;
                      setData({
                        ...data,
                        name: v,
                      });
                    }}
                    value={data.name}
                    className="contactContent"
                    style={{
                      marginRight: "22px",
                      width: "-webkit-fill-available",
                    }}
                    onBlur={(e) => {
                      let value = e.currentTarget?.value ?? undefined;
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
                      style={{ color: "red", marginLeft: 5, fontSize: "18px" }}
                    >
                      {error.name}
                    </small>
                  )}
                </div>
                <div className="col-lg-6 col-md-12 col-xs-12">
                  <input
                    name="phoneNumber"
                    id="phoneNumber"
                    type="number"
                    maxLength={10}
                    placeholder={t("Mobile_No_tr")}
                    onChange={(e) => {
                      setError((e) => ({ ...e, number: undefined }));
                      let v = e.currentTarget?.value ?? undefined;
                      if (data.phoneNumber?.trim().length <= 9) {
                        setData({
                          ...data,
                          phoneNumber: v,
                        });
                      } else {
                        setData({
                          ...data,
                          phoneNumber: "",
                        });
                      }
                    }}
                    value={data.phoneNumber}
                    className="input contactContent"
                    style={{
                      marginRight: "22px",
                      width: "-webkit-fill-available",
                    }}
                    onBlur={(e) => {
                      let value = e.currentTarget?.value ?? undefined;
                      if (value !== undefined && value.length !== 10) {
                        setError((e) => ({
                          ...e,
                          number: "Please enter 10 digit mobile number",
                        }));
                      } else {
                        setData({
                          ...data,
                          phoneNumber: value?.trim(),
                        });
                      }
                    }}
                  />
                  {error.number && (
                    <small
                      style={{ color: "red", marginLeft: 5, fontSize: "18px" }}
                    >
                      {error.number}
                    </small>
                  )}
                </div>
              </div>
              <div className="row" style={{ marginTop: "15px" }}>
                <div className="col-lg-6 col-md-12 col-xs-12">
                  <input
                    name="email"
                    type="email"
                    placeholder={t("E_Mail_tr")}
                    onChange={(e) => {
                      setError((e) => ({ ...e, email: undefined }));
                      let v = e.currentTarget?.value ?? undefined;
                      setData({
                        ...data,
                        email: v,
                      });
                    }}
                    value={data.email}
                    className="contactContent"
                    style={{
                      marginRight: "22px",
                      width: "-webkit-fill-available",
                    }}
                    onBlur={(e) => {
                      let value = e.currentTarget?.value ?? undefined;
                      if (value !== undefined && !value.match(isValidEmail)) {
                        setError((e) => ({
                          ...e,
                          email: "Please enter a valid email address",
                        }));
                        // setValidation({
                        //   ...validation,
                        //   email: "Please enter a valid email address",
                        // });
                      } else {
                        setData({
                          ...data,
                          email: value?.trim(),
                        });
                      }
                    }}
                    required
                  />
                  {error.email && (
                    <small
                      style={{ color: "red", marginLeft: 5, fontSize: "18px" }}
                    >
                      {error.email}
                    </small>
                  )}
                </div>
                <div className="col-lg-6 col-md-12 col-xs-12">
                  <select
                    name="contactType"
                    defaultValue={"1"}
                    value={data.contactType}
                    className="contactContent"
                    onChange={(e) => {
                      let v = e.currentTarget?.value ?? undefined;
                      setData({
                        ...data,
                        contactType: v,
                      });
                    }}
                    style={{
                      marginRight: "22px",
                      width: "-webkit-fill-available",                    
                    }}
                  >
                    <option value="1">{t("generalQuery_tr")}</option>
                    <option value="2"> {t("E_books_tr")}</option>
                    <option value="3"> {t("Pravachan_tr")}</option>
                    <option value="4"> {t("Audios_tr")}</option>
                    <option value="5"> {t("Article_tr")}</option>
                    <option value="6"> {t("Amrit_Vachan_tr")}</option>
                    <option value="7">{t("other_tr")}</option>
                  </select>
                </div>
              </div>
              <div className="row" style={{ marginTop: "15px" }}>
                <div className="col-12" style={{ display: "grid" }}>
                  <textarea
                    name="messageContent"
                    placeholder={t("your_suggestions_tr")}
                    onChange={(e) => {
                      setError((e) => ({ ...e, note: undefined }));
                      let v = e.currentTarget?.value ?? undefined;
                      setData({
                        ...data,
                        messageContent: v,
                      });
                    }}
                    value={data.messageContent}
                    className="contactContent"
                    style={{
                      height: "100px",
                      marginRight: "22px",
                      width: "-webkit-fill-available",
                    }}
                    onBlur={(e) => {
                      let value = e.currentTarget?.value ?? undefined;
                      if (value === undefined || value === "") {
                        setError((e) => ({
                          ...e,
                          note: "Please enter a valid message",
                        }));
                      } else {
                        setData({
                          ...data,
                          messageContent: value?.trim(),
                        });
                      }
                    }}
                  />
                  {error.note && (
                    <small
                      style={{ color: "red", marginLeft: 5, fontSize: "18px" }}
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
                  style={{ fontSize: "20px" }}
                >
                  {t("send_tr")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
