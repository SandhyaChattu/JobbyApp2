import './index.css'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  setAuthorization = jwtToken => {
    const {history} = this.props

    const token = Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  requestToHome = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const UserDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }

    const response = await fetch(url, options)
    const dbResponse = await response.json()
    console.log(response)

    if (response.ok === true) {
      this.setAuthorization(dbResponse.jwt_token)
    } else {
      this.setState({errorMsg: dbResponse.error_msg})
    }
  }

  render() {
    const {errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/jobs" />
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <form className="login-container" onSubmit={this.requestToHome}>
          <label htmlFor="userName">USERNAME</label>
          <input
            type="text"
            id="userName"
            onChange={this.changeUserName}
            placeholder="rahul"
          />
          <br />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="text"
            id="password"
            onChange={this.changePassword}
            placeholder="rahul@2021"
          />
          <br />
          <button className="submit-button" type="submit">
            Login
          </button>
          <p className="err-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}
export default Login
