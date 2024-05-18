import { Trade } from 'src/main/Interfaces/trade'
import usePricingFormatter from '@renderer/common/usePricingFormatter'

export interface TradeStatsOutput {
  COST: string
  PROFIT_PERCENTAGE: number
  NET_PROFIT: number
  NET_PROFIT_STYLED: string
}
/**
 * Calculates the trade statistics based on the given trade.
 *
 * @param {Trade} trade - The trade object containing the necessary information for calculation.
 * @return {TradeStatsOutput} - The trade statistics including the cost, profit percentage, and net profit.
 */
export const getTradeStats = (trade: Trade): TradeStatsOutput => {
  // We calculate the cost of the trade with this formula: (entry_price * quantity) / leverage
  const COST: number = (trade.quantity * trade.entry_price) / trade.leverage
  const STYLED_COST: string = usePricingFormatter(COST)

  //We calculate the profit percentage of the trade with this formula: (exit_price - entry_price) / cost * 100

  const PROFIT_PERCENTAGE: number = ((trade.exit_price - trade.entry_price) / COST) * 100

  //We calculate the net profit of the trade with this formula: (exit_price - entry_price) - (entry_commission + exit_commission)
  const COMMISSIONS: number = trade.entry_commission + trade.exit_commission
  const NET_PROFIT: number = trade.exit_price - trade.entry_price - COMMISSIONS
  const NET_PROFIT_PREV: string = usePricingFormatter(NET_PROFIT)
  const NET_PROFIT_STYLED: string =
    NET_PROFIT_PREV.slice(0, 4) +
    (NET_PROFIT > 0 && trade.type === 'buy' ? '+' : '-') +
    NET_PROFIT_PREV.slice(4)

  return {
    COST: STYLED_COST,
    PROFIT_PERCENTAGE: PROFIT_PERCENTAGE,
    NET_PROFIT: NET_PROFIT,
    NET_PROFIT_STYLED: NET_PROFIT_STYLED
  }
}
