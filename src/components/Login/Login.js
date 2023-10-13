import React, { useEffect, useLayoutEffect, useState } from 'react'
import './login.css'
import { useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addCredentials } from '../../features/User/authSlice'
import { useLoginMutation } from '../../features/User/authApiSlice'
import { useNavigate } from 'react-router-dom'
import { updateOrderEmail } from '../../features/Products/cartSlice'
import GoogleLogin from './GoogleLogin'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useInitialRefreshQuery,useLazyInitialRefreshQuery } from '../../app/apiSlice'
const Login = () => {
  // const [initialRefresh] = useLazyInitialRefreshQuery()
  const [login, { data, isSuccess }] = useLoginMutation()

  const loguserRef = useRef();
  const logpwdref = useRef();
  const signuserRef = useRef();
  const signpwdref = useRef();
  const signcnfpwdRef = useRef();
  const signemailRef = useRef()
  const dispatch = useDispatch()
  const [signpwd, setSignpwd] = useState('')
  const [signcnfpwd, setSigncnfpwd] = useState('')
    const [show,setShow] = useState(false)


  const navigate = useNavigate()
  let regEmail = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  let usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/;
  useLayoutEffect(()=>{
 
    async function initial (){
      try{
        const refreshResult = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/refresh`,{
          withCredentials : true,
        })
        if(refreshResult.status == 200){
          navigate('/home')
          dispatch(addCredentials({accesstoken : refreshResult.data.accesstoken,username : refreshResult.data.username,email:refreshResult.data.email,role:refreshResult.data.role}))
             dispatch(updateOrderEmail(refreshResult.data.email))
        }else{
          setShow(true)
        }
      }catch(err){
        setShow(true)
      }
   
      
      
    }
   initial()

   return(()=>{
    setShow(false)
   })
  },[])



  const handleLoginSubmit = async () => {

    if (loguserRef.current.value !== '' && logpwdref.current.value !== '') {
      console.log(loguserRef.current.value, logpwdref.current.value);

      const credentials = { username: loguserRef.current.value, pwd: logpwdref.current.value, }
      const data = await login(credentials).unwrap()
      console.log(data)
      if (data?.username) {
        console.log(data)
        dispatch(addCredentials({ username: data.username, email: data.email, accesstoken: data.accesstoken, role: data.role }));
        dispatch(updateOrderEmail(data.email))


        navigate('/home')
      } else {
        alert("please provide valid credentials")

      }

    } else {
      alert("Please Provide Valid Username and Password")
    }
  }

  const handleSignSubmit = async () => {
    if (!regEmail.test(signemailRef.current.value)) return alert("Provide Valid Email Address");
    if (!usernameRegex.test(signuserRef.current.value)) return alert("Provide valid username");
    // if(!passwordRegex.test(signpwd)) return alert("Provide valide password")
    if (signemailRef.current.value !== '' && signuserRef.current.value !== '' && signpwdref.current.vlaue !== '' && signcnfpwdRef.current.vlaue !== '') {
      if (signpwd !== signcnfpwd) {
        alert("password and confirm pwd not matching")
        return
      } else {

        console.log(signuserRef.current.value, signcnfpwdRef.current.value, signpwdref.current.value, signemailRef.current.value);
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}/register`, {
            username: signuserRef.current.value,
            pwd: signcnfpwdRef.current.value,
            email: signemailRef.current.value,
            role: 'user',
          })

          console.log(response.data)
          if (response.status == 409) alert("already registered Please login")
          if (response.status == 201) alert("Registered successfully")
        } catch (err) {
          alert('Already Registered')
        }



      }

    }
    else {
      alert("Please provide Entries")
    }

  }


  return (
    <div className='main-body'>
       {show && 
      <div className="main">
        {/* <input type="checkbox" id="#chk" aria-hidden="true" /> */}
       
        <div className="login">
          <form>
            <label htmlFor="#chk" className='loginLabel' >Login</label>
            <input className='loginInput' type="text" placeholder="Username" name="username" ref={loguserRef} />
            <input className='loginInput' type="password" placeholder="Password" name="username" ref={logpwdref} />
            <input className='loginInput loginButton' type="button" value="Login" onClick={handleLoginSubmit} />
          </form>
          <GoogleOAuthProvider clientId="20695236849-o9gr1kjn38ga5tjcmaih5c2ueh32mvrc.apps.googleusercontent.com">
            <GoogleLogin />
          </GoogleOAuthProvider>
        </div>
        <div className="signup">
          <form>
            <label className='loginLabel' htmlFor="#chk">Signup</label>
            <input className='loginInput' type="text" placeholder="Username" name="username" ref={signuserRef} />
            <input className='loginInput' type="email" placeholder="Email" name="email" ref={signemailRef} />
            <input className='loginInput' type="password" placeholder="Password" name="password" ref={signpwdref} onChange={(e) => setSignpwd(e.target.value)} />
            <input className='loginInput' type="password" placeholder="Confirm password" name="cnfpwd" ref={signcnfpwdRef} onChange={(e) => setSigncnfpwd(e.target.value)} />
            <input className='loginInput loginButton' type="button" value="Sing UP" onClick={handleSignSubmit} />
          </form>
        </div>
      </div>
      }
    </div>
  )
}

export default Login;