import { Dispatch, SetStateAction } from 'react'

import CustomNumberInput from '@renderer/components/common/CustomNumberInput'
import { Grid } from '@mui/material'
import { Trade } from '@interfaces/trade'
import { handleChangeNumberInput } from '../utils'
import { numberInputs } from '@renderer/common/constants/tradeInputs'

interface NumberInputsProps {
  tradeValues: Trade
  setTradeValues: Dispatch<SetStateAction<Trade>>
}

export const NumberInputs = ({ tradeValues, setTradeValues }: NumberInputsProps): JSX.Element => {
  return (
    <>
      {numberInputs.map((input): JSX.Element => {
        return (
          <Grid item xs={6} key={input.name}>
            <CustomNumberInput
              value={tradeValues[input.name]}
              name={input.name}
              onChange={(e) => handleChangeNumberInput(e, setTradeValues)}
              placeholder={input.placeholder}
              key={input.name}
            />
          </Grid>
        )
      })}
    </>
  )
}
