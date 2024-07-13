import { Button, TextField } from "@mui/material";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  // URL Api
  const api = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInput, setErrorInput] = useState({});

  const handleRegister = async () => {
    setErrorInput({});
    try {
      const response = await fetch(`${api}/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
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
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <section className="register">
      <div className="register-container">
        <h1>Créer un compte</h1>
        <TextField
          fullWidth
          error={errorInput.email ? true : false}
          label="Adresse Mail"
          id="fullWidth"
          helperText={
            errorInput.email
              ? "Veuillez renseigner une adresse mail valide"
              : "Renseignez votre adresse mail"
          }
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          fullWidth
          error={errorInput.password ? true : false}
          label="Mot de passe"
          type="password"
          helperText={
            errorInput.email
              ? "Mot de passe pas assez robuste"
              : "Renseignez votre mot de passe"
          }
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleRegister}>
          {"Je m'inscris"}
        </Button>
        <Button variant="text">{"J'ai déjà un compte"}</Button>
      </div>
    </section>
  );
}
