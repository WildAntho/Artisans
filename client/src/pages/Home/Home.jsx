import CardProduct from "../../components/Card/CardProduct";
import "./home.css";
import data from "../../data";
import CreateArticle from "../../components/CreateArticle/CreatArticle";
import { useState } from "react";
import Nav from "../../components/Nav/Nav";

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Nav handleOpen={handleOpen} />
      <section className="home">
        <div className="card-container">
          {data.map((value) => (
            <CardProduct key={value.name} data={value} />
          ))}
        </div>
        <CreateArticle open={open} handleClose={handleClose} />
      </section>
    </>
  );
}
