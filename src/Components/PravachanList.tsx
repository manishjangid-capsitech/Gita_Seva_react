import { useTranslation } from "react-i18next";
import React from "react";
import { usePravachan } from "../Contexts/PravachansContext";

const PravachanList = () => {
  const { t } = useTranslation();
  const { currentPravachan } = usePravachan();

  React.useEffect(() => {}, []);

  return currentPravachan && <div>playing {currentPravachan.name}</div>;
};
export default PravachanList;
