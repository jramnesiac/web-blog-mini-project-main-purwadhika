import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export default function FavBlog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getBlog = async (pageNum) => {
    try {
      const response = await Axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${pageNum}&size=6`
      );
      setBlog(response.data.result);
      setPage(response.data.blogPage);
      setTotalPage(response.data.page);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    getBlog(page);
  }, [page]);

  return (
    <>
    
      {/* Card Blog */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" id='latestnews'>
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Tech Couture for the Modern Gentleman: Unveiling the Latest Fashion Trends
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            "Unveiling the Technological Couture: Discovering the Bold and Innovative Fashion for Men"
          </p>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card */}
          {blog.map((blogItem) => (
            <a
              key={blogItem.id}
              className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4]"
              href={`/blog/${blogItem.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(blogItem.id);
              }}
            >
              <div className="aspect-w-16 aspect-h-11">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    className="object-none w-full h-full max-w-full"
                    src={`https://minpro-blog.purwadhikabootcamp.com/${blogItem.imageURL}`}
                    alt="Image Description"
                  />
                </div>
              </div>
              <div className="my-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
                  {blogItem.title}
                </h3>
                <p className="mt-5 text-gray-600 dark:text-gray-400">{blogItem.description}</p>
              </div>
              <div className="mt-auto flex items-center gap-x-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src={`https://minpro-blog.purwadhikabootcamp.com/${blogItem.User.imgProfile}`}
                  alt="Author Image"
                />
                <div>
                  <h5 className="text-sm text-gray-800 dark:text-gray-200">
                    By {blogItem.User.username}
                  </h5>
                </div>
              </div>
            </a>
          ))}
          {/* End Card */}
        </div>
        {/* End Grid */}
        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center">
          <button
            type="button"
            className="inline-flex items-center gap-x-1 py-2 px-3 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Previous
          </button>
          <span className="mx-4 text-gray-700 dark:text-gray-300">
            Page {page} of {totalPage}
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-x-1 py-2 px-3 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={handleNextPage}
            disabled={page === totalPage}
          >
            Next
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        {/* End Pagination */}
      </div>
      {/* End Card Blog */}
    </>
  );
}
