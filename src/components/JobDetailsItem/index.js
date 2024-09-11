import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'

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

  getJobDetails = jobData => ({
    companyLogoUrl: jobData.company_logo_url,
    companyWebsiteUrl: jobData.company_website_url,
    employmentType: jobData.employment_type,
    id: jobData.id,
    jobDescription: jobData.job_description,
    lifeAtCompany: {
      imageUrl: jobData.life_at_company.image_url,
      description: jobData.life_at_company.description,
    },
    location: jobData.location,
    packagePerAnnum: jobData.package_per_annum,
    rating: jobData.rating,
    skills: jobData.skills,
  })

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
      const formatedJobDetails = this.getJobDetails(dbResponse.job_details)
      console.log(formatedJobDetails)
      const formatedSimilarJobData = dbResponse.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      // console.log(formatedSimilarJobData)
      this.setState({
        jobDetails: formatedJobDetails,
        similarJobs: formatedSimilarJobData,
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
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobDetails
    const {imageUrl, description} = lifeAtCompany

    return (
      <div className="job-details-view-container">
        <div className="job-item">
          <div className="logo-title-location-container">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="title-heading">{title}</h1>
                <div className="rating-container">
                  <BsStarFill className="rating-icon" />
                  <p className="rating-heading">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-employee-container">
                <div className="location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-heading">{location}</p>
                </div>
                <div className="employee-type-container">
                  <BsFillBriefcaseFill className="brief-case-icon" />
                  <p className="employee-type-heading">{employmentType}</p>
                </div>
              </div>
              <p className="package-heading">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit-heading">
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="description-text">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <SkillCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-image-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobs jobDetails={eachSimilarJob} key={eachSimilarJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoading = () => <Loader data-testid="loader" type="ThreeDots" />

  renderJobDetails = () => {
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

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}
export default JobDetailsItem
