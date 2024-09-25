import { Button, Modal } from "react-bootstrap";
import { useAudio } from "../Contexts/AudiosContext";
import { _get_i18Lang } from "../i18n";
import { useTranslation } from "react-i18next";

interface audiologprops {
  showModal: boolean;
  onCloses: () => void;
}

export const AudioInfoDialog: React.FC<audiologprops> = ({ showModal,
  onCloses: onClose, }) => {
  const { t } = useTranslation();
  const { currentAudio } = useAudio();
  return (
    <Modal
      show={showModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header
        onClick={() => onClose()}
        closeButton
        style={{ backgroundColor: "#ffd186" }}>
        <Modal.Title id='contained-modal-title-vcenter'>
          {t("Description_tr")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <div style={{ display: 'flex', fontSize: "22px" }}> <p>{t("Title_tr")} :</p> <p style={{ fontWeight: 600 }}>{currentAudio?.name}</p></div>
        <div style={{ display: 'flex', fontSize: "22px" }}><p>{t("Preacher_tr")} :</p> <p style={{ fontWeight: 600 }}>{currentAudio?.author}</p></div>
        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onClose()} style={{backgroundColor: "#FF7F1E", border: "none"}}>{t("close_tr")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
