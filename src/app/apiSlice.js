import {createApi,fetchBaseQuery} from'@reduxjs/toolkit/query/react' 
import { addCredentials,logout } from '../features/User/authSlice'
import { updateOrderEmail } from '../features/Products/cartSlice';


const baseQuery = fetchBaseQuery({
    baseUrl : process.env.REACT_APP_BASE_SERVER_URL,
    credentials : 'include',
    prepareHeaders : (headers,{getState}) =>{
        // headers.set('Accept', 'application/json');
        const token = getState().auth.accesstoken;
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async(args,api,extraOptions) =>{
    let result = await baseQuery(args,api,extraOptions);
        console.log('result',result)
    if(result?.error?.originalStatus === 403){
        console.log('sending Refresh Token')
        const refreshResult = await baseQuery('/refresh',api,extraOptions);
        console.log(refreshResult);
        if(refreshResult?.data){
            const user = api.getState().auth
            api.dispatch(addCredentials({...user,accesstoken : refreshResult.data.accesstoken,username : refreshResult.data.username,email:refreshResult.data.email,role:refreshResult.data.role}))
           api.dispatch(updateOrderEmail(refreshResult.data.email))
            result = await baseQuery(args,api,extraOptions)
        }else{
            api.dispatch(logout())
        }
    }
    return result;
}

export const apiSlice = createApi({
    reducerPath :'api',
    baseQuery : baseQueryWithReauth,
    endpoints : builder =>({})
})

export const {useInitialRefreshQuery,useLazyInitialRefreshQuery} = apiSlice