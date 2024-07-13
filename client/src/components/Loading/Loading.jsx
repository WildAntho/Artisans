import { CircularProgress } from "@mui/material";
import "./loading.css";

export default function Loading() {
  return (
    <section className="loading">
      <CircularProgress size={60} />
    </section>
  );
}
