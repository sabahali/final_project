
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// This value is from the props in the UI
const style = {"layout":"vertical"};

function createOrder(checkoutItems) {
    
    // replace this url with your server
    return fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/create-order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify(checkoutItems),
    })
        .then((response) => response.json())
        .then((order) => {
            // Your code here after create the order
            return order.id;
        });
}
 function onApprove(data,checkoutItems,navigate) {
    // replace this url with your server
    return fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/capture-order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderID: data.orderID,
        }),
    })
        .then((response) => response.json())
        .then(async(orderData) => {
            console.log(orderData)
            const Responseconfirm = await axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}/paypalconfirm`,{
                order_id:orderData.id,
                userData : orderData.purchase_units,
                checkoutItems
             
            })
            if(Responseconfirm){
                navigate('/home/paymentSuccess')
            }
            // Your code here after capture the order
        });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner ,checkoutItems }) => {
    const navigate = useNavigate()
    const [{ isPending }] = usePayPalScriptReducer();
    const handleTest = ()=>{
        
    }
    return (
        <>
            {/* <button onClick={handleTest}>Test</button> */}
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={()=>createOrder(checkoutItems)}
                onApprove={(data)=>onApprove(data,checkoutItems,navigate)}
                
            />
        </>
    );
}

export default function PaypalCheckout({address,statec,city,zip}) {
    // const userData = {address,state : statec,city,zip}
    const checkoutItems = useSelector(state => state.cart.checkoutitems)
    const hanldeTest = () =>{
        console.log(checkoutItems)
    }
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            {/* <button onClick={hanldeTest}>TEST</button> */}
            <PayPalScriptProvider options={{ clientId: "AYZChBET8dUB2aNW1v_ASKotnbIt4sHLq1Qioanc0EnhM0SmF1EDVX3k2EUp4dKQtm3cMABAdu92omDJ", components: "buttons", currency: "USD" }}>
                <ButtonWrapper showSpinner={false} checkoutItems ={checkoutItems}  />
            </PayPalScriptProvider>
        </div>
    );
}