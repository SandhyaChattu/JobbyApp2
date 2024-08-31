const CheckBoxItem = props => {
  const {item, changeEmploymentType} = props
  const change = event => {
    changeEmploymentType(item.employmentTypeId)
  }
  return (
    <li>
      <input
        type="checkbox"
        id={item.employmentTypeId}
        onClick={change}
        value={item.label}
      />
      <label htmlFor={item.employmentTypeId}>{item.label}</label>
    </li>
  )
}
export default CheckBoxItem
