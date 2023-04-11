import {React,useState,useEffect} from 'react';
import axios from 'axios';
import Nav from'./Nav';
import Footer from './Footer';
import Carousel from './Carousel';
import Shoes from './Shoes';
const Home = () => {
    const [cartnotification,setcartnotification] = useState()
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    useEffect(()=>{
        Cartnotification()
      },[])
      let Cartnotification=async()=>{
        axios.post('http://localhost:8000/api/cartnotification', {
          user_id: user_id
        })
        .then(response => {
          setcartnotification(response.data)
          console.log(response.data);
        })
        .catch(error => {
          console.error('Lỗi:', error);
        });
      }
    return ( 
        <>
        <Nav cartnotification={cartnotification} setcartnotification={setcartnotification}/>
        <Carousel/>
        <Shoes cartnotification={cartnotification} setcartnotification={setcartnotification} />
        <Footer/>
        </>
        
        
        
    );
};

export default Home;