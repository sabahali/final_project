import { apiSlice } from "../../app/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) =>({
     addOrdersToDB :builder.query({
         query : (checkoutItems) =>({
            
             url :'/addOrdertodb',
             method : 'POST',
             body : checkoutItems,
         })
     }),
     getOrderfromDb : builder.query ({
        query : (email) =>({
            url : '/getOrdersfromDb',
            method : 'POST',
            body : {email : email}
        })
     }),
     getOrderIds : builder.query({
        query : (email) => ({
            url : '/getOrderIds',
            method : 'POST',
            body : {email : email}

        })
     }),
     getOrderById : builder.query({
        query : (id) =>({
            url : 'getorderbyid',
            method : 'POST',
            body : {id : id},
        })
     }),
     getInvoice : builder.query({
      query : (id) =>({
        url : `getinvoice/${id}`,
        method : 'POST',
        responseType: 'arraybuffer',
        headers : {
            'Accept' : 'application/pdf'
        },
          body: JSON.stringify({}),
      })
     })
    
    })
 })
export const {useLazyAddOrdersToDBQuery ,useLazyGetOrderfromDbQuery,useGetOrderfromDbQuery,useGetOrderIdsQuery,useLazyGetOrderByIdQuery,useLazyGetInvoiceQuery,useLazyGetOrderIdsQuery} = orderApiSlice