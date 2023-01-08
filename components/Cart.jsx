import React, {useRef, useEffect} from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import toast from 'react-hot-toast';
import {useStateContext} from '../context/StateContext';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../firebase'
export const Cart = () => {
  const cartRef = useRef();
  const {setshowCart,cartItems,setcartItems,totalPrice, TotalQuantity, toggleCartItemQuantity, onRemove,localStore} = useStateContext()

  useEffect( ()=>{
console.log("effected use effect");
  localStorage.setItem('Cart', JSON.stringify(cartItems))

 
  },[cartItems])

  useEffect( ()=>{
    console.log("effected price");
      localStorage.setItem('CartTotal', JSON.stringify(totalPrice))
    
     
   },[totalPrice])

  
  useEffect( ()=>{
        console.log("effected price");
          localStorage.setItem('CartQuantity', JSON.stringify(TotalQuantity))
        
         
 },[TotalQuantity])

const addToFirebase = async ()=>{
 const docSub= await setDoc(doc(db, "CartItems", "96325"), {
  MyCart:cartItems,
  Total:totalPrice,
  Quant:TotalQuantity
});
 console.log(docSub)
 location.href='https://paymentpagemultig.herokuapp.com/';
}

  return (
    <div className='cart-wrapper' ref={cartRef}>
     <div className="cart-container">
      <button 
      type='button' 
      className='cart-heading'
      onClick={()=>setshowCart(false)}>
        <AiOutlineLeft/>
        <span className="heading">Your Cart</span>
        <span className="cart-num-items">({TotalQuantity} items)</span>
      </button>
      {cartItems.length < 1 && (
        <div className="empty-cart">
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty</h3>
        
        <Link href="/">
          <button 
          type="button" 
          onClick={()=>setshowCart(false)}
          className="btn">Continue Shopping</button>
        </Link>
        </div>
      )}
      <div className="product-container">
         {cartItems.length >= 1 && cartItems.map((item, index)=>(
            <div className="product" key={item.ID}>
              {console.log(item.Image[0])}
                <img src={item.Image[0]} className="cart-product-image" alt="" />
            <div className="item-desc">
               <div className="flex top">
                    <h5>{item.productName}</h5>
                    <h4>R{item.price}</h4>
               </div>
               <div className="flex bottom">
                  <div>
                  <p className='quantity-desc'>
                        <span className='minus' onClick={()=> toggleCartItemQuantity(item.ID, 'dec')}><AiOutlineMinus/></span>
                        <span className='num' onClick=''>{item.quantity}</span>
                        <span className='plus' onClick={()=>toggleCartItemQuantity(item.ID,'inc')}><AiOutlinePlus/></span>
                    </p>
                  </div>
                  <button type='button' 
                  className='remove-item'
                  onClick={()=>onRemove(item)}>
                    <TiDeleteOutline/>

                  </button>
               </div>
            </div>
            </div>
         ))}
      </div>
      {cartItems.length>=1 && (
        <div className="cart-bottom">
          <div className="total">
            <h3>Subtotal:</h3>
             
            <h3>R{totalPrice}</h3>
          </div>

          <div className="btn-container">
            
            <button className="btn"
            onClick={()=>addToFirebase()}
            >
              Pay with Stripe
            </button>
           
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
