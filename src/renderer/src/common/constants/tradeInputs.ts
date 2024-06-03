import { Trade } from '@interfaces/trade'

export const numberInputs = [
  {
    name: 'leverage',
    placeholder: 'Leverage'
  },
  {
    name: 'quantity',
    placeholder: 'Quantity'
  },
  {
    name: 'entry_price',
    placeholder: 'Entry price'
  },
  {
    name: 'entry_commission',
    placeholder: 'Entry commission'
  },
  {
    name: 'exit_price',
    placeholder: 'Exit price'
  },
  {
    name: 'exit_commission',
    placeholder: 'Exit commission'
  },
  {
    name: 'take_profit',
    placeholder: 'Take profit'
  },
  {
    name: 'stop_loss',
    placeholder: 'Stop loss'
  },
  {
    name: 'upchannel',
    placeholder: 'Up channel'
  },
  {
    name: 'downchannel',
    placeholder: 'Down channel'
  },
  {
    name: 'in_daily_high',
    placeholder: 'In daily high'
  },
  {
    name: 'in_daily_low',
    placeholder: 'In daily low'
  },
  {
    name: 'out_daily_high',
    placeholder: 'Out daily high'
  },
  {
    name: 'out_daily_low',
    placeholder: 'Out daily low'
  }
]

export const dateInputs = [
  {
    name: 'entry_date',
    placeholder: 'Entry date'
  },
  {
    name: 'exit_date',
    placeholder: 'Exit date'
  }
]

export const textInputs = {
  comment: {
    name: 'comment',
    placeholder: 'Comment'
  }
}

export const multipleInputs = [
  {
    name: 'symbol',
    placeholder: 'Symbol',
    options: ['BNB', 'BTC', 'ETH', 'LINK', 'SOL', '1000PEPE']
  },
  {
    name: 'type',
    placeholder: 'Type',
    options: ['buy', 'sell']
  }
]

export const defaultValues: Trade = {
  comment: '',
  entry_commission: 0,
  entry_price: 0,
  exit_commission: 0,
  exit_price: 0,
  leverage: 20,
  quantity: 0,
  stop_loss: 0,
  symbol: null,
  take_profit: 0,
  type: null,
  entry_date: null,
  exit_date: null,
  upchannel: 0,
  downchannel: 0,
  in_daily_high: 0,
  in_daily_low: 0,
  out_daily_high: 0,
  out_daily_low: 0,
  id: ''
}
