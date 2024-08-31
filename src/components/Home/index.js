import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    const cookie = Cookies.get('jwt_token')
    if (cookie === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-container">
        <div>
          <Header />
        </div>

        <div className="home-sub-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button className="job-button">Find Jobs</button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
