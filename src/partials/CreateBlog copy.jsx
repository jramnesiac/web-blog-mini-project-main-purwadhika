import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter a captivating title for your article!.")
    .min(5, "Oops! The title should be at least 5 characters long.")
    .max(50, "Keep it concise! The title should not exceed 50 characters."),

  keywords: Yup.string()
    .required("Validate keywords to ensure alignment with the latest fashion trends!")
    ,

  country: Yup.string().required(
    "Select the country associated with your fashion article."
  ),

  CategoryId: Yup.string().required(
    "Choose a category that best represents your fashionable creation."
  ),

  url: Yup.string()
    .url(
      "Invalid URL format. Make sure to enter a valid URL for your fashion article."
    )
    .required("Please enter the URL for your fashion article."),

  content: Yup.string()
    .required(
      "Pour your fashion expertise into the content. It can't be empty."
    )
    .min(
      100,
      "Your fashion story deserves more! The content should have a minimum of 100 characters."
    )
    .max(
      1000,
      "Wow! Im Shocked with your fashion knowledge, but keep the content within 1000 characters."
    ),

  file: Yup.mixed()
    .required("We need an accompanying visual! Please upload an image file.")
    .test(
      "fileType",
      "Uh-oh! Only image files are allowed. Let's showcase fashion through visuals.",
      (value) => {
        if (value) {
          return (
            value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type)
          );
        }
        return true;
      }
    )
    .test(
      "fileSize",
      "Oops! The file size should not exceed 1MB. Compress the image if needed.",
      (value) => {
        if (value) {
          return value && value.size <= 1 * 1024 * 1024; // 1MB
        }
        return true;
      }
    ),
});

const CreateBlog = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    },
  });

 
  

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
        onSubmit={(values) => {
          // Logika pengiriman formulir
          console.log(values);
        }}
      >
        {({ errors, touched, isValid, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
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
  <label htmlFor="keywords" className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200">
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
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
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
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Category
              </label>
              <Field
                as="select"
                id="CategoryId"
                name="CategoryId"
                className={`py-2 px-3 pr-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${
                  errors.CategoryId && touched.CategoryId
                    ? "border-red-500"
                    : ""
                }`}
              >
                <option value="">Choose a category</option>
                <option value="Category1">Category 1</option>
                <option value="Category2">Category 2</option>
                <option value="Category3">Category 3</option>
              </Field>
              <ErrorMessage
                name="CategoryId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="url"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
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
                placeholder="Please enter the URL for your fashion article"
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
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Content
              </label>
              <Field
                as="textarea"
                id="content"
                name="content"
                className={`py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ${
                  errors.content && touched.content ? "border-red-500" : ""
                }`}
                rows={6}
                placeholder="Pour your fashion expertise into the content. It can't be empty."
              />
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
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Image File
              </label>
              <div
                {...getRootProps()}
                className={`group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-900 rounded-lg focus-within:ring-2 ${
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
                    alt="Selected Preview"
                    className="w-20 h-20 mx-auto object-cover"
                  />
                ) : (
                  <svg
                    className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-camera"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M12 13c1.657 0 3-1.343 3-3s-1.343-3-3-3s-3 1.343-3 3s1.343 3 3 3zM22 8h-4l-1.48-2.964m-2.478-4.973C14.145 .387 13.605 0 12.994 0H11c-.629 0-1.217 .28-1.615 .765L7.465 3H2c-1.105 0-2 .896-2 2v14c0 1.105 .895 2 2 2h20c1.105 0 2-.895 2-2V10c0-1.105-.895-2-2-2zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8z" />
                    </svg>
                  </svg>
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
  type="submit"
  className="inline-flex items-center justify-center w-32 py-3 px-6 mt-6 text-gray-200 bg-gray-900 hover:bg-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 text-base font-medium"
  disabled={!isValid || isSubmitting}
>
  {isSubmitting ? (
    <>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
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
      Submitting...
    </>
  ) : (
    Submit
  )}
</button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;
