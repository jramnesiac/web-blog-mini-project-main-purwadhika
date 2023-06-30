import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavSide = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [fav, setFav] = useState([]);
  const [selectedTab, setSelectedTab] = useState("favourite");
  const data = useSelector((state) => state.user.value);

  const getMost = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=DESC&size=10"
      );
      setFav(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getBlog = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/"
      );
      setBlog(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (id) => {
    navigate(`/blog/${id}`); // Menggunakan ID blog sebagai parameter dalam navigasi
    window.location.reload();
  };

  useEffect(() => {
    getMost();
    getBlog();
  }, []);

  return (
    <div className="border border-black p-2 shadow-md h-40vw w-30% overflow-scroll">
      <div className="flex flex-col h-full">
        <div className="mb-1">
          <button
            className={`px-2 py-1 ${
              selectedTab === "favourite"
                ? "bg-gray-300 focus:bg-gray-300"
                : "bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            }`}
            onClick={() => setSelectedTab("favourite")}
          >
            Favourite
          </button>
          <button
            className={`px-2 py-1 ${
              selectedTab === "recently"
                ? "bg-gray-300 focus:bg-gray-300"
                : "bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            }`}
            onClick={() => setSelectedTab("recently")}
          >
            Recently
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {selectedTab === "favourite" &&
            fav?.map((v, i) => (
              <div
                key={i}
                className="flex items-center border-b border-gray-300 hover:bg-gray-300 cursor-pointer"
                onClick={() => handleClick(v.id)}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={`https://minpro-blog.purwadhikabootcamp.com/${v.User.imgProfile}`}
                  alt="Avatar"
                />
                <div className="ml-2 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-200">
                  <div className="text-lg font-medium">{v.title}</div>
                  <div className="text-sm">{v.User.username}</div>
                  <div className="text-sm">Likes: {v.total_fav}</div>
                </div>
              </div>
            ))}
          {selectedTab === "recently" &&
            blog?.map((v, i) => (
              <div
                key={i}
                className="flex items-center border-b border-gray-300 hover:bg-gray-300 cursor-pointer"
                onClick={() => handleClick(v.id)}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={`https://minpro-blog.purwadhikabootcamp.com/${v.User.imgProfile}`}
                  alt="Avatar"
                />
                <div className="ml-2 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-200">
                  <div className="text-lg font-medium">{v.title}</div>
                  <div className="text-sm">{v.User.username}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NavSide;
