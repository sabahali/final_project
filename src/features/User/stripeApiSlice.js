import { apiSlice } from "../../app/apiSlice";


export const stripeApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) =>({
     stripeSession :builder.query({
         query : (checkoutItems) =>({
            
             url :'/create-checkout-session',
             method : 'POST',
             body : checkoutItems,
         })
     }),
    
    })
 })
 export const{useLazyStripeSessionQuery} = stripeApiSlice