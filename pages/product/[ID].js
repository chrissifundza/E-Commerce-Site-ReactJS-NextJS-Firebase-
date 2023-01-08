import { async } from '@firebase/util';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import React, {useState, useEffect} from 'react';
import {Product} from '../../components/Product';
import { useStateContext } from "../../context/StateContext";
import {db} from "../../firebase";
import { doc, docs, getDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";

 const productDetails  = ({product, products}) => {

    const {productName,price,Image,details} = product;
    const [index, setindex] = useState(0);
    const {decQty, incQty, qty, onAdd,settotalPrice,setcartItems, setTotalQuantity}=useStateContext()

     
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
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img className='product-detail-image' src={Image.lenght !=""&&Image[index]} />
                </div>
                 <div className='small-images-container'>
                    {Image?.map((item, i)=>(
                        <img src={item} 
                        className={i===index ? 'small-image selected-image' : 'small-image'}
                         onMouseEnter={()=> setindex(i)}/>
                    ))}
                </div> 
            </div>
            <div className='product-detail-desc'>
                <h1>{productName}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details:</h4>
                <p>{details}</p>
                <p className='price'>R{price}</p>
                <div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                        <span className='num' onClick=''>{qty}</span>
                        <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className='add-to-cart' onClick={()=>onAdd(product,qty)}>
                        Add to Cart
                    </button>

                    <button type='button' className='buy-now' onClick=''>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>

            <div className='marquee'>
               <div className='maylike-products-container track'>
                {products.map((item)=>(
                    <Product key={item.ID} product={item}/>
                ))}
                </div> 
            </div>

        </div>
    </div>
  )}

export const  getStaticPaths = async ()=>{
    
    const arrayData = await getDocs(collection(db, "Products"));
   
     const paths = arrayData.docs.map(doc => {
    return {
    params: { ID: doc.id.toString() }
    }
    })
    return {
    paths,
    fallback: 'blocking'
    }
}
export const getStaticProps = async ({params:{ID}}) => {
 
    const docRef = doc(db, "Products", ID);
    const docSnap = await getDoc(docRef);
    const product = docSnap.data();
    const  products =[]
    const arrayData = await getDocs(collection(db, "Products"));
    arrayData.forEach((product)=>{
    products.push(product.data())
  })
   return {
    props:{product, products}
  }
     
    

 
  

  }

export default productDetails
