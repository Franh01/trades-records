import { Moment } from 'moment'

export type trade_type = 'buy' | 'sell'

export interface Trade {
  comment: string
  entry_date: Moment | null
  exit_date: Moment | null
  entry_commission: number
  entry_price: number
  exit_commission: number
  exit_price: number
  leverage: number
  quantity: number
  stop_loss: number
  symbol: string | null
  take_profit: number
  type: trade_type | null
  id: string
}
