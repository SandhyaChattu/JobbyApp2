import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiConstants = {
  Loading: 'loading',
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  PROGRESS: 'LOADING',
}

class Profile extends Component {
  state = {
    holderName: '',
    shortBio: '',
    profileUrl: '',
    apistatusProfile: apiConstants.Loading,
  }

  componentDidMount() {
    this.GettingProfile()
  }

  GettingProfile = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const dbResponse = await response.json()
      console.log(dbResponse)

      this.setState({
        holderName: dbResponse.profile_details.name,
        shortBio: dbResponse.profile_details.short_bio,
        profileUrl: dbResponse.profile_details.profile_image_url,
        apistatusProfile: apiConstants.Success,
      })
    } else {
      this.setState({
        apistatusProfile: apiConstants.Failure,
      })
    }
  }

  ProfileSuccessView = () => {
    const {holderName, shortBio, profileUrl} = this.state
    return (
      <div className="profile-contaienr">
        <img src={profileUrl} alt="profile" />
        <h1>{holderName}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  ProfileFailureView = () => (
    <div>
      <button onClick={this.GettingProfile}>Retry</button>
    </div>
  )

  loaderView = () => <Loader type="Three-Dots" data-testid="loader" />

  render() {
    const {apistatusProfile, isWantLoader} = this.state
    console.log(apistatusProfile)

    switch (apistatusProfile) {
      case apiConstants.Success:
        return this.ProfileSuccessView()
      case apiConstants.Failure:
        return this.ProfileFailureView()
      case apiConstants.Loading:
        return this.loaderView
      default:
        return null
    }
  }
}
export default Profile
