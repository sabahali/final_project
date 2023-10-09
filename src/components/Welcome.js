import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';

const Welcome = () => {

  return (
    <div className='d-flex flex-column align-items-center justify-content-start p-4 w-100 ' style={{ width: '100vw', minHeight: '80vh' }} >
      <p className='display-2'>Happy Shopping !</p>
      <div style={{ display: 'block', width: '80vw', padding: 0 }}>

        <Carousel>
          <Carousel.Item interval={1500}>
            <img
              className="d-block carousalImageNew"
              src="https://img.freepik.com/premium-vector/flash-sale-banner-promotion_131000-379.jpg?w=2000"
              alt="Image One"
            />
            <Carousel.Caption>
              <h3 className='text-light  display-4'>FLASH SALE</h3>
              <p>UP TO 50%</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block  carousalImageNew"
              src="https://d31u1j2vbx6ya5.cloudfront.net/gei-assets/uploads/2015/06/editing-services.jpg"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h3 className='text-light  display-4'>FLASH SALE</h3>
              <p>UP TO 50%</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block  carousalImageNew"
              src="https://d31u1j2vbx6ya5.cloudfront.net/gei-assets/uploads/2015/06/ecommerce-product-images.jpg"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h3 className='text-light  display-4'>FLASH SALE</h3>
              <p>UP TO 50%</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block  carousalImageNew"
              src="https://clippingpathcrew.com/wp-content/uploads/2020/06/e-commerce-photo-editing-1-580x380_c.jpg"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h3 className='text-light  display-4'>FLASH SALE</h3>
              <p>UP TO 50%</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

    </div>
  )
}

export default Welcome