/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import ProfileService from "../Services/Profile";
import i18n, { _get_i18Lang } from "../i18n";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditIcon from "../assets/img/mark-grey.png";
import BackArrow from "../assets/img/leftArrow1.png";
import "../Styles/Profile.css";
import ProfileSidePanel from "./ProfileSidePanel";
import { storage } from "./Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const { t } = useTranslation();

  const UserImage = localStorage.getItem("Image");
  const [hide, setHide] = useState(false);
  const [states, setStates] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [countrys, setCountrys] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState<any>(null);

  const [baseFile, setBaseFile] = useState<any>('');

  const [data, setData] = useState<IUserModel>({
    name: "",
    email: "",
    baseFile: "",
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

  const colors = "#FF9800";

  const handleSubmit = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleImageChange = (e: any) => {
    const filesSelected = e.target.files;

    if (filesSelected.length > 0) {
      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        const srcData = fileLoadedEvent?.target?.result;
        setBaseFile(srcData?.toString());
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };
  const getDistrict = async (id: string) => {
    if (id) {
      const res = await ProfileService.getDistrict(id, _get_i18Lang());
      if (res?.status) {
        setDistrict(res?.result);
        // setData({ ...data, city: res?.result?.name });
      } else {
        console.error("Error fetching data:", res?.message);
      }
    }
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
      .then((res: any) => {
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
        // getDistrict(data?.state)
      }
    }
  }, [data?.state, refresh, i18n.language]);

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
          backgroundColor: "#fffaf0",
          padding: "25px 0px 3% 0",
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
                    <div className="tabscroll" style={{ width: "100%", display: "block" }}>
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
                            <img
                              src={baseFile ? baseFile : UserImage}
                              alt="Selected Profile"
                              style={{ width: '140px' }}
                            />
                          </div>
                          <div
                            style={{
                              display: hide ? "block" : "none",
                              height: hide ? "474px" : "0",
                            }}
                          ><input type="file" onChange={handleImageChange} />
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
                                disabled
                                type="number"
                                className="inputBoxStyle"
                                // style={{ color: hide ? "#000" : "#ff731f" }}
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
                                disabled={!data.phoneNumber || !hide}
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
                                    value={data.country}
                                    onChange={(e) => {
                                      setData((d: IUserModel) => ({
                                        ...d,
                                        country: e.target.value,
                                      }));
                                    }}
                                  >
                                    {countrys.map((country: any) => {
                                      return (
                                        <option key={country?.id} value={country.name}>
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
                                    value={data?.state}
                                    onChange={(e) => {
                                      setData((d: IUserModel) => ({
                                        ...d,
                                        state: e.target.value,
                                      }));
                                    }}
                                  >
                                    {states?.map((state: any) => {
                                      return (
                                        <option key={state?.id} value={state?.name}>
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
                                    value={data?.city}
                                    onChange={(e) => {
                                      setData((d: IUserModel) => ({
                                        ...d,
                                        city: e.target.value,
                                      }));
                                    }}
                                  >
                                    {district?.map((district: any) => {
                                      return (
                                        <option key={district?.id} value={district.name}>
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
                                    debugger
                                    await ProfileService.updateUserProfile(
                                      data.name,
                                      data.email,
                                      baseFile,
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
                                      debugger
                                      console.log("result", result);
                                      if (result.status) {
                                        debugger
                                        setRefresh(true);
                                      }
                                    });
                                    handleSubmit()
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
