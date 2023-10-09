
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login/Login';
import{Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Welcome from './components/Welcome';
import Allproductspage from './components/Allproductspage';
import Adminpage from './components/AdminFolder/Adminpage';
import CartPage from './components/CartPage';
import PaymentFail from './components/PaymentFail';
import PaymentSuccesPage from './components/PaymentSuccesPage';
import OrdersPage from './components/Orders/OrdersPage';
import ProductsPage from './components/ProductsPages/ProductsPage';
import SearchPage from './components/ProductsPages/SearchPage';
import ViewProduct from './components/ProductsPages/ViewProduct';
function App() {
  return (
    <Routes>
      <Route path='/' element ={<Layout/>} >
        <Route index element = {<Login/>} />
        <Route path='home' element = {<Home/>} >
        <Route index element = {<Welcome/>}/>
        <Route path = 'allproductspage' element = {<Allproductspage/>}/>
        <Route path = 'products/:category' element = {<ProductsPage/>}/>
        <Route path = 'admin' element = {<Adminpage/>}/>
        <Route path = 'categoryPage' element = {<ProductsPage/>}/>
        <Route path = 'cartPage' element = {<CartPage/>}/>
        <Route path = 'paymentsuccess' element = {<PaymentSuccesPage/>}/>
        <Route path = 'paymentfailed' element = {<PaymentFail/>}/>
        <Route path='orderspage/:user' element ={<OrdersPage/>}/>
        <Route path='searchpage' element ={<SearchPage/>}/>
        <Route path='viewproduct' element ={<ViewProduct/>}/>
        
        

        </Route>
        

      </Route>
    </Routes>
  );
}

export default App;
