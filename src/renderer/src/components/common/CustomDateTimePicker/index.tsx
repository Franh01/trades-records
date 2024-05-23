import * as React from 'react'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Moment } from 'moment'

interface CustomDateTimePickerProps {
  label: string
  onChange?: (value: Moment | null, name: string) => void
  value: Moment
  name: string
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  label,
  onChange,
  value,
  name
}) => {
  const handleDateTimeChange = (value: Moment | null, name: string): void => {
    if (onChange) {
      onChange(value, name)
    }
  }

  return (
    <DateTimePicker
      sx={{ width: '100%' }}
      ampm={false}
      disableFuture
      timeSteps={{
        minutes: 1
      }}
      value={value}
      label={label}
      onChange={(val) => handleDateTimeChange(val, name)}
    />
  )
}

export default CustomDateTimePicker
