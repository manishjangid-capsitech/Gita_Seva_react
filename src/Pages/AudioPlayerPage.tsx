/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { IAudioItem, useAudio } from "../Contexts/AudiosContext";
import AudioPlayer from "../Services/AudioPlayer";
import closeimg from "../Images/close-C.png";
import songplay from "../Images/songPlay.svg";
import pause from "../Images/pause.svg";
import mni from "../Images/minimize-C.png";
import AudioLyrics from "../Components/AudioLyrics";
import i18n, { _get_i18Lang } from "../i18n";
import { useLocation, useNavigate } from "react-router-dom";

const AudioPlayerPage = ({ match }: any) => {
  const navigate = useNavigate();
  const {
    isMin,
    setMin,
    setAudiosList,
    setIsMinismise,
    audiosList,
    playAudio,
    currentAudio,
    close,
    showList,
  } = useAudio();

  const location = useLocation();
  const state = location.state as {
    audioId: string;
    sl: string;
    sorting: string;
    index: number;
    audiocat: string;
    audioAuthor: string
  };

  const catId = useRef<string | any>(state?.audiocat! || "");
  const auid = useRef<string | undefined>(state?.audioId! || "");

  const [Type, setType] = useState<any | undefined>(
    localStorage.getItem("type")
  );

  useEffect(() => {
    // window?.location.pathname === "/audio" ? "audios" : "pravachans"
    setType(localStorage.getItem("type"));
    AudioPlayer.getAudioPlayer(
      _get_i18Lang(),
      0,
      5000,
      false,
      state?.audiocat || "",
      state?.audioAuthor || "",
      "",
      state?.sorting! || "",
      "",
      false,
      Type,
      // window?.location.pathname === "/audio" ? "audios" : "pravachans",
    ).then((res) => {
      if (res?.status) {       
        setIsMinismise(false);
        setMin(false)
        // state?.audioAuthor ? 
        setAudiosList(res.result.items)
        //  : setAudiosList(initialArray)
        playAudio(state?.audioId!, state?.index);
        const element = document.getElementById(state?.audioId);
        element?.scrollIntoView();
      }
    });
  }, [auid, i18n.language, catId]);

  return (
    <div className=""
    >
      <div
        className="row"
        style={{
          borderBottomColor: "black",
          marginRight: "0px",
        }}
      >
        {!showList && (
          <div
            style={{
              textAlign: "center",
              zIndex: 3,
              position: "absolute",
              width: "50%",
              border: "none",
              marginTop: "15%",
            }}
          >
            <div className="songSidebar" style={{ widows: "137%" }}>
              <div className="songCategoriesmobilesize">
                {audiosList.map((a, i) => (
                  <div key={a?.id}>
                    <div
                      id={a?.id}
                      style={{
                        height: "75px",
                        cursor: "pointer",
                        borderBottom: "1px solid #ebe8dd",
                        paddingTop: "15px",
                      }}
                    >
                      {a.id === currentAudio?.id ? (
                        <img
                          alt=""
                          title="play"
                          style={{ width: "51px", height: "49px" }}
                          src={songplay}
                          onClick={() => {
                            playAudio(a.id, i);
                          }}
                        ></img>
                      ) : (
                        <img
                          alt=""
                          title="pause"
                          style={{ width: "51px", height: "49px" }}
                          src={pause}
                          onClick={() => {
                            playAudio(a.id, i);
                          }}
                        ></img>
                      )}

                      <Button
                        style={{
                          color: "#212529",
                          backgroundColor: "white",
                          borderColor: "white",
                          paddingTop: "0px",
                        }}
                        variant={a.id === currentAudio?.id ? "link" : "light"}
                        onClick={() => {
                          playAudio(a.id, i);
                        }}
                      >
                        {a.name != null && a.name.length > 15
                          ? a.name.slice(0, 15) + "..."
                          : a.name}
                      </Button>
                    </div>
                  </div>
                ))}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        )}
        <div
          className="col-3 col-lg-3"
          style={{ display: "block" }}
        >
          <div className="songSidebar">
            <div className="songCategories">
              {audiosList.map((a, i) => (
                <div key={a?.id}>
                  <div
                    id={a?.id}
                    style={{
                      height: "75px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ebe8dd",
                      paddingTop: "15px",
                    }}
                  >
                    {a.id === currentAudio?.id ? (
                      <img
                        alt=""
                        title="play"
                        style={{ width: "51px", height: "49px" }}
                        src={songplay}
                        onClick={() => {
                          playAudio(a.id, i);
                        }}
                      ></img>
                    ) : (
                      <img
                        alt=""
                        title="pause"
                        style={{ width: "51px", height: "49px" }}
                        src={pause}
                        onClick={() => {
                          playAudio(a.id, i);
                        }}
                      />
                    )}

                    <Button
                      style={{
                        color: "#212529",
                        backgroundColor: "white",
                        borderColor: "white",
                        paddingTop: "0px",
                        fontFamily: 'ChanakyaUni',
                        fontSize: '22px'
                      }}
                      variant={a.id === currentAudio?.id ? "link" : "light"}
                      onClick={() => {
                        playAudio(a.id, i);
                      }}
                    >
                      {a.name != null && a.name.length > 15
                        ? a.name.slice(0, 15) + "..."
                        : a.name}
                    </Button>
                  </div>
                </div>
              ))}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>

        <div className="col-9 col-lg-9">
          <div className="closeTab">
            <a>
              <img
                alt=""
                src={mni}
                style={{ marginLeft: "10px" }}
                className="pe-sm-2"
                onClick={() => {
                  setIsMinismise(true);
                  setMin(true)
                  // navigate(`/${Type}/`)
                  navigate(`/${Type}`);
                }}
              ></img>
            </a>

            <a>
              <img
                alt=""
                src={closeimg}
                onClick={() => {
                  close();
                  // navigate(`/${Type}`)
                  navigate(-1)
                }}
              />
            </a>
          </div>
          <AudioLyrics />
        </div>
      </div>
    </div>
  );
};
export default AudioPlayerPage;