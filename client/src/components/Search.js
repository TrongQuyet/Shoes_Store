import {React,useEffect,useState} from 'react';
import Nav from './Nav';
import { useLocation } from "react-router-dom";
import Footer from './Footer';
import axios from 'axios'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
  } from 'mdb-react-ui-kit'
const Search = (props) => {
  const [shoes, setshoes] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("query");
  console.log(keyword); // kết quả: "nike"
  let searchshoes= async(event)=>{
    await axios.post('http://localhost:8000/api/search', {
      query: `${keyword}`
      
    })  
    .then(async response => {
      console.log(response)
      setshoes(response.data)
    })
    .catch(error => {
      
    });
  }
  useEffect(() => {
    searchshoes()
  },[])
    return (
      
        <>
        <Nav />
        <h1> kết quả tìm kiếm cho : {keyword}</h1>
        {shoes.length>0?<> {shoes.map(shoe => (
            <MDBCard key={shoe.id}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={`http://localhost:8000/${shoe.image}`}  fluid alt={`Image of ${shoe.name}`} />
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{shoe.name}</MDBCardTitle>
        <MDBCardText>
        thương hiệu : {shoe.brand}
        </MDBCardText>
        <MDBCardText>
        màu sắc : {shoe.color}
        </MDBCardText>
        <MDBCardText>
        giá : {shoe.price} $
        </MDBCardText>
        <MDBBtn href='#'>Thêm vào giỏ hàng</MDBBtn>
      </MDBCardBody>
    </MDBCard>
        ))}</>:<><h1>không có sản phẩm cần tìm</h1></>}
     
        <Footer/>
        </>
    );
};

export default Search;