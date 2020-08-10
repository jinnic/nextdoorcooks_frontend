import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-dom'
import SignUp from './SignUp'
import Login from './Login'
import NavBar from './NavBar'
import Profile from './Profile'
import UserContainer from './UserContainer'
import { getCurrentUser, getUsers } from '../api'

class App extends React.Component {
  state = {
    currentUser: null,
    users: []
  }

  // log user in when component mounts
  componentDidMount() {
    // check if user is logged in (if there is token)
    getCurrentUser()
    .then(data => {
      console.log(data)
      // check for errors (could also check the status code of the response)
      if (!data.error) {
        // and set current user in state
        this.handleLogin(data)
      }else{
        console.log(data.error)
      }
    })

    getUsers()
    .then(data => {
      console.log(data)
      // check for errors (could also check the status code of the response)
      if (!data.error) {
        // and set current user in state
        this.setState({
          users: data
        })
      }else{
        console.log(data.error)
      }
    })
  }

  updateUser = newUser => {
    this.setState({ currentUser: newUser })
  }

  handleLogin = currentUser => {
    // set current user, then redirect to home page
    this.setState({ currentUser }, () => {
      this.props.history.push('/home')
    })
  }

  handleLogout = () => {
    // remove the userId from localstorage
    // localStorage.clear()
    localStorage.removeItem("token")
    // and clear the user in state
    this.setState({
      currentUser: null
    })
  }

  render() {
    console.log("In App, state:", this.state)
    return (
      <>
        <NavBar currentUser={this.state.currentUser} handleLogout={this.handleLogout} />
        <main>
          <Switch>
            <Route path="/signup">
              <SignUp handleLogin={this.handleLogin} />
            </Route>
            <Route path="/login">
              <Login handleLogin={this.handleLogin} />
            </Route>
            <Route path="/profile">
              {this.state.currentUser ? <Profile currentUser={this.state.currentUser} updateUser={this.updateUser} /> : <Redirect to='/' />}
            </Route>
            <Route path="/home">
              {this.state.currentUser ? <h1>Welcome, {this.state.currentUser.username}</h1> : <Redirect to='/' />}
              <UserContainer users={this.state.users}/>
            </Route>
            <Route path="/">
              <h1>Please Login or Sign Up</h1>
            </Route>
          </Switch>
        </main>
      </>
    );
  }
}

const mapStateToProps =(state)=>{
  return{
    currentUser: state.currentUser,
    users: state.users
  }
}

// const mapDispatchToProps =()=>{

// }

export default withRouter(
  connect(mapStateToProps)(App)
);
