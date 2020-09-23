import React from 'react'

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`https://nextdoorcooks-api.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then(data => {
        debugger
        console.log("login return data: ",data)
        if (!data.error) {
          console.log(data)
          const { user, token } = data
          // then set that user in state in our App component
          this.props.handleLogin(user)
          // also save the token to localStorage
          localStorage.token = token
        }else{
          console.log(data)
        }

      })
  }

  render() {
    return (
      <form className={'LoginForm'}  onSubmit={this.handleSubmit}>
        <h1>Welcome back,</h1>
        <h1 className={'Second'} >Please log in</h1>
        <label>Username</label>
        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
        <label>Password</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} autoComplete="current-password" />
        <input className={'SubmitBtn'} type="submit" value="Login" />
      </form>
    )
  }
}

export default Login