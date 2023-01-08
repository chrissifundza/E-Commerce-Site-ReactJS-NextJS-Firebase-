import React, {createContext, useContext, useState, useEffect} from "react";
import toast, { Toast } from "react-hot-toast";

const context = createContext()

export const StateContext = ({children})=>{
  const [showCart, setshowCart] = useState(false) ;
  const [cartItems, setcartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [TotalQuantity, setTotalQuantity] = useState(0);
  const [qty, setqty] = useState(1) ;
  const [LocalStorage, setLocalStorage] = useState([]);
  let foundProduct;
  let index;


const onAdd=(product, quantity)=>{
const checkProductInCart = cartItems.find((item)=> item.ID===product.ID);
settotalPrice((prevTotalPrice)=> prevTotalPrice + product.price * quantity);
console.log(totalPrice)
setTotalQuantity((prevTotalQuantities)=>prevTotalQuantities + quantity);

if (checkProductInCart){
   
    const updatedCartItems = cartItems.map((cartProduct)=>{
        if(cartProduct.ID === product.ID) return{
            ...cartProduct,
            quantity:cartProduct.quantity + quantity
        }
    })
    setcartItems(updatedCartItems);
    
    
} else{
    product.quantity=quantity;
    setcartItems([...cartItems, {...product}])
    
}
toast.success(`${qty} ${product.productName} added to the cart.`)
}

const onRemove = (product)=>{
  foundProduct = cartItems.find((item) => item.ID === product.ID)
  const newItems =  cartItems.filter((item)=>item.ID!==product.ID)
  settotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price * foundProduct.quantity)
  setTotalQuantity((prevTotalQuantities)=>prevTotalQuantities - foundProduct.quantity)
  setcartItems(newItems)
}

const toggleCartItemQuantity = (id, value)=>{
foundProduct = cartItems.find((item) => item.ID === id)
index = cartItems.findIndex((product)=>product.ID === id)
const newItems =  cartItems.filter((item)=>item.ID!==id)
if(value === 'inc'){

      setcartItems([...newItems, {...foundProduct, 
      quantity:foundProduct.quantity + 1}])
      settotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price)
      setTotalQuantity((prevTotalQuantities)=> prevTotalQuantities +1)

    }else if(value ==='dec'){
      if(foundProduct.quantity>1){
          setcartItems([...newItems, {...foundProduct, 
          quantity:foundProduct.quantity - 1}])
          settotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price)
          setTotalQuantity((prevTotalQuantities)=> prevTotalQuantities -1)
    
      }
       
}

}

  const incQty = ()=>{
        setqty((prevQty)=>prevQty+1);

  }

  const decQty = ()=>{
    setqty((prevQty)=>{
        if(prevQty - 1 < 1) return 1;

        return prevQty - 1
    })
    ;
    
}

const localStore = ()=>{
  console.log(cartItems)
  localStorage.setItem('Cart', JSON.stringify(cartItems))
}
  return(
    <context.Provider 
    value={{
     showCart,
     cartItems,
     totalPrice, 
     TotalQuantity,
     qty,
     incQty, 
     decQty,
     onAdd,
     setshowCart,
     toggleCartItemQuantity,
     onRemove,
     localStore,
     setcartItems,
     setTotalQuantity,
     settotalPrice,
    }}
    >
        {children}
    </context.Provider>
  )

}
export const useStateContext =()=> useContext(context)