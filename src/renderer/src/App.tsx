import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import CreateTrade from './components/CreateTrade/CreateTrade'
import DefaultButton from './components/common/DefaultButton'
import ReusableModal from './components/common/ReusableModal'
import { Trade } from '@interfaces/trade'
import TradePreview from './components/TradePreview/TradePreview'

function App(): JSX.Element {
  const [trades, setTrades] = useState<Trade[]>([])
  const [isCreateTradeModalOpen, setIsCreateTradeModalOpen] = useState<boolean>(false)

  useEffect(() => {
    window.electron.ipcRenderer.on('trades', (_, trades: Trade[]) => {
      setTrades(trades)
    })

    getTrades()
  }, [])

  const handleOpenCreateTrade = (): void => {
    setIsCreateTradeModalOpen(true)
  }

  const getTrades = (): void => {
    window.electron.ipcRenderer.send('get-trades')
  }

  return (
    <>
      <ReusableModal onClose={setIsCreateTradeModalOpen} open={isCreateTradeModalOpen}>
        <CreateTrade />
      </ReusableModal>
      <Box
        sx={{
          width: '100%',
          background: '#f4f4f4',
          height: '150px'
        }}
      >
        <Typography variant="h1">Stats</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px'
        }}
      >
        <DefaultButton onClick={handleOpenCreateTrade} text="Open create" variant="contained" />
        <DefaultButton onClick={getTrades} text="Refresh trades!" variant="contained" />
      </Box>
      <Grid container spacing={1} p={2}>
        {trades.map((trade: Trade) => (
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5} key={trade.id} wrap="wrap">
            <TradePreview trade={trade} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default App
