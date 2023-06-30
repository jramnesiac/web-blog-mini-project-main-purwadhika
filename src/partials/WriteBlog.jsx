import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import HeaderLogin from "./HeaderLogin";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WriteBlog = () => {
  const [category, setCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const BlogSchema = Yup.object().shape({
    title: Yup.string().required("Please fill in your blog title"),
    keywords: Yup.string().required("Please fill in your keywords"),
    CategoryId: Yup.string().required("Please select a category"),
    content: Yup.string().required("Please enter your content"),
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createBlog = async (values) => {
    try {
      const formData = new FormData();
      const { title, keywords, country, CategoryId, url, content } = values;
      formData.append(
        "data",
        JSON.stringify({ title, keywords, country, CategoryId, url, content })
      );
      formData.append("file", selectedFile);

      const response = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      console.log(data);

      toast.success("Blog created successfully!");

      // Reset form values
      values.title = "";
      values.keywords = "";
      values.country = "";
      values.CategoryId = "";
      values.url = "";
      values.content = "";
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <HeaderLogin />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-full">
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h2 className="h2 mb-4">
            Fashion Diaries: Write About Your Fashion Journey
          </h2>
          <p className="text-xl text-gray-600">
            Discover Endless Fashion Inspiration and Unleash Your Inner
            Fashionista.
          </p>
        </div>

        <Formik
          initialValues={{
            title: "",
            keywords: "",
            country: "",
            CategoryId: "",
            url: "",
            content: "",
            file: null,
          }}
          validationSchema={BlogSchema}
          onSubmit={createBlog}
        >
          <Form className="max-w-full mx-auto mt-8 bg-gray-100 p-8 rounded-lg">
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium text-lg">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="keywords" className="block font-medium text-lg">
                Keywords
              </label>
              <Field
                type="text"
                name="keywords"
                className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="keywords"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block font-medium text-lg">
                Country
              </label>
              <Field
                type="text"
                name="country"
                className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="CategoryId" className="block font-medium text-lg">
                Category
              </label>
              <Field
                as="select"
                name="CategoryId"
                className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="CategoryId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block font-medium text-lg">
                Image
              </label>
              <Field
                type="file"
                name="file"
                className="mt-1"
                onChange={(event) => setSelectedFile(event.target.files[0])}
              />
              <ErrorMessage
                name="file"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block font-medium text-lg">
                Content
              </label>
              <Field
                as="textarea"
                name="content"
                className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default WriteBlog;
