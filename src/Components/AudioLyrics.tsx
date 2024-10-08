import React, { useEffect } from "react";
import { useAudio } from "../Contexts/AudiosContext";
import RabbitLyrics from "rabbit-lyrics";
import "../Styles/AudioPlayer.css";
import lyricsnotfound from "../Images/lyricsnotfound.png";
import Loading from "./Loading";

const AudioLyrics = () => {
  const { currentAudio, lyrt, message } = useAudio();
  const refLrc = React.useRef<any>(null);

  useEffect(() => {
    if (currentAudio) {
      if (refLrc.current) {
        new RabbitLyrics(
          refLrc.current,
          document.getElementById(`audio-${currentAudio?.id}`) as any
        );
      }
    }
  }, [currentAudio, currentAudio?.lyricsHash, lyrt]);

  return (
    <div style={{ marginTop: "-55px" }}>
      <div className="header" style={{ margin: "0 0 0 12%" }}>
        <span style={{ fontSize: 25, color: "#ff9c00", margin: "0 0 0 -15%" }}>
          {currentAudio?.name != null && currentAudio.name.length > 15
            ? currentAudio.name.slice(0, 100)
            : currentAudio?.name}
        </span>
      </div>
      <div>
        {currentAudio?.lyricsHash != null ? (
          <div className="lyrics-data" style={{ height: "100%" }}>
            <div
              ref={refLrc}
              className="lyrics"
              style={{
                fontSize: 20,
                padding: "10px",
                fontFamily: "ChanakyaUniBold",
              }}
            >
              {Loading() ? <div> {lyrt()} </div> : <Loading />}
            </div>
          </div>
        ) : (
          <div
            style={{
              // width: "88%",
              width: "85%",
              float: "left",
              textAlign: "center",
              // marginLeft: "8%",
            }}
          >
            <img
              alt="lyricsnotfound"
              src={lyricsnotfound}
              className="lyricsnotfoundstyle"
            ></img>
          </div>
        )}
        <div
          style={{
            textAlign: "center",
            zIndex: 1,
            position: "absolute",
            display: "flex",
            top: "750px",
            left: "280px",
          }}
        >
          <p
            style={{
              fontSize: "22px",
              fontFamily: "ChanakyaUni",
              margin: "0 10px",
              color: "#ff9c00",
              borderBottom: "2px solid #FE8B35"
            }}
          >{message}
          </p>
        </div>
      </div>
    </div >
  );
};
export default AudioLyrics;
