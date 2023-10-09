
import { useSelector, useDispatch } from "react-redux"
import CartsTable from "./CartsTable"
import { useEffect, useState } from "react";
import axios from 'axios';
import { store } from "../app/store";
import { useLazyAddOrdersToDBQuery } from '../features/Orders/orderApiSlice';
import { useLazyAddCartsToDbQuery, useLazyDeleteCartFromDbQuery } from "../features/Products/cartApiSlice";
import { json, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// Stripe
import { useLazyStripeSessionQuery } from "../features/User/stripeApiSlice";
import { loadStripe } from "@stripe/stripe-js";

//
import PaypalCheckout from "./PaypalCheckout";



//
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// import Stripe from "stripe";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
    borderRadius: '20px'

};


const CartPage = () => {

    const carts = useSelector(state => state.cart.carts)
    const checkoutItems = useSelector(state => state.cart.checkoutitems)
    const [totalPrice, setTotalPrice] = useState(0)
    const state = store.getState()
    const cartNumber = state.cart.cartNumber;
    const email = state.auth.email
    const username = state.auth.username
    const [addtoDB] = useLazyAddOrdersToDBQuery()
    const [addCartsToDb] = useLazyAddCartsToDbQuery();
    const [deleteCartFromDb] = useLazyDeleteCartFromDbQuery()
    const navigate = useNavigate()
    const [session] = useLazyStripeSessionQuery()

    const [method,setMethod] = useState(null)
    //model things

    const [open, setOpen] = useState(false);
    const handleOpen = (method) => {
        if(method == 'razorpay'){
            setMethod('razorpay')
        }else if(method == 'paypal'){
            setMethod ('paypal')
        }
        setOpen(true);}
    const handleClose = () => setOpen(false);

    //
    const [address, setaddress] = useState('');
    const [statec, setstatec] = useState('');
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [show, setShow] = useState(false)
  

    //
    const [clientSecret, setClientSecret] = useState("");
    const stripePromise = loadStripe('pk_test_51NM31RSHQMvGYYZ8eq9lCsw6Vu4LETpSDsXL7RWPGGLLzHXkojyJBil53qD38Vd9Nj1Oq631CkkqNsfDLhVGlGUF005jWW0pt2');

    useEffect(() => {
        if (checkoutItems) {
            let price = 0;
            checkoutItems.forEach(item => {
                const total = item.price * item.count;
                price += total
            });
            setTotalPrice(price.toFixed(2))
            // console.log(price.toFixed(2))
        }



    }, [checkoutItems])

    const handleSaveCart = () => {
        if (email && carts && cartNumber) {
            addCartsToDb({ email: email, carts: carts, cartNumber: cartNumber });
            alert("Your Carts are Saved")
        }
    }

    useEffect(() => {

        if (cartNumber == 0) {
            deleteCartFromDb({ email })
        }

        // console.log(carts,cartNumber)
    }, [cartNumber])

    const handleStripe = async () => {

        console.log(checkoutItems)
        try {
            const stripe = await loadStripe('pk_test_51NM31RSHQMvGYYZ8eq9lCsw6Vu4LETpSDsXL7RWPGGLLzHXkojyJBil53qD38Vd9Nj1Oq631CkkqNsfDLhVGlGUF005jWW0pt2');

            const response = await session(checkoutItems).unwrap()
            console.log(response);
            // localStorage.setItem('stripeSession-id', JSON.stringify(response.id));
            if (response?.id) {
                const result = stripe.redirectToCheckout({
                    sessionId: response.id
                })
                // localStorage.setItem('stripe_Id1', JSON.stringify(result))

                console.log(result)
                if (result.error) {
                    console.log(result.error)
                }
            }
        } catch (err) {
            console.log(err)

        }
    }

    // }
    let order_id;
    const handleRazorpay = async () => {
        // const controller = new AbortController();
        if (address && statec && city && zip) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}/razorpayorder`, {
                    totalPrice: totalPrice,
                })
                const data = response.data
                console.log(data)
                const options = {
                    key: "rzp_test_XeMrVt2BwyICcB",
                    currency: data.currency,
                    amount: totalPrice,
                    name: "E-commerce Products",
                    description: "Test Wallet Transaction",
                    notes: [...checkoutItems],
                    order_id: data.id,
                    handler: function (response) {
                        //   alert(response.razorpay_payment_id);
                        //   alert(response.razorpay_order_id);
                        //   alert(response.razorpay_signature);
                        order_id = response.razorpay_order_id;
                        verifyRazor(response)

                    },
                    prefill: {
                        name: username,
                        email: email,
                        contact: "9999999999",
                    },
                    notes: [`address : ${address} `, `city : ${city} `, `state : ${statec} `, `zip : ${zip} `],



                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.on('payment.failed', function (response) {
                    navigate('/home/paymentfailed')
                });
                paymentObject.open();
            } catch (err) {
                console.log(err.message)
            } finally {
                // controller.abort()
            }
        } else {
            alert(" Please fill form")
        }


    }
    async function verifyRazor(response) {
        // const controller = new AbortController();
        try {
            const resp = await axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}/verifyRazorpay`, { order_id: response.razorpay_order_id, payment_id: response.razorpay_payment_id }, {
                headers: { 'x-razorpay-signature': `${response.razorpay_signature}` },



            })

            if (resp.status == 200) {
                console.log('payment verified')
                setShow(false)
                addtoDB({ checkoutItems, order_id: response.razorpay_order_id, address, statec, city, statec, zip });
                navigate('/home/paymentsuccess')

            }
        } catch (err) {
            navigate('/home/paymentfailed')
        } finally {
            // controller.abort()
        }




    }


    const options = {
        clientSecret,
    };
    return (
        <div>
            <div className="container mt-4 table-responsive"  >
                {/* <button onClick={handleTEst}>TEST</button> */}
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">&nbsp;</th>

                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((item, index) => (
                            <CartsTable id={item.id} index={index} key={item.id} count={item.count} />

                        ))}

                    </tbody>
                </table>
                <div>
                    <p> Total Price : {totalPrice} Rs</p>
                    {/* <button onClick={handleOpen} className={totalPrice != 0 ? 'btn btn-success' : 'btn btn-success disabled'} >CHECKOUT</button> */}

                    {/* <button onClick={() => handleTEst()}>CHECKOUT</button> //  */}



                </div>
                <DropdownButton id="dropdown-basic-button" title="Checkout" style={{ display: `${totalPrice != 0 ? 'inline' : 'none'}` ,}} >
                <Dropdown.Item onClick={() => { handleOpen('razorpay'); }}>Razor Pay</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleStripe(); }}>Stripe</Dropdown.Item>
                <Dropdown.Item onClick={() => { handleOpen('paypal'); }} >Paypal</Dropdown.Item>
            </DropdownButton>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button onClick={() => handleSaveCart()} className={totalPrice != 0 ? 'btn btn-info' : 'btn btn-info disabled'} style={{ display: 'inline'}}>Save</button>

            </div>
      
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Checkout Products
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component='div' >
                    {method == 'razorpay' ? 
                        <div className="row g-3">
                        
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" onChange={(e) => setaddress(e.target.value)} required />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputCity" onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputState" className="form-label">State</label>
                                <select id="inputState" className="form-select" onChange={(e) => setstatec(e.target.value)} required>
                                    <option value="">Choose...</option>
                                    <option value='Kerala'>Kerala</option>
                                    <option value='Tamilnadu'>Tamilnadu</option>
                                    <option value='Karnataka'>Karnataka</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputZip" className="form-label">Zip</label>
                                <input type="text" className="form-control" id="inputZip" onChange={(e) => setZip(e.target.value)} required />

                            </div>
                            <div className="col-md-12">
                                 <button type="button" onClick={() => handleRazorpay()} className='btn btn-success' >Razor Pay</button>
               
                            </div>
                        </div>
                        :method == 'paypal' ? <PaypalCheckout address = {address} statec = {statec} zip = {zip} city ={city} /> : ''  }
                    </Typography>
                </Box>
            </Modal>
            
        </div>
    )
}

export default CartPage