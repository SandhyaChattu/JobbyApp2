import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoLocationSharp} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'

import './index.css'

class JobListItem extends Component {
  render() {
    const {item} = this.props
    console.log(item)
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <li className="list-container">
        <Link to={`/jobs/${item.id}`}>
          <div className="logo-container">
            <img
              src={item.company_logo_url}
              className="logo"
              alt="job details company logo"
            />
            <div>
              <h1>{item.title}</h1>
              <div className="icon-container">
                <FaStar />
                <p>{item.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-container">
            <IoLocationSharp className="icon" />
            <p>{item.location}</p>
          </div>
          <div>
            <p>{item.package_per_annum}</p>
            <p>{item.employment_type}</p>
          </div>
          <hr className="horizontal-line" />
          <h1>Description</h1>
          <p>{item.job_description}</p>
        </Link>
      </li>
    )
  }
}

export default JobListItem
