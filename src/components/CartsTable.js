import { useSelector, useDispatch } from "react-redux"
import { useGetProductByIdQuery } from "../features/Products/productsApiSlice"
import { useEffect, useState } from "react"
import { addTocart, decreaseCount, addTocheckout ,removeFromCart} from "../features/Products/cartSlice";
const CartsTable = ({ id, index, count }) => {
    const email = useSelector(state =>state.auth.email)
    const [product, setProducts] = useState(null)
    const { data, isFetching, isLoading,isSuccess } = useGetProductByIdQuery({ id })
    const [itemCount, setItemCount] = useState(count)
    const dispatch = useDispatch()


    useEffect(() => {
        // setProducts(data)
        if (data) {
            const item = { id: data.id, title: data.title, price: (data.price*83.2).toFixed(0),count :count,email:email }
            // const counts = { count: count }
            dispatch(addTocheckout(item))
            
        }

    }, [data, count])

    const handlePlusButton = (id) => {
        // console.log(data)
        dispatch(addTocart(id))
    };
    const handleMinusButton = (id) => {
        dispatch(decreaseCount(id))
    }
    // const totalPrice = data.price * count ?? 0
    return (
        
     
        <tr key={index}>
        {isSuccess ?  
            <>
            <th scope="row">{index}</th>

            <td>{isLoading ? <p key={index}>Loading</p> : isFetching ? <p key={index}>Please Wait</p> : data.title}</td>
            <td>{isLoading ? <p key={index}>Loading</p> : isFetching ? <p key={index}>Please Wait</p> : data.category}</td>
            <td>{isLoading ? <p key={index}>Loading</p> : isFetching ? <p key={index}>Please Wait</p> : ((data.price * count) * 83.2).toFixed(2)} <span>Rs</span></td>
            <td><button className="btn btn-light" onClick={() => handlePlusButton(data.id)}>&nbsp;+&nbsp;</button> {count} <button className="btn btn-light" onClick={() => handleMinusButton(data.id)}>&nbsp;-&nbsp;</button>
           <span>&nbsp;&nbsp;&nbsp;</span> <button className="btn btn-danger" onClick={()=>dispatch(removeFromCart(data.id))} >Remove</button>
            </td>
            </>
            : <td>Loading</td> }
        </tr>
        
       
    )
}
 
export default CartsTable