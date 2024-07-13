import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { useState } from "react";
import Nav from "./components/Nav/Nav";

export default function App() {
  const [auth, setAuth] = useState({ role: "user" });
  return (
    <main>
      <Toaster />
      <Nav auth={auth} setAuth={setAuth}/>
      <Outlet context={{ auth, setAuth }} />
    </main>
  );
}
