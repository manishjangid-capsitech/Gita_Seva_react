import React, { useState } from "react";
import { useAudio } from "../Contexts/AudiosContext";
import RabbitLyrics from "rabbit-lyrics";
import "../Styles/AudioPlayer.css";
import lyricsnotfound from "../Images/lyricsnotfound.png";
import Loading from "./Loading";
import menu from "../Images/menu.png";

const AudioLyrics = () => {
  const { currentAudio, lyrt, showList, setShowList } = useAudio();
  const refLrc = React.useRef<any>(null);

  React.useEffect(() => {
    if (currentAudio) {
      if (refLrc.current) {
        console.log("refLrc",refLrc)
        console.log("refLrc.current",refLrc.current)
        console.log("currentAudio",currentAudio)
        new RabbitLyrics(
          refLrc.current,
          document.getElementById(`audio-${currentAudio?.id}`) as any
        );
      }
    }
  }, [currentAudio, currentAudio?.lyricsHash, lyrt]);

  return (
    <div style={{ marginTop: "-70px" }}>
      <div className="header">      
          <span style={{ fontSize: 25, color: "#ff9c00" }}>
            {currentAudio?.name != null && currentAudio.name.length > 15
              ? currentAudio.name.slice(0, 42)
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
              width: "88%",
              float: "left",
              textAlign: "center",
              marginLeft: "8%",
            }}
          >
            <img
              alt="lyricsnotfound"
              src={lyricsnotfound}
              className="lyricsnotfoundstyle"
            ></img>
          </div>
        )}
      </div>
    </div>
  );
};
export default AudioLyrics;
