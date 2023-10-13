
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addCredentials } from '../../features/User/authSlice';
import { useNavigate } from 'react-router-dom'
import { updateOrderEmail } from '../../features/Products/cartSlice'
function GoogleLogin() {
    const dispatch = useDispatch();
    
  const navigate = useNavigate()

    const postLogin = async (codeResponse) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}/googlelogin`,{token :codeResponse.access_token },{
                withCredentials :true
            })
            console.log(response)
            const data = response.data;
            if(data){
                dispatch(addCredentials({ username: data.username, email: data.email, accesstoken: data.accesstoken, role: data.role }));
                dispatch(updateOrderEmail(data.email))
        
        
                navigate('/home')
            }
        }catch(err){
            console.log(err)
        }
        
    }
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => postLogin(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });


    const logOut = () => {
        googleLogout();
        
    };

    return (
        
        <div>
            
            {/* <h2>React Google Login</h2>
            <br />
            <br /> */}
            {/* {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )} */}
            <button className='googlelogin mt-4 ' onClick={() => login()}>Sign in with Google 🚀 </button>
        </div>
        
    );
}
export default GoogleLogin;