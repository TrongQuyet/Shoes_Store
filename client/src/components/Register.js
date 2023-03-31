import {React,useState} from 'react';
import axios from 'axios';
import '../public/scss/Register.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
const Register = () => {
  let navigate = useNavigate();
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  let hanldesignup=async()=>{
    await axios.post('http://localhost:8000/api/register', {
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        email: `${email}`,
        password: `${password}`
      })
      .then (async response => {
        await toast.success(response.data);
        setTimeout(() => {
          navigate("/login");
        }, 3000)
      })
      .catch(error => {
        console.log(error.response.data);
        toast.error(error.response.data);
      });

  }
    return (
        <>
           <MDBContainer fluid className='my-5'>

<MDBRow className='g-0 align-items-center'>
  <MDBCol col='6'>

    <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
      <MDBCardBody className='p-5 shadow-5 text-center'>

        <h2 className="fw-bold mb-5">Sign up now</h2>

        <MDBRow>
          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' name='firstname' value={firstname}  onChange={(e)=>{setfirstname(e.target.value)}}label='First name' id='form1' type='text'/>
          </MDBCol>

          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' name='lastname' value={lastname} onChange={(e)=>{setlastname(e.target.value)}} label='Last name' id='form2' type='text'/>
          </MDBCol>
        </MDBRow>

        <MDBInput wrapperClass='mb-4' name='email' value={email} onChange={(e)=>{setemail(e.target.value)}} label='Email' id='form3' type='email'/>
        <MDBInput wrapperClass='mb-4' name='password' value={password} onChange={(e)=>{setpassword(e.target.value)}} label='Password' id='form4' type='password'/>

        <div className='d-flex justify-content-center mb-4'>
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
        </div>

        <MDBBtn className='w-100 mb-4' size='md' onClick={hanldesignup}>sign up</MDBBtn>

        <div className="text-center">

          <p>or sign up with:</p>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>

      </MDBCardBody>
    </MDBCard>
  </MDBCol>

  <MDBCol col='6'>
    <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className=" w-70 rounded-4 shadow-4"
      alt="" fluid/>
  </MDBCol>

</MDBRow>

            </MDBContainer>
            <ToastContainer />
        </>
    );
};

export default Register;