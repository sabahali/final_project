import { apiSlice } from "../../app/apiSlice";


export const userDataSlice = apiSlice.injectEndpoints({
    endpoints :(builder) =>({
        getUsers :builder.query({
            query : ()=>({
                url : '/getallusers'
            }),
            providesTags :['users']
        }),
        updateRole : builder.mutation({
            query : (data) =>({
               url : '/updateRole',
               method : 'POST',
               body : data
            }),
            invalidatesTags : ['users']
        }),
        deleteUser : builder.mutation({
            query : (data) =>({
                url : '/deleteUser',
                method : 'POST',
                body : data
            }),
            invalidatesTags : ['users']
        })
    })
})

export const{useGetUsersQuery,useUpdateRoleMutation,useDeleteUserMutation} = userDataSlice