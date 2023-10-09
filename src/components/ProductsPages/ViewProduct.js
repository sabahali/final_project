import React, { useEffect, useState } from 'react'
import { useGetProductByIdQuery } from '../../features/Products/productsApiSlice'
import Carousel from 'react-bootstrap/Carousel';
import { useSelector, useDispatch } from 'react-redux';
import { addTocart } from '../../features/Products/cartSlice';
const ViewProduct = () => {
    const currentProuctId = useSelector((state) => state.productsStatus.currentProduct)
    const { data, isLoading, isFetching, isSuccess } = useGetProductByIdQuery({ id: currentProuctId })

    const dispatch = useDispatch()


    const handleTest = () => {
        console.log(currentProuctId)
        console.log(data)
    }
    const handleAddtocart = (id) => {
        dispatch(addTocart(id))
    }
    return (
        <div>

            {/* <button onClick={() => handleTest()}>TEST</button> */}
            <div className='container mt-4'>
                {isLoading ? <p>Loading</p> : isFetching ? <p>Please Wait</p> : isSuccess ?



                    <div className="col" key={data.id}>
                        <div className="card h-100">
                            
                            <Carousel>
                                {data?.images.map((image,i)=>(
                                         <Carousel.Item interval={1500} key={i}>
                                         <img
                                             className="d-block productCarousal p-2 bg-dark"
                                             src={image}
                                             alt="Image One"
                                         />
                                         <Carousel.Caption>
                                             <h3 className='text-light  display-4 example10'>FLASH SALE</h3>
                                             <p className='example10'>{data.discountPercentage} %</p>
                                         </Carousel.Caption>
                                     </Carousel.Item>
                                ))}
                               
                           
                        
                                
                            </Carousel>
                            <div className="card-body" style={{ height: '20vh', textOverflow: 'ellipsis' }}>
                                <h5 className="card-title">{data.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{data.category}</h6>
                                <p className="card-text" >{(data.description)}</p>
                            </div>
                            <ul className="list-group list-group-flush text-center">
                                <li className="list-group-item">Price : {((data.price) * 83.12).toFixed(2)} Rs</li>
                                <li className="list-group-item">Rating : {data.rating}</li>
                                <li className="list-group-item">Discount : {data.discountPercentage} %</li>

                            </ul>
                            <div className="card-body p-4 " style={{ minHeight: '5vh' }}>
                                <button className='btn btn-primary ' style={{ position: 'absolute', bottom: 5, margin:'auto' }} onClick={() => handleAddtocart(data.id)}>Add to Cart</button>

                            </div>
                        </div>
                    </div>





                    : ''}
            </div>
        </div>
    )
}

export default ViewProduct