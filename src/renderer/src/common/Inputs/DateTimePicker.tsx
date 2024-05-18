import * as React from 'react'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Moment } from 'moment'

interface BasicDateTimePickerProps {
  label: string
  onChange: (value: Moment | null) => void
  value?: Moment
}

const BasicDateTimePicker: React.FC<BasicDateTimePickerProps> = ({
  label,
  onChange,
  value,
  ...restProps
}) => {
  const handleDateTimeChange = (value: Moment | null): void => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <DemoContainer components={['DateTimePicker']}>
      <DateTimePicker value={value} label={label} onChange={handleDateTimeChange} {...restProps} />
    </DemoContainer>
  )
}

export default BasicDateTimePicker
