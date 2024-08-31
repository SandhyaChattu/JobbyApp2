import './index.css'

const SkillCard = props => {
  const {item} = props
  return (
    <li className="list-cotnainer">
      <img src={item.image_url} alt={item.name} />
      <p>{item.name}</p>
    </li>
  )
}
export default SkillCard
