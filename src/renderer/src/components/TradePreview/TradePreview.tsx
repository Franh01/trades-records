import { Box, Grid, Typography } from '@mui/material'

import { Trade } from 'src/main/interfaces/trade'
import { getIconBySymbol } from './utils'
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
    netProfitSX,
    symbolIconSX,
    iconSymbolAndLeverageContainerSX
  } = getStyles(trade, stats)

  const symbolAndLeverage = `${trade.symbol} ${trade.leverage}X`
  const quantityAndCost = `${trade.quantity} (${stats.formattedCost})`

  return (
    <Box id="trade-preview-main" sx={tradePreviewMainSX}>
      <Box id="colored-header" component="header" sx={coloredHeaderSX}>
        <Box id="icon-symbol-and-leverage-container" sx={iconSymbolAndLeverageContainerSX}>
          <Box
            id="symbol-icon"
            component="img"
            src={getIconBySymbol(trade.symbol || '')}
            alt={`${trade.symbol} icon`}
            sx={symbolIconSX}
          ></Box>
          <Typography id="symbol-and-leverage" sx={headerFontSX} component="h3">
            {symbolAndLeverage}
          </Typography>
        </Box>
      </Box>
      <Grid container id="body" sx={bodySX} component="section">
        <Grid item xs={8}>
          <Typography id="quantity">
            {`Q: `}
            <Box id="quantity-and-cost" sx={quantityAndCostSX} component="span">
              {quantityAndCost}
            </Box>
          </Typography>
          <Typography id="profit-percentage-container">
            P/L:
            <Box id="profit-percentage" component="span" sx={profitPercentageSX}>
              {stats.styledProfitPercentage}
            </Box>
          </Typography>
          <Typography id="net-profit" style={netProfitSX}>
            {stats.formattedNetProfit}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography id="rating">
            {`B: ${stats.getOperationGrades.buy(trade)}`}
            <br />
            {`S: ${stats.getOperationGrades.sell(trade)}`}
            <br />
            {`O: ${stats.getOperationGrades.channel(trade)}`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TradePreview
