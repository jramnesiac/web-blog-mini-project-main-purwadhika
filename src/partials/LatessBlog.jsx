import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LatestBlog() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const latestBlog = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1/"
      );
      setData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    navigate("/");
    navigate(`blog/${id}`);
    window.location.reload();
  };

  useEffect(() => {
    latestBlog();
  }, []);

  // Sort data berdasarkan jumlah likes (total_fav) secara descending
  const sortedData = [...data].sort((a, b) => b.total_fav - a.total_fav);

  return (
    <>
      {/* Card Blog */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" id="favblog">
        {/* Title */}
        <div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Tech Couture at Its Finest: Uncover the Favorite Articles for Fashion-Forward Gentlemen
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
          "Insider's Picks: Trending Fashion-Tech Articles You Can't Miss"
          </p>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 lg:mb-14">
          {sortedData.map((blog) => (
            <a
              key={blog.id}
              className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
              href="#"
              onClick={() => handleClick(blog.id)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  className="w-full h-full object-cover rounded-t-xl"
                  src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}
                  alt="Image Description"
                />
              </div>
              <div className="p-4 md:p-5">
                <p className="mt-2 text-xs uppercase text-gray-600 dark:text-gray-400">
                  {`Likes: ${blog.data}`}
                </p>
                <h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-white">
                  {blog.title}
                </h3>
                <p className="mt-2 text-xs uppercase text-gray-600 dark:text-gray-400">
                  {blog.updatedAt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
