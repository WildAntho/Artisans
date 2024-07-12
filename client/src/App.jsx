import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";

export default function App() {
  return (
    <main>
      <Toaster />
      <Outlet />
    </main>
  );
}
