import React from 'react';
import Nav from'./Nav';
import Footer from './Footer';
import Carousel from './Carousel';
import Shoes from './Shoes';
const Home = (props) => {
    return ( 
        <>
        <Nav user={props.user}  />
        <Carousel/>
        <Shoes/>
        <Footer/>
        </>
        
        
        
    );
};

export default Home;