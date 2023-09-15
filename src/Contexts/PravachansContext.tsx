import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PravachanPlayer from "../Services/PravachanPlayer";
<script src='/scripts/script.js'></script>;

export interface IPravachanItem {
  id: string;
  name: string;
  playing: boolean;
  pravachanPath: string;
  pravachanUrl: string;
  lyricsPath: string;
}
interface IPravachansContextProps {
  pravachansList: IPravachanItem[];
  currentPravachan: IPravachanItem | null;
  pravachanInfoDialog: boolean;
  setPravachanInfoDialog: () => void;
  setPravachansList: React.Dispatch<React.SetStateAction<IPravachanItem[]>>;
  playPravachan: (id: string, index:number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  lyrt: () => string;
}

const PravachanContext = React.createContext<IPravachansContextProps>(
  {} as any
);
export function PravachanProvider(props: { children: any }) {
  const [currentPravachan, setCurrentPravachan] =
    useState<IPravachanItem | null>(null);
  const [pravachansList, setPravachansList] = useState<IPravachanItem[]>(
    []
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [pravachanIndex, setPravachanIndex] = useState(0);
  const [pravachaninfoDialog, setPravachaninfoDialog] = useState(false);
  const [lyrtxt, setlyrtxt] = useState("");
  const [pravachanId, setpravachanId] = useState("");
  const navigate = useNavigate();

  const playPravachan = (id: string, index:number) => {
    setpravachanId(id);
    navigate(`/pravachans/${id}`);
  };
  const close = () => {
    setPravachansList([]);
    setCurrentPravachan(null);
  };
  const next = () => {
    setPravachanIndex(pravachanIndex < pravachansList.length - 1 ? (pravachanIndex + 1 ): (pravachansList.length - 1 === pravachanIndex ? 0 : pravachansList.length));
    setCurrentPravachan({ ...pravachansList[pravachansList.length - 1 === pravachanIndex ? 0 : pravachanIndex + 1 ]});
    let ind = pravachansList.length - 1 === pravachanIndex ? 0 : pravachanIndex + 1
    let dt = pravachansList[ind]
    playPravachan(dt.id,ind)
  };
  const prev = () => {
    setPravachanIndex( pravachanIndex === 0 ? pravachansList.length -1  :pravachanIndex < pravachansList.length + 1 ? (pravachanIndex - 1): 0);
    setCurrentPravachan({ ...pravachansList[pravachanIndex === 0 ? pravachansList.length -1  :pravachanIndex < pravachansList.length + 1 ? (pravachanIndex - 1): 0], playing: true});
    setPravachanIndex( pravachanIndex === 0 ? pravachansList.length -1  :pravachanIndex < pravachansList.length + 1 ? (pravachanIndex - 1): 0);
    setCurrentPravachan({ ...pravachansList[pravachanIndex === 0 ? pravachansList.length -1  :pravachanIndex < pravachansList.length + 1 ? (pravachanIndex - 1): 0], playing: true});
  };

  const lyrt = () => {
    return lyrtxt;
  };
  const LoadLyrics = (id: string) => {
    // Load lyrics script
    setTimeout(function () {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "rabbitlyrics";
      script.src = "/assets/rabbitLyrics";
      document.body.appendChild(script);
      script.onload = function () {};
    }, 3000);

    localStorage.setItem("lyricsText", "");
    var todayDate = new Date();
    var signKey = localStorage.getItem("SignKey");

    var token = localStorage.getItem("Token");

    let securekey = window.btoa(
      signKey + "|" + id + "|2|" + todayDate.toISOString().substr(0, 10)
    );
    var rawFile = new XMLHttpRequest();
    rawFile.open(
      "GET",
      //currentAudio?.lyric52sPath == "" ? currentAudio.lyricsPath : "",
      `${process.env.REACT_APP_API_URL}/api/Pravachans/` + id + `/lyrics`,
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

          //localStorage.setItem("lyricsText", allText);
          setlyrtxt(allText);
        } else if (rawFile.status === 404) {
          //localStorage.setItem("lyricsText", "");
          setlyrtxt("");
          allText = "";
        }
      }
    };
    rawFile.send();
  };

  const setPravachanInfoDialog = () => {
    if (pravachaninfoDialog) {
      setPravachaninfoDialog(false);
    } else {
      setPravachaninfoDialog(true);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pravachanId) {
      PravachanPlayer.getPravachansById(pravachanId).then((res) => {
        if (res) {
          setCurrentPravachan({ ...res.result, playing: true });
        }
      });
      LoadLyrics(pravachanId);
    }
  }, [pravachanId]);

  if (!isLoaded) return null;

  return (
    <PravachanContext.Provider
      value={{
        currentPravachan,
        playPravachan,
        pravachansList,
        pravachanInfoDialog: pravachaninfoDialog,
        setPravachanInfoDialog,
        setPravachansList,
        close,
        next,
        prev,
        lyrt,
      }}
      {...props}
    />
  );
}
export function usePravachan() {
  const context = React.useContext(PravachanContext);
  if (context === undefined) {
    throw new Error(`useAudio must be used within a AudioProvider`);
  }
  return context;
}
