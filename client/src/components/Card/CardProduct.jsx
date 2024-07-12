import PropTypes from "prop-types";
import { CardActions, CardContent, CardHeader } from "@mui/material";
import "./card.css";
import Card from "@mui/material/Card";
import CardMenu from "../CardMenu/CardMenu";

export default function CardProduct({ data }) {
  return (
    <Card sx={{ width: 400 }}>
      <CardHeader action={<CardMenu />} title={data.name} />
      <CardContent>
        <h1>Type : {data.type}</h1>
        <p>Warranty : {data.warranty_years}year(s)</p>
      </CardContent>
      <CardActions disableSpacing>
        <h1>Price : {data.price}€</h1>
      </CardActions>
    </Card>
  );
}

CardProduct.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    warranty_years: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
