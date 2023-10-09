import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { useParams } from 'react-router-dom';
import {  useGetOrderIdsQuery, useLazyGetOrderByIdQuery,useLazyGetInvoiceQuery,useLazyGetOrderIdsQuery } from '../../features/Orders/orderApiSlice';
const OrdersPage = () => {
    const currentUser = useSelector(state => state.auth.email)
    // const [data,setData] = useState([]);
    // const[isLoading,seIsLoading] = useState(true)
    // const[isFetching,setIsFetching] = useState(null);
    // const[isError,setIsError] = useState(null);
    // const [isSuccess,seIsSuccess] = useState(null);
    const {user} = useParams()
    const orderEmail = useSelector(state => state.cart.orderEmail)
    const [currentEmail,setCurrentEmail] = useState(null)
    //  const[fetchId,{data,isLoading,isError,isFetching,isSuccess}]=useLazyGetOrderByIdQuery()
    useEffect(()=>{
        if(user == currentUser){
            console.log(user == currentUser)
            // fetchId(currentUser)
            // console.log(data)
            // console.log(isLoading)
            
        }else{
            // fetchId(orderEmail)
        }
        
    },[])

    const { data, isLoading, isFetching, isSuccess, isUninitialized, isError } = useGetOrderIdsQuery(user == 'myorder'? currentUser :user == 'adminusers'? orderEmail : null)
    // const { data, isLoading, isFetching ,isSuccess,isUninitialized,isError} = useGetOrderfromDbQuery(email);
    const [fechdatabyId, { data: databyId, isLoading: isLoadingbyid, isFetching: isFetchingbyid, isSuccess: isSuccessbyid }] = useLazyGetOrderByIdQuery()
    const [getinvoice] = useLazyGetInvoiceQuery()

    const handleTest = () => {
        
        // console.log(currentEmail)
      
    }
    const handleBody = async (id) => {
        
        const response = await fechdatabyId(id).unwrap()

    }
    const handleInvoice = async(id) =>{
        try{

            const response = await axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}/getinvoice/${id}`,{},{
                
                    responseType: 'arraybuffer',
                    headers: {
                        Accept: 'application/pdf',
                    }
            })
            // const data= await getinvoice(id).unwrap()
            const data = response.data
            const blob = new Blob([data], { type: 'application/pdf' });
            console.log(blob)
            const fileURL = window.URL.createObjectURL(blob);
            
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'SamplePDF2.pdf';
            alink.click();
            
            
        }catch(err){
            console.log(err)
        }

    }



    return (
        <div>
            {/* <button onClick={handleTest}>TEST</button> */}
            {isLoading ? <p>Loading</p> : isFetching ? <p>Please Wait</p> : isSuccess ?

                <div className='container mt-4 table-responsive '>
                    <Accordion>
                        {data.map((item, index) => (

                            <Accordion.Item eventKey={index} key={index} onClick={() => handleBody(item.order_id)}>
                                <Accordion.Header  ><span className='m-auto'> Order ID : {item.order_id}</span>&nbsp;<span className='m-auto'>{item.date}</span></Accordion.Header>
                                <Accordion.Body >
                                    {isLoadingbyid ? <p>Loading</p> : isFetchingbyid ? <p>Please Wait</p> : isSuccessbyid ? <>
                                        <div className='container mt-4'>
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Product Title</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">quantity</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {databyId.map((item, index) => (
                                                        <tr key={index}>
                                                            <th scope='row'>{index}</th>
                                                            <td>{item.title}</td>
                                                            <td>{item.price} Rs</td>
                                                            <td>{item.count}</td>
                                                            <td>Payment Success</td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                            <button className='btn btn-primary' onClick={() => handleInvoice(item.order_id)}>Download Invoice</button>
                                            </div>
                                        </> : <> </> }
                                    </Accordion.Body>
                            </Accordion.Item>


                        ))}
                    </Accordion>
                </div>
                :isError? <p className='display-2'> No orders to show</p> : <p className='display-2'> No orders to show</p> }
        </div>
    )
}

export default OrdersPage