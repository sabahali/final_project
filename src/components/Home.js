import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux';
import { Outlet, useAsyncError } from 'react-router-dom';
import { logout } from '../features/User/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { chooseCategory, selectSearch } from '../features/Products/productStatusSlice';
import { useEffect, useState } from 'react';
import { useLazyRetriveCartsQuery, useRetriveCartsQuery } from '../features/Products/cartApiSlice';
import { updateCartsFromDb } from '../features/Products/cartSlice';
import { updateOrderEmail } from '../features/Products/cartSlice';
import { Link } from 'react-router-dom';

const Home = () => {
    const username = useSelector(state => state.auth.username)
    const email = useSelector(state => state.auth.email)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [category, setCategory] = useState('')
    const [show, setShow] = useState(false)
    const cartNumber = useSelector(state => state.cart.cartNumber)
    const [retriveCarts] = useLazyRetriveCartsQuery()
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (email) {
            const retrive = async () => {
                const data = await retriveCarts(email).unwrap()
                // console.log(data)
                if (data) {
                    dispatch(updateCartsFromDb(data))
                }
            }
            retrive()
        }



    }, [email])

    const handleLougout = async () => {
        const controller = new AbortController();
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/logout`, {
                withCredentials: true
            })
            // console.log(response)
            if (response?.status == 204) {
                dispatch(logout())

                navigate('/')
            } else if (response?.status == 404) {
                dispatch(logout())
                navigate('/')
            }

        } catch (err) {
            dispatch(logout())
            // console.log(err.message)
            navigate('/')

        }
    }
    const handleCategory2 = (name) => {
        setCategory(name)
        dispatch(chooseCategory(name))
        navigate('/home/products')
    }
    const handleOrder = () => {
        dispatch(updateOrderEmail(email))
        navigate('/home/orderspage')

    }
    const handleSearch = () => {
        dispatch(selectSearch(search));
        if (search !== '') {
            navigate('/home/searchpage')
        }


    }



    return (
        <div className='d-flex flex-column ' style={{ width: '100vw', height: '100vh' }} >
            <Navbar collapseOnSelect expand="lg" className="bg-body-secondary p-3 ">
                <Container>
                    <Navbar.Brand>E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/home">
                                <Nav.Link onClick={() => setShow(false)}>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="admin">
                                <Nav.Link onClick={() => setShow(false)}>Admin</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="allproductspage">
                                <Nav.Link onClick={() => setShow(false)}>All Products </Nav.Link>
                            </LinkContainer>



                            {/* <NavDropdown title="Gent's" id="collapsible-nav-dropdown">

                                <button className="  dropdown-item" onClick={() => handleCategory2('mens-shirts')} >Men's-shirts</button>
                                <button className="  dropdown-item" onClick={() => handleCategory2('mens-shoes')} >Men's-shoes</button>
                                <button className="  dropdown-item" onClick={() => handleCategory2('mens-watches')} >Watches</button>


                            </NavDropdown> */}
                            <NavDropdown title="Gent's" id="collapsible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/home/products/mens-shirts" >
                                Men's-shirts
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/home/products/mens-shoes" >
                                Men's-shoes
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/home/products/mens-watches" >
                                Watches
                                </NavDropdown.Item>
                            </NavDropdown>
                            {/* <NavDropdown title="Women's" id="collapsible-nav-dropdown">

                                <button className=" dropdown-item" onClick={() => handleCategory2('womens-dresses')} >Women's-dresses</button>
                                <button className=" dropdown-item" onClick={() => handleCategory2('womens-shoes')} >womens-shoes</button>
                                <button className=" dropdown-item" onClick={() => handleCategory2('womens-watches')} >womens-watches</button>
                                <button className=" dropdown-item" onClick={() => handleCategory2('womens-bags')} >womens-bags</button>


                            </NavDropdown> */}
                            <NavDropdown title="Women's" id="collapsible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/home/products/womens-dresses"  >
                                Women's-dresses
                                </NavDropdown.Item>
                                <NavDropdown.Item  as={Link} to="/home/products/womens-shoes"  >
                                womens-shoes
                                </NavDropdown.Item>
                                <NavDropdown.Item  as={Link} to="/home/products/womens-watches"  >
                                womens-watches
                                </NavDropdown.Item>
                            </NavDropdown>
                            {/* <NavDropdown title="Life Style" id="collapsible-nav-dropdown"  >


                                <button className="dropdown-item" onClick={() => handleCategory2('skincare')} >Skincare</button>
                                <button className="dropdown-item" onClick={() => handleCategory2('sunglasses')} >Sunglasses</button>
                                <button className="dropdown-item" onClick={() => handleCategory2('fragrances')} >Fragrances</button>

                            </NavDropdown> */}
                            <NavDropdown title="Life Style" id="collapsible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/home/products/skincare"  >
                                    Skincare
                                </NavDropdown.Item>
                                <NavDropdown.Item  as={Link} to="/home/products/sunglasses"  >
                                    Sunglasses
                                </NavDropdown.Item>
                                <NavDropdown.Item  as={Link} to="/home/products/fragrances"  >
                                Fragrances
                                </NavDropdown.Item>
                            </NavDropdown>
                      
                        </Nav>
                        <Nav>
                            <input className="form-control me-1 mb-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                            <button className="btn btn-outline-success mb-2 nav-item" type="button" onClick={() => handleSearch()}>Search</button>
                            <NavDropdown title={username} id='collapsible-nav-dropdown'>


                                <button className="dropdown-item" onClick={() => handleLougout()} >Logout</button>
                                <NavDropdown.Item as={Link} to="/home/orderspage/myorder"  >
                                My OrdersTest
                                </NavDropdown.Item>

                            </NavDropdown>



                            <button type="button" className="btn nav-link nav-item position-relative" onClick={() => navigate('/home/cartPage')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-success">
                                    {cartNumber}

                                </span>

                            </button>
                            {/* </LinkContainer> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='flex-grow-1 bg-light p-2'>

                <Outlet />

            </div>
            <div className='d-flex flex-column align-items-center justify-content-start p-2 w-100 bg-body-secondary'>
                <p> &copy; Copyright 2023 </p>
            </div>



        </div >
    )
}

export default Home