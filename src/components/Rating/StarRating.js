import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
const StarRating = ({rating, handleStarClick}) =>{
      const [hover, setHover] = useState(null)
      const [activeColor, inactiveColor] = ["#ffc107","#e4e5e9"]

     return (
      <div className={'starContainer'}>
        {
          [...Array(5)].map((star, i) =>{
            const ratingValue = i +1
            return(
              <label key={`star_label_${i}`}>
                <input 
                  type='radio' 
                  name='rating' 
                  value={ratingValue} 
                  onClick={()=>handleStarClick(ratingValue)}
                  key={i}
                  
                />
                <FaStar 
                  className='star' 
                  color={ratingValue <= (hover || rating) ? activeColor : inactiveColor} 
                  size={20}
                  onMouseEnter={()=> setHover(ratingValue)}
                  onMouseLeave={()=> setHover(null)}
                  /> 
              </label>
            )
          })
        }
      </div>
  )
}

export default StarRating