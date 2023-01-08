import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';
import {Cart} from './Cart';
import { useStateContext } from '../context/StateContext';


export const Navbar = () => {

  const {showCart, setshowCart,TotalQuantity}=useStateContext()

  return (
    <div className="container">

    
    <div className='top'>
    <p>Order over R1000, pay only <span>R60</span>  to redeem <span>a new style</span>!  &nbsp;&nbsp; <button>GO</button></p> 
    <div className="count-down">
      <span className='time'>16</span>
      <span>H</span>
      <span className='time'>04</span>
      <span>M</span>
      <span className='time'>2</span>
      <span>S</span>
    </div>
    </div>
  
    <div className='navbar-container'>
      <div className="one"></div>
      <div className="two">
      
      <p className='logo'>
        <Link href="/">MULTIG</Link>
      </p>

      </div>
      <div className="three">

      <button className='cart-icon' onClick={()=>setshowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{TotalQuantity}</span>
      </button>

    {showCart && <Cart/>}
      </div>
      

     
    </div>
    <div className='navbar-container'>
    <h5>bottom hjhwwvjehf</h5>
    </div>
    </div>
  )
}
