import PropTypes from "prop-types";
import { Button, Modal } from "@mui/material";
import "./deletevalidation.css";

export default function DeleteValidation({ handleDelete, handleClose, open }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <section className="validation-container">
        <div className="message-container">
          <p>Etes-vous sûr de vouloir supprimer ce produit ?</p>
          <div className="validation-button-container">
            <Button variant="outlined" color="error" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="contained" color="success" onClick={handleDelete}>
              Valider
            </Button>
          </div>
        </div>
      </section>
    </Modal>
  );
}

DeleteValidation.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
