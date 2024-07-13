import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.svg";
import { purple } from "@mui/material/colors";
import "./nav.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";

export default function Nav({ handleOpen }) {
  const api = import.meta.env.VITE_API_URL;

  const { auth } = useOutletContext();

  const navigate = useNavigate();

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  // Function to logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${api}/api/logout`, {
        credentials: "include",
      });
      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <nav>
      <img src={logo} alt="les bons artisans" />
      <div className="nav-profil">
        {auth.role === "admin" && (
          <ColorButton variant="contained" onClick={handleOpen}>
            Ajouter un article
          </ColorButton>
        )}
        {!auth.token && (
          <Button variant="text" onClick={() => navigate("/register")}>
            {"Créer un compte"}
          </Button>
        )}
        {!auth.token && (
          <Button variant="contained" onClick={() => navigate("/login")}>
            {"Se connecter"}
          </Button>
        )}
        {auth.token && (
          <Button variant="text" onClick={handleLogout}>
            {"Se déconnecter"}
          </Button>
        )}
      </div>
    </nav>
  );
}

Nav.propTypes = {
  handleOpen: PropTypes.func.isRequired,
};
