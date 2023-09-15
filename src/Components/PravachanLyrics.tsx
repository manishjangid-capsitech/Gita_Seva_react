import React from "react";
import { usePravachan } from "../Contexts/PravachansContext";
import RabbitLyrics from "rabbit-lyrics";

const PravachanLyrics = () => {
    const { currentPravachan, lyrt } = usePravachan();
    const refLrc = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (currentPravachan) {
        const aud = document.getElementById(`pravachan-${currentPravachan!.id}`);
        if (refLrc.current && aud) {
          const rl = new RabbitLyrics(refLrc.current, aud as any);
        }
      }
    }, [currentPravachan]);

  return (
    <div
      className='lyrics-data'
      style={{ textAlign: "left", paddingTop: "7%" }}>
      <div
        ref={refLrc}
        className='lyrics'
        style={{ fontSize: "17px", padding: "10px" }}>
        {lyrt()}
      </div>
    </div>
  );
};
export default PravachanLyrics;
