import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import CreateTrade from './components/CreateTrade/CreateTrade'
import DefaultButton from './components/common/DefaultButton'
import ReusableModal from './components/common/ReusableModal'
import { Trade } from '@interfaces/trade'
import TradePreview from './components/TradePreview/TradePreview'

function App(): JSX.Element {
  // We extract every input from PREV_VALUES and slice the ID

  const [trades, setTrades] = useState<Trade[]>([])
  const [isCreateTradeModalOpen, setIsCreateTradeModalOpen] = useState<boolean>(false)

  useEffect(() => {
    window.electron.ipcRenderer.on('trades', (_, trades: Trade[]) => {
      setTrades(trades)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('path')
    }
  }, [])

  const handleOpenCreateTrade = (): void => {
    setIsCreateTradeModalOpen(true)
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
      <DefaultButton
        onClick={() => window.electron.ipcRenderer.send('get-trades')}
        text="Get trades!"
        variant="contained"
      />

      <DefaultButton onClick={handleOpenCreateTrade} text="Open create" variant="contained" />

      <ReusableModal onClose={setIsCreateTradeModalOpen} open={isCreateTradeModalOpen}>
        <CreateTrade />
      </ReusableModal>
    </>
  )
}

export default App
