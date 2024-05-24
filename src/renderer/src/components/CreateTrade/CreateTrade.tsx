import { defaultValues, textInputs } from '@common/constants/tradeInputs'
import { handleChangeTextInput, handleCreateFile } from './utils'
import { useEffect, useState } from 'react'

import CustomTextInput from '../common/CustomTextInput'
import { DateInputs } from './components/DateInputs'
import DefaultButton from '../common/DefaultButton'
import { Grid } from '@mui/material'
import { MultipleInputs } from './components/MultipleInputs'
import { NumberInputs } from './components/NumberInputs'
import { Trade } from '@interfaces/trade'

interface CreateTradeProps {
  onClose?: () => void
}

const CreateTrade = ({ onClose }: CreateTradeProps): JSX.Element => {
  const [tradeValues, setTradeValues] = useState<Trade>(defaultValues)

  useEffect(() => {
    return () => {
      setTradeValues(defaultValues)
    }
  }, [])

  return (
    <Grid id="create-trade-grid-container" container spacing={1}>
      <DateInputs tradeValues={tradeValues} setTradeValues={setTradeValues} />
      <MultipleInputs tradeValues={tradeValues} setTradeValues={setTradeValues} />
      <NumberInputs tradeValues={tradeValues} setTradeValues={setTradeValues} />
      <Grid item xs={12} id="comment-input-container">
        <CustomTextInput
          value={tradeValues.comment}
          name={textInputs.comment.name}
          onChange={(e) => handleChangeTextInput(e, setTradeValues)}
          placeholder={textInputs.comment.placeholder}
          rows={3}
        />

        <DefaultButton
          text="Create file"
          variant="contained"
          onClick={() => handleCreateFile(tradeValues, onClose)}
          sx={{
            marginTop: 2,
            padding: '20px 20px'
          }}
        />
      </Grid>
    </Grid>
  )
}
export default CreateTrade
