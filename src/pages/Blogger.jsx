import React from 'react'
import HeaderLogin from '../partials/HeaderLogin'
import CarouselBlog from '../partials/CarouselBlog'
import FavBlog from '../partials/FavBlog'
import LatestBlog from '../partials/LatessBlog'
import Banner from '../partials/Banner'
import Footer from '../partials/Footer'


export default function Blogger () {
    
    return (
        <>
            <HeaderLogin/>
            
            <FavBlog/>
            {/* <LatestBlog/> */}
            <Banner/>
            <Footer/>
            
        </>
    )
}