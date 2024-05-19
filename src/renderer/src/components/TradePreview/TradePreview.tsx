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
  const stats = getTradeStats(trade)
  const styles = getStyles(trade, stats)

  const symbolAndLeverage = `${trade.symbol} ${trade.leverage}X`

  const getRating = (): string => {
    const profitPercentage =
      stats.profitPercentage > 0 && trade.type === 'buy'
        ? stats.profitPercentage
        : stats.profitPercentage * -1

    const ratings = ['D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S', 'S+', 'SS', 'SS+']

    for (let i = ratings.length - 1; i >= 0; i--) {
      //Here im trying to format the percentage to a max value of 12 which is rating length considering a SS+ as +300% so 300 / 25 = 12 max value
      const formattedProfit = Math.round(profitPercentage / 25)

      if (formattedProfit >= i) return ratings[i]
    }

    return ratings[0]
  }

  const quantityAndCost = `${trade.quantity} (${stats.formattedCost})`

  const profitPercentage = ` ${stats.profitPercentage > 0 && trade.type === 'buy' ? '+' : '-'}${stats.profitPercentage.toFixed(2)}%`

  return (
    <Box id="trade-preview-main" sx={styles['trade-preview-main']}>
      <Box id="colored-header" component={'header'} sx={styles['colored-header']}>
        <Typography id="symbol-and-leverage" sx={styles['header-font']} component={'h3'}>
          {symbolAndLeverage}
        </Typography>
        <Typography id="rating" sx={styles['header-font']} component={'h3'}>
          {getRating()}
        </Typography>
      </Box>
      <Box id="body" sx={{ padding: '10px 14px' }} component={'section'}>
        <Typography id="quantity">
          {`Q: `}
          <Box id="quantity-and-cost" sx={styles['quantity-and-cost']} component={'span'}>
            {quantityAndCost}
          </Box>
        </Typography>
        <Typography id="profit-percentage-container">
          P/L:
          <Box id="profit-percentage" component={'span'} sx={styles['profit-percentage']}>
            {profitPercentage}
          </Box>
        </Typography>
        <Typography id="net-profit" style={styles['net-profit']}>
          {stats.formattedNetProfit}
        </Typography>
      </Box>
    </Box>
  )
}

export default TradePreview
