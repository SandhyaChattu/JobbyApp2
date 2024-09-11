const SkillsCard = props => {
  const {skillDetails} = props

  const skillCardData = {
    imageUrl: skillDetails.image_url,
    name: skillDetails.name,
  }

  const {imageUrl, name} = skillCardData

  return (
    <li className="skills-item-container">
      <div className="skills-container">
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}
export default SkillsCard
