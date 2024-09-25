/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AudioPlayer from "../Services/AudioPlayer";
import AudiosService from "../Services/Audios";


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
  isMin: boolean,
  setMin: React.Dispatch<React.SetStateAction<boolean>>;
  isMinimise: boolean;
  setIsMinismise: React.Dispatch<React.SetStateAction<boolean>>;
  audiosList: IAudioItem[];
  currentAudio: IAudioItem | null;
  setAudiosList: React.Dispatch<React.SetStateAction<IAudioItem[]>>;
  playAudio: (id: string, index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  favaddremove: () => void;
  isLiked: boolean,
  message: string,
  lyrt: () => string;
  playbackspeed: (e: any) => void;
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioContext = React.createContext<IAudiosContextProps>({} as any);
export function AudioProvider(props: { children: any }) {
  const [currentAudio, setCurrentAudio] = useState<IAudioItem | null>(null);
  const [audiosList, setAudiosList] = useState<IAudioItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [audioIndex, setAudioIndex] = useState<any>(0);
  const [lyrtxt, setlyrtxt] = useState("");
  const [audioId, setaudioId] = useState("");
  const [Type, setType] = useState<any | undefined>(undefined);
  const [isMinimise, setIsMinismise] = useState<boolean>(false);
  const [isMin, setMin] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const [isLoading, setLoading] = useState(false);

  const playAudio = (id: string, index: number) => {
    setAudioIndex(index);
    setaudioId(id);
  };

  const close = () => {
    setAudiosList([]);
    setaudioId("");
    setCurrentAudio(null);
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
    playAudio(dt?.id, ind);
  };

  const getType = localStorage.getItem("type") as string
  const UserIdentity = localStorage.getItem("UserId") as any;

  const favaddremove = () => {
    if (!isLiked) {
      if (getType === "pravachans") {
        AudiosService.addPravachanFavourite(audioId).then((res) => {
          res.status && setIsLiked(true);
          setMessage(localStorage.getItem("lan")
            ? "ऑडियो को मेरे पसंदीदा में सफलतापूर्वक जोड़ा गया |"
            : "Audio Added successfully in my favourite")
        })
      } else {
        AudiosService.addAudioFavourite(audioId).then((res) => {
          res.status && setIsLiked(true);
          setMessage(localStorage.getItem("lan")
            ? "ऑडियो को मेरे पसंदीदा में सफलतापूर्वक जोड़ा गया |"
            : "Audio Added successfully in my favourite")
        })
      }
    }
    else {
      if (getType === "pravachans") {
        AudiosService.removePravachanFaviourite(audioId).then((res) => {
          res.status && setIsLiked(false);
          setMessage(localStorage.getItem("lan")
            ? "ऑडियो को मेरे पसंदीदा से सफलतापूर्वक हटाया गया |"
            : "Audio Removed successfully in my favourite");
        })
      } else {
        AudiosService.removeAudioFavourite(audioId).then((res) => {
          res.status && setIsLiked(false);
          setMessage(localStorage.getItem("lan")
            ? "ऑडियो को मेरे पसंदीदा से सफलतापूर्वक हटाया गया |"
            : "Audio Removed successfully in my favourite");
        });
      };
    }
    setTimeout(() => setMessage(''), 5000);
  }

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
    // Load lyrics script
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

    let securekey =
      window.btoa(
        signKey + "|" + id + "|2|" + todayDate.toISOString().substr(0, 10)
      );

    console.log("securekey", securekey);

    var rawFile = new XMLHttpRequest();
    var proc = //`${process.env.REACT_APP_API_URL}/api/Pravachans/`

      localStorage.getItem("type") === "pravachans"
        ? `${process.env.REACT_APP_API_URL}/api/Pravachans/`
        : localStorage.getItem("type") === "audioPodcast"
          ? `${process.env.REACT_APP_API_URL}/api/AudioPodcast/`
          : `${process.env.REACT_APP_API_URL}/api/Audios/`;

    console.log("proc", proc);

    rawFile.open(

      "GET",
      // currentAudio?.lyricsPath == "" ? currentAudio.lyricsPath : "",
      proc + id + `/lyrics`,
      false
    );
    console.log("path", proc + id + `/lyrics`);
    rawFile.setRequestHeader("Authorization", "Bearer " + token);
    rawFile.setRequestHeader("X-Signature", securekey);
    rawFile.setRequestHeader("X-Plateform", "2");
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = "";
          allText = rawFile.responseText;
          localStorage.setItem("lyricsText", allText);
          setlyrtxt(allText);
        } else if (rawFile.status === 404) {
          //localStorage.setItem("lyricsText", "");
          setlyrtxt("");
          allText = "";
        }
      }
    };
    rawFile?.send();
  };

  useEffect(() => {
    AudiosService.getaudioandpravachanbyid(audioId, UserIdentity !== "" ? UserIdentity : "").then((res) => {
      if (res.status) {
        setIsLiked(res?.result?.isFavourite)
      }
    })
  }, [isLiked, audioId])

  useEffect(() => {
    setIsLoaded(true);
  }, [currentAudio]);

  useEffect(() => {
    if (audioIndex === undefined || NaN) {
      setAudioIndex(2)
    }
  }, [currentAudio, audioIndex, next, prev])

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
  }, [audioId, Type]);

  return (
    <AudioContext.Provider
      value={{
        isMin,
        setMin,
        isMinimise,
        setIsMinismise,
        currentAudio,
        playAudio,
        audiosList,
        setAudiosList,
        close,
        next,
        prev,
        isLiked,
        message,
        favaddremove,
        lyrt,
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
