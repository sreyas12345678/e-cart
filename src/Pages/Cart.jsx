import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../Redux/slice/cartSlice'

function Cart() {
  const cart=useSelector((state)=>state.cartReducer)
  const dispatch=useDispatch()
  const[total,setTotal]=useState(0)
  useEffect(()=>{

if(cart?.length>0){
  setTotal(cart?.map(product=>product?.totalprice).reduce((p1,p2)=>p1+p2))
}else{
  setTotal(0)
}

  },[cart])
  return (
    <>
    <div className="container" style={{marginTop:"150px"}}>
      {
        cart?.length>0?
      <div className="row mt-5">
        <div className="col-lg-8">
          <table className='table shadow'>
            <thead>
              <tr>
                <th>#</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {
               cart?.map((product,index)=>( 
              <tr>
                <td>{index+1}</td>
                <td>{product?.title}</td>
                <td><img style={{width:"200px",height:"200px"}} src={product?.thumbnail}  alt="" /></td>
                <td><input type="text" className='form-control' readOnly value={product?.quantity} style={{width:"25px"}} /></td>
                <td className='text-danger fw-bolder border-0'>${product?.totalprice}</td>
                <td style={{backgroundColor:'white'}}><Button className='btn' onClick={()=>dispatch(removeFromCart(product?.id))}><i class="fa-solid fa-trash text-danger"></i></Button></td>
              </tr>
              ))}
              
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            <button className='btn btn-danger' onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
            <Link to={'/'} style={{TextDecoder:"none"}} className='btn btn-outline-success'>Shop More</Link>
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-3">
          <div className="container border rounded shadow mt-5 p-5 w-100">
            <h1>Cart Summary</h1>
            <h4>Total Products:{cart.length}</h4>
            <h5>Total: <span className='text-danger fw-bolder'>${total}</span></h5>
          </div>
          <div className="d-grid">
            <button className='btn btn-success m-3 rounded'>chechout</button>
          </div>
        </div>
      </div>
: <div className="d-flex flex-column flex-md-row align-items-center mt-5 text-center text-md-left">
<img 
  src="https://mytrident.com/cdn/shop/files/empty-cart-3.gif?v=1728580041&width=1500" 
  alt="Empty Wishlist" 
  className="img-fluid mb-3 mb-md-0" 
  style={{ width: "100%", maxWidth: "400px" }}
/>
<h1 className="text-danger ms-md-3">Your Cart is Empty...</h1>
</div>

      }
    </div>
    </>
  )
}

export default Cart
