import TextField from '@mui/material/TextField'

interface CustomNumberInputProps {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  name: string
  value: string
  rows?: number
}
const CustomTextInput = ({
  onChange,
  placeholder,
  name,
  value,
  rows
}: CustomNumberInputProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event)
  }

  return (
    <TextField
      sx={{ width: '100%' }}
      name={name}
      onChange={handleChange}
      value={value}
      id="text-input"
      label={placeholder}
      placeholder={placeholder}
      variant="outlined"
      type="text"
      multiline
      rows={rows || 0}
    />
  )
}

export default CustomTextInput
