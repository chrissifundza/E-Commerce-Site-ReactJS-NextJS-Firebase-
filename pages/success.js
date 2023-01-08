import React from 'react';
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext';
import { useState, useEffect } from 'react';
import { FireWorks } from '../lib/utils'
const Success = () => {
    const {settotalPrice,setcartItems, setTotalQuantity}=useStateContext();

    const [Order, setOrder] = useState(null);

    useEffect(()=>{
      localStorage.clear();
      setTotalQuantity(0);
      setcartItems([]);
      settotalPrice(0);
      FireWorks();
    },[])

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg'>Check you email inbox for the reciept.</p>
            <p className='description'>If you have any questions, please email 
                <a className='email' href='mailto:multigstore@multig.co.za'>multigstore@multig.co.za</a></p>

              <Link href="/">
                <button className='btn'>Continue Shopping</button>
              </Link>
                
        </div>

    </div>
  )
}
export default Success