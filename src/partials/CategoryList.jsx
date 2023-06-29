import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Category</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <a href={`/category/${category.id}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
