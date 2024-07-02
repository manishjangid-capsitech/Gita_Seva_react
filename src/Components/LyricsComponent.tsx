import { useState, useRef, useEffect } from "react";
import playimg from "../assets/img/vol.png";

const LyricsComponent = () => {

  const refLrc = useRef<any>(null)
  const audio = require("../assets/rabbitLyrics/YadaYadaHomePage.mp3");
  const refAudio = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState<boolean>(false)

  const [currentTime, setCurrentTime] = useState<any>(0);

  const [activeLyricIndex, setActiveLyricIndex] = useState<any>(null);

  const lyrics = [
    {
      index: 0,
      time: 0, english: ["वसुदेवसुतं देवं कंसचाणूरमर्दनम्।", <br />, "देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥"],
      hindi: ["कंस और चाणूरका वध करने वाले, देवकीके आनन्दवर्धन, वसुदेवनन्दन जगद्गुरु श्रीकृष्णचन्द्रकी मैं वन्दना करता हूँ।"]
    },
    {
      index: 1,
      time: 52.000,
      english: ["अजोऽपि सन्नव्ययात्मा भूतानामीश्वरोऽपि सन्।", <br />, "प्रकृतिं स्वामधिष्ठाय सम्भवाम्यात्ममायया॥"],
      hindi: "मैं अजन्मा और अविनाशी स्वरूप होते हुए भी तथा समस्त प्राणियोंका ईश्वर होते हुए भी अपनी प्रकृतिको अधीन करके अपनी योगमायासे प्रकट होता हूँ।?"
    },
    {
      index: 2,
      time: 94.031,
      english: ["यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।", <br />, "अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥"],
      hindi: " हे भारत! जब-जब धर्मकी हानि और अधर्मकी वृद्धि होती है, तब-तब ही मैं अपने रूपको रचता हूँ अर्थात् साकाररूपसे लोगोंके सम्मुख प्रकट होता हूँ।"
    },
    {
      index: 3,
      time: 133.051,
      english: ["परित्राणाय साधूनां विनाशाय च दुष्कृताम्।", <br />, "धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥"],
      hindi: "  साधु पुरुषोंका उद्धार करनेके लिये, पाप-कर्म करनेवालोंका विनाश करनेके लिये और धर्मकी अच्छी तरहसे स्थापना करनेके लिये मैं युग-युगमें प्रकट हुआ करता हूँ।"
    },
    {
      index: 4,
      time: 171.084,
      english: ["जन्म कर्म च मे दिव्यमेवं यो वेत्ति तत्त्वत:।", <br />, "त्यक्त्वा देहं पुनर्जन्म नैति मामेति सोऽर्जुन॥"],
      hindi: " हे अर्जुन! मेरे जन्म और कर्म दिव्य अर्थात् निर्मल और अलौकिक हैं—इस प्रकार जो मनुष्य तत्त्वसे जान लेता है, वह शरीरको त्यागकर फिर जन्मको प्राप्त नहीं होता, किंतु मुझे ही प्राप्त होता है।"
    },
    {
      index: 5,
      time: 208.098,
      english: ["वीतरागभयक्रोधा मन्मया मामुपाश्रिता:।", <br />, "बहवो ज्ञानतपसा पूता मद्भावमागता:॥"],
      hindi: "पहले भी, जिनके राग, भय और क्रोध सर्वथा नष्ट हो गये थे और जो मुझमें अनन्यप्रेमपूर्वक स्थित रहते थे, ऐसे मेरे आश्रित रहनेवाले बहुत-से भक्त उपर्युक्त ज्ञानरूप तपसे पवित्र होकर मेरे स्वरूपको प्राप्त हो चुके हैं।"
    },
    {
      index: 6,
      time: 245.046,
      english: ["वसुदेवसुतं देवं कंसचाणूरमर्दनम्।", <br />, "देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥", <br />, "कृष्णं वन्दे जगद्गुरुम्"],
      hindi: " कंस और चाणूरका वध करने वाले, देवकीके आनन्दवर्धन, वसुदेवनन्दन जगद्गुरु श्रीकृष्णचन्द्रकी मैं वन्दना करता हूँ।"
    },
    {
      index: 7,
      time: 280.088,
      english: "हरे राम हरे राम राम राम हरे हरे",
      hindi: "हरे राम हरे राम राम राम हरे हरे"
    },
    {
      index: 8,
      time: 306.091,
      english: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
      hindi: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे"
    },
  ];

  const handleTimeUpdate = () => {
    setCurrentTime(refAudio?.current?.currentTime);
  };

  const handleLyricClick = (index: any, time: any) => {
    if (refAudio.current) {
      refAudio.current.currentTime = time;
      refAudio.current?.play();
      setActiveLyricIndex(index);
    }
  };

  const getCurrentLyrics = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return lyrics[i];
      }
    }
    return { english: "", hindi: "" };
  };

  const currentLyrics = getCurrentLyrics();

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (refAudio.current) {
        const currentTime = refAudio.current.currentTime;
        const activeIndex = lyrics?.findIndex(
          (lyric, index) =>
            currentTime >= lyric.time &&
            (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)
        );
        setActiveLyricIndex(activeIndex);
      }
    };

    const audioElement = refAudio.current;
    audioElement?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioElement?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div
      className="parentBox"
    >
      <div
        className="bgImg audioBox1"
        style={{
          backgroundColor: "#ffc72f",
        }}
      >
        <div
          id="audio1"
          style={{ margin: "70px 15px 0 -10px" }}
        >
          {playing ? (
            <img
              id="startIcon"
              src={playimg}
              alt="playimg"
              style={{
                color: "rgb(255, 233, 172)",
                fontSize: "33px",
                cursor: "pointer",
                margin: "15px 0px 0px 22px",
                paddingTop: "25%",
              }}
              onClick={() => {
                refAudio.current?.pause();
              }}
            />
          ) : (
            <i
              id="stopIcon"
              className="fa fa-play-circle"
              style={{
                color: "rgb(255, 233, 172)",
                fontSize: "33px",
                cursor: "pointer",
                margin: "15px 0 0 22px",
                paddingTop: "18%",
              }}
              onClick={() => {
                refAudio.current?.play();
              }}
            ></i>
          )}
        </div>
        <audio
          ref={refAudio}
          id="#audio1"
          onPlay={() => {
            setPlaying(true);
          }}
          onPause={() => {
            setPlaying(false);
          }}
          onTimeUpdate={handleTimeUpdate}
          src={audio}
        />
        <div
          ref={refLrc}
          data-audio="#audio1"
          className="lyrics lyrics-enabled"
          style={{
            cursor: "pointer",
            // padding: "18px 11px 0 10px",
            padding: "18px 25px 0px 25px",
            overflow: "auto",
          }}
        >
          <div className="lyrics-column">
            {lyrics?.map((lyricx: any, index: any) => (
              <p
                key={index}
                style={{
                  cursor: 'pointer',
                  fontSize: "25px",
                  margin: 0,
                  fontFamily: "ChanakyaUni",
                  textAlign: "center",
                  color: index === activeLyricIndex ? '#fd7e35' : '#212529',
                }} onClick={() => handleLyricClick(index, lyricx.time)}>{lyricx.english}</p>
            )
            )}
          </div>
        </div>
      </div>
      <div
        className="audioBox2"
      >
        <div
          className="partTwoDiv"
          id="div22"
          style={{
            overflowY: "hidden",
            fontSize: "24px",
            fontFamily: "ChanakyaUni",
          }}
        >
          <p className={playing ? "hindi-text-white" : "hindi-text-black"}>{currentLyrics.hindi}</p>
        </div>
      </div>
    </div>
  )
}

export default LyricsComponent;