import { categories } from "../data";
import "../styles/Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p>
        Uncover the perfect vacation rental that best fits your travel style and
        needs. Whether you’re seeking a cozy retreat, a family-friendly escape,
        or an adventure-packed stay, the perfect home is waiting for you.
        Select your ideal category and start creating unforgettable memories
        today!
      </p>

      <div className="categories_list">
        {categories?.slice(1, 9).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div> 
    </div>
  );
};

export default Categories;
