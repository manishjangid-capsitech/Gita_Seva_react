/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useAudio } from "../Contexts/AudiosContext";
import AudioPlayer from "../Services/AudioPlayer";
import closeimg from "../Images/close-C.png";
import songplay from "../Images/songPlay.svg";
import pause from "../Images/pause.svg";
import mni from "../Images/minimize-C.png";
import AudioLyrics from "../Components/AudioLyrics";
import i18n, { _get_i18Lang } from "../i18n";
import { useLocation, useNavigate } from "react-router-dom";
import { AudioInfoDialog } from "../Pages/AudioInfoDialog";

const AudioPlayerPage = ({ match }: any) => {
  const navigate = useNavigate();
  const {
    setAudiosList,
    isMinimise,
    setIsMinismise,
    audiosList,
    playAudio,
    currentAudio,
    // audioInfoDialog,
    close,
    showList,
    setShowList,
  } = useAudio();

  const location = useLocation();
  const state = location.state as {
    audioId: string;
    sl: string;
    sorting: string;
    index: number;
    audiocat: string;
  };

  const catId = useRef<string | any>(state?.audiocat! || "");
  const auid = useRef<string | undefined>(state?.audioId! || "");
  const [hide, setHide] = useState(false);

  const [Type, setType] = useState<any | undefined>(
    localStorage.getItem("type")
  );

  const [displayState, setDisplayState] = useState(false)


  useEffect(() => {
    setType(localStorage.getItem("type"));
    AudioPlayer.getAudioPlayer(
      _get_i18Lang(),
      0,
      1000,
      false,
      state?.audiocat,
      "",
      "",
      state?.sorting! || "",
      "",
      false,
      Type
    ).then((res) => {
      if (res) {
        setIsMinismise(false);
        setAudiosList(res.result.items);
        playAudio(state?.audioId!, state?.index);
        const element = document.getElementById(state?.audioId);
        element?.scrollIntoView();
      }
    });
  }, [auid, i18n.language, catId]);

  const sideNavRef = useRef(null);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [!showList]);

  // function handleClickOutside(e: any) {
  //   if (!showList === false) {
  //     setShowList(true)
  //   }
  // }


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
                  // debugger
                  // console.log("isMinimise",isMinimise);                  
                  setIsMinismise(true);
                  // console.log("isMinimise",isMinimise);                  
                  setIsMinismise(true)
                  navigate(`/${Type}/`)
                  // navigate(-1)
                  // navigate(`/${Type}/`+ currentAudio?.id);
                  // window.location.reload()
                }}
              ></img>
            </a>

            <a>
              <img
                // style={{marginLeft:'10px'}}
                alt=""
                src={closeimg}
                onClick={() => {
                  setHide(true);
                  close();
                  navigate(`/${Type}`);
                }}
              />
            </a>
          </div>
          <AudioLyrics />
          {/* {currentAudio?.id ? (
            // <AudioInfoDialog showModal={audioInfoDialog} />
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  );
};
export default AudioPlayerPage;
