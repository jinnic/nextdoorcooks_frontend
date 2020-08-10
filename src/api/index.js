// export  const  getWeather  =  ( lat ,  lng )  =>  {
//   return fetch(`http://localhost:3000/weather?lat=${lat}&lng=${lng}`)
//     .then(r => r.json())
// }
export const getCurrentUser = () => {
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

export const getUsers = () => {
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