import CardProduct from "../../components/Card/CardProduct";
import "./home.css";
import CreateArticle from "../../components/CreateArticle/CreatArticle";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Button } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function Home() {
  const { setAuth } = useOutletContext();

  //Loading state to wait the refresh
  const [loading, setLoading] = useState(true);

  // URL Api
  const api = import.meta.env.VITE_API_URL;

  // State for managing modal
  const [open, setOpen] = useState(false);

  // State to store all products
  const [products, setProducts] = useState([]);

  // State to update the list of products
  const [update, setUpdate] = useState(false);

  // State to catch category clicked
  const [category, setCategory] = useState("");

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

  // Refresh call to stay connected
  const handleRefresh = async () => {
    try {
      const response = await fetch(`${api}/api/refresh`, {
        credentials: "include",
      });
      const data = await response.json();
      const token = response.headers.get("Authorization");
      data.token = token;
      setAuth(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleRefresh();
  }, []);

  // Fetch to get all products
  const getProducts = async () => {
    if (!category) {
      try {
        const response = await fetch(`${api}/api/product`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(`${api}/api/product/category/${category}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Get all products at the component mount
  useEffect(() => {
    getProducts();
  }, [update, category]);

  return (
    <>
      {loading && <Loading />}
      <Nav handleOpen={handleOpen} setIdCard={setIdCard} />
      <section className="home">
        <div className="category">
          <Button
            variant={category === "" ? "contained" : "outlined"}
            value="Phone"
            onClick={() => setCategory("")}
          >
            Tous
          </Button>
          <Button
            variant={category === "Phone" ? "contained" : "outlined"}
            value="Phone"
            onClick={(e) => setCategory(e.target.value)}
          >
            Phone
          </Button>
          <Button
            variant={category === "Watch" ? "contained" : "outlined"}
            value="Watch"
            onClick={(e) => setCategory(e.target.value)}
          >
            Watch
          </Button>
          <Button
            variant={category === "Tv" ? "contained" : "outlined"}
            value="Tv"
            onClick={(e) => setCategory(e.target.value)}
          >
            Tv
          </Button>
          <Button
            variant={category === "PC" ? "contained" : "outlined"}
            value="PC"
            onClick={(e) => setCategory(e.target.value)}
          >
            PC
          </Button>
        </div>
        <div className="card-container">
          {products.map((value) => (
            <CardProduct
              key={value._id}
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
