import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category : '',
    search : '',
    currentProduct : ''
}

export const productStatusSlice = createSlice({
    name :'productStatus',
    initialState,
    reducers : {
        chooseCategory : (state,action) =>{
            state.category = action.payload
        },
        selectSearch :(state,action) =>{
            state.search = action.payload
        },
        setCurrentProduct : (state,action) =>{
            state.currentProduct = action.payload
        }
    }


})


export const {chooseCategory,selectSearch,setCurrentProduct} = productStatusSlice.actions


export default productStatusSlice.reducer