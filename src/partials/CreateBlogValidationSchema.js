

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter a captivating title for your article.")
    .min(5, "Oops! The title should be at least 5 characters long.")
    .max(50, "Keep it concise! The title should not exceed 50 characters."),

  keywords: Yup.string()
    .required("Validate keywords to ensure alignment with the latest fashion trends"),

  country: Yup.string()
    .required("Select the country associated with your fashion article."),

  CategoryId: Yup.string()
    .required("Choose a category that best represents your fashionable creation."),

  url: Yup.string()
    .url("Invalid URL format. Make sure to enter a valid URL for your fashion article.")
    .required("Please enter the URL for your fashion article."),

  content: Yup.string()
    .required("Pour your fashion expertise into the content. It can't be empty.")
    .min(100, "Your fashion story deserves more! The content should have a minimum of 100 characters.")
    .max(1000, "Wow! I'm shocked with your fashion knowledge, but keep the content within 1000 characters."),

  file: Yup.mixed()
    .required("We need an accompanying visual! Please upload an image file.")
    .test(
      "fileType",
      "Uh-oh! Only image files are allowed. Let's showcase fashion through visuals.",
      (value) => {
        if (value) {
          return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
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

export default validationSchema