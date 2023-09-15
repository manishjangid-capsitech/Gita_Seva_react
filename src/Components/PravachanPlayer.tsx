import { useTranslation } from "react-i18next";
import React from "react";
import { usePravachan } from "../Contexts/PravachansContext";
import imgplay from "../assets/audioPlayer/img/playButton.png";
import imgpause from "../assets/audioPlayer/img/pauseButton.png";
import imgdownload from "../assets/audioPlayer/img/download.png";
import imgrepeat from "../assets/audioPlayer/img/repeat.png";
import imgback from "../assets/audioPlayer/img/backButton.png";
import imgclose from "../assets/audioPlayer/img/close-C.png";
import imginfo from "../assets/audioPlayer/img/info.png";
import "../Styles/Pravachans.css";
import { ProgressBar } from "react-bootstrap";

const PravachanPlayer = () => {
  const { t } = useTranslation();
  const { currentPravachan, close, next, prev, setPravachanInfoDialog } =
    usePravachan();
  const refAudio = React.useRef<HTMLAudioElement>(null);
  const [cTime, setCTime] = React.useState(0);
  const [aLength, setALength] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  return (
    <div className='playpravachan backcolor' title={currentPravachan?.name}>
      <div className='column' style={{ width: "25%", textAlign: "center" }}>
        {currentPravachan == null ? (
          "no record found"
        ) : (
          <audio          
            ref={refAudio}
            id={`pravachan-${currentPravachan.id}`}
            autoPlay
            src={currentPravachan.pravachanPath}
            onPlay={() => {
              setPlaying(true);
            }}
            onPause={() => {
              setPlaying(false);
            }}
            onDurationChange={(e) => {
              setALength(e.currentTarget.duration);
            }}
            onTimeUpdate={(e) => {
              setCTime(e.currentTarget.currentTime);
              if (
                e.currentTarget.duration === e.currentTarget.currentTime
              ) {
                next();
              }
            }} />
        )}
      </div>
      <div className='column'>
        <button
          className='backcolor'
          onClick={() => {
            setPravachanInfoDialog();
          }}>
          <img alt="info" src={imginfo} title='information' width='30px'></img>
        </button>
      </div>
      <div className='column'>
        <a
          id='download'
          title='Download'
          href={
            currentPravachan != null
              ? currentPravachan.pravachanPath
              : "no record found"
          }
          >
          <img alt="download" src={imgdownload} title='download' width='30px'></img>
        </a>
      </div>
      <div className='column'>
        <button className='backcolor'>
          <img alt="repeat" src={imgrepeat} title='repeat' width='30px'></img>
        </button>
      </div>

      <div className='column'>
        <button
          className='backcolor'
          onClick={() => {
            prev();
          }}>
          <img alt="prev" src={imgback} title='prev' width='24px'></img>
        </button>
      </div>

      <div className='column'>
        {playing ? (
          <button
            className='backcolor'
            onClick={() => {
              refAudio.current?.pause();
            }}>
            <img alt="pause" src={imgpause} title='pause' width='30px'></img>
          </button>
        ) : (
          <button
            className='backcolor'
            onClick={() => {             
              refAudio.current?.play();
            }}>
            <img alt="play" src={imgplay} title='play' width='30px'></img>
          </button>
        )}
      </div>
      <div className='column'>
        <button
          className='backcolor'
          onClick={() => {
            next();
          }}>
          {/* <img alt="next" src={imgforward} title='next' width='24px'></img> */}
        </button>
      </div>
      <div className='column'>
        <button
          className='backcolor'
          onClick={() => {
            close();
          }}>
          <img alt="close" src={imgclose} title='close' width='30px'></img>
        </button>
      </div>
      <div className='column' style={{ paddingRight: "15px" }}>
        <span id='time'>{cTime}</span>
      </div>
      <div className='column' style={{ width: "40%" }}>
        <ProgressBar
          variant='success'
          color='orange'
          now={cTime}
          max={aLength}
        />
      </div>
      <div className='column' style={{ paddingLeft: "15px" }}>
        <span id='total-time'>{aLength}</span>
        <span id='totalCaltime' style={{ display: "none" }}>
          0
        </span>
      </div>
    </div>
  );
};

export default PravachanPlayer;
