import { Trade } from '@interfaces/trade'
import usePricingFormatter from '@common/helpers/usePricingFormatter'

export interface TradeStatsOutput {
  formattedCost: string
  profitPercentage: number
  netProfit: number
  formattedNetProfit: string
  styledProfitPercentage: string
  getOperationGrades: getOperationGradesOutput
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

interface getProfitPercentageOutput {
  profitPercentage: number
  styledProfitPercentage: string
}

const getProfitPercentage = (trade: Trade): getProfitPercentageOutput => {
  //We calculate the profit percentage of the trade with this formula: (exit_price - entry_price) / cost * 100 if the trade is a buy, (entry_price - exit_price) / cost * 100 if the trade is a sell

  const profitInOrderByType = (entry_price: number, exit_price: number): number => {
    if (trade.type === 'buy') return (exit_price - entry_price) / getCost(trade)
    return ((exit_price - entry_price) / getCost(trade)) * -1
  }

  const profitPercentage =
    (profitInOrderByType(trade.entry_price, trade.exit_price) * 100) / trade.leverage
  const styledProfitPercentage = ` ${profitPercentage > 0 ? '+' : ''}${profitPercentage.toFixed(2)}%`
  return {
    profitPercentage: profitPercentage,
    styledProfitPercentage: styledProfitPercentage
  }
}
interface NetProfitOutput {
  netProfit: number
  formattedNetProfit: string
}
const getNetProfit = (trade: Trade): NetProfitOutput => {
  //We calculate the net profit of the trade with this formula: (exit_price - entry_price) - (entry_commission + exit_commission)
  const commissions: number = trade.entry_commission + trade.exit_commission
  const profitInOrderByType = (entry_price: number, exit_price: number): number => {
    if (trade.type === 'sell') return (entry_price - exit_price) * trade.quantity
    return (exit_price - entry_price) * trade.quantity
  }

  const netProfit: number = profitInOrderByType(trade.entry_price, trade.exit_price) - commissions

  const isNetProfitPositive = netProfit > 0

  const formattedNetProfit: string = usePricingFormatter(netProfit)

  console.log(formattedNetProfit, trade.symbol, 'formattedNetProfit')
  console.log(isNetProfitPositive, trade.symbol, 'isNetProfitPositive')

  const formattedAndStyledNetProfit: string =
    formattedNetProfit.slice(0, 4) + (isNetProfitPositive ? '+' : '-') + formattedNetProfit.slice(4)
  return {
    netProfit: netProfit,
    formattedNetProfit: formattedAndStyledNetProfit
  }
}

interface getOperationGradesOutput {
  buy: (trade: Trade) => string
  sell: (trade: Trade) => string
  channel: (trade: Trade) => string
}

const getOperationGrades = (trade: Trade): getOperationGradesOutput => {
  const {
    upchannel,
    downchannel,
    in_daily_high,
    in_daily_low,
    out_daily_high,
    out_daily_low,
    entry_price,
    exit_price
  } = trade
  return {
    buy: (): string => {
      // Calculate dailyMax - buyPrice / dailyMax - dailyMin
      const dailyMax = in_daily_high
      const dailyMin = in_daily_low
      const buyPrice = entry_price
      const grade = (dailyMax - buyPrice) / (dailyMax - dailyMin)
      return grade.toFixed(2)
    },
    sell: (): string => {
      // Calculate dailyMax - sellPrice / dailyMax - dailyMin
      const dailyMax = out_daily_high
      const dailyMin = out_daily_low
      const sellPrice = exit_price
      const grade = (dailyMax - sellPrice) / (dailyMax - dailyMin)
      return grade.toFixed(2)
    },
    channel: (): string => {
      // Calculate sellPrice - buyPrice / upchannel - downchannel
      const buyPrice = entry_price
      const sellPrice = exit_price
      const grade = (sellPrice - buyPrice) / (upchannel - downchannel)
      return grade.toFixed(2)
    }
  }
}

export const getTradeStats = (trade: Trade): TradeStatsOutput => {
  return {
    formattedCost: formatCost(getCost(trade)),
    profitPercentage: getProfitPercentage(trade).profitPercentage,
    styledProfitPercentage: getProfitPercentage(trade).styledProfitPercentage,
    netProfit: getNetProfit(trade).netProfit,
    formattedNetProfit: getNetProfit(trade).formattedNetProfit,
    getOperationGrades: getOperationGrades(trade)
  }
}
