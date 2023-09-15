/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ProfileService from "../Services/Profile";
import i18n, { _get_i18Lang } from "../i18n";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditIcon from "../assets/img/mark-grey.png";
import BackArrow from "../assets/img/leftArrow1.png";
import $ from "jquery";
import { LogOutModel, UploadProfileImage } from "./LogInoutModel";
import "../Styles/Profile.css";

export interface IUserModel {
  userId?: string;
  name: string;
  email: string;
  baseFile: any;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  countrytype: string;
  pinCode: string;
  language: string;
  phoneNumber: string;
  displaycity: string;
  displaycountry: string;
  displaystate: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const UserImage = localStorage.getItem("Image");
  const [selectedMenu, setSelectedMenu] = useState<any>("");
  const [hide, setHide] = useState(false);
  const [states, setStates] = useState<any>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [countrys, setCountrys] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState<IUserModel>({
    name: "",
    email: "",
    baseFile: 0,
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    countrytype: "",
    pinCode: "",
    language: "",
    phoneNumber: "",
    displaycity: "",
    displaycountry: "",
    displaystate: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    setRefresh(false);
    ProfileService.getProfile(_get_i18Lang())
      .then((res) => {
        setData({
          ...data,
          name: res.result.name,
          phoneNumber: res.result.phoneNumber,
          email: res.result?.email,
          address1: res?.result?.address?.address1,
          address2: res?.result?.address?.address2,
          country: res?.result?.address?.country,
          state: res?.result?.address?.state,
          city: res?.result?.address?.city,
          pinCode: res?.result?.address?.pinCode,
          displaycity: res?.result?.addressDisplay?.city,
          displaycountry: res?.result?.addressDisplay?.country,
          displaystate: res?.result?.addressDisplay?.state,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    ProfileService.getCountry(_get_i18Lang())
      .then((res) => {
        setCountrys(res.result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    ProfileService.getState(_get_i18Lang())
      .then((res) => {
        setStates(res.result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [refresh, i18n.language]);

  useEffect(() => {
    setRefresh(false);
    if (data?.state && states) {
      let stateId = states?.find(
        (state: any) => state?.name === data?.state
      )?.id;
      if (stateId) {
        getDistrict(stateId);
      }
    }
  }, [data?.state, refresh, i18n.language]);

  const getDistrict = async (id: string) => {
    if (id) {
      const res = await ProfileService.getDistrict(id, _get_i18Lang());
      if (res?.status) {
        setDistrict(res?.result);
        setData({ ...data, city: res?.result[0]?.name });
      } else {
        console.error("Error fetching data:", res?.message);
      }
    }
  };

  useEffect(() => {
    $(".CategoryList > span").removeClass("#000000");
    $("#profile-" + selectedMenu).addClass("#000000");
  }, [selectedMenu]);

  useEffect(() => {
    if (window.location.pathname === "/profile") {
      $(".CategoryList > span").removeClass("listActive");
      $("#profile-" + selectedMenu).addClass("listActive");
    }
  }, [selectedMenu]);

  function activetab(PId: string) {
    $("#nav-tab > button").removeClass("active");
    $("#" + PId + "-tab").addClass("active");
    $("#nav-tabContent > div").removeClass("show active");
    $("#" + PId).addClass("show active");
  }
  useEffect(() => {
    if (data.phoneNumber.length > 10) {
      data.phoneNumber.slice(0, 3);
    }
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
        }}
      >
        <div className="breadcrumbs">
          <div
            className="containers"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "rgb(209, 21, 1)",
              marginLeft: "14%",
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
          backgroundColor: "#fffaf0",
          padding: "27px 0 0 0",
          marginTop: 0,
        }}
      >
        <div className="containers" style={{ height: "800px" }}>
          <div className="row">
            <div
              className="col-3"
              style={{
                backgroundColor: "#FFFAF0",
                padding: "16px",
                boxShadow: "0 0 7px 1px #f5deb1",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "#fb8c1c",
                  padding: "7px",
                  borderRadius: "2px",
                }}
              >
                {UserImage ? (
                  <img
                    id="userimg"
                    src={UserImage}
                    // src="https://gitaseva.org/assets/img/profile-image1.png"
                    title="User Login"
                    alt="user"
                    style={{ width: "200px", height: "200px" }}
                  />
                ) : (
                  <img
                    id="userimg"
                    src="https://gitaseva.org/assets/img/profile-image1.png"
                    title="User Login"
                    className="nousericon"
                    alt="user"
                    style={{ width: "200px", height: "200px" }}
                  />
                )}
                <h6
                  style={{
                    fontFamily: "ChanakyaUni",
                    color: "#fffaf0",
                    margin: "15px 0 -5px",
                    fontSize: "21px",
                  }}
                >
                  {localStorage.getItem("userName")}
                </h6>
              </div>

              <nav>
                <div
                  className="nav nav-tabs"
                  id="nav-tab"
                  role="tablist"
                  style={{ display: "grid", border: "none" }}
                >
                  <div style={{ borderBottom: "1px solid #f5dca0" }}>
                    <div style={{ margin: "10px 100px 0px 60px" }}>
                      <img
                        src="https://gitaseva.org/assets/img/profile-icon1.png"
                        alt="profile"
                        style={{
                          height: "22px",
                          width: "20px",
                          marginTop: "5px",
                        }}
                      />
                      <button
                        style={{
                          color: "#FF984D",
                          fontSize: "25px",
                          fontFamily: "ChanakyaUni",
                          padding: "0 16px",
                          border: "none",
                          // fontWeight: 600,
                          background: "#FFFAF0",
                          borderBottom: "1px solid #f5dca0",
                        }}
                        className="nav-link active"
                        id="e-books-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#e-books"
                        type="button"
                        role="tab"
                        aria-controls="e-books"
                        aria-selected="true"
                        onClick={() => {
                          activetab("e-books");
                          navigate(`/profile`);
                        }}
                      >
                        {t("Profile_tr")}
                      </button>
                    </div>
                  </div>
                  <div style={{ borderBottom: "1px solid #f5dca0" }}>
                    <div style={{ margin: "10px 55px 0px 60px" }}>
                      <img
                        src="https://gitaseva.org/assets/img/profile-icon2.png"
                        alt="profile"
                        style={{
                          height: "22px",
                          width: "20px",
                          marginTop: "5px",
                        }}
                      />
                      <button
                        style={{
                          color: "#472D1E",
                          fontSize: "25px",
                          fontFamily: "ChanakyaUni",
                          padding: "0 35px 0 0",
                          border: "none",
                          // fontWeight: 600,
                          background: "#FFFAF0",
                          borderBottom: "1px solid #f5dca0",
                        }}
                        className="nav-link"
                        id="audios-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#audios"
                        type="button"
                        role="tab"
                        aria-controls="audios"
                        aria-selected="false"
                        onClick={() => {
                          activetab("audios");
                          navigate(`/profile/fav`);
                        }}
                      >
                        {t("Favourite_tr")}
                      </button>
                    </div>
                  </div>
                  <div style={{ borderBottom: "1px solid #f5dca0" }}>
                    <div style={{ margin: "10px 38px 0px 60px" }}>
                      <img
                        src="https://gitaseva.org/assets/img/profile-icon4.png"
                        alt="profile"
                        style={{
                          height: "22px",
                          width: "20px",
                          marginTop: "5px",
                        }}
                      />
                      <button
                        style={{
                          color: "#472D1E",
                          fontSize: "25px",
                          fontFamily: "ChanakyaUni",
                          padding: "0 40px 0 0",
                          border: "none",
                          // fontWeight: 600,
                          background: "#FFFAF0",
                          borderBottom: "1px solid #f5dca0",
                        }}
                        className="nav-link"
                        id="pravachans-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#pravachans"
                        type="button"
                        role="tab"
                        aria-controls="pravachans"
                        aria-selected="false"
                        onClick={() => {
                          activetab("pravachans");
                          navigate(`/profile/feedback`);
                        }}
                      >
                        {t("Help_tr")}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div style={{ margin: "10px 105px 0px 60px" }}>
                      <img
                        src="https://gitaseva.org/assets/img/logout.png"
                        alt="profile"
                        style={{
                          height: "22px",
                          width: "20px",
                          marginTop: "5px",
                        }}
                      />
                      <button
                        style={{
                          color: "#472D1E",
                          fontSize: "25px",
                          fontFamily: "ChanakyaUni",
                          padding: "0 ",
                          border: "none",
                          // fontWeight: 600,
                          background: "#FFFAF0",
                        }}
                        className="nav-link"
                        id="articles-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#articles"
                        type="button"
                        role="tab"
                        aria-controls="articles"
                        aria-selected="false"
                        onClick={() => {
                          activetab("articles");
                          setIsDialogOpen(true);
                        }}
                      >
                        {t("LogOut_tr")}
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
              <LogOutModel open={isDialogOpen} onClose={handleCloseDialog} />
            </div>
            {/* <ProfileSidebar /> */}

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
                          padding: "10px 20px",
                          boxShadow: "0 0 7px 1px #f5deb1!important",
                          height: hide ? "40%" : "18%",
                          fontFamily: "ChanakyaUni",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h2
                            style={{
                              fontFamily: "ChanakyaUni",
                              fontWeight: 700,
                              fontStyle: "normal",
                              color: "#b42a38",
                              fontSize: "26px",
                              margin: "0 0 15px",
                            }}
                          >
                            {t("personal_information_date_tr")}
                          </h2>
                          <div
                            style={{ cursor: "pointer", height: 0 }}
                            onClick={() => {
                              setHide((x) => !x);
                            }}
                          >
                            {hide ? (
                              <img
                                src={BackArrow}
                                alt="BackArrow"
                                height="21px"
                                style={{ marginRight: "5px" }}
                              />
                            ) : (
                              <img
                                src={EditIcon}
                                alt="EditIcon"
                                height="21px"
                              />
                            )}
                          </div>
                        </div>
                        <div style={{ display: "grid", float: "left" }}>
                          <div
                            style={{
                              width: "215px",
                              float: "left",
                              height: hide ? "145px" : "619px",
                            }}
                          >
                            {UserImage ? (
                              <img
                                id="userimg"
                                src={UserImage}
                                // src="https://gitaseva.org/assets/img/profile-image1.png"
                                title="User Login"
                                alt="user"
                                width="140"
                              />
                            ) : (
                              <img
                                id="userimg"
                                src="https://gitaseva.org/assets/img/profile-image1.png"
                                title="User Login"
                                className="nousericon"
                                alt="user"
                                width="140"
                              />
                            )}
                          </div>
                          <div
                            style={{
                              display: hide ? "block" : "none",
                              height: hide ? "474px" : "0",
                            }}
                          >
                            <UploadProfileImage />
                          </div>
                        </div>
                        <div key={data.phoneNumber}>
                          <form>
                            <div className="inputDiv">
                              <h6
                                className="inputBoxHeading"
                                style={{ width: "115px" }}
                              >
                                {t("Name_tr")}
                              </h6>
                              <input
                                value={data.name}
                                disabled={!hide}
                                className="inputBoxStyle"
                                style={{ color: hide ? "#000" : "#ff731f" }}
                                onChange={(evt: any) => {
                                  let value = evt.target.value;
                                  setData((d: IUserModel) => ({
                                    ...d,
                                    name: value!,
                                  }));
                                }}
                              />
                            </div>

                            <div className="inputDiv">
                              <h6
                                className="inputBoxHeading"
                                style={{ width: "117px" }}
                              >
                                {t("Mobile_No_tr")}
                              </h6>
                              <input
                                disabled={!hide}
                                type="number"
                                className="inputBoxStyle"
                                style={{ color: hide ? "#000" : "#ff731f" }}
                                value={data.phoneNumber}
                                onChange={(evt: any) => {
                                  let value = evt.target.value;
                                  if (
                                    value !== undefined &&
                                    value.length !== 11
                                  ) {
                                    setData((d: any) => ({
                                      ...d,
                                      phoneNumber: value!,
                                    }));
                                  }
                                }}
                              />
                            </div>

                            <div className="inputDiv">
                              <h6
                                className="inputBoxHeading"
                                style={{ width: "117px" }}
                              >
                                {t("E_Mail_tr")}
                              </h6>
                              <input
                                disabled={!hide}
                                className="inputBoxStyle"
                                value={data.email}
                                style={{ color: hide ? "#000" : "#ff731f" }}
                                onChange={(evt: any) => {
                                  let value = evt.target.value;
                                  setData((d: IUserModel) => ({
                                    ...d,
                                    email: value!,
                                  }));
                                }}
                              />
                            </div>

                            <div
                              className="inputDiv"
                              style={{ display: hide ? "none" : "flex" }}
                            >
                              <h6
                                className="inputBoxHeading"
                                style={{ width: "117px" }}
                              >
                                {t("Address_tr")}
                              </h6>
                              <div
                                className=""
                                style={{
                                  color: hide ? "#000" : "#ff731f",
                                  lineHeight: "25px",
                                  width: "500px",
                                  height: "110px",
                                  fontSize: "21px",
                                  border: "1px solid gray",
                                  borderRadius: "4px",
                                  padding: "5px 0 0 6px",
                                }}
                              >
                                <p style={{ margin: 0, fontSize: "21px" }}>
                                  {data.address1}
                                </p>

                                <p style={{ margin: 0, fontSize: "21px" }}>
                                  {data.address2}
                                </p>
                                <div
                                  style={{ display: "flex", height: "23px" }}
                                >
                                  <p
                                    style={{
                                      margin: "0 10px 0 0",
                                      fontSize: "21px",
                                    }}
                                  >
                                    {data?.displaycity}
                                  </p>
                                  <p style={{ marginRight: "10px" }}>
                                    {data?.displaystate}
                                  </p>
                                  <p>{data.pinCode}</p>
                                </div>
                                <p style={{ margin: 0, fontSize: "21px" }}>
                                  {data.displaycountry}
                                </p>
                              </div>
                            </div>

                            {hide && (
                              <>
                                <div className="inputDiv">
                                  <h6
                                    className="inputBoxHeading"
                                    style={{ width: "117px" }}
                                  >
                                    {t("Address_1_tr")}
                                  </h6>
                                  <input
                                    className="inputBoxStyle"
                                    value={data.address1}
                                    onChange={(evt: any) => {
                                      let value = evt.target.value;
                                      setData((d: any) => ({
                                        ...d,
                                        address1: value!,
                                      }));
                                    }}
                                  />
                                </div>

                                <div className="inputDiv">
                                  <h6
                                    className="inputBoxHeading"
                                    style={{ width: "117px" }}
                                  >
                                    {t("Address_2_tr")}
                                  </h6>
                                  <input
                                    className="inputBoxStyle"
                                    value={data.address2}
                                    onChange={(evt: any) => {
                                      let value = evt.target.value;
                                      setData((d: any) => ({
                                        ...d,
                                        address2: value!,
                                      }));
                                    }}
                                  />
                                </div>

                                <div className="inputDiv">
                                  <h6
                                    className="inputBoxHeading"
                                    style={{ width: "117px" }}
                                  >
                                    {t("Country_tr")}
                                  </h6>
                                  <select
                                    className="inputBoxStyle"
                                    defaultValue={data.country}
                                    onChange={(e) => {
                                      setData((d: IUserModel) => ({
                                        ...d,
                                        country: e.target.value,
                                      }));
                                    }}
                                  >
                                    {countrys.map((country: any) => {
                                      return (
                                        <option value={country.name}>
                                          {country.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="inputDiv">
                                  <h6
                                    className="inputBoxHeading"
                                    style={{ width: "117px" }}
                                  >
                                    {t("State_tr")}
                                  </h6>
                                  <select
                                    className="inputBoxStyle"
                                    defaultValue={data.state}
                                    onChange={(e) => {
                                      setData((d: IUserModel) => ({
                                        ...d,
                                        state: e.target.value,
                                      }));
                                    }}
                                  >
                                    {states?.map((state: any) => {
                                      return (
                                        <option value={state?.name}>
                                          {state.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="inputDiv">
                                  <h6
                                    className="inputBoxHeading"
                                    style={{ width: "117px" }}
                                  >
                                    {t("City_tr")}
                                  </h6>
                                  <select
                                    className="inputBoxStyle"
                                    defaultValue={data?.city}
                                    onChange={(e) => {
                                      setData((d: IUserModel) => ({
                                        ...d,
                                        city: e.target.value,
                                      }));
                                    }}
                                  >
                                    {district?.map((district: any) => {
                                      return (
                                        <option value={district.name}>
                                          {district.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="inputDiv">
                                  <h6
                                    className="inputBoxHeading"
                                    style={{ width: "117px" }}
                                  >
                                    {t("PinCode_tr")}
                                  </h6>
                                  <input
                                    className="inputBoxStyle"
                                    type="number"
                                    value={data.pinCode}
                                    onChange={(evt: any) => {
                                      let value = evt.target.value;
                                      setData((d: any) => ({
                                        ...d,
                                        pinCode: value!,
                                      }));
                                    }}
                                  />
                                </div>
                                <button
                                  onClick={async () => {
                                    await ProfileService.updateUserProfile(
                                      data.name,
                                      data.email,
                                      data.baseFile,
                                      data.address1,
                                      data.address2,
                                      data.city,
                                      data.state,
                                      data.country,
                                      data.countrytype,
                                      data.pinCode,
                                      data.language,
                                      data.phoneNumber
                                    ).then((result: any) => {
                                      if (result.status) {
                                        setRefresh(true);
                                      }
                                    });
                                  }}
                                  style={{
                                    fontFamily: "ChanakyaUni,NalandaTim,Tunga",
                                    cursor: "pointer",
                                    color: "#fff",
                                    backgroundColor: "#ff4e2a",
                                    border: "1px solid #ff4e2a",
                                    outline: "none",
                                    fontSize: "20px",
                                    padding: "8px 28px 4px",
                                    borderRadius: "4px",
                                    marginTop: "12px",
                                  }}
                                >
                                  {t("Save_tr")}
                                </button>
                              </>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-9">
              <div
                className="tab-pane fade show active"
                id="e-books"
                role="tabpanel"
                style={{ overflow: "hidden" }}
                aria-labelledby="e-books-tab"
              >
                <div className="tab-row">
                  <div className="tabscroll">
                    <div style={{ background: "#FFFAF0", padding: "10px 0" }}>
                      // books 
                      <div>
                        <p
                          style={{
                            fontFamily: "ChanakyaUni",
                            fontWeight: 700,
                            fontStyle: "normal",
                            color: "#b42a38",
                            fontSize: "26px",
                            margin: "0 0 15px"
                          }}
                        >
                          {t("E_books_tr")}
                        </p>
                        <div>
                          {[
                            bookFav.length > 0 &&
                              bookFav?.map((item: any) => (
                                <div
                                  className="sliderbooks"
                                  style={{ margin: "10px 11px" }}
                                  key={`related-${item.id}`}
                                  onClick={() => {
                                    navigate(`/books/` + item.slug, {
                                      state: {
                                        bookId: item.id,
                                        bookName: item.name,
                                      },
                                    });
                                    window.location.reload();
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <a>
                                      <img
                                        style={{ cursor: "pointer" }}
                                        className="imgcenter"
                                        src={
                                          item.bookThumbPath == null
                                            ? DefaultBook
                                            : item.bookThumbPath
                                        }
                                        onError={(e) => {
                                          e.currentTarget.src = DefaultBook;
                                        }}
                                        alt={item.name}
                                        title={item.name}
                                        width="117"
                                        height="165"
                                      />
                                      <p>
                                        {item?.name?.length > 20
                                          ? item?.name.slice(0, 18) + "..."
                                          : item?.name}
                                      </p>
                                    </a>
                                  </div>
                                </div>
                              )),
                          ]}
                        </div>
                      </div>
                      // kalyan 
                      {kalyan.length > 0 && (
                        <div>
                          <p
                            style={{
                              fontFamily: "ChanakyaUni",
                              fontWeight: 700,
                              fontStyle: "normal",
                              color: "#b42a38",
                              fontSize: "26px",
                              margin: "0 0 15px"
                            }}
                          >
                            {t("Kalyan_tr")}
                          </p>
                          {[
                            kalyan.length > 0 &&
                              kalyan?.map((item: any) => (
                                <div
                                  className="sliderbooks"
                                  key={`related-${item.id}`}
                                  onClick={() => {
                                    navigate(`/books/` + item.slug, {
                                      state: {
                                        bookId: item.id,
                                        bookName: item.name,
                                      },
                                    });
                                    window.location.reload();
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <a>
                                      <img
                                        style={{ cursor: "pointer" }}
                                        className="imgcenter"
                                        src={
                                          item.bookThumbPath == null
                                            ? DefaultBook
                                            : item.bookThumbPath
                                        }
                                        onError={(e) => {
                                          e.currentTarget.src = DefaultBook;
                                        }}
                                        alt={item.name}
                                        title={item.name}
                                        width="117"
                                        height="165"
                                      />
                                      <p>
                                        {item?.name?.length > 20
                                          ? item?.name.slice(0, 18) + "..."
                                          : item?.name}
                                      </p>
                                    </a>
                                  </div>
                                </div>
                              )),
                          ]}
                        </div>
                      )}
                      // kalpatru 
                      {kalpatru.length > 0 && (
                        <div>
                          <p
                            style={{
                              fontFamily: "ChanakyaUni",
                              fontWeight: 700,
                              fontStyle: "normal",
                              color: "#b42a38",
                              fontSize: "26px",
                              margin: "0 0 15px"
                            }}
                          >
                            {t("Kalpataru_tr")}
                          </p>
                          {[
                            kalpatru.length > 0 &&
                              kalpatru?.map((item: any) => (
                                <div
                                  className="sliderbooks"
                                  key={`related-${item.id}`}
                                  onClick={() => {
                                    navigate(`/books/` + item.slug, {
                                      state: {
                                        bookId: item.id,
                                        bookName: item.name,
                                      },
                                    });
                                    window.location.reload();
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <a>
                                      <img
                                        style={{ cursor: "pointer" }}
                                        className="imgcenter"
                                        src={
                                          item.bookThumbPath == null
                                            ? DefaultBook
                                            : item.bookThumbPath
                                        }
                                        onError={(e) => {
                                          e.currentTarget.src = DefaultBook;
                                        }}
                                        alt={item.name}
                                        title={item.name}
                                        width="117"
                                        height="165"
                                      />
                                      <p>
                                        {item?.name?.length > 20
                                          ? item?.name.slice(0, 18) + "..."
                                          : item?.name}
                                      </p>
                                    </a>
                                  </div>
                                </div>
                              )),
                          ]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
