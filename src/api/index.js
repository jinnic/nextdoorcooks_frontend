// export  const  getWeather  =  ( lat ,  lng )  =>  {
//   return fetch(`http://localhost:3000/weather?lat=${lat}&lng=${lng}`)
//     .then(r => r.json())
// }
export const getCurrentUser = () => {
  console.log("Fetch Current user : AUTO LOGIN")
  return fetch(`http://localhost:3000/autologin`, 
        {
          headers: {
            "Authorization": `Bearer ${localStorage.token}`
        }
      })
        .then(r => r.json())
  // if(localStorage.token) {
  //   return fetch(`http://localhost:3000/autologin`, 
  //           {
  //             headers: {
  //               "Authorization": `Bearer ${localStorage.token}`
  //           }
  //         })
  //           .then(r => r.json())
  // }
  // return {error: "Invalid Request"}
  

}

export const getCurrentUserFollowees = (id)=>{
  console.log("Fetch Current FOLLOWEES")
  return fetch(`http://localhost:3000/users/${id}/following`)
        .then(r => r.json())
}

export const getUsers = () => {
  console.log("Fetch Users")
  return fetch(`http://localhost:3000/users`, 
            {
              headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
          })
              .then(r => r.json())
}

export const updateUser = (userProfile) =>{
  return fetch("http://localhost:3000/profile", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(userProfile)
          })
            .then(r => r.json())
}
// export const addPokemon = (lat, lng) => {
//   return fetch(`http://localhost:3000/pokemons`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ lat, lng })
//   })
//     .then(r => r.json().then(data => {
//       if (r.ok) return data
//       throw data
//     }))
// }

export const getRecipes = () =>{
  console.log("Fetch RECIPES")
  return fetch(`http://localhost:3000/recipes`)
            .then(r => r.json())
}

export const addRecipe = (recipe)=>{
  return fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe)
          })
            .then(r => r.json())
}

export const updateRecipe = (recipe) =>{
  return fetch(`http://localhost:3000/recipes/${recipe.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe)
          })
            .then(r => r.json())
}


export const deleteRecipe = (recipe) =>{
  return fetch(`http://localhost:3000/recipes/${recipe.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
          })
            .then(r => r.json())
}

export const addLike = (like) =>{
  //console.log("like objct : ",like)
  
  return fetch("http://localhost:3000/likes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(like)
          })
            .then(r => r.json())
}

export const removeLike = (like_id) =>{
  
  return fetch(`http://localhost:3000/likes/${like_id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
          })
            .then(r => r.json())
}

export const addRating = (rating)=>{
  return fetch("http://localhost:3000/ratings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rating)
          })
            .then(r => r.json())
}

export const updateRating = (rating)=>{
  
  return fetch(`http://localhost:3000/ratings/${rating.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rating)
          })
            .then(r => r.json())
}

export const follow = (id)=>{
  return fetch(`http://localhost:3000/follow/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then(r => r.json())
}



export const unfollow = (id)=>{
  return fetch(`http://localhost:3000/unfollow/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then(r => r.json())
}

