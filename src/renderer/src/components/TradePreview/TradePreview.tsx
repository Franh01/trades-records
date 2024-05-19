import { Box, Typography } from '@mui/material'
import { getRating, isProfitPositive } from './utils'

import { Trade } from 'src/main/interfaces/trade'
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
  const {
    tradePreviewMainSX,
    coloredHeaderSX,
    headerFontSX,
    bodySX,
    quantityAndCostSX,
    profitPercentageSX,
    netProfitSX
  } = getStyles(trade, stats)

  const symbolAndLeverage = `${trade.symbol} ${trade.leverage}X`
  const quantityAndCost = `${trade.quantity} (${stats.formattedCost})`
  const profitPercentage = ` ${isProfitPositive(trade, stats) ? '+' : '-'}${stats.profitPercentage.toFixed(2)}%`

  const rating = getRating(trade, stats)

  return (
    <Box id="trade-preview-main" sx={tradePreviewMainSX}>
      <Box id="colored-header" component="header" sx={coloredHeaderSX}>
        <Typography id="symbol-and-leverage" sx={headerFontSX} component="h3">
          {symbolAndLeverage}
        </Typography>
        <Typography id="rating" sx={headerFontSX} component="h3">
          {rating}
        </Typography>
      </Box>
      <Box id="body" sx={bodySX} component="section">
        <Typography id="quantity">
          {`Q: `}
          <Box id="quantity-and-cost" sx={quantityAndCostSX} component="span">
            {quantityAndCost}
          </Box>
        </Typography>
        <Typography id="profit-percentage-container">
          P/L:
          <Box id="profit-percentage" component="span" sx={profitPercentageSX}>
            {profitPercentage}
          </Box>
        </Typography>
        <Typography id="net-profit" style={netProfitSX}>
          {stats.formattedNetProfit}
        </Typography>
      </Box>
    </Box>
  )
}

export default TradePreview
