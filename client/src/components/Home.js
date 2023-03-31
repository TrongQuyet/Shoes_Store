import {React,useState,useEffect} from 'react';
import Nav from'./Nav';
import '../public/scss/Home.scss'
import {
    MDBCarousel,
    MDBCarouselItem,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
  } from 'mdb-react-ui-kit';
import axios from 'axios'
const Home = () => {
    const [allshoes, setallShoes] = useState([]);

    useEffect(() =>{
        getallshoes()
    },[])

    let getallshoes =async()=> {
       await axios.get('http://localhost:8000/api/allshoes')
      .then(response => {
        setallShoes(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    }
    return (
        <>
        <Nav/>
        <MDBCarousel showControls keyboard>
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={1}
            src='https://mdbootstrap.com/img/new/slides/041.jpg'
            alt='...'
            style={{ height: '50vh' }}
          />
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={2}
            src='https://mdbootstrap.com/img/new/slides/042.jpg'
            alt='...'
          />
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={3}
            src='https://mdbootstrap.com/img/new/slides/043.jpg'
            alt='...'
          />
        </MDBCarousel>

        {allshoes.map(shoe => (
            <MDBCard key={shoe.id}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={`http://localhost:8000/${shoe.image}`}  fluid alt={`Image of ${shoe.name}`} />
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{shoe.name}</MDBCardTitle>
        <MDBCardText>
        {shoe.brand},{shoe.color},{shoe.price}
        </MDBCardText>
        <MDBBtn href='#'>Buy now</MDBBtn>
      </MDBCardBody>
    </MDBCard>
        ))}
        </>
    );
};

export default Home;