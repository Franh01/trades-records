import { useEffect, useState } from 'react'

import BasicDateTimePicker from './common/Inputs/DateTimePicker'
import { Box } from '@mui/material'
import { Trade } from '../../main/Interfaces/trade'
import TradePreview from './components/TradePreview/TradePreview'
import { generateID } from './common/generateID'
import moment from 'moment'

function App(): JSX.Element {
  const PREV_VALUES: Trade = {
    comment: '',
    entry_commission: 0,
    entry_price: 0,
    exit_commission: 0,
    exit_price: 0,
    leverage: 20,
    quantity: 0,
    stop_loss: 0,
    symbol: '',
    take_profit: 0,
    type: 'buy',
    entry_date: moment(),
    exit_date: moment(),
    id: generateID()
  }

  // We extract every input from PREV_VALUES and slice the ID
  const INPUTS = Object.keys(PREV_VALUES).slice(0, -3)

  const [tradeValues, setTradeValues] = useState<Trade>(PREV_VALUES)
  const [path, setPath] = useState<string>('')
  const [trades, setTrades] = useState<Trade[]>([])

  const handleCreateFile = (values: Trade): void => {
    // Convert the object to a JSON string because it's the only way I can avoid the "An object could not be cloned." error
    const SERIALIZED_TRADE = JSON.stringify(values)
    // Convert the JSON string back to an object because we need to send an Object instead of a string but now is a exact copy of values
    const DESERIALIZED_TRADE = JSON.parse(SERIALIZED_TRADE)

    // Send the object to the main process
    window.electron.ipcRenderer.send('new-file', DESERIALIZED_TRADE)
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('path', (_, tradesPath) => {
      setPath(tradesPath)
    })
    window.electron.ipcRenderer.on('trades', (_, trades: Trade[]) => {
      setTrades(trades)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('path')
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    const INPUT_TYPE = getInputTypeByName(name)

    setTradeValues((prevValues) => ({
      ...prevValues,
      [name]: INPUT_TYPE === 'number' ? parseFloat(value) : value
    }))
  }

  const getInputTypeByName = (name: string): string => {
    switch (name) {
      case 'comment':
        return 'text'
      case 'date':
        return 'date'
      case 'entry_price':
        return 'number'
      case 'leverage':
        return 'number'
      case 'quantity':
        return 'number'
      case 'stop_loss':
        return 'number'
      case 'stop_price':
        return 'number'
      case 'symbol':
        return 'text'
      case 'take_profit':
        return 'number'
      case 'entry_commission':
        return 'number'
      case 'exit_commission':
        return 'number'
      case 'type':
        return 'text'
      default:
        return 'text'
    }
  }

  return (
    <>
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          gap: '10px',
          width: '100%'
        }}
      >
        {trades.map((trade: Trade) => (
          <TradePreview key={trade.id} trade={trade} />
        ))}
      </Box>
      <button onClick={() => window.electron.ipcRenderer.send('get-trades')}>Get trades?</button>
      {/* <BasicDateTimePicker
        label="Entry date"
        value={tradeValues.entry_date}
        onChange={(newValue) => {
          setTradeValues((prevValues) => ({
            ...prevValues,
            entry_date: moment(newValue)
          }))
        }}
      />
      <BasicDateTimePicker
        label="Exit date"
        value={tradeValues.exit_date}
        onChange={(newValue) => {
          setTradeValues((prevValues) => ({
            ...prevValues,
            exit_date: moment(newValue)
          }))
        }}
      />
      {INPUTS.map((input) => (
        <input
          id={input}
          key={input}
          name={input}
          value={tradeValues[input]}
          onChange={handleInputChange}
          placeholder={input}
          type={getInputTypeByName(input)}
        />
      ))}

      <button onClick={() => handleCreateFile(tradeValues)}>Click me to create a file!</button> */}
    </>
  )
}

export default App
