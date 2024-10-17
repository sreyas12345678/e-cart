import { createSlice } from "@reduxjs/toolkit";




const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    
    reducers:{
 addToCart:(state,action)=>{
    const existingProduct = state.find(item=>item.id==action.payload.id)//action.payload Actions serve as messengers that convey information from your application to the Redux store, triggering state updates. Among the key components of actions is the payload, which carries data to be processed by reducers.
    if(existingProduct){
     const remainingProducts=state.filter(item=>item.id!=existingProduct.id)//remaining products in cart and check the id of existing products 
     existingProduct.quantity++//incrementing   the products  price 
     existingProduct.totalprice=existingProduct.price*existingProduct.quantity//the condition for total price of exsisting products
     state={...remainingProducts,existingProduct}
    }else{
     state.push({...action.payload,quantity:1,totalprice:action.payload.price})//"The Spread operator" is a key feature in JavaScript that enables an iterable to expand wherever zero or more arguments are required.
    }
 },
removeFromCart:(state,action)=>{
   return state=state.filter(item=>item.id!==action.payload)
},
emptyCart:(state)=>{
   return state=[]
}

    }
})
export const{addToCart,removeFromCart,emptyCart}=cartSlice.actions
export default cartSlice.reducer