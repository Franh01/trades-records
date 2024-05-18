import { Trade } from 'src/main/Interfaces/trade'
import { TradeStatsOutput } from './getTradeStats'

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
    'trade-preview-main': {
      width: '200px',
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
    'colored-header': {
      maxWidth: '200px',
      height: '37px',
      background:
        trade.type === 'buy' ? 'var(--secondary-color)' : 'var(--secondary-color-contrast)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 14px'
    },
    'header-font': {
      fontSize: '14px',
      fontWeight: 'bold'
    },
    'quantity-and-cost': {
      fontWeight: 600 //semibold
    },
    'profit-percentage': {
      color:
        stats.PROFIT_PERCENTAGE > 0 && trade.type === 'buy'
          ? 'var(--primary-color)'
          : 'var(--primary-color-contrast)',
      fontWeight: 600 //semibold
    },
    'net-profit': {
      color:
        stats.NET_PROFIT > 0 && trade.type === 'buy'
          ? 'var(--primary-color)'
          : 'var(--primary-color-contrast)',
      fontWeight: 600 //semibold
    }
  }
}
