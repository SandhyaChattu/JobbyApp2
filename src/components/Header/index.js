import {Component} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

class Header extends Component {
  remove = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="nav-bar">
        <ul className="ListContainer">
          <Link to="/">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </li>
          </Link>

          <div className="header">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/jobs">
              <li>Jobs</li>
            </Link>
            <button className="logout-btn" onClick={this.remove}>
              Logout
            </button>
          </div>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
