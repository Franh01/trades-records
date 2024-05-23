import { RATINGS } from '@renderer/common/constants/ratings'
import { Trade } from '@interfaces/trade'
import { TradeStatsOutput } from './getTradeStats'
import cryptoIcons from '@images/icons'

/**
 * Determines if the profit is positive based on the trade and trade stats.
 *
 * @param {Trade} trade - The trade object containing the necessary information.
 * @param {TradeStatsOutput} stats - The trade stats object containing the profit percentage.
 * @return {boolean} - True if the profit is positive and the trade type is 'buy', otherwise false.
 */
export const isProfitPositive = (trade: Trade, stats: TradeStatsOutput): boolean => {
  return stats.profitPercentage > 0 && trade.type === 'buy'
}

/**
 * Calculates the rating based on the trade and trade stats.
 *
 * @param {Trade} trade - The trade object containing the necessary information.
 * @param {TradeStatsOutput} stats - The trade stats object containing the profit percentage and net profit.
 * @return {string} - The rating based on the profit percentage.
 */
export const getRating = (trade: Trade, stats: TradeStatsOutput): string => {
  const profitPercentage = isProfitPositive(trade, stats)
    ? stats.profitPercentage
    : stats.profitPercentage * -1

  for (let i = RATINGS.length - 1; i >= 0; i--) {
    //Here im trying to format the percentage to a max value of 12 which is rating length considering a SS+ as +300% so 300 / 25 = 12 max value
    const formattedProfit = Math.round(profitPercentage / 25)

    if (formattedProfit >= i) return RATINGS[i]
  }

  return RATINGS[0]
}

/**
 * Returns the icon associated with the given symbol.
 *
 * @param {string} symbol - The symbol for which to retrieve the icon.
 * @return {string} The icon associated with the symbol.
 */
export const getIconBySymbol = (symbol: string): string => {
  return cryptoIcons[symbol]
}
