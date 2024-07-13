import PropTypes from "prop-types";
import { CardActions, CardContent, CardHeader } from "@mui/material";
import { toast } from "sonner";
import Card from "@mui/material/Card";
import CardMenu from "../CardMenu/CardMenu";
import { useState } from "react";
import DeleteValidation from "../DeleteValidation/DeleteValidation";
import { useOutletContext } from "react-router-dom";

export default function CardProduct({
  data,
  setUpdate,
  handleOpen,
  setIdCard,
}) {
  const { auth } = useOutletContext();
  // URL Api
  const api = import.meta.env.VITE_API_URL;

  // State for managing the card menu
  const [anchorEl, setAnchorEl] = useState(null);

  // State to open the validation modal
  const [openValidation, setOpenValidation] = useState(false);

  // Managing validation modal
  const handleOpenValidation = () => {
    setOpenValidation(true);
    setAnchorEl(false);
  };
  const handleCloseValidation = () => {
    setOpenValidation(false);
  };

  const handleGetId = () => {
    setIdCard(data._id);
    handleOpen();
  };

  // Function to delete one item
  const handleDelete = async () => {
    try {
      const response = await fetch(`${api}/api/product/${data._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (response.ok) {
        toast.success("Produit supprimé avec succès");
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };
  return (
    <>
      <Card sx={{ width: 400 }}>
        <CardHeader
          action={
            auth.role === "admin" ? (
              <CardMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleOpenValidation={handleOpenValidation}
                handleOpen={handleGetId}
              />
            ) : null
          }
          title={data.title}
        />
        <CardContent>
          <h1>Type : {data.type}</h1>
          <p>Warranty : {data.warranty} year(s)</p>
        </CardContent>
        <CardActions disableSpacing>
          <h1>Price : {data.price}€</h1>
        </CardActions>
      </Card>
      <DeleteValidation
        handleDelete={handleDelete}
        handleClose={handleCloseValidation}
        open={openValidation}
      />
    </>
  );
}

CardProduct.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    warranty: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  setUpdate: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  setIdCard: PropTypes.func.isRequired,
};
