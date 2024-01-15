/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import ProfileService from "../Services/Profile";
import i18n, { _get_i18Lang } from "../i18n";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Styles/Profile.css";
import {
  AudioListButton,
  BookListButton,
  FavouriteArticals,
} from "./LogInoutModel";
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

export const ProfileFav = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [bookFav, getBookFav] = useState<any>([]);
  const [kalyan, getKalyan] = useState<any>([]);
  const [kalpatru, getKalpatru] = useState<any>([]);
  const [geetgovind, getGeetGovind] = useState<any>([]);
  const [pravachan, getPravachan] = useState<any>([]);
  const [audio, getAudio] = useState<any>([]);
  const [article, getArticle] = useState<any>([]);
  const [vivek, getVivek] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const colors = "#FF9800";

  const initialDisplayCount = 4;

  useEffect(() => {
    setRefresh(false);
    ProfileService.getfavData("hindi", 0, 100).then((res: any) => {
      getBookFav(res?.result?.books);
      getKalyan(res?.result?.kalyans);
      getKalpatru(res.result?.kalyansKalpataru);
      getGeetGovind(res?.result?.monthlyMagazine);
      getPravachan(res?.result?.pravachans);
      getAudio(res?.result?.audios);
      getArticle(res?.result?.articles);
      getVivek(res?.result?.vivekVanis);
    });
  }, [refresh, i18n.language]);

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
          padding: "25px 0 3% 0",
          marginTop: 0,
        }}
      >
        <div className="containers" style={{ height: "" }}>
          <div className="row">
            <ProfileSidePanel color={colors} />
            <div className="col-9">
              <div
                className="tab-pane fade show active"
                id="e-books"
                role="tabpanel"
                style={{
                  overflow: "hidden",
                  boxShadow: "0 0 7px 1px #f5deb1",
                }}
                aria-labelledby="e-books-tab"
              >
                <div className="tab-row">
                  <div className="tabscroll">
                    <div
                      style={{ background: "#FFFAF0", padding: "15px 10px" }}
                    >
                      <BookListButton
                        type="book"
                        title={t("E_books_tr")}
                        books={bookFav}
                        initialDisplayCount={initialDisplayCount}
                        getBook={(book) => {
                          navigate("/books/" + book.id, {
                            state: {
                              bookId: book.id,
                              bookName: book.name,
                              special: window.location.pathname,
                            },
                          });
                        }}
                      />

                      <BookListButton
                        type="kalyan"
                        title={t("Kalyan_tr")}
                        books={kalyan}
                        initialDisplayCount={initialDisplayCount}
                        getBook={(kalyan) => {
                          navigate(`/kalyans/` + kalyan.slug, {
                            state: { kalyanId: kalyan.id },
                          });
                        }}
                      />

                      <BookListButton
                        type="kalpatru"
                        title={t("Kalpataru_tr")}
                        books={kalpatru}
                        initialDisplayCount={initialDisplayCount}
                        getBook={(kalpatru) => {
                          navigate(`/kalyanskalpataru/` + kalpatru.slug, {
                            state: { kalpatruId: kalpatru.id },
                          });
                        }}
                      />

                      <BookListButton
                        type="geetgovind"
                        title={t("MonthlyMagazine_tr")}
                        books={geetgovind}
                        initialDisplayCount={initialDisplayCount}
                        getBook={(kalpatru) => {
                          navigate(`/monthlymagazine/` + kalpatru.slug, {
                            state: { MonthId: kalpatru.id },
                          });
                        }}
                      />

                      <BookListButton
                        type="vivek"
                        title={t("vivek_vani_tr")}
                        books={vivek}
                        initialDisplayCount={initialDisplayCount}
                        getBook={(vivek) => {
                          navigate(`/vivekvani/` + vivek.slug, {
                            state: { vivekId: vivek.id },
                          });
                        }}
                      />

                      <AudioListButton
                        title={t("Pravachan_tr")}
                        audios={pravachan}
                        initialDisplayCount={initialDisplayCount}
                        getAudios={(audio) => {
                          localStorage.setItem("type", "pravachans");
                          navigate(`/pravachans/` + audio.slug, {
                            state: {
                              type: pravachan,
                              audioId: audio.id,
                              audioslug: audio.slug,
                            },
                          });
                        }}
                      />

                      <AudioListButton
                        title={t("Audios_tr")}
                        audios={audio}
                        initialDisplayCount={initialDisplayCount}
                        getAudios={(audio) => {
                          localStorage.setItem("type", "audios");
                          navigate(`/audios/` + audio.slug, {
                            state: {
                              type: "audio",
                              audioId: audio.id,
                              audioslug: audio.slug,
                            },
                          });
                        }}
                      />

                      <FavouriteArticals
                        title={t("Article_tr")}
                        article={article}
                        initialDisplayCount={initialDisplayCount}
                        getArtical={(artical) => {
                          navigate(`/articles/` + artical.slug, {
                            state: {
                              articleId: artical.id,
                              articleName: artical.name,
                            },
                          });
                        }}
                      />
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
