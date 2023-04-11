import {React,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/scss/Login.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
const Login = (props) => {
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
      console.log(`Username: ${email}, Password: ${password}`);
     await axios.post('http://localhost:8000/api/login', {
        email: `${email}`,
        password: `${password}`
      })
      .then(async response => {
        console.log(response.data.user_id)
        // await toast.success(response.data);
        await localStorage.setItem('firstname', JSON.stringify(response.data.firstname));
        await localStorage.setItem('user_id', JSON.stringify(response.data.user_id));
        navigate("/home");
      })
      .catch(error => {
        console.log(error.response.data);
        toast.error(error.response.data);
      });
    };
    const handleKeyPress = (event) => {
      if (event.keyCode === 13) {
        handleSubmit();
      }
    }
    return (
 
        <>
<MDBContainer >
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">King Shoes</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' name="email"
              value={email}
              onChange={handleUsernameChange}
              label='Email address' id='formControlLg' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' name="password"
              value={password}
              onChange={handlePasswordChange} onKeyDown={(event) => handleKeyPress(event)}
              label='Password' id='formControlLg' type='password' size="lg"/>
            <button className="btn_login mb-4 px-5 mx-5 w-100"   color='info' size='lg' onClick={handleSubmit} >Login</button>
            <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p className='ms-5'>Don't have an account? <a href="http://localhost:3000/register" className="link-info">Register here</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{padding: '10px',height: '100vh',objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    {/* <MDBContainer fluid className="p-3 my-5 h-custom" >

<MDBRow>

  <MDBCol col='10' md='6'>
    <image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
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
    </MDBContainer> */}
    <ToastContainer />
        </>
    );
};

export default Login;