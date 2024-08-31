import './index.css'

const SalaryItem = props => {
  const {item, changeSalary} = props
  const change = () => {
    changeSalary(item.salaryRangeId)
    console.log(item.salaryRangeId)
  }

  return (
    <li>
      <input
        type="radio"
        value={item.label}
        id={item.salaryRangeId}
        onClick={change}
        name="salary"
      />
      <label htmlFor={item.salaryRangeId}>{item.label}</label>
    </li>
  )
}

export default SalaryItem
