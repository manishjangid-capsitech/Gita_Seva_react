/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from "react-i18next";
import React from "react";
import { Button, Col } from "react-bootstrap";
import { usePravachan } from "../Contexts/PravachansContext";
import PravachanPlayer from "../Services/PravachanPlayer";
import arleft from "../Images/arrowleft.png";
import logo from "../Images/logo_Main.png";
import close from "../Images/close-C.png";
import mni from "../Images/minimize-C.png";
import PravachanLyrics from "../Components/PravachanLyrics";
import { _get_i18Lang } from "../i18n";
import { useLocation, useNavigate } from "react-router-dom";

const PravachanPlayerPage = ({ match }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setPravachansList, pravachansList, playPravachan, currentPravachan } =
    usePravachan();

  const location = useLocation();
  const state = location.state as {
    pravachanId: string;
    audiocat: string;
    sorting: string;
    index: number;
  };
  const auid = React.useRef<string | undefined>(state?.pravachanId! || "");
  const catId = React.useRef<string | undefined>(state?.audiocat! || "");

  const [Type, setType] = React.useState<any | undefined>(
    localStorage.getItem("type")
  );

  React.useEffect(() => {
    setType(localStorage.getItem("type"));
    PravachanPlayer.getPravachanPlayer(
      _get_i18Lang(),
      0,
      15,
      false,
      "",
      state?.audiocat,
      "",
      "",
      state?.sorting,
      "",
      false
    ).then((res) => {
      if (res) {
        setPravachansList(res.result.items);
      }
    });
  }, [auid.current, catId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="songSidebar">
            <div className="ralated-logo">
              <a>
                <img
                  alt=""
                  src={arleft}
                  onClick={() => {
                    navigate(`/${Type}`);
                  }}
                ></img>
              </a>
              <a>
                <img alt="" src={logo}></img>
              </a>
            </div>

            <div className="relatedpravachantitle">
              {t("Related_pravachans_tr")}
            </div>
            <div className="songCategories">
              {pravachansList?.map((a, i) => (
                <div key={a.id}>
                  <Button                   
                    variant={a.id === currentPravachan?.id ? "link" : "light"}  
                    onClick={() => {
                      playPravachan(a.id,i);
                    }}
                  >
                    {a.name != null && a.name.length > 15
                      ? a.name.slice(0, 15) + "..."
                      : a.name}
                  </Button>
                </div>
              ))}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
        <Col>
          <div className="closeTab">
            <a>
              <img alt="" src={mni}></img>
            </a>
            <a>
              <img
                alt=""
                src={close}
                onClick={() => {
                  navigate(`/${Type}`);
                }}
              ></img>
            </a>
          </div>
          <PravachanLyrics />
        </Col>
      </div>
    </div>
  );
};
export default PravachanPlayerPage;
