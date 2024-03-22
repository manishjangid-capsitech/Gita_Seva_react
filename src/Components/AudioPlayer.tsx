import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../Contexts/AudiosContext";
import imgdownload from "../assets/audioPlayer/img/download.svg";
import imgrepeat from "../assets/audioPlayer/img/whiterepeat.svg";
import imgback from "../assets/audioPlayer/img/whiteprevious.svg";
import imgforward from "../assets/audioPlayer/img/whitenext.svg";
import imgclose from "../assets/audioPlayer/img/whitecancel.svg";
import imginfo from "../assets/audioPlayer/img/info.svg";
import imgmaximize from "../assets/audioPlayer/img/maximize.svg";
import imgpause from "../assets/audioPlayer/img/Pause.svg";
import imgplay from "../assets/audioPlayer/img/bgorangepause.svg";
import "../Styles/Audios.css";
import { ProgressBar } from "react-bootstrap";
import Favadd from "../assets/img/Like -Fill 1.svg";
import Favicon from "../assets/img/Like-Stroke 1.svg";
import AudiosService from "../Services/Audios";

const AudioPlayer = () => {
  const navigate = useNavigate();
  const {
    currentAudio,
    isMinimise,
    setIsMinismise,
    close,
    next,
    prev,
    setAudioInfoDialog,
    repeat,
    playAudio,
  } = useAudio();

  const refAudio = React.useRef<HTMLAudioElement>(null);
  const UserIdentity = localStorage.getItem("UserId") as any;

  const [cTime, setCTime] = useState(0);
  const [aLength, setALength] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [toggleFav, setToggleFav] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);
  const closeModal = () => {
    setLogIn(false);
  };

  function formatCurrentTime(seconds: any) {
    var minutes: any = Math.floor(seconds / 60);
    var remainingSeconds: any = Math.floor(seconds % 60);
    if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + remainingSeconds;
  }

  function formatLastMinuteAndSecond() {
    var lastMinute: any = Math.floor(aLength / 60);
    var lastSeconds: any = Math.floor(aLength % 60);
    if (lastSeconds < 10) {
      lastSeconds = "0" + lastSeconds;
    }
    if (lastMinute < 10) {
      lastMinute = "0" + lastMinute;
    }
    return lastMinute + ":" + lastSeconds;
  }
  function onLoadedMetadata(event: any) {
    setALength(event.target.duration);
  }
  const audioId = currentAudio?.id as any
  const getType = localStorage.getItem("type") as string

  const FavAdd = () => {
    getType === "pravachans" ?
      AudiosService.addPravachanFavourite(audioId).then((res) => {
        res.status && setIsLiked(true);
      })
      :
      AudiosService.addAudioFavourite(audioId).then((res) => {
        res.status && setIsLiked(true);
      })
  };

  const FavRemove = () => {
    getType === "pravachans" ?
      AudiosService.removePravachanFaviourite(audioId).then((res) => {
        res.status && setIsLiked(false);
      })
      :
      AudiosService.removeAudioFavourite(audioId).then((res) => {
        res.status && setIsLiked(false);
      });
  };

  useEffect(() => {
    AudiosService.getaudioandpravachanbyid(audioId, UserIdentity !== "" ? UserIdentity : "").then((res) => {
      if (res.status) {
        setIsLiked(res?.result?.isFavourite)
      }
    })
  }, [isLiked, audioId])

  return (
    <div>
      {currentAudio?.id ? (
        <div
          className="playaudio backcolor music-player"
          style={{ color: "white", fontSize: "16px" }}
          title={currentAudio?.name}
        >
          <div className="column" style={{ width: "38%", textAlign: "center" }}>
            {currentAudio == null ? (
              "no record found"
            ) : (
              <div>
                <audio
                  ref={refAudio}
                  id={`audio-${currentAudio.id}`}
                  autoPlay
                  src={
                    currentAudio.audioUrl != null
                      ? currentAudio.audioUrl
                      : currentAudio.pravachanUrl
                  }
                  onPlay={() => {
                    setPlaying(true);
                  }}
                  onPause={() => {
                    setPlaying(false);
                  }}
                  onDurationChange={(e) => {
                    setALength(e.currentTarget.duration);
                  }}
                  onLoadedMetadata={onLoadedMetadata}
                  onTimeUpdate={(e) => {
                    setCTime(e.currentTarget.currentTime);
                    if (
                      e.currentTarget.duration === e.currentTarget.currentTime
                    ) {
                      next();
                    }
                  }}
                  onLoad={(e: any) => (e.target.currentTime = 0)}

                />
                <div>
                  {currentAudio?.name}
                </div>
              </div>
            )}
          </div>
          <div className="column">
            <button
              className="backcolor"
              onClick={() => {
                setAudioInfoDialog();
              }}
            >
              <img
                alt="imginfo"
                src={imginfo}
                title="information"
                width="30px"
              />
            </button>
          </div>
          <div
            className="column"
            style={{ marginRight: "2px", marginLeft: "2px" }}
          >
            <a
              id="download"
              title="Download"
              href={
                currentAudio != null
                  ? currentAudio.audioPath != null
                    ? currentAudio.audioPath + "&download_attachment=true"
                    : currentAudio.pravachanPath + "&download_attachment=true"
                  : "no record found"
              }
            >
              <img
                alt="imgdownload"
                src={imgdownload}
                title="download"
                width="30px"
              />
            </a>
          </div>

          {isLiked ? (
            <label
              onClick={() => {
                FavRemove();
              }}
            >
              <img
                src={Favadd}
                alt="Favadd"
                style={{
                  marginTop: "8px",
                }}
              />
            </label>
          ) : (
            <label
              onClick={() => {
                FavAdd();
              }}
            >
              <img
                src={Favicon}
                alt="Favicon"
                style={{
                  marginTop: "8px",
                }}
              />
            </label>
          )}

          {/* <label
            onClick={() => {
              toggleLike();
              // notify();
            }}
            style={{ marginTop: "1px", cursor: "pointer" }}
          >
            <img
              src={isLiked ? Favadd : Favicon}
              alt="img"
            />
          </label> */}
          <div className="column">
            <button
              className="backcolor"
              onClick={() => {
                repeat();
              }}
            >
              <img
                alt="imgrepeat"
                src={imgrepeat}
                title="repeat"
                width="30px"
              />
            </button>
          </div>

          <div className="column">
            <button
              className="backcolor"
              onClick={() => {
                prev();
              }}
            >
              <img alt="imgback" src={imgback} title="prev" width="30px" />
            </button>
          </div>

          <div className="column">
            {playing ? (
              <button
                className="backcolor"
                onClick={() => {
                  refAudio.current?.pause();
                }}
              >
                <img alt="imgPse" src={imgpause} title="pause" width="40px" />
              </button>
            ) : (
              <button
                className="backcolor"
                onClick={() => {
                  refAudio.current?.play();
                }}
              >
                <img alt="imgPse" src={imgplay} title="play" width="40px" />
              </button>
            )}
          </div>
          <div className="column">
            <button
              className="backcolor"
              onClick={() => {
                next();
              }}
            >
              <img
                alt="imgforward"
                src={imgforward}
                title="next"
                width="30px"
              />
            </button>
          </div>

          <div
            className="column"
            style={{
              padding: "5px 15px 5px 15px",
              display: "block"
            }}
          >
            <span id="time">{formatCurrentTime(cTime)}</span>
          </div>
          <div
            className="column"
            style={{
              width: "30%",
              display: "block",
            }}
          >
            <ProgressBar
              variant="white"
              color="orange"
              now={cTime}
              min={0}
              max={aLength}
              style={{
                height: "6px",
                backgroundColor: "#e48c02",
              }}
              onClick={(e: any) => {
                var mouseX = e.clientX;
                var barX = e.target.offsetLeft;
                let distanceX = mouseX - barX;
                let total = e.currentTarget.offsetWidth;
                let timePerPixel = aLength / total;
                let currentTime = distanceX * timePerPixel;
                if (refAudio.current) refAudio.current.currentTime = currentTime;
              }}
            />
          </div>
          <div
            className="column"
            style={{
              paddingLeft: "15px",
              display: "block"
            }}
          >
            <span id="total-time">{formatLastMinuteAndSecond()}</span>
            <span id="totalCaltime" style={{ display: "none" }}>
              0
            </span>
          </div>
          <div className="column">
            <button
              className="backcolor"
              style={isMinimise ? { display: "block" } : { display: "none" }}
              onClick={() => {
                setIsMinismise(false);
                navigate(
                  `/${localStorage.getItem("type")}/` + currentAudio?.id,
                  {
                    state: { audioId: currentAudio?.id },
                  }
                );
              }}
            >
              <img
                alt="imgmaximize"
                src={imgmaximize}
                title="maximize"
                width="30px"
                style={{ marginLeft: "10px" }}
              />
            </button>
          </div>

          <div
            className="column"
            style={isMinimise ? { display: "block" } : { display: "none" }}
          >
            <button
              className="backcolor"
              onClick={() => {
                close();
              }}
            >
              <img alt="imgclose" src={imgclose} title="close" width="30px" />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default AudioPlayer;
