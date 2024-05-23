import TextField from '@mui/material/TextField'

interface CustomNumberInputProps {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  name: string
  value: number
}
const CustomNumberInput = ({
  onChange,
  placeholder,
  name,
  value
}: CustomNumberInputProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //If value is not a number return
    if (isNaN(Number(event.target.value))) return

    onChange(event)
  }

  return (
    <TextField
      sx={{ width: '100%' }}
      name={name}
      onChange={handleChange}
      value={value}
      id="number-input"
      label={placeholder}
      placeholder={placeholder}
      variant="outlined"
      type="number"
      inputProps={{
        min: 0
      }}
    />
  )
}

export default CustomNumberInput
