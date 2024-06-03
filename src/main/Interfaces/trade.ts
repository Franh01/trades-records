import { Moment } from 'moment'

export type trade_type = 'buy' | 'sell'

export interface Trade {
  comment: string
  entry_date: Moment | null
  exit_date: Moment | null
  entry_price: number
  entry_commission: number
  exit_price: number
  exit_commission: number
  upchannel: number
  downchannel: number
  leverage: number
  quantity: number
  stop_loss: number
  symbol: string | null
  take_profit: number
  type: trade_type | null
  in_daily_high: number
  in_daily_low: number
  out_daily_high: number
  out_daily_low: number
  id: string
}
