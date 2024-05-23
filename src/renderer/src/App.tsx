import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import CreateTrade from './components/CreateTrade/CreateTrade'
import { Trade } from '@interfaces/trade'
import TradePreview from './components/TradePreview/TradePreview'

function App(): JSX.Element {
  // We extract every input from PREV_VALUES and slice the ID

  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    window.electron.ipcRenderer.on('trades', (_, trades: Trade[]) => {
      setTrades(trades)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('path')
    }
  }, [])

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
      <button onClick={() => window.electron.ipcRenderer.send('get-trades')}>Get trades!</button>
      <CreateTrade />
    </>
  )
}

export default App
