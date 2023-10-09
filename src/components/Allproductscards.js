import React from 'react'

import { useSelector,useDispatch } from 'react-redux';
import { addTocart } from '../features/Products/cartSlice';
import { useNavigate } from 'react-router-dom';
import { setCurrentProduct } from '../features/Products/productStatusSlice';
const Allproductscards = ({ pageData }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAddtocart = (id) =>{
        dispatch(addTocart(id))
    }
    const handleViewProduct = (id) =>{
        dispatch(setCurrentProduct(id));
        navigate('/home/viewproduct')
        
    
    }
    return (
        <div className='container '>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {pageData.map((product) => (

                    <div className="col" key={product.id}>
                        <div className="card h-100">
                            <img src={product.thumbnail} className="card-img-top" alt="..." />

                            <div className="card-body" style={{ height: '20vh', textOverflow: 'ellipsis' }}>
                                <h5 className="card-title">{product.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                                <p className="card-text" >{(product.description).slice(0, 50)}...</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Price : {((product.price) * 83.12).toFixed(2)} Rs</li>
                                <li className="list-group-item">Rating : {product.rating}</li>

                            </ul>
                            <div className="card-body p-4" style={{ minHeight: '8vh' }}>
                                <button className='btn btn-primary ' style={{ position: 'absolute', bottom: 10,left : '10px' }} onClick={()=>handleAddtocart(product.id)}>Add to Cart</button>
                                <button className='btn btn-primary ' style={{ position: 'absolute', bottom: 10,left : '130px' }} onClick={()=>handleViewProduct(product.id)}>View</button>
                            </div>
                        </div>
                    </div>



                ))}
            </div>

        </div>
    )
}

export default Allproductscards