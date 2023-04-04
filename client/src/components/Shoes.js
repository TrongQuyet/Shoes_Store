import {React,useState,useEffect} from 'react';
import '../public/scss/Shoes.scss'
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
const Shoes = () => {
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
        giá : {shoe.price} $
        </MDBCardText>
        <MDBBtn href='#'>Buy now</MDBBtn>
      </MDBCardBody>
    </MDBCard>
        ))}
        </>
    );
};

export default Shoes;