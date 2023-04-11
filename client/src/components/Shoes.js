import {React,useState,useEffect} from 'react';
import '../public/scss/Shoes.scss'
import { ToastContainer, toast } from 'react-toastify';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
  } from 'mdb-react-ui-kit'
import axios from 'axios'
const Shoes = (props) => {
  const user_id = JSON.parse(localStorage.getItem('user_id'));
    const [allshoes, setallShoes] = useState([]);
    useEffect(() =>{
        getallshoes()
    },[])

    let getallshoes =async()=> {
       await axios.get('http://localhost:8000/api/allshoes')
      .then(response => {
        setallShoes(response.data.shoes);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    let handleaddshoes=async(shoe)=> {

      axios.post('http://localhost:8000/api/addcart', {
        user_id: user_id,
        shoe_id: shoe.id,
        quantity: 1
      })
      .then (response => {
        console.log('Thêm sản phẩm vào giỏ hàng thành công');
        toast.success(`thêm thành công ${shoe.name}`);
        props.setcartnotification(props.cartnotification+1)
        
      })
      .catch(error => {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      });

    }
  
    return (
        <>
        {allshoes.map(shoe => (
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
        {/* <MDBBtn onClick={()=>{handleaddshoes(shoe)}}>Thêm vào giỏ hàng</MDBBtn> */}
        <button onClick={()=>{handleaddshoes(shoe)}}>Thêm vào giỏ hàng</button>
      </MDBCardBody>
    </MDBCard>
        ))}
        <ToastContainer />
        </>
    );
};

export default Shoes;