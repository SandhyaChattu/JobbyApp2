import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import {TiStar} from 'react-icons/ti'

import {IoLocationOutline} from 'react-icons/io5'
import SkillCard from '../SkillCard'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiConstants = {
  loading: 'loading',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailsItem extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    apiresult: apiConstants.loading,
  }

  componentDidMount() {
    this.getJobsItemDetails()
  }

  getJobsItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const token = Cookies.get('jwt_token')
    console.log(token)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const dbResponse = await response.json()
    console.log(dbResponse)
    if (response.ok === true) {
      this.setState({
        jobDetails: dbResponse.job_details,
        similarJobs: dbResponse.similar_jobs,
        lifeAtCompany: dbResponse.life_at_company,
        isLoading: false,
        apiresult: apiConstants.success,
      })
    } else {
      this.setState({apiConstants: apiConstants.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops!Something Went Wrong</h1>
      <p>We can not seem to find the page you are looking for</p>
      <button>Retry</button>
    </div>
  )

  rendeSuccessView = () => {
    const {jobDetails, similarJobs, isLoading} = this.state
    return (
      <div className="container">
        <Header />
        <div className="logo-container">
          <img
            src={jobDetails.company_logo_url}
            className="logo"
            alt="job details company logo"
          />
          <div>
            <h1>{jobDetails.title}</h1>
            <TiStar />
            <p>{jobDetails.rating}</p>
          </div>
        </div>
        <div className="location-container">
          <p>{jobDetails.location}</p>
        </div>
        <div>
          <p>{jobDetails.employment_type}</p>
          <p>{jobDetails.package_per_annum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1>Description</h1>
        <p>{jobDetails.job_description}</p>
        <a href={jobDetails.company_website_url}>Visit</a>
        <h1>SKills</h1>
        <ul>
          {jobDetails.skills.map(eachItem => (
            <SkillCard key={eachItem.name} item={eachItem} />
          ))}
        </ul>
        <h1>Life at Company</h1>
        <p>{jobDetails.life_at_company.description}</p>
        <img src={jobDetails.life_at_company.image_url} alt="life at company" />
        <h1>Similar Jobs</h1>
        <ul className="similarJobs">
          {similarJobs.map(eachItem => (
            <SimilarJobs key={eachItem.id} item={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoading = () => <Loader data-testid="loader" type="ThreeDots" />

  render() {
    const {apiresult} = this.state
    switch (apiresult) {
      case apiConstants.success:
        return this.rendeSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }
}
export default JobDetailsItem
