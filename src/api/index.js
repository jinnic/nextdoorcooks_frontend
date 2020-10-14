export const getCurrentUser = () => {
  console.log("Fetch Current user : AUTO LOGIN")
  return fetch(`http://localhost:3000/auto_login`, 
        {
          headers: {
            "Authorization": `Bearer ${localStorage.token}`
        }
      })
        .then(r => r.json())
  // if(localStorage.token) {
  //   return fetch(`http://localhost:3000/auto_login`, 
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
  return fetch(`http://localhost:3000/users/${id}/following`, 
        {
          headers: {
            "Authorization": `Bearer ${localStorage.token}`
        }
      })
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
export const deleteUser=(user)=>{
  return fetch(`http://localhost:3000/users/${user.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.token}`
            }
          })
            .then(r => r.json())
}
export const getRecipes = () =>{
  console.log("Fetch RECIPES")
  return fetch(`http://localhost:3000/recipes`)
            .then(r => r.json())
}

//using FormData so data is already stringified
export const addRecipe = (form)=>{
  return fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.token}`
            },
            body: form
          })
            .then(r => r.json())
}

export const updateRecipe = (recipe) =>{
  return fetch(`http://localhost:3000/recipes/${recipe.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.token}`
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
              "Authorization": `Bearer ${localStorage.token}`
            }
          })
            .then(r => r.json())
}

export const addLike = (like) =>{  
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

