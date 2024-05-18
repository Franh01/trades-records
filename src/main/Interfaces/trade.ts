import { Moment } from 'moment'

export type trade_type = 'buy' | 'sell'

export interface Trade {
  comment: string
  entry_date: Moment
  exit_date: Moment
  entry_commission: number
  entry_price: number
  exit_commission: number
  exit_price: number
  leverage: number
  quantity: number
  stop_loss: number
  symbol: string
  take_profit: number
  type: trade_type
  id: string
}
