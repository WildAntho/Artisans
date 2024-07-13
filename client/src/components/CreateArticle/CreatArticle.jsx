/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { Button, Modal, TextField } from "@mui/material";
import "./createarticle.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useOutletContext } from "react-router-dom";

export default function CreateArticle({
  open,
  handleClose,
  setUpdate,
  idCard,
  errorInput,
  setErrorInput,
}) {
  // URL Api
  const api = import.meta.env.VITE_API_URL;

  const { auth } = useOutletContext();

  // useState ton track all the inputs
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [warranty, setWarranty] = useState("");
  const [price, setPrice] = useState("");
  const styles = {
    modalStyle1: {
      overflowY: "auto",
    },
  };

  const category = [
    {
      value: "Phone",
      label: "Phone",
    },
    {
      value: "Watch",
      label: "Watch",
    },
    {
      value: "Tv",
      label: "Tv",
    },
    {
      value: "PC",
      label: "PC",
    },
  ];

  const createProduct = async () => {
    setErrorInput({});
    const method = idCard ? "PUT" : "POST";
    const url = idCard ? `${api}/api/product/${idCard}` : `${api}/api/product/`;
    // Route POST/PUT
    try {
      const response = await fetch(`${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          title,
          type,
          warranty,
          price,
        }),
      });
      const data = await response.json();
      if (data.details) {
        data.details.forEach((detail) => {
          setErrorInput((prev) => ({
            ...prev,
            [detail.context.key]: [detail.message],
          }));
        });
      } else {
        toast.success(
          idCard ? "Produit modifié avec succès" : "Produit ajouté avec succès"
        );
        setUpdate((prev) => !prev);
        handleClose();
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  // Get the product edited
  const getOneProduct = async () => {
    try {
      const response = await fetch(`${api}/api/product/${idCard}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setType(data.type);
        setWarranty(data.warranty);
        setPrice(data.price);
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  useEffect(() => {
    setTitle("");
    setType("");
    setWarranty("");
    setPrice("");
    if (idCard) {
      getOneProduct();
    }
  }, [idCard]);

  return (
    <Modal open={open} onClose={handleClose} style={styles.modalStyle1}>
      <section className="modal-creation">
        <div className="create-container">
          <TextField
            fullWidth
            error={errorInput.title ? true : false}
            label="Nom"
            id="name"
            helperText={
              errorInput.title
                ? "Veuillez renseigner un nom d'article"
                : "Nom de l'article"
            }
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            fullWidth
            error={errorInput.type ? true : false}
            select
            id="category"
            label="Catégorie"
            value={type}
            SelectProps={{
              native: true,
            }}
            helperText={
              errorInput.type
                ? "Veuillez renseigner le type d'article"
                : "Sélectionner une catégorie"
            }
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="" disabled />
            {category.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            error={errorInput.warranty ? true : false}
            label="Garantie"
            id="warranty"
            helperText={
              errorInput.warranty
                ? "Veuillez renseigner la durée de garantie"
                : "Durée de la garantie"
            }
            value={warranty}
            onChange={(e) => {
              setWarranty(e.target.value);
            }}
          />
          <TextField
            fullWidth
            error={errorInput.price ? true : false}
            label="Prix"
            id="price"
            helperText={
              errorInput.price
                ? "Veuillez renseigner le prix de l'article"
                : "Prix de l'article"
            }
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <div className="container-button">
            <Button variant="outlined" color="error" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="contained" color="success" onClick={createProduct}>
              Valider
            </Button>
          </div>
        </div>
      </section>
    </Modal>
  );
}

CreateArticle.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  idCard: PropTypes.string,
  errorInput: PropTypes.object.isRequired,
  setErrorInput: PropTypes.func.isRequired,
};

CreateArticle.defaultProps = {
  idCard: null,
};
