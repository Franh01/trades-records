import { Dispatch, SetStateAction } from 'react'

import CustomDateTimePicker from '@renderer/components/common/CustomDateTimePicker'
import { Grid } from '@mui/material'
import { Trade } from '@interfaces/trade'
import { dateInputs } from '@renderer/common/constants/tradeInputs'
import { handleChangeDateInput } from '../utils'

interface DateInputsProps {
  tradeValues: Trade
  setTradeValues: Dispatch<SetStateAction<Trade>>
}

export const DateInputs = ({ tradeValues, setTradeValues }: DateInputsProps): JSX.Element => {
  return (
    <>
      {dateInputs.map((input): JSX.Element => {
        return (
          <Grid item xs={6} key={input.name}>
            <CustomDateTimePicker
              value={tradeValues[input.name]}
              name={input.name}
              label={input.placeholder}
              onChange={(val, name) => handleChangeDateInput(val, name, setTradeValues)}
            />
          </Grid>
        )
      })}
    </>
  )
}
