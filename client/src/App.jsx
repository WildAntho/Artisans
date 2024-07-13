import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [auth, setAuth] = useState({ role: "user" });
  return (
    <main>
      <Toaster />
      <Outlet context={{ auth, setAuth }} />
    </main>
  );
}
