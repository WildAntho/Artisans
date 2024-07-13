import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.svg";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar } from "@mui/material";

export default function Nav({ auth, setAuth }) {
  const api = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  // Function to logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${api}/api/logout`, {
        credentials: "include",
      });
      if (response.ok) {
        setAuth({ role: "user" });
        navigate("/login");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <nav>
      <div className="first-container">
        <img src={logo} alt="les bons artisans" />
        <Button variant="text" onClick={() => navigate("/")}>
          Accueil
        </Button>
      </div>
      <div className="nav-profil">
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
        {auth.token && (
          <Avatar sx={{ bgcolor: "rgba(24, 118, 210, 1)" }}>
            {auth.email.slice(0, 2).toUpperCase()}
          </Avatar>
        )}
      </div>
    </nav>
  );
}

Nav.propTypes = {
  auth: PropTypes.object,
  setAuth: PropTypes.func,
};
