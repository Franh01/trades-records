import { Trade } from 'src/main/Interfaces/trade'
import usePricingFormatter from '@renderer/common/usePricingFormatter'

export interface TradeStatsOutput {
  formattedCost: string
  profitPercentage: number
  netProfit: number
  formattedNetProfit: string
}
/**
 * Calculates the trade statistics based on the given trade.
 *
 * @param {Trade} trade - The trade object containing the necessary information for calculation.
 * @return {TradeStatsOutput} - The trade statistics including the cost, profit percentage, and net profit.
 */

const getCost = (trade: Trade): number => {
  // We calculate the cost of the trade with this formula: (entry_price * quantity) / leverage
  return (trade.quantity * trade.entry_price) / trade.leverage
}

const formatCost = (cost: number): string => {
  return usePricingFormatter(cost)
}

const getProfitPercentage = (trade: Trade): number => {
  //We calculate the profit percentage of the trade with this formula: (exit_price - entry_price) / cost * 100
  return ((trade.exit_price - trade.entry_price) / getCost(trade)) * 100
}
interface NetProfitOutput {
  netProfit: number
  formattedNetProfit: string
}
const getNetProfit = (trade: Trade): NetProfitOutput => {
  //We calculate the net profit of the trade with this formula: (exit_price - entry_price) - (entry_commission + exit_commission)
  const commissions: number = trade.entry_commission + trade.exit_commission
  const netProfit: number = trade.exit_price - trade.entry_price - commissions
  const formattedNetProfit: string = usePricingFormatter(netProfit)
  const formattedAndStyledNetProfit: string =
    formattedNetProfit.slice(0, 4) +
    (netProfit > 0 && trade.type === 'buy' ? '+' : '-') +
    formattedNetProfit.slice(4)
  return {
    netProfit: netProfit,
    formattedNetProfit: formattedAndStyledNetProfit
  }
}

export const getTradeStats = (trade: Trade): TradeStatsOutput => {
  return {
    formattedCost: formatCost(getCost(trade)),
    profitPercentage: getProfitPercentage(trade),
    netProfit: getNetProfit(trade).netProfit,
    formattedNetProfit: getNetProfit(trade).formattedNetProfit
  }
}
