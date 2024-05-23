import * as React from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { capitalize } from '@mui/material'

interface CustomAutocompleteProps {
  options: string[]
  placeholder: string
  value: string | null
  onChange: (newValue: string | null, name: string) => void
  name: string
  renderOptions?: (props: React.HTMLAttributes<HTMLLIElement>, option: string) => JSX.Element
}

const CustomAutocomplete = ({
  options,
  placeholder,
  value,
  onChange,
  name,
  renderOptions
}: CustomAutocompleteProps): JSX.Element => {
  const [inputValue, setInputValue] = React.useState('')

  return (
    <Autocomplete
      sx={{ width: '100%' }}
      value={capitalize(value || '')}
      onChange={(_, newValue) => {
        onChange(newValue, name)
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField {...params} label={placeholder} />}
      renderOption={renderOptions}
    />
  )
}

export default CustomAutocomplete
