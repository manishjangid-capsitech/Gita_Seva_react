import React from "react";
import { useAudio } from "../Contexts/AudiosContext";
import RabbitLyrics from "rabbit-lyrics";
import playimg from "../assets/img/vol.png";

const LyricsComponent = () =>{
    const {currentAudio, lyrt, showList, setShowList} = useAudio()
    const refLrc = React.useRef<any>(null)
    const [defaultlyrics, setDefaultAudLyrics] = React.useState("");
    const text = require("../assets/defaultAudLyrics.txt");
    const audio = require("../assets/rabbitLyrics/YadaYadaHomePage.mp3");
    const refAudio = React.useRef<HTMLAudioElement>(null);

    React.useEffect(()=>{
        if(currentAudio){
            new RabbitLyrics(
                refLrc.current,
                document.getElementById(`audio-${currentAudio?.id}`) as any
            )
        }
    },[currentAudio, currentAudio?.lyricsHash, lyrt])
    
    React.useEffect(() => {
        fetch(text)
          .then((response) => response?.text())
          .then((textContent) => {
            var lyrics = textContent.replace(/\[[^\]]+\]/g, "").trim();
            setDefaultAudLyrics(lyrics);
          });
      }, []);
      React.useEffect(() => {
        if (refLrc.current) {
          new RabbitLyrics(refLrc.current, refAudio.current as any);
        }
      },[]);

      const [playing,setPlaying] = React.useState<boolean>(false)
    return(
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
                                // stopHomeAudio(2);
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
                                // stopHomeAudio(1);
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
                          src={audio}
                        />
                        <div
                          ref={refLrc}
                          data-audio="#audio1"
                          className="lyrics lyrics-enabled"
                          style={{
                            cursor: "pointer",
                            padding: "18px 11px 0 10px",
                          }}
                          // data-audio="#audio1"
                        >
                          {defaultlyrics
                            ?.replace(/\r/g, "")
                            ?.split("\n")
                            ?.map((l: any,index) => {
                                // console.log(index)
                              return <span key={index} style={{ fontSize: 23 }}>{l}</span>;
                            })}
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
                          {2.48 < 52.00 &&   <div
                            className="line"
                            id="lineDiv1"
                            data-start="2.48"
                            data-end="52.00"
                          >
                            कंस और चाणूरका वध करने वाले, देवकीके आनन्दवर्धन,
                            वसुदेवनन्दन जगद्गुरु श्रीकृष्णचन्द्रकी मैं वन्दना
                            करता हूँ। <br />
                          </div>}

                         { <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv2"
                            data-start="52.00"
                            data-end="94.31"
                          >
                            मैं अजन्मा और अविनाशी स्वरूप होते हुए भी तथा समस्त
                            प्राणियोंका ईश्वर होते हुए भी अपनी प्रकृतिको अधीन
                            करके अपनी योगमायासे प्रकट होता हूँ।
                            <br />
                          </div>}

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv3"
                            data-start="94.31"
                            data-end="133.51"
                          >
                            हे भारत! जब-जब धर्मकी हानि और अधर्मकी वृद्धि होती
                            है, तब-तब ही मैं अपने रूपको रचता हूँ अर्थात्
                            साकाररूपसे लोगोंके सम्मुख प्रकट होता हूँ।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv4"
                            data-start="133.51"
                            data-end="171.84"
                          >
                            साधु पुरुषोंका उद्धार करनेके लिये, पाप-कर्म
                            करनेवालोंका विनाश करनेके लिये और धर्मकी अच्छी तरहसे
                            स्थापना करनेके लिये मैं युग-युगमें प्रकट हुआ करता
                            हूँ।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv5"
                            data-start="171.84"
                            data-end="208.98"
                          >
                            हे अर्जुन! मेरे जन्म और कर्म दिव्य अर्थात् निर्मल और
                            अलौकिक हैं—इस प्रकार जो मनुष्य तत्त्वसे जान लेता है,
                            वह शरीरको त्यागकर फिर जन्मको प्राप्त नहीं होता,
                            किंतु मुझे ही प्राप्त होता है।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv6"
                            data-start="208.98"
                            data-end="245.46"
                          >
                            पहले भी, जिनके राग, भय और क्रोध सर्वथा नष्ट हो गये
                            थे और जो मुझमें अनन्यप्रेमपूर्वक स्थित रहते थे, ऐसे
                            मेरे आश्रित रहनेवाले बहुत-से भक्त उपर्युक्त ज्ञानरूप
                            तपसे पवित्र होकर मेरे स्वरूपको प्राप्त हो चुके हैं।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv7"
                            data-start="245.46"
                            data-end="289.86"
                          >
                            कंस और चाणूरका वध करने वाले, देवकीके आनन्दवर्धन,
                            वसुदेवनन्दन जगद्गुरु श्रीकृष्णचन्द्रकी मैं वन्दना
                            करता हूँ।
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv8"
                            data-start="289.86"
                            data-end="306.91"
                          >
                            हरे राम हरे राम राम राम हरे हरे
                          </div>

                          <div
                            className="line active"
                            style={{ display: "none" }}
                            id="lineDiv9"
                            data-start="306.91"
                            data-end="Infinity"
                          >
                            हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे
                          </div>
                        </div>
                      </div>
                    </div>
    )
}

export default LyricsComponent;