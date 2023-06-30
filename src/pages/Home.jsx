import React from 'react';
import HeroHome from '../partials/HeroHome';
import Footer from '../partials/Footer';
import CarouselBlog from '../partials/CarouselBlog';
import LatestBlog from '../partials/LatessBlog';
import FavBlog from '../partials/FavBlog';
import Banner from '../partials/Banner';
import HeaderLogin from '../partials/HeaderLogin';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

        {/*  Site header */}
        <HeaderLogin/> 
        {/*  Page content */}
      <main className="flex-grow">
        <HeroHome />
        <CarouselBlog/>
        <FavBlog/>
        {/* <LatestBlog/> */}
        {/*  Page sections */}
      </main>
      <Banner/>
      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;