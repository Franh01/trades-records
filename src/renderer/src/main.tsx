import './assets/main.css'
import 'moment/locale/es'

import { ThemeProvider, createTheme } from '@mui/material'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import App from './App'
import { LocalizationProvider } from '@mui/x-date-pickers'
import React from 'react'
import ReactDOM from 'react-dom/client'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    text: {
      primary: '#353535'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="es">
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
)
