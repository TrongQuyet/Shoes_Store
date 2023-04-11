import {React,useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
    } from "mdb-react-ui-kit";
import '../public/scss/Cart.scss'
const Cart = () => {
  let navigate = useNavigate();
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const firstname = JSON.parse(localStorage.getItem('firstname'));
  const user_id = JSON.parse(localStorage.getItem('user_id'));
  const [cart, setCart] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
  useEffect(() =>{
    Cart()
},[])
  let Cart =async()=>{
    await axios.post('http://localhost:8000/api/getcart', {
      user_id: user_id, 
    })
    .then(response => {
      setCart(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }
  let handleremove =async(item_id) => {
    await axios.post('http://localhost:8000/api/removeshoe', {
      item_id: item_id, 
    })
    .then(response => {
      console.log(response.data);
      toast.success(`xóa thành công `);
      // cập nhật lại danh sách sản phẩm trong giỏ hàng
      const updatedCartItems = cart.filter(item => item.id !== item_id);
      setCart(updatedCartItems);
    })
    .catch(error => {
      console.error(error);
    });
  }
  let handlePaymentMethodChange=(event)=> {
    setPaymentMethod(event.target.value);
  }
  let handleorder = async() => {
    const orderData = cart.map(item => ({
      shoe_id: item.shoe_id,
      quantity: item.quantity,
      price: item.price
    }));
  
    await axios.post('http://localhost:8000/api/addorder', {
      customer_id: user_id,
      total_price: total,
      customer_name:firstname,
      customer_phone:customerPhone,
      customer_address:customerAddress,
      payment_method:paymentMethod,
      items:orderData
      
    })
    .then(response => {
      toast.success(`đặt hàng thành công `);
      setCart([])
      console.log(response);
      toggleShow()
    })
    .catch(error => {
      toast.error(error.response.data);
      console.error(error.response.data);
    });
  }
    return (
      <>
       <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol size="12">
                <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="p-0">
                    <MDBRow className="g-0">
                      <MDBCol lg="8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                              Shopping Cart
                            </MDBTypography>
                            <MDBTypography className="mb-0 text-muted">
                              0 items
                            </MDBTypography>
                          </div>
        
                          <hr className="my-4" />
                          {cart.map(item =>(  <MDBRow key={item.id} className="mb-4 d-flex justify-content-between align-items-center">
                            <MDBCol md="2" lg="2" xl="2">
                              <MDBCardImage
                                src={`http://localhost:8000/${item.shoe_image}`}
                                fluid className="rounded-3" alt="Cotton T-shirt" />
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3">
                              <MDBTypography tag="h6" className="text-muted">
                                {item.shoe_name}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                              <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>
        
                              <MDBInput type="number" min="0" defaultValue={item.quantity} size="sm" />
        
                              <MDBBtn color="link" className="px-2">
                                <MDBIcon fas icon="plus" />
                              </MDBBtn>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="text-end">
                              <MDBTypography tag="h6" className="mb-0">
                                {item.price}0 VND
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                              <a href="#!" className="text-muted">
                                <MDBIcon fas icon="times" onClick={(item_id)=>{handleremove(item.id)}} />
                              </a>
                            </MDBCol>
                          </MDBRow>))}
                        
        
                          <hr className="my-4" />
                          <div className="pt-5">
                            <MDBTypography tag="h6" className="mb-0">
                              <MDBCardText tag="a" href="http://localhost:3000/" className="text-body">
                                <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                to shop
                              </MDBCardText>
                            </MDBTypography>
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol lg="4" className="bg-grey">
                        <div className="p-5">
                          <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                            Tổng cộng
                          </MDBTypography>
        
                          <hr className="my-4" />
                          <MDBTypography tag="h3" className="text-uppercase mb-3">
                            Thông tin giao hàng
                          </MDBTypography>
        
                          <MDBTypography tag="h5" className="text-uppercase mb-3">
                            Tên người nhận : {firstname}
                          </MDBTypography>
                          <MDBTypography tag="h5" className="text-uppercase mb-3">
                            Nhập số điện thoại
                          </MDBTypography>
        
                          <div className="mb-5">
                            <MDBInput size="lg" type="text"
                              value={customerPhone}
                              onChange={(event) => setCustomerPhone(event.target.value)} placeholder='số điện thoại ...'  />
                          </div>
                          <MDBTypography tag="h5" className="text-uppercase mb-3">
                            nhập địa chỉ giao hàng
                          </MDBTypography>
        
                          <div className="mb-5">
                            <MDBInput size="lg"  type="text"
                          value={customerAddress}
                          onChange={(event) => setCustomerAddress(event.target.value)} placeholder='địa chỉ ...'  />
                          </div>
        
                          <hr className="my-4" />
                          <MDBTypography tag="h5" className="text-uppercase mb-3">
                            Phương thức thanh toán
                          </MDBTypography>
                          <div className="mb-4 pb-2">
                            <select className="select" value={paymentMethod} onChange={handlePaymentMethodChange}>
                              <option value="cash">thanh toán bằng tiền mặt</option>
                              <option value="card">thanh toán qua thẻ (fail)</option>
                            </select>
                          </div>
                          <div className="d-flex justify-content-between mb-5">
                            <MDBTypography tag="h5" className="text-uppercase">
                              Total price
                            </MDBTypography>
                            <MDBTypography tag="h5">{total}.000 VND</MDBTypography>
                          </div>
        
                          <button color="dark"  size="lg" onClick={handleorder}>
                            Đặt hàng
                          </button>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <ToastContainer />
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>bạn đã đặt hàng thành công</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>Quay về trang chủ và mua sắm tiếp</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' href="http://localhost:3000/">
                quay về
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      
      </>
        
        );
};

export default Cart;