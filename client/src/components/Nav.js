import {React,useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBBadge,
  MDBModal,
  MDBModalDialog,MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter
} from 'mdb-react-ui-kit';
const Nav = (props) => {
  let navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [showBasic, setShowBasic] = useState(false);
  const [query,setquery] = useState('');
  let handlesearch= async(event)=>{
    event.preventDefault();
    console.log(query);
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  
  }
  let handlelogout=()=>{
    localStorage.removeItem('user');
    navigate('/home')
  }
  const toggleShow = () => setBasicModal(!basicModal);
    return (
      <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href="/home" >King Shoe</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/home'>
                Trang chủ
              </MDBNavbarLink>
            </MDBNavbarItem>
            {/* <MDBNavbarItem>
              <MDBNavbarLink href='#'>Link</MDBNavbarLink>
            </MDBNavbarItem> */}

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Giầy theo thương hiệu
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href={`/search?query=${encodeURIComponent('nike')}`}>Nike</MDBDropdownItem>
                  <MDBDropdownItem link href={`/search?query=${encodeURIComponent('adidas')}`}>Adidas</MDBDropdownItem>
                  <MDBDropdownItem link href={`/search?query=${encodeURIComponent('vans')}`}>Vans</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            {/* <MDBNavbarItem>
              <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                Disabled
              </MDBNavbarLink>
            </MDBNavbarItem> */}
            <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Tìm gì đó ...' aria-label='Search' value={query} onChange={(e)=>{setquery(e.target.value)}}  />
            <MDBBtn  className="my-button" color='primary' onClick={handlesearch} >Tìm kiếm</MDBBtn> 
          </form>
          </MDBNavbarNav>
          <span className='d-inline-block me-3'>
          <MDBBadge className='ms-2' color='danger'>0</MDBBadge>
            <MDBIcon fas icon='shopping-cart' className='fa-1x' />
          </span>
          <span className='d-inline-block'>
          {!user ?<a href="http://localhost:3000/login">Đăng nhập</a>:<><span>{user}</span><button onClick={toggleShow}>log out</button></>}
          {/* <MDBIcon fas icon='user' className='fa-2x' /> */}
          </span>
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>ở lại mua đi mà </MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Bạn có chắc chắn muốn thoát không?</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Không
              </MDBBtn>
              <MDBBtn onClick={() => {handlelogout();toggleShow();}}>Thoát</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </MDBCollapse>
      </MDBContainer>
      </MDBNavbar>
        
    );
};

export default Nav;