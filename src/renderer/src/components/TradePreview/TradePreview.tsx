import { Box, Typography } from '@mui/material'

import { Trade } from 'src/main/Interfaces/trade'
import { getStyles } from './styles'
import { getTradeStats } from './getTradeStats'

interface TradePreviewProps {
  trade: Trade
}

/**
 * Renders a preview of a trade with its stats and styles.
 *
 * @param {TradePreviewProps} trade - The trade object to be displayed.
 * @return {JSX.Element} - The rendered trade preview component.
 */
const TradePreview: React.FC<TradePreviewProps> = ({ trade }: TradePreviewProps) => {
  const STATS = getTradeStats(trade)
  const STYLES = getStyles(trade, STATS)

  return (
    <Box id="trade-preview-main" sx={STYLES['trade-preview-main']}>
      <Box id="colored-header" component={'header'} sx={STYLES['colored-header']}>
        <Typography
          id="symbol-and-leverage"
          sx={STYLES['header-font']}
          component={'h3'}
        >{`${trade.symbol} ${trade.leverage}X`}</Typography>
        <Typography id="rating" sx={STYLES['header-font']} component={'h3'}>
          {/* //TODO: Create a ranking system based on the profit percentage */}
          D-
        </Typography>
      </Box>
      <Box id="body" sx={{ padding: '10px 14px' }} component={'section'}>
        <Typography id="quantity">
          {`Q: `}
          <Box
            id="quantity-and-cost"
            sx={STYLES['quantity-and-cost']}
            component={'span'}
          >{`${trade.quantity} (${STATS.COST})`}</Box>
        </Typography>
        <Typography id="profit-percentage-container">
          P/L:
          <Box
            id="profit-percentage"
            component={'span'}
            sx={STYLES['profit-percentage']}
          >{` ${STATS.PROFIT_PERCENTAGE > 0 && trade.type === 'buy' ? '+' : '-'}${STATS.PROFIT_PERCENTAGE.toFixed(2)}%`}</Box>
        </Typography>
        <Typography
          id="net-profit"
          style={STYLES['net-profit']}
        >{`${STATS.NET_PROFIT_STYLED}`}</Typography>
      </Box>
    </Box>
  )
}

export default TradePreview
