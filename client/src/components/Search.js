import {React,useEffect,useState} from 'react';
import Nav from './Nav';
import { ToastContainer, toast } from 'react-toastify';
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
  const user_id = JSON.parse(localStorage.getItem('user_id'));
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
  let handleaddshoes=async(shoe)=> {

    axios.post('http://localhost:8000/api/addcart', {
      user_id: user_id,
      shoe_id: shoe.id,
      quantity: 1
    })
    .then (response => {
      console.log('Thêm sản phẩm vào giỏ hàng thành công');
      toast.success(`thêm thành công ${shoe.name}`);
      
    })
    .catch(error => {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    });

  }
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
        giá : {shoe.price}.000 VND
        </MDBCardText>
        <button onClick={()=>{handleaddshoes(shoe)}}>Thêm vào giỏ hàng</button>
      </MDBCardBody>
    </MDBCard>
        ))}</>:<><h1>không có sản phẩm cần tìm</h1></>}
     
        <Footer/>
        <ToastContainer />
        </>
    );
};

export default Search;