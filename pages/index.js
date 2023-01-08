import React, {useEffect} from 'react'
import { HeroBanner } from "../components/HeroBanner";
import { Product } from "../components/Product";
import { FooterBanner } from "../components/FooterBanner"
import {useStateContext} from '../context/StateContext'
import {db} from "../firebase";
import { doc, getDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";

const Home = ({bannerData, products,Qua}) => {

  const {settotalPrice,setcartItems, setTotalQuantity}=useStateContext()
  
useEffect(()=>{
  const localQuantity =localStorage.getItem('CartQuantity');
  const Qua = JSON.parse(localQuantity);
  if(Qua>=1){
    setTotalQuantity(Qua);

    const Cart =localStorage.getItem('Cart');
    const dataCart = JSON.parse(Cart);
    setcartItems(dataCart);
    const Total =localStorage.getItem('CartTotal');
    const totalCart = JSON.parse(Total);
    settotalPrice(totalCart)
    
  
  }
 

 
 

},[])
  return (
    <div>
      <HeroBanner heroBanner={bannerData !="" && bannerData}/>

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map(
          (product)=><Product key={product.ID} product={product}/>)}
      </div>

     <FooterBanner footerBanner={bannerData=!"" && bannerData}/>
    </div>
  )
}

export const getServerSideProps = async () => {
 
  const docRef = doc(db, "Banner-details", "96325");
  const docSnap = await getDoc(docRef);
  const bannerData = docSnap.data();
  const  products =[]
  const arrayData = await getDocs(collection(db, "Products"));
  arrayData.forEach((product)=>{
  products.push(product.data())
})



 return {
  props:{bannerData, products}
}
   

  
}
export default Home
