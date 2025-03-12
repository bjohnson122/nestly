import React from "react";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
const HomePage = () => {
  return (
    <div>
      <Slide />
      <Categories />
      <Listings />
    </div>
  );
};

export default HomePage;
