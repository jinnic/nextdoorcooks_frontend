
export const averageRatings =(ratings) =>{
    
  if(ratings.length > 0){
    let num = ratings.map(rating => rating.stars)
    let starAve = num.reduce((a,b)=> a + b, 0) / num.length
    return starAve
  }
  return 0
}