import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Axios  from "axios";
import { CloudUploadIcon } from "@heroicons/react/solid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SelectCategory from "./SelectCategory";


const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter a captivating title for your article!.")
    .min(5, "Oops! The title should be at least 5 characters long.")
    .max(50, "Keep it concise! The title should not exceed 50 characters."),

  keywords: Yup.string().required(
    "Add relevant keywords to enhance discoverability"
  ),
  country: Yup.string().required(
    "Please select a country to customize your fashion experience"
  ),

  // CategoryId: Yup.string().required(
  //   "Choose a category that best represents your creation in any divisions"
  // ),

  url: Yup.string()
    // .url(
    //   "Invalid URL format. Make sure to enter a valid URL for your fashion article."
    // )
    .required(
      "Please enter the URL for your fashion website or social media profile."
    ),

  content: Yup.string()
    .required(
      "Pour your fashion expertise into the content. It can't be empty."
    )
    .min(
      100,
      "Your fashion story deserves more! The content should have a minimum of 20 characters."
    )
    .max(
      1000,
      "Wow! Im Shocked with your fashion knowledge, but keep the content within 21 characters."
    ),

  // file: Yup.mixed()
  //   .required("We need an accompanying visual! Please upload an image file.")
    // .test(
    //   "fileType",
    //   "Uh-oh! Only image files are allowed. Let's showcase fashion through visuals.",
    //   (value) => {
    //     if (value) {
    //       return (
    //         value &&
    //         ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    //       );
    //     }
    //     return true;
    //   }
    // )
    // .test(
    //   "fileSize",
    //   "Oops! The file size should not exceed 1MB. Compress the image if needed.",
    //   (value) => {
    //     if (value) {
    //       return value.size <= 1 * 1024 * 1024; // 1MB
    //     }
    //     return true;
    //   }
    // ),
});

const CreateBlog = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    },
  });
  const [cat, setCat] = useState();
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getCat = async (data) => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory",
        data
      );
      setCat(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onCreate = async (value) => {
    try {
      const data = new FormData();
      const { title, keywords, country, CategoryId, url, content } = value;
      data.append(
        "data",
        JSON.stringify({ title, keywords, country, CategoryId, url, content })
      );
      data.append("file", file);
      console.log([...data]);
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "multipart/form-data",
        }
      );
      navigate("/Welcome-to-Circuit-Coutoure-404");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
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
        
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          onCreate(values);
          // Logika pengiriman formulir
        }}
      >
        {({ errors, touched, isValid, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-900"
              >
                Title
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                className={`py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${
                  errors.title && touched.title ? "border-red-500" : ""
                }`}
                placeholder="Enter a captivating title for your article"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="keywords"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-900"
              >
                Keywords
              </label>
              <Field
                type="text"
                id="keywords"
                name="keywords"
                className={`py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${
                  errors.keywords && touched.keywords ? "border-red-500" : ""
                }`}
                placeholder="Let's add some relevant keywords to optimize your article's searchability"
              />
              <ErrorMessage
                name="keywords"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-900"
              >
                Country
              </label>
              <Field
                id="country"
                name="country"
                type="text"
                className={`py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${
                  errors.country && touched.country ? "border-red-500" : ""
                }`}
                placeholder="Select the country associated with your fashion article"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="CategoryId"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-900"
              >
                Category
              </label>
              <div>
          <label htmlFor="CategoryId">Category</label>
          <Field as="select" name="CategoryId">
            <option value="">Select category</option>
            {category.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="CategoryId" component="div" />
        </div>
              <ErrorMessage
                name="CategoryId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="url"
                className="inline-block text-sm font-medium  text-gray-800 mt-2.5 dark:text-gray-900"
              >
                URL
              </label>
              <Field
                id="url"
                name="url"
                type="text"
                className={`py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${
                  errors.url && touched.url ? "border-red-500" : ""
                }`}
                placeholder="Enter the URL for your fashion article"
              />
              <ErrorMessage
                name="url"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-900"
              >
                Content
              </label>
              <Field name="content">
                {({ field, form }) => (
                  <CKEditor
                    label="Content"
                    id="content"
                    name="content"
                    placeholder="Share your fashion expertise and story here."
                    editor={ClassicEditor}
                    data={field.value}
                    onReady={(editor) => {
                      // Set initial field value
                      if (!field.value) {
                        form.setFieldValue(field.name, editor.getData());
                      }
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      form.setFieldValue(field.name, data);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Image Add Drop */}
            <div className="space-y-2">
              <label
                htmlFor="file"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-900"
              >
                Image File
              </label>
              <div
                {...getRootProps()}
                className={`group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 ${
                  isDragActive ? "border-blue-500" : ""
                } focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700`}
              >
                <input
                  {...getInputProps()}
                  id="file"
                  name="file"
                  type="file"
                  className="sr-only"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                    setSelectedImage(
                      URL.createObjectURL(event.currentTarget.files[0])
                    );
                  }}
                />
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={"Selected Preview"}
                    className="w-20 h-20 mx-auto object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-600">
                    <CloudUploadIcon className="w-full h-full" />
                  </div>
                )}
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {selectedImage
                    ? "Click to replace the image"
                    : "Drag and drop or click to add an image"}
                </p>
              </div>
              <ErrorMessage
                name="file"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
            onClick={onCreate}
              type="submit"
              className="inline-flex items-center justify-center w-full py-3 px-6 mt-6 text-gray-200 bg-gray-900 rounded-lg hover:ease-in-out"
            >
              {isSubmitting && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-75"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647C19.865 17.824 21 15.042 21 12h-4a7.962 7.962 0 01-2 5.291zM4 12H0c0-1.65.488-3.185 1.317-4.479l2.03 1.446A5.963 5.963 0 004 12zm5.653 4.479l2.029-1.446A3.963 3.963 0 0112 12h4c0 1.65-.488 3.185-1.317 4.479l-2.03-1.446zM14 7.938C15.865 5.824 17 3.042 17 0h-4a7.962 7.962 0 00-2 5.291L14 7.938z"
                  />
                </svg>
              )}
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;
