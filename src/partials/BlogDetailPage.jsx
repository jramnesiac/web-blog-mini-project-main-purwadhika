import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import DeleteButton from "../partials/DeleteButton";
import { useSelector } from "react-redux";
import HeaderLogin from "./HeaderLogin";

const BlogDetailPage = () => {
  const [data, setData] = useState();
  const params = useParams();
  const getDetail = async (data) => {
    try {
      const response = await Axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`,
        data
      );
      setData(response.data[0]);
      const tDate = response.data[0].createdAt;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <HeaderLogin />
      <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src={`https://minpro-blog.purwadhikabootcamp.com/${data?.User?.imgProfile}`}
                  alt="Image Description"
                />
              </div>
              <div className="grow">
                <div className="grid sm:flex sm:justify-between sm:items-center gap-2">
                  <div>
                    <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                      <div className="hs-tooltip-toggle sm:mb-1 block text-left cursor-pointer">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {data?.User.username}
                        </span>
                        <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-black" role="tooltip">
                          <div className="p-4 sm:p-5">
                            <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src=""
                                  alt="Image Description"
                                />
                              </div>
                              <div className="grow">
                                <p className="text-lg font-semibold text-gray-200">
                                  {data?.User.username}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center px-4 py-3 sm:px-5">
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="text-xs text-gray-500">
                      <li className="inline-block relative pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                        {data?.createdAt.slice(0, 10)}
                      </li>
                      <li className="inline-block relative pr-6 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                        1 min read
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold md:text-3xl dark:text-white">
                {data?.title}
              </h2>
              <p className="text-lg text-gray-800 dark:text-gray-200">
                {data?.content}
              </p>
            </div>
            <figure>
              <img
                className="w-full object-cover rounded-xl"
                src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imageURL}`}
                alt="Image Description"
              />
              <figcaption className="mt-3 text-sm text-center text-gray-500">
                {data?.title}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
