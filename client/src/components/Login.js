import {React,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/scss/Login.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate } from 'react-router-dom';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
const Login = () => {
    let navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setemail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  

    const handleSubmit = async(event) => {
      event.preventDefault();
      console.log(`Username: ${email}, Password: ${password}`);
     await axios.post('http://localhost:8000/api/login', {
        email: `${email}`,
        password: `${password}`
      })
      .then(async response => {
        // console.log(response.data);
        await toast.success(response.data);
        navigate("/home");
      })
      .catch(error => {
        console.log(error.response.data);
        toast.error(error.response.data);
      });
    };
    return (
 
        <>
    <MDBContainer fluid className="p-3 my-5 h-custom" >

<MDBRow>

  <MDBCol col='10' md='6'>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
  </MDBCol>

  <MDBCol col='4' md='6'>

    <div className="d-flex flex-row align-items-center justify-content-center">

      <p className="lead fw-normal mb-0 me-3">Login with</p>

      <MDBBtn floating size='md' tag='a' className='me-2'>
        <MDBIcon fab icon='facebook-f' />
      </MDBBtn>

      <MDBBtn floating size='md' tag='a'  className='me-2'>
        <MDBIcon fab icon='twitter' />
      </MDBBtn>

      <MDBBtn floating size='md' tag='a'  className='me-2'>
        <MDBIcon fab icon='linkedin-in' />
      </MDBBtn>

    </div>

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">Or</p>
    </div>

    <MDBInput wrapperClass='mb-4' name="email"
              value={email}
              onChange={handleUsernameChange} label='Email address' id='formControlLg' type='email' size="lg"/>
    <MDBInput wrapperClass='mb-4' name="password"
              value={password}
              onChange={handlePasswordChange} label='Password' id='formControlLg' type='password' size="lg"/>

    <div className="d-flex justify-content-between mb-4">
      <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      <a href="!#">Forgot password?</a>
    </div>

    <div className='text-center text-md-start mt-4 pt-2'>
      <MDBBtn className="mb-0 px-5" size='lg'  onClick={handleSubmit}>Login</MDBBtn>
      <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="http://localhost:3000/register" className="link-danger">Register</a></p>
    </div>

  </MDBCol>

</MDBRow>
    </MDBContainer>
    <ToastContainer />
        </>
    );
};

export default Login;