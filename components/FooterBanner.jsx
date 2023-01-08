import React from 'react'
import  Link  from "next/link";

export const FooterBanner = ({footerBanner:{discount,largeText,largeText2,sale_Time,ID , photo_url,Title,midText,smallText, desc}}) => {
  return (
    <div className='footer-banner-container'>
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText}</h3>
          <h3>{largeText2}</h3>
          <p>{sale_Time}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${ID}`}>
          <button type='button'>Shop Now</button>
          </Link>
        </div>
        <img src={photo_url}  className="footer-banner-image" alt="" />
      </div>
    </div>
  )
}
