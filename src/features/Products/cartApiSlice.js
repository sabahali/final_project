import { apiSlice } from "../../app/apiSlice";


const cartApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({

        addCartsToDb : builder.query({
            query : (data) =>({
                url : '/addCartToDb',
                method : 'POST',
                body : data
            })
        }),
        retriveCarts : builder.query({
            query : (email) =>({
                url : '/retriveCartsfromDb',
                method : 'POST',
                body : {email}
            })
        }),
        deleteCartFromDb : builder.query ({
            query : (email) =>({
                url : '/deleteCartFromDb',
                method : 'POST',
                body : email
            })
        })
    })
})


export  const { useLazyAddCartsToDbQuery,useLazyRetriveCartsQuery,useLazyDeleteCartFromDbQuery,useRetriveCartsQuery} = cartApiSlice