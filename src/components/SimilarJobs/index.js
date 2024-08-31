import './index.css'

const SimilarJobs = props => {
  const {item} = props
  return (
    <li className="list-container">
      <div className="logo-container">
        <img
          src={item.company_logo_url}
          alt="similar job company logo"
          className="log"
        />

        <div>
          <h1>{item.title}</h1>
          <p>{item.rating}</p>
        </div>
      </div>
      <div>
        <h1>Description</h1>
        <p>{item.job_description}</p>
        <div className="lofo-container">
          <p>{item.location}</p>
          <p>{item.employment_type}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
