import { useState, useEffect } from 'react';
import { Carousel } from '@material-tailwind/react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavSide from '../pages/NavSide';

function CarouselBlog() {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  const onSwiperClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const getContent = async () => {
    try {
      const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog');
      const sortedBlog = response.data.result.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setBlog(sortedBlog);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between mb-8">
      <div className="w-full lg:w-2/3">
        <Carousel
          transition={{ duration: 0.1 }}
          className="rounded-xl"
          autoplay={true}
          swipe={true}
          drag={true}
          breakpoints={{
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
          }}
        >
          {blog.map((item, index) => (
            <div key={index} onClick={() => onSwiperClick(item.id)} className="cursor-pointer relative">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`}
                  alt={`image ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4 bg-white rounded-b-xl border border-gray-300">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">by: {item.User.username}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full lg:w-1/3">
        <NavSide />
      </div>
    </div>
  );
}

export default CarouselBlog;
