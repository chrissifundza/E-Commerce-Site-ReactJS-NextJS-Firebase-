import React from 'react';
import  Link  from "next/link";
export const HeroBanner = ({heroBanner}) => {
  
  
  return (
    <>

    <div className='hero-banner-container'>
      <div>
          <p className="beats-solo">{heroBanner.smallText}</p>
       <h3>{heroBanner.midText}</h3>
       <h1>{heroBanner.largeText}</h1>
       <img src={heroBanner.photo_url} alt="headphones" className='hero-banner-image'/>
      
      <div>
        <Link href={`/product/${heroBanner.ID}`}>
          <button type='button'>Shop Now</button>
        </Link>

        <div className="desc">
          <h5>Description</h5> 
          <p>{heroBanner.desc}</p>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
