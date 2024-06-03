import { Trade } from '@interfaces/trade'
import { TradeStatsOutput } from './getTradeStats'
import { isProfitPositive } from './utils'

interface TradePreviewStylesOutput {
  [key: string]: object
}

/**
 * Returns the styles for the trade preview component based on the given trade and stats.
 *
 * @param {Trade} trade - The trade object containing the necessary information.
 * @param {TradeStatsOutput} stats - The trade stats object containing the profit percentage and net profit.
 * @return {TradePreviewStylesOutput} - The styles object for the trade preview component.
 */
export const getStyles = (trade: Trade, stats: TradeStatsOutput): TradePreviewStylesOutput => {
  return {
    tradePreviewMainSX: {
      width: '250px',
      height: '144px',
      borderRadius: '5px',
      overflow: 'hidden',
      boxShadow: '0px 20px 25px 0px #36353516',
      transition: 'all 0.2s ease-in-out',
      userSelect: 'none',
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.03, 1.03)',
        transition: 'all 0.2s ease-in-out'
      }
    },
    coloredHeaderSX: {
      maxWidth: '100%',
      height: '37px',
      background:
        trade.type === 'buy' ? 'var(--secondary-color)' : 'var(--secondary-color-contrast)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 14px'
    },
    headerFontSX: {
      fontSize: '16px',
      fontWeight: 'bold'
    },
    bodySX: { padding: '10px 14px' },
    'quantity-and-cost': {
      fontWeight: 600 //semibold
    },
    profitPercentageSX: {
      color: isProfitPositive(stats) ? 'var(--primary-color)' : 'var(--primary-color-contrast)',
      fontWeight: 600 //semibold
    },
    netProfitSX: {
      color: isProfitPositive(stats) ? 'var(--primary-color)' : 'var(--primary-color-contrast)',
      fontWeight: 600 //semibold
    },
    symbolIconSX: {
      width: '30px',
      height: '30px',
      bottom: '12px',
      right: '12px'
    },
    iconSymbolAndLeverageContainerSX: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }
}
