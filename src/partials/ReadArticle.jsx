import { useEffect, useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Article = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`blog/${id}`);
  };

  useEffect(() => {
    Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=DESC&size=10")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="w-full p-4 bg-blue-400">
      <div className="flex justify-center">
        <div className="w-full">
          <ul className="flex justify-center">
            <li className="mr-2">
              <button className="py-2 px-4 bg-white text-blue-400 rounded-lg font-bold">Popular</button>
            </li>
          </ul>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
            {data.result &&
              data.result.map((value, index) => (
                <div
                  key={index}
                  className="w-72 border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-md transition-transform hover:scale-102"
                >
                  <img src={`https://minpro-blog.purwadhikabootcamp.com/${value.imageURL}`} alt={value.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold truncate">{value.title}</h2>
                    <p className="text-gray-600 text-sm break-words">Likes: {value.total_fav}</p>
                    <div className="mt-4">
                      <button
                        className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:opacity-80 break-words"
                        onClick={() => handleClick(value.id)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
