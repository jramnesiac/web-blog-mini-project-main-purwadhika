import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "./HeaderLogin";
import Footer from "./Footer";



const SearchBar = ({ blogs }) => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };
  const initialValues = {
    searchTerm: "",
  };

  const validationSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Search term is required"),
  });

  const handleSearch = async (values) => {
    try {
      let array = [];
      let i = 1;
      while (true) {
        const response = await axios.get(
          `https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${i}`
        );
        if (response.data.result.length === 0) {
          break;
        }
        const filteredBlogs = response.data.result.filter((item) => {
          return (
            item.title.includes(values.searchTerm) ||
            item.Blog_Keywords.some((keyword) =>
              keyword.Keyword.name.includes(values.searchTerm)
            ) ||
            item.Category.name.includes(values.searchTerm)
          );
        });
        array = array.concat(filteredBlogs);
        console.log(array);
        setSearchResults(array);
        i++;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-white">
        <HeaderLogin />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSearch}
        >
          <Form>
            <div className="w-2/5 mt-20 ml-auto mr-auto">
              <Field name="searchTerm">
                {({ field }) => (
                  <div className="form-control">
                    <div className="relative">
                      <input
                        {...field}
                        type="text"
                        className="w-full pr-16 bg-white text-black placeholder-gray-400"
                        placeholder="Enter your search"
                      />
                      <button
                        type="submit"
                        className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                )}
              </Field>
            </div>
          </Form>
        </Formik>
        <div>
          {searchResults.length > 0 && (
            <div>
              <p className="font-bold">Search Results:</p>
              <div className="mt-4 flex flex-wrap">
                {searchResults.map((v, i) => (
                  <div
                    key={i}
                    className="p-20 w-1/4 flex flex-col items-center"
                  >
                    <img
                      src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
                      alt="Blog Image"
                      className="w-48 h-48 object-cover"
                    />
                    <h2 className="mt-4 truncate max-w-md">{v.title}</h2>
                    <p>{v.author}</p>
                    <button
                      className="mt-4 px-4 py-2 bg-blue-500 text-white"
                      onClick={() => handleClick(v.id)}
                    >
                      Read More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-20">
        <Footer/>
      </div>
    </div>
  );
};

export default SearchBar;
