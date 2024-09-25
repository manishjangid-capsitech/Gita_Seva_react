import React, { useState } from "react";
import DivineQuotesService from "../Services/DivineQuotes";
import ListPagination from "../Components/ListPagination";
import "../Styles/DivineQuote.css"
import { useTranslation } from "react-i18next";
import { ImageGroup, Image } from "react-fullscreen-image";
import imgdownload from "../assets/audioPlayer/img/gradient.svg";
import { Link } from "react-router-dom";
import { LogInModel } from "./LogInoutModel";

const DivineQuotesPage = () => {
    const { t } = useTranslation();
    const [divinequotes, setDivineQuotes] = useState<any[] | undefined>(
        undefined
    );

    const [refresh, setRefresh] = useState(false);
    const [hoverId, setHoverId] = useState<number | string>();
    const UserIdentity = localStorage.getItem("UserId") as any;

    const [pagination, setPagination] = useState({
        pageNo: 0,
        recordsPerPage: 20,
        totalRecords: 0,
    });

    const [logIn, setLogIn] = useState<boolean>(false);

    const closeModal = () => {
        setLogIn(false);
    };

    const [loginState, setLoginState] = useState<string | null>(null);

    const handleLoginStateChange = (newState: any) => {
        setLoginState(newState);
        {
            divinequotes?.map((divquote: any, index: number) => {
                return (
                    hoverId === index && (
                        downloadImage(`${process.env.REACT_APP_API_URL}/api/Quotes/` +
                            divquote.id +
                            "/quote?t=" +
                            "&download_attachment=true")
                    )
                )
            })
        }
    }

    React.useEffect(() => {
        setRefresh(false);
        DivineQuotesService.getDivineQuotes(
            "",
            pagination.pageNo === 0
                ? 0
                : pagination.recordsPerPage * pagination.pageNo - 20,
            pagination.recordsPerPage,
        ).then((res) => {
            if (res) {
                setDivineQuotes(res.result?.items);
                setPagination({
                    ...pagination,
                    totalRecords: res.result?.totalRecords,
                });
            }
        });
    }, [refresh]);

    const downloadImage = (imagePath: any) => {
        const imageUrl = imagePath;
        const link = document.createElement('a');
        link.href = imageUrl; link.download = 'image.jpg';
        document.body.appendChild(link); link.click();
        document.body.removeChild(link);
    };

    return (
        <>
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
                        <div
                            style={{
                                fontFamily: "ChanakyaUniBold,NalandaTim,Tunga",
                                fontSize: "36px",
                                fontStyle: "normal",
                                fontWeight: "700",
                                color: "#d11501",
                                // lineHeight: "41px",
                                // margin: "2% 0 0",
                            }}>
                            {t("Amrit_Vachan_tr")}
                        </div>
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
                            <span style={{ color: "#2d2a29" }}>
                                <span>/ {t("Amrit_Vachan_tr")}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="fontfamily"
                style={{
                    userSelect: "none",
                    backgroundColor: "#fff6e1",
                    marginTop: -"3px",
                    paddingTop: "1px",
                }}
            >
                <div className="containers">
                    <div
                        className="filter1"
                        style={{ margin: "5px 0" }}
                    >
                        <span>
                            {t("Total_Records_tr")} : {pagination.totalRecords}
                        </span>
                    </div>
                </div>
                <div className="containers">
                    <div className="gst-page-content"
                        style={{
                            display: "block",
                            // padding: "25px 0 25px 25px",
                            padding: "25px 0 25px 40px",
                            borderRadius: "4px",
                            background: "#fff6e1",
                            boxShadow: "0 0 7px 1px #f5deb1",
                            fontFamily: "ChanakyaUni",
                            height: "100%",
                            margin: "15px 0 0 0"
                        }}>
                        <ImageGroup>
                            <ul className="images bgcolor row" style={{ backgroundColor: "#fff6e1" }}>
                                {divinequotes?.map((divquote: any, index: number) => (
                                    <li key={index} className="col-3" style={{ marginBottom: "30px" }}>
                                        <Image
                                            src={divquote?.quotesPath}
                                            alt="image"
                                            style={{ width: "85%" }}
                                            onMouseEnter={() => {
                                                setHoverId(index);
                                            }}
                                            onMouseLeave={() => setHoverId("")}
                                        />
                                        {hoverId === index &&
                                            // UserIdentity ?   
                                            //  :                                        
                                            <a
                                                onMouseEnter={() => {
                                                    setHoverId(index);
                                                }}
                                                onMouseLeave={() => setHoverId("")}
                                                id="download"
                                                onClick={() => {
                                                    if (UserIdentity) {
                                                        downloadImage(`${process.env.REACT_APP_API_URL}/api/Quotes/` +
                                                            divquote.id +
                                                            "/quote?t=" +
                                                            "&download_attachment=true")
                                                    } else {
                                                        setLogIn(true);
                                                    }
                                                }}
                                                title="Download"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    alt="imgdownload"
                                                    src={imgdownload}
                                                    className="img-fluid"
                                                    style={{
                                                        height: "40px",
                                                        width: "40px",
                                                        margin: "10px",
                                                    }}
                                                />
                                            </a>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </ImageGroup>
                    </div>
                    <div className="col-12" style={{ marginTop: "30px", padding: "0 0 3% 0" }}>
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
                </div>
            </div>
            <LogInModel opens={logIn} onCloses={closeModal} onLoginStateChange={handleLoginStateChange} />
        </>
    );
};
export default DivineQuotesPage;