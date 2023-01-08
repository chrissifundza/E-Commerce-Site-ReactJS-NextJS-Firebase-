import React from 'react'
import Link from "next/link";

export const Product = ({product}) => {
  return (
    <div>
      <Link href={`/product/${product.ID}`}>
      <div className='product-card'>
        <img src={product.Image.length  && product.Image[0]} width={250} height={250} className="product-image" alt="" />
        <p className="product-name">{product.productName}</p>
        <p className="product-price">R{product.price}</p>
      </div>
      </Link>
    </div>
  )
}
 