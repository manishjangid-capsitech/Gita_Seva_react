import { Button, Modal } from "react-bootstrap";
import { useAudio } from "../Contexts/AudiosContext";
import i18n, { _get_i18Lang } from "../i18n";
import { useTranslation } from "react-i18next";

export const AudioInfoDialog = (props: { showModal: boolean | undefined }) => {
  const { t } = useTranslation();
  const { setAudioInfoDialog, currentAudio } = useAudio();
  return (
    <Modal
      show={props.showModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header
        onClick={() => setAudioInfoDialog()}
        closeButton
        style={{ backgroundColor: "#ffd186" }}>
        <Modal.Title id='contained-modal-title-vcenter'>
        {t("Description_tr")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <div style={{display:'flex'}}> <p>{t("Title_tr")} :</p> <p style={{fontWeight:600}}>{currentAudio?.name}</p></div>
        <div style={{display:'flex'}}><p>{t("Preacher_tr")} :</p> <p style={{fontWeight:600}}>{currentAudio?.author}</p></div>
         <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setAudioInfoDialog()}>{t("close_tr")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
