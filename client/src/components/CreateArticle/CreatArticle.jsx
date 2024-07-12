import { Button, Modal } from "@mui/material";
import "./createarticle.css";
import { useRef } from "react";

export default function CreateArticle({ open, handleClose }) {
  const title = useRef(null);
  const type = useRef(null);
  const warranty = useRef(null);
  const price = useRef(null);
  const styles = {
    modalStyle1: {
      overflowY: "auto",
    },
  };
  return (
    <Modal open={open} onClose={handleClose} style={styles.modalStyle1}>
      <section className="modal-creation">
        <input
          type="text"
          placeholder="Renseigner le titre de l'article"
          ref={title}
        />
        <input
          type="text"
          placeholder="Renseigner le type de l'article"
          ref={type}
        />
        <input
          type="text"
          placeholder="Renseigner la date de fin de garantie"
          ref={warranty}
        />
        <input
          type="text"
          placeholder="Renseigner le prix de l'article"
          ref={price}
        />
        <div className="container-button">
          <Button variant="contained" color="success">
            Valider
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Annuler
          </Button>
        </div>
      </section>
    </Modal>
  );
}
