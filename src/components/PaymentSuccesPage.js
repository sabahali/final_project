import React, { useEffect, useRef } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { addToOrder } from '../features/Products/cartSlice'

const PaymentSuccesPage = () => {


  return (
    <div className='d-flex flex-column align-items-center justify-content-center p-4 w-100 ' style={{width :'100vw',minHeight : '80vh'}}>
        <p className='display-1'>Payment SuccessFull</p>
        <p className='display-1'>Visit Again </p>

    </div>
  )
}

export default PaymentSuccesPage