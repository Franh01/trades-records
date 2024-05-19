import { app, ipcMain } from 'electron'

import { Trade } from '../../interfaces/trade'
import fs from 'fs'
import { mainWindow } from '../../index'
import path from 'path'

const USER_DATA_PATH = app.getPath('userData')
const TRADES_DIR = path.resolve(USER_DATA_PATH, 'trades_data')
const TRADES_FILE_PATH = path.resolve(USER_DATA_PATH, 'trades_data/trades.json')

export const tradeServices = {
  create: (): void => {
    ipcMain.on('new-file', (_, data: Trade): void => {
      try {
        if (!fs.existsSync(TRADES_DIR)) {
          fs.mkdirSync(TRADES_DIR)
        }

        // Lee el archivo de trades existente o crea un array vacío si no existe
        const trades_data: Trade[] = fs.existsSync(TRADES_FILE_PATH)
          ? JSON.parse(fs.readFileSync(TRADES_FILE_PATH, 'utf8'))
          : []

        if (!trades_data.some((trade: Trade) => trade.id === data.id)) {
          trades_data.push(data)
          console.log('New trade added:', data)
        } else {
          console.log('Trade with ID already exists:', data.id)
        }

        // Escribe el array de trades en el archivo trades.json
        fs.writeFileSync(TRADES_FILE_PATH, JSON.stringify(trades_data, null, 2), 'utf8')

        console.log('The file has been saved!', TRADES_FILE_PATH)
        mainWindow.webContents.send('path', TRADES_FILE_PATH)
      } catch (error) {
        console.error('Error saving file:', error)
      }
    })
  },
  get: (): void => {
    ipcMain.on('get-trades', (): void => {
      try {
        if (fs.existsSync(TRADES_FILE_PATH)) {
          const trades_data = fs.readFileSync(TRADES_FILE_PATH, 'utf8')
          mainWindow.webContents.send('trades', JSON.parse(trades_data))
        }
      } catch (error) {
        console.error('Error getting trades:', error)
      }
    })
  }
}
