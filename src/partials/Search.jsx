import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "./HeaderLogin";

export const SearchResult = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        {
          params: {
            search: searchTerm,
            category: selectedCategory,
          },
        }
      );
      console.log(response.data.result);
      setSearchResults(response.data.result);
      setSearchTerm("");
      setSelectedCategory("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (id) => {
    navigate(`/detailPage/${id}`);
    window.location.reload();
  };

  return (
    <>
      <HeaderLogin />
      <div className="p-10 h-70vh">
        <div className="border-2 border-gray-300 shadow-md">
          <h1 className="text-center bg-gray-900 py-3 mb-5 text-gray-200">
            Find Articles
          </h1>
          <div className="flex m-4">
            <div className="p-4 bg-gray-900 text-white w-1/3">
              <div className="space-y-5">
                <div className="space-y-3">
                  <label>Search</label>
                  <input
                    className="bg-white text-black w-full py-1 px-2"
                    placeholder="Keyword or title"
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-3">
                  <label>Category</label>
                  <select
                    className="bg-blue-300 border-0 py-1 px-2"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option
                      style={{ backgroundColor: "rgb(135,206,250)", border: "0px" }}
                      value=""
                    >
                      All
                    </option>
                    {categories.map((category) => (
                      <option
                        style={{ backgroundColor: "rgb(135,206,250)", border: "0px" }}
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 mt-5 rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="border-2 border-black p-7 shadow-md w-full max-h-50vh ml-5 overflow-scroll">
              {searchResults.map((item, value) => (
                <div
                  key={item.id}
                  className="p-2 border-2 border-gray-200 shadow-md cursor-pointer text-black mb-20px hover:text-blue-400 transition duration-300"
                  onClick={() => handleClick(item.id)}
                >
                  <div className="flex">
                    <div className="border-2 border-black rounded min-h-10vh min-w-10vh max-h-10vh max-w-10vh overflow-hidden">
                      <img
                        src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`}
                        alt={item.title}
                        className="w-100px h-100px object-cover"
                      />
                    </div>
                    <div className="ml-3 p-3 w-full text-gray-500">
                      <div className="flex">
                        <div>
                          <p className="text-xl">{item.title}</p>
                        </div>
                        <div className="flex-grow"></div>
                        <div>
                          <p>
                            Publish on: {item.createdAt.slice(0, 10)}, By: {item.User.username}
                          </p>
                        </div>
                      </div>
                      <div className="overflow-hidden max-h-5vh">{item.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
