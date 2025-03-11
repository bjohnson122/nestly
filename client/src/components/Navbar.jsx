import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Navbar;
