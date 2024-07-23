import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className="carousel-container">
        <div className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/500*500/?burger"
                className="d-block w-100"
                alt="Burger"
              />
              <div className="carousel-caption">
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        {foodCat.map((category) => (
          <div key={category._id}>
            <div className="fs-3 m-3">{category.CategoryName}</div>
            <hr />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {foodItem
                .filter((item) => (
                  item.CategoryName === category.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                )) 
                .map((filteredItem) => (
                  <div key={filteredItem._id} className="col">
                    <Card foodItem={filteredItem} options={filteredItem.options[0]} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
