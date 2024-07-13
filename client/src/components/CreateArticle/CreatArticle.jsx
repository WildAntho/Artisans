import PropTypes from "prop-types";
import { Button, Modal } from "@mui/material";
import "./createarticle.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function CreateArticle({
  open,
  handleClose,
  setUpdate,
  idCard,
}) {
  // URL Api
  const api = import.meta.env.VITE_API_URL;

  // useRef ton track all the inputs
  const title = useRef(null);
  const type = useRef(null);
  const warranty = useRef(null);
  const price = useRef(null);
  const styles = {
    modalStyle1: {
      overflowY: "auto",
    },
  };

  // State to fill input when updating
  const [updateData, setUpdateData] = useState([]);

  const createProduct = async () => {
    // Route post
    if (!idCard) {
      try {
        const response = await fetch(`${api}/api/product/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.current.value,
            type: type.current.value,
            warranty: warranty.current.value,
            price: price.current.value,
          }),
        });
        if (response.ok) {
          toast.success("Produit ajouté avec succès");
          setUpdate((prev) => !prev);
          handleClose();
        }
      } catch (error) {
        toast.error("Une erreur est survenue");
      }
    }

    // Route put
    if (idCard) {
      try {
        const response = await fetch(`${api}/api/product/${idCard}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.current.value,
            type: type.current.value,
            warranty: warranty.current.value,
            price: price.current.value,
          }),
        });
        if (response.ok) {
          toast.success("Produit modifié avec succès");
          setUpdate((prev) => !prev);
          handleClose();
        }
      } catch (error) {
        toast.error("Une erreur est survenue");
      }
    }
  };

  const getOneProduct = async () => {
    try {
      const response = await fetch(`${api}/api/product/${idCard}`);
      if (response.ok) {
        const data = await response.json();
        setUpdateData(data);
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  useEffect(() => {
    if (idCard) {
      getOneProduct();
    }
  }, [idCard]);

  return (
    <Modal open={open} onClose={handleClose} style={styles.modalStyle1}>
      <section className="modal-creation">
        <input
          type="text"
          placeholder="Renseigner le titre de l'article"
          defaultValue={idCard ? updateData.title : ""}
          ref={title}
        />
        <select
          type=""
          id="product-type"
          name="type"
          ref={type}
          defaultValue={idCard ? updateData.type : ""}
        >
          <option value="" disabled>
            {"Renseigner le type de l'article"}
          </option>
          <option value="Phone">Phone</option>
          <option value="Watch">Watch</option>
          <option value="Tv">Tv</option>
          <option value="Tv">PC</option>
        </select>
        <input
          type="text"
          placeholder="Renseigner la date de fin de garantie"
          defaultValue={idCard ? updateData.warranty : ""}
          ref={warranty}
        />
        <input
          type="text"
          placeholder="Renseigner le prix de l'article"
          defaultValue={idCard ? updateData.price : ""}
          ref={price}
        />
        <div className="container-button">
          <Button variant="contained" color="success" onClick={createProduct}>
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

CreateArticle.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  idCard: PropTypes.number.isRequired,
};
