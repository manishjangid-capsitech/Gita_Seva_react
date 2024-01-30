import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../Styles/style.css";
import { LogOutModel } from "./LogInoutModel";

const ProfileSidePanel = ({ color }: { color: string }) => {
  
  const UserImage = localStorage.getItem("Image");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="col-lg-3">
      <div
        style={{
          backgroundColor: "#FFFAF0",
          padding: "16px",
          boxShadow: "0 0 7px 1px #f5deb1",
          height: "100%",
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
        <div>
          <ul
            style={{
              listStyleType: "none",
            }}
          >
            <li
              style={{
                display: "flex",
                padding: "0 16px",
                marginTop: "30px",
              }}
            >
              <img
                src="https://gitaseva.org/assets/img/profile-icon1.png"
                alt="profile"
                style={{
                  height: "19px",
                  width: "16px",
                  marginTop: "5px",
                }}
              />
              <div
                style={{
                  cursor: "pointer",
                  color:
                    window.location.pathname === `/profile`
                      ? "#FF9800"
                      : "#472D1E",
                  fontSize: "21px",
                  fontFamily: "ChanakyaUni",
                  padding: "0 16px",
                  fontWeight: 600,
                }}
                onClick={() => {
                  navigate(`/profile`);
                }}
              >
                {t("Profile_tr")}
              </div>
            </li>
          </ul>
        </div>

        <div>
          <ul
            style={{
              listStyleType: "none",
              borderTop: "1px solid rgb(245, 220, 160)",
            }}
          >
            <li
              style={{
                display: "flex",
                padding: "0 16px",
                marginTop: "15px",
              }}
            >
              <img
                src="https://gitaseva.org/assets/img/profile-icon2.png"
                alt="profile"
                style={{
                  height: "19px",
                  width: "16px",
                  marginTop: "2px",
                }}
              />
              <div
                style={{
                  cursor: "pointer",
                  color:
                    window.location.pathname === `/profile/fav`
                      ? "#FF9800"
                      : "#472D1E",
                  //   color: "#472D1E",
                  fontSize: "21px",
                  fontFamily: "ChanakyaUni",
                  padding: "0 16px",
                  fontWeight: 600,
                }}
                onClick={() => {
                  navigate(`/profile/fav`);
                }}
              >
                {t("Favourite_tr")}
              </div>
            </li>
          </ul>
        </div>

        <div>
          <ul
            style={{
              listStyleType: "none",
              borderTop: "1px solid rgb(245, 220, 160)",
            }}
          >
            <li
              style={{
                display: "flex",
                padding: "0 16px",
                marginTop: "15px",
              }}
            >
              <img
                src="https://gitaseva.org/assets/img/profile-icon4.png"
                alt="profile"
                style={{
                  height: "19px",
                  width: "16px",
                  marginTop: "5px",
                }}
              />
              <div
                style={{
                  cursor: "pointer",
                  color:
                    window.location.pathname === `/profile/feedback`
                      ? "#FF9800"
                      : "#472D1E",
                  //   color: "#472D1E",
                  fontSize: "21px",
                  fontFamily: "ChanakyaUni",
                  padding: "0 16px",
                  fontWeight: 600,
                }}
                onClick={() => {
                  navigate(`/profile/feedback`);
                }}
              >
                {t("Help_tr")}
              </div>
            </li>
          </ul>
        </div>

        <div>
          <ul
            style={{
              listStyleType: "none",
              borderTop: "1px solid rgb(245, 220, 160)",
            }}
          >
            <li
              style={{
                display: "flex",
                padding: "0 16px",
                marginTop: "15px",
              }}
            >
              <img
                src="https://gitaseva.org/assets/img/logout.png"
                alt="profile"
                style={{
                  height: "19px",
                  width: "16px",
                  marginTop: "5px",
                }}
              />
              <div
                style={{
                  cursor: "pointer",
                  color: "#472D1E",
                  fontSize: "21px",
                  padding: "0 16px",
                  fontWeight: 600,
                }}
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                {t("LogOut_tr")}
              </div>
            </li>
          </ul>
        </div>
        <LogOutModel open={isDialogOpen} onClose={handleCloseDialog} />
      </div>
    </div>
  );
};
export default ProfileSidePanel;
