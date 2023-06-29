import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import DeleteButton from "../partials/DeleteButton"
import { useSelector } from "react-redux";

const BlogDetailPage = () => {
  const { blogId } = useParams();
  const username = useSelector((state) => state.user.value.username);
  const [blog, setBlog] = useState();
  const [user, setUser] = useState();

  console.log(username);

  const getBlog = async () => {
    try {
      const response = await Axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/${blogId}`
      );
      console.log(response.data[0]);
      setBlog(response.data[0]);
      setUser(response.data[0].User.username);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src={`https://minpro-blog.purwadhikabootcamp.com/${blog?.imageURL}`}
                  alt="Image Blog"
                />
              </div>
              <div className="grow">
                <div className="grid sm:flex sm:justify-between sm:items-center gap-2">
                  <div>
                    <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                      <div className="hs-tooltip-toggle sm:mb-1 block text-left cursor-pointer">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Leyla Ludic
                        </span>
                        <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-black">
                          <div className="p-4 sm:p-5">
                            <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={`https://minpro-blog.purwadhikabootcamp.com/${blog?.User?.imgProfile}`}
                                  alt="Image User Profile"
                                />
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-base font-medium text-gray-200">
                                  {blog?.User.username}
                                </h3>
                                <p className="text-sm text-gray-400">
                                  {blog?.Category.name}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="text-sm text-gray-400">
                                <p>
                                  Joined on{" "}
                                  <span className="font-medium text-white">
                                    {new Date(
                                      `${blog?.createdAt}`
                                    ).toLocaleDateString("en-us", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                </p>
                              </div>
                              <div className="mt-3 text-sm text-gray-400">
                                <p>
                                  Last seen{" "}
                                  <span className="font-medium text-white">
                                    3 hours ago
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>
                      {blog?.createdAt && (
                        <>
                          Created on{" "}
                          <span className="font-medium text-white">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {username === user && (
              <div>
                <DeleteButton blogId={blogId} />
              </div>
            )}
          </div>
          <div className="mt-8">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
              {blog?.title}
            </h1>
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-400">
                {blog?.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
