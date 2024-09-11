import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import Profile from '../Profile'
import Header from '../Header'
import CheckBoxItem from '../CheckBoxItem'
import SalaryRange from '../SalaryRange'
import JobListItem from '../JobListItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  Initial: 'INITIAL',
  Success: 'SUCCESS',
  Failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    salary: '',
    employmentType: [],
    searchInput: '',
    apiStatusJobUrl: apiConstants.Initial,
    location: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {salary, employmentType, searchInput} = this.state

    const url = `https://apis.ccbp.in/jobs?employment=${employmentType.join()}&minimum_package=${salary}&search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)

    if (response.ok) {
      const dbResponse = await response.json()
      // console.log(dbResponse)
      this.setState({
        jobsList: dbResponse.jobs,
        apiStatusJobUrl: apiConstants.Success,
      })
    } else {
      this.setState({apiStatusJobUrl: apiConstants.Failure})
    }
  }

  changeEmploymentType = JobType => {
    const {employmentType} = this.state
    // console.log(employmentType)

    if (employmentType.includes(JobType)) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, JobType],
        }),
        this.getJobs,
      )
    }
  }

  changeSalary = salaryRangeId =>
    this.setState({salary: salaryRangeId}, this.getJobs)

  changeSearchInput = event => {
    if (event.target.key === 'Enter') {
      this.getJobs()
    } else {
      this.setState({searchInput: event.target.value}, this.getJobs)
    }
  }

  locationChange = item => {
    // console.log(item)
    const {location} = this.state
    this.setState({location: item})
    console.log(location)
  }

  renderSuccessView = () => {
    const {jobsList, location} = this.state
    return jobsList.length > 0 ? (
      <div>
        <ul className="jobs-list">
          {jobsList.map(eachItem => (
            <JobListItem key={eachItem.id} item={eachItem} />
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs.Try other filters</p>
        <button> Retry </button>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-description">
        We cannot seem to find the page you are looking for
      </p>
      <button className="jobs-failure-button" onClick={this.getJob}>
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  LoaderView = () => (
    <div data-testid="loader-container">
      <Loader type="ThreeDots" data-testid="loader" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiStatusJobUrl} = this.state
    switch (apiStatusJobUrl) {
      case apiConstants.Success:
        return this.renderSuccessView()
      case apiConstants.Failure:
        return this.renderFailureView()
      case apiConstants.Initial:
        return this.LoaderView()
      default:
        return null
    }
  }

  render() {
    const {
      employmentType,
      salary,
      jobsList,
      apiStatusJobUrl,
      searchInput,
    } = this.state
    // console.log(jobsList)
    const token = Cookies.get('jwt_token')
    // console.log(token)
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="jobs-container">
        <Header />
        <div className="bg-container">
          <div>
            <div className="profile-container">
              <Profile />
            </div>
            <h1 className="side-bar-heading">Type Of Employment</h1>
            <ul className="employmentList">
              {employmentTypesList.map(eachItem => (
                <CheckBoxItem
                  key={eachItem.employmentTypeId}
                  item={eachItem}
                  changeEmploymentType={this.changeEmploymentType}
                />
              ))}
            </ul>
            <hr />
            <h1 className="side-bar-heading">Salary Range</h1>
            <ul className="salaryRangeList">
              {salaryRangesList.map(eachItem => (
                <SalaryRange
                  key={eachItem.salaryRangeId}
                  item={eachItem}
                  changeSalary={this.changeSalary}
                />
              ))}
            </ul>
            <hr />
          </div>

          <div className="search-input-container-desktop">
            <input
              type="search"
              onChange={this.changeSearchInput}
              value={searchInput}
              placeholder="Search"
              className="search-input-desktop"
            />
            <button
              data-testid="search-button-container-desktop"
              aria-label="close"
            >
              <FaSearch data-testid="search-icon-desktop" />
            </button>
          </div>
          <div>{this.renderJobs()}</div>
        </div>
      </div>
    )
  }
}
export default Jobs
