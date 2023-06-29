import { useState, useEffect } from 'react';
import { Carousel } from '@material-tailwind/react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CarouselBlog() {
  const [blog, setBlog] = useState([]);

  const navigate = useNavigate();

  const onSwiperClick = (blogId) => {
    console.log(`Clicked on blog with ID: ${blogId}`);
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
    <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
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
            <img
              src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`}
              alt={`image ${index + 1}`}
              className="w-full max-w-full px-2 rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-70 py-2 px-4 w-full text-white text-center">
                <h3 className="text-xl font-semibold overflow-hidden whitespace-nowrap">
                  <span className="inline-block max-w-full overflow-hidden">{item.title}</span>
                </h3>
                <p className="text-sm">by: {item.User.username}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselBlog;
