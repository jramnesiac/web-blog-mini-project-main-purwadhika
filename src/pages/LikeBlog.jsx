import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const LikeBlog = () => {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const [data, setData] = useState();
  const params = useParams();

  const getDetail = async () => {
    try {
      const response = await axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`
      );
      setData(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLikedBlogs();
    getDetail();
  }, []);

  const fetchLikedBlogs = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result;
      setLikedBlogs(data);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the liked blogs.");
    }
  };

  console.log("Liked Blogs:", likedBlogs);

  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-full mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">
                When Fashion Meets Technology: Your Likes Articles for Men's Style in the Digital Age.
              </h1>
            </div>
            {error ? (
              <p>{error}</p>
            ) : (
              <ul>
                {likedBlogs?.map((blog) => {
                  return (
                    <div
                      key={blog.id}
                      className="border border-black p-7 shadow-md w-200px h-250px m-3 overflow-hidden"
                    >
                      <div className="text-center">
                        <img
                          src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imageURL}`}
                          alt="Blog Image"
                        />
                        <h3 className="text-lg font-bold">{blog.Blog.title}</h3>
                        <p>{blog.Blog.content}</p>
                      </div>
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LikeBlog;
