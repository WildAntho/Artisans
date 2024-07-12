import CardProduct from "../../components/Card/CardProduct";
import "./home.css";
import CreateArticle from "../../components/CreateArticle/CreatArticle";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";

export default function Home() {
  // URL Api
  const api = import.meta.env.VITE_API_URL;

  // State for managing modal
  const [open, setOpen] = useState(false);

  // State to store all products
  const [products, setProducts] = useState([]);

  // State to update the list of products
  const [update, setUpdate] = useState(false);

  // Function to open modal
  const handleOpen = () => {
    setOpen(true);
  };

  // State to get the id of the clicked Card
  const [idCard, setIdCard] = useState(null);

  // Function to close modal
  const handleClose = () => {
    setOpen(false);
    setIdCard(null);
  };

  // Fetch to get all products
  const getProducts = async () => {
    try {
      const response = await fetch(`${api}/api/product`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get all products at the component mount
  useEffect(() => {
    getProducts();
  }, [update]);

  return (
    <>
      <Nav handleOpen={handleOpen} setIdCard={setIdCard} />
      <section className="home">
        <div className="card-container">
          {products.map((value) => (
            <CardProduct
              key={value.name}
              data={value}
              setUpdate={setUpdate}
              handleOpen={handleOpen}
              setIdCard={setIdCard}
            />
          ))}
        </div>
        <CreateArticle
          open={open}
          handleClose={handleClose}
          setUpdate={setUpdate}
          idCard={idCard}
          setIdCard={setIdCard}
        />
      </section>
    </>
  );
}
