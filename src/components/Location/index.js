const CheckBoxItem = props => {
  const {item, locationChange} = props

  const change = () => {
    locationChange(item.location)
  }
  return (
    <li>
      <input
        type="checkbox"
        id={item.id}
        onClick={change}
        value={item.location}
      />
      <label htmlFor={item.id}>{item.location}</label>
    </li>
  )
}
export default CheckBoxItem
