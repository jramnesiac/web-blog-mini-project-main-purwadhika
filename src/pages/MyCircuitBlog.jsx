import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderLogin from "../partials/HeaderLogin";
import LikeBlog from "./LikeBlog";

export const MyCircuitBlog = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const token = localStorage.getItem("token");

  const showBlog = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showBlog();
  }, []);

  return (
    <>
      <HeaderLogin />

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-full mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  When Fashion Meets Technology: Your Inspiring Articles for Men's Style in the Digital Age.
                </h1>
              </div>

              <div className="flex justify-center gap-2">
                {data.map((v, i) => (
                  <div
                    key={i}
                    className="border border-black p-7 shadow-md w-200px h-250px m-3 overflow-hidden"
                  >
                    <div className="text-center">
                      <h2 className="font-bold">{v.title}</h2>
                      <img
                        src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
                        alt=""
                        className="w-200px"
                      />
                      <p>{v.content}</p>
                      <p>{v.id}</p>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => deleteBlog(v.id)}
                        className="bg-red-500 text-white px-4 py-2 mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <LikeBlog/>
        </section>
      </main>
    </>
  );
};

export default MyCircuitBlog;
