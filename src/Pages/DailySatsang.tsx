import { useEffect, useState } from "react";
import AudiosService from "../Services/Audios";
import WithoutLyrics from "../Images/audiolyrics.svg";
import WithLyrics from "../Images/audiowithoutlyrics.svg";
import { Breadcrumbs } from "./E-BooksComponent";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { LogInModel } from "./LogInoutModel";
import imgpause from "../assets/audioPlayer/img/yellowplay.svg";
import imgdownload from "../Images/downloadpravachan.svg";

const DailySatsangPage = () => {
    const UserIdentity = localStorage.getItem("UserId") as any;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [podcastData, setPodcastData] = useState<any[] | undefined>(undefined);
    const [logIn, setLogIn] = useState<boolean>(false);

    const closeModal = () => {
        setLogIn(false);
    };
    const [loginState, setLoginState] = useState<string | null>(null);

    const handleLoginStateChange = (newState: any) => {
        setLoginState(newState);
        {
            podcastData?.map((audio, i) => (
                navigate(`/audios/` + audio?.slug, {
                    state: {
                        audioId: audio.id,
                        audioslug: audio.slug,
                        index: i
                    },
                })
            ))
        }
    };

    const downloadAudioPodcast = (pravachanPath: any) => {
        const imageUrl = pravachanPath;
        const link = document.createElement('a');
        link.href = imageUrl; link.download = 'image.jpg';
        document.body.appendChild(link); link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        AudiosService.getaudiopodcast(
            "",
            0,
            100,
            UserIdentity,
            "",
            "",
            "",
            "",
            0
        ).then((res) => {
            if (res.status) {
                setPodcastData(res.result?.items);
            }
        });
    }, [])

    return (
        <div style={{ marginBottom: "20px" }}>
            <Breadcrumbs
                mainsubBreadCrumb={t("daily_satsang_tr")}
                subBreadCrumb={t("Home_tr")}
                navigatemainsubBreadCrumb={() => {
                    navigate(`/home`);
                }}
                subBreadCrumbTwo={t("daily_satsang_tr")}
                navigatesubBreadCrumb={() => {
                }}
            />
            <div className="containers">
                <div
                    className="filter1"
                    style={{ margin: "5px 0" }}
                >
                    <span>
                        {t("Total_Records_tr")} : {podcastData?.length}
                    </span>
                </div>
                <div className="row">
                    {/* <div className="col-3"></div> */}
                    {/* <div className="col-9"> */}
                    <div style={{ paddingLeft: "calc(var(--bs-gutter-x)* .0)" }}>
                        {podcastData?.map((data: any, i: number) => {
                            return (
                                <div key={`data-${data.id}`}>
                                    <div className="sidebarmargin">
                                        <div
                                            className="pravchanBox"
                                            style={{ display: "flex", padding: "15px 20px", cursor: "pointer" }}
                                        >
                                            <div style={{ marginRight: "25px" }}>
                                                <a>
                                                    <img
                                                        className="audioicon"
                                                        src={
                                                            data.lyricsHash != null
                                                                ? WithLyrics
                                                                : WithoutLyrics
                                                        }
                                                        onError={(e) => {
                                                            e.currentTarget.src = WithoutLyrics;
                                                        }}
                                                        alt={data.name}
                                                        title={data.name}
                                                        onClick={() => {
                                                            if (UserIdentity) {
                                                                navigate(`/audioPodcast/` + data?.slug, {
                                                                    state: {
                                                                        audioId: data?.id,
                                                                        audioslug: data?.slug,
                                                                        //   sorting: SortValue,
                                                                        // index: i,
                                                                        //   audiocat: CategoryId,
                                                                        //   audioAuthor: state?.authorId || SingerId
                                                                    },
                                                                });
                                                            } else {
                                                                setLogIn(true);
                                                            }
                                                        }}
                                                    />
                                                </a>
                                            </div>
                                            <div style={{ width: "100%" }}>
                                                <a
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        if (UserIdentity) {
                                                            navigate(`/audioPodcast/` + data?.slug, {
                                                                state: {
                                                                    audioId: data?.id,
                                                                    audioslug: data?.slug,
                                                                    //   sorting: SortValue,
                                                                    index: i,
                                                                    //   audiocat: CategoryId,
                                                                    //   audioAuthor: state?.authorId || SingerId
                                                                },
                                                            });
                                                        } else {
                                                            setLogIn(true);
                                                        }
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            fontSize: "25px",
                                                            paddingTop: "3px",
                                                            fontWeight: "600",
                                                            textAlign: "unset",
                                                        }}
                                                    >
                                                        <p>
                                                            {/* {data.name != null &&
                                                                data.name.length > 100
                                                                ? data.name.slice(0, 80) + "..."
                                                                : data.name} */}
                                                            {data?.name}
                                                        </p>
                                                    </p>
                                                    <div style={{ display: "grid" }}>
                                                    <label>{data.description}</label>
                                                    <label>{data.audioLength}</label>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="btns">
                                                <div className="buttonres">
                                                    <a
                                                        id="download"
                                                        title="Download"
                                                        onClick={() => {
                                                            if (UserIdentity) {
                                                                downloadAudioPodcast(`${process.env.REACT_APP_API_URL}/api/audioPodcast/` +
                                                                    data?.id +
                                                                    "/audio?t=" +
                                                                    "&download_attachment=true")
                                                            } else {
                                                                setLogIn(true);
                                                            }
                                                        }}
                                                    >
                                                        <img
                                                            alt="download"
                                                            src={imgdownload}
                                                            className="downloadbtn"
                                                        ></img>
                                                    </a>
                                                </div>
                                                <div
                                                    style={{
                                                        cursor: "pointer",
                                                        paddingLeft: "5px",
                                                    }}
                                                >
                                                    <img
                                                        alt=""
                                                        onClick={() => {
                                                            if (UserIdentity) {
                                                                navigate(`/audios/` + data.slug, {
                                                                    state: {
                                                                        audioId: data.id,
                                                                        audioslug: data.slug,
                                                                        index: i,
                                                                    },
                                                                });
                                                            } else {
                                                                setLogIn(true);
                                                            }
                                                        }}
                                                        title="Play"
                                                        src={imgpause}
                                                        className="playbtn"
                                                    ></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
            <LogInModel opens={logIn} onCloses={closeModal} onLoginStateChange={handleLoginStateChange} />
        </div>
    )
}
export default DailySatsangPage;