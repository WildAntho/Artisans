import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import "./nav.css";

export default function Nav({ handleOpen }) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  return (
    <nav>
      <h1>Artisans</h1>
      <div className="nav-profil">
        <ColorButton variant="contained" onClick={handleOpen}>
          Ajouter un article
        </ColorButton>
      </div>
    </nav>
  );
}

Nav.propTypes = {
  handleOpen: PropTypes.func.isRequired,
};
