import {Component} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>

            <ul className="nav-bar-mobile-icons-container">
              <li>
                <Link to="/">
                  <AiFillHome className="nav-item-mobile-link" />
                </Link>
              </li>
              <li>
                <Link to="/jobs">
                  <BsFillBriefcaseFill className="nav-item-mobile-link" />
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-mobile-btn"
                  onClick={this.onClickLogout}
                  aria-label="close"
                >
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </div>

          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
