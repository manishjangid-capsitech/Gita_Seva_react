import React from "react";
import { useTranslation } from "react-i18next";
import { useAudio } from "../Contexts/AudiosContext";

const AudioList = () => {
  const { t } = useTranslation();
  const { currentAudio, close } = useAudio();

  React.useEffect(() => {}, []);

  // return currentAudio && <div>playing {currentAudio.name}</div>;
};
export default AudioList;
