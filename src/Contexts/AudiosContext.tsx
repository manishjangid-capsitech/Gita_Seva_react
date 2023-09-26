/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AudioPlayer from "../Services/AudioPlayer";

export interface IAudioItem {
  ctime: number;
  id: string;
  name: string;
  author: string;
  playing: boolean;
  audioPath: string;
  audioUrl: string;
  pravachanPath: string;
  pravachanUrl: string;
  lyricsPath: string;
  lyricsHash: string;
  index: number;
}
interface IAudiosContextProps {
  isMinimise: boolean;
  setIsMinismise: React.Dispatch<React.SetStateAction<boolean>>;
  audiosList: IAudioItem[];
  currentAudio: IAudioItem | null;
  audioInfoDialog: boolean;
  setAudioInfoDialog: () => void;
  setAudiosList: React.Dispatch<React.SetStateAction<IAudioItem[]>>;
  playAudio: (id: string, index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  lyrt: () => string;
  repeat: () => void;
  playbackspeed: (e: any) => void;
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioContext = React.createContext<IAudiosContextProps>({} as any);
export function AudioProvider(props: { children: any }) {
  const [currentAudio, setCurrentAudio] = useState<IAudioItem | null>(null);
  const [audiosList, setAudiosList] = useState<IAudioItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [audioIndex, setAudioIndex] = useState(0);
  const [audioinfoDialog, setAudioinfoDialog] = useState(false);
  const [lyrtxt, setlyrtxt] = useState("");
  const [audioId, setaudioId] = useState("");
  const [Type, setType] = useState<any | undefined>(undefined);
  const [suff, setSuff] = useState<boolean>(false);
  const [isMinimise, setIsMinismise] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);

  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const playAudio = (id: string, index: number) => {
    setAudioIndex(index);
    setaudioId(id);
    navigate(`/${localStorage.getItem("type")}/${id}`);
  };
  const close = () => {
    setAudiosList([]);
    setaudioId("");
    setCurrentAudio(null);
    navigate(`/${Type}/`);
  };
  const next = () => {
    setAudioIndex(
      audioIndex < audiosList.length - 1
        ? audioIndex + 1
        : audiosList.length - 1 === audioIndex
        ? 0
        : audiosList.length
    );
    setCurrentAudio({
      ...audiosList[audiosList.length - 1 === audioIndex ? 0 : audioIndex + 1],
    });
    let ind = audiosList.length - 1 === audioIndex ? 0 : audioIndex + 1;
    let dt = audiosList[ind];
    playAudio(dt.id, ind);
  };

  const prev = () => {
    setAudioIndex(
      audioIndex === 0
        ? audiosList.length - 1
        : audioIndex < audiosList.length + 1
        ? audioIndex - 1
        : 0
    );
    setCurrentAudio({
      ...audiosList[
        audioIndex === 0
          ? audiosList.length - 1
          : audioIndex < audiosList.length + 1
          ? audioIndex - 1
          : 0
      ],
    });
    let ind =
      audioIndex === 0
        ? audiosList.length - 1
        : audioIndex < audiosList.length + 1
        ? audioIndex - 1
        : 0;
    let dt = audiosList[ind];
    playAudio(dt.id, ind);
    // setAudioIndex( audioIndex === 0 ? audiosList.length -1  :audioIndex < audiosList.length + 1 ? (audioIndex - 1): 0);
    // setCurrentAudio({ ...audiosList[audioIndex === 0 ? audiosList.length -1  :audioIndex < audiosList.length + 1 ? (audioIndex - 1): 0], playing: true});
  };

  const repeat = () => {
    setSuff((x: boolean) => !x);
  };

  const lyrt = () => {
    return lyrtxt;
  };

  const playbackspeed = () => {
    var audio = new Audio();
    audio.play();
    var speedlist = document.getElementById("speedlist");
    speedlist?.addEventListener("change", changeSpeed);
    function changeSpeed(e: any) {
      audio.playbackRate = e.target.value;
    }
    window.addEventListener("load", playbackspeed);
  };

  const LoadLyrics = (id: string) => {
    setTimeout(function () {
      const script = document.createElement("script");     
      script.type = "text/javascript";
      script.id = "rabbitlyrics";
      script.src = "/assets/rabbitLyrics";
      document.body.appendChild(script);
      script.onload = function () { 
      };
    }, 3000);

    var todayDate = new Date();
    var signKey = localStorage.getItem("SignKey");
    var token = localStorage.getItem("Token");

    let securekey = window.btoa(
      signKey + "|" + id + "|2|" + todayDate.toISOString().substr(0, 10)
    );
    var rawFile = new XMLHttpRequest();
    var proc = //`${process.env.REACT_APP_API_URL}/api/Pravachans/`;
      localStorage.getItem("type") === "pravachans"
        ? `${process.env.REACT_APP_API_URL}/api/Pravachans/`
        : `${process.env.REACT_APP_API_URL}/api/Audios/`;
    rawFile.open(
     
      "GET",
      proc + id + `/lyrics`,
      false
    );
    rawFile.setRequestHeader("Authorization", "Bearer " + token);
    rawFile.setRequestHeader("X-Signature", securekey);
    rawFile.setRequestHeader("X-Plateform", "2");
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = "";
          allText = rawFile.responseText;
          setlyrtxt(allText);
        } else if (rawFile.status === 404) {
          setlyrtxt("");
          allText = "";
        }
      }
    };
    rawFile?.send();
  };

  const setAudioInfoDialog = () => {
    if (audioinfoDialog) {
      setAudioinfoDialog(false);
    } else {
      setAudioinfoDialog(true);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, [currentAudio]);

  useEffect(() => {
    setType(localStorage.getItem("type"));
    if (audioId) {
      setLoading(true);
      AudioPlayer.getAudiosById(audioId, Type).then((res) => {
        if (res.status) {
          setCurrentAudio(null);
          setCurrentAudio({ ...res.result, playing: true });
          setLoading(false);
        }
      });
      if (currentAudio?.lyricsPath !== "") LoadLyrics(audioId);
    }
  }, [audioId, Type, suff]);

  if (!isLoaded) return null;

  return (
    <AudioContext.Provider
      value={{
        isMinimise,
        setIsMinismise,
        currentAudio,
        playAudio,
        audiosList,
        audioInfoDialog: audioinfoDialog,
        setAudioInfoDialog,
        setAudiosList,
        close,
        next,
        prev,
        lyrt,
        repeat,
        playbackspeed,
        showList,
        setShowList,
      }}
      {...props}
    />
  );
}
export function useAudio() {
  const context = React.useContext(AudioContext);
  if (context === undefined) {
    throw new Error(`useAudio must be used within a AudioProvider`);
  }
  return context;
}
