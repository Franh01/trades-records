import { Box, Grid, capitalize } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import CustomAutocomplete from '@renderer/components/common/CustomAutocomplete'
import { Trade } from '@interfaces/trade'
import { getIconBySymbol } from '@renderer/components/TradePreview/utils'
import { handleAutoCompleteChange } from '../utils'
import { multipleInputs } from '@renderer/common/constants/tradeInputs'

interface MultipleInputsProps {
  tradeValues: Trade
  setTradeValues: Dispatch<SetStateAction<Trade>>
}

export const MultipleInputs = ({
  tradeValues,
  setTradeValues
}: MultipleInputsProps): JSX.Element => {
  return (
    <>
      {multipleInputs.map((input): JSX.Element => {
        return (
          <Grid item xs={6} key={input.name}>
            <CustomAutocomplete
              value={tradeValues[input.name]}
              name={input.name}
              options={input.options}
              renderOptions={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <Box
                    component={'img'}
                    loading="lazy"
                    width="20px"
                    src={getIconBySymbol(option)}
                    alt={`${option} icon`}
                  />
                  {capitalize(option)}
                </Box>
              )}
              onChange={(val, name) => handleAutoCompleteChange(val, name, setTradeValues)}
              placeholder={input.placeholder}
            />
          </Grid>
        )
      })}
    </>
  )
}
