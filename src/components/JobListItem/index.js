import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoLocationSharp} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'
import './index.css'

class JobListItem extends Component {
  render() {
    const {item} = this.props
    // xconsole.log(item)
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <Link to={`/jobs/${item.id}`}>
        <li className="job-item">
          <div className="logo-title-location-container">
            <img
              src={item.company_logo_url}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="title-heading">{item.title}</h1>
              <div className="rating-container">
                <FaStar className="rating-icon" />
                <p className="rating-heading">{item.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-employee-container">
              <div className="location-container">
                <IoLocationSharp className="location-icon" />
                <p className="location-heading">{item.location}</p>
              </div>
            </div>
            <div>
              <p className="package-heading">{item.package_per_annum}</p>
              <p className="employee-type-heading">{item.employment_type}</p>
            </div>
          </div>

          <hr className="line" />
          <h1 className="description-heading">Description</h1>
          <p className="description-text">{item.job_description}</p>
        </li>
      </Link>
    )
  }
}

export default JobListItem
