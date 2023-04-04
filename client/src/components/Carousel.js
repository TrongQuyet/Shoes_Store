import React from 'react';
import '../public/scss/Carousel.scss'
import {
    MDBCarousel,
    MDBCarouselItem,
  } from 'mdb-react-ui-kit';
const Carousel = () => {
    return (
        <MDBCarousel showControls keyboard>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src='https://i.ytimg.com/vi/CXSko9ySpyo/maxresdefault.jpg'
          alt='...'
        />
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={2}
          src='https://webchuyennghiep.vn/uploads/pictures/thumb1/5ab50fca81.jpg'
          alt='...'
        />
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={3}
          src='https://media.licdn.com/dms/image/C5112AQEaaI6z3NxGLQ/article-inline_image-shrink_1000_1488/0/1520238935596?e=1684972800&v=beta&t=xJVvEj9FYsuuFq9hhSFyrtKBgxjyJW9dBdHD5ELJN0Y'
          alt='...'
        />
      </MDBCarousel>
    );
};

export default Carousel;