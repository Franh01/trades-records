import { Dispatch, SetStateAction } from 'react'

import { Moment } from 'moment'
import { Trade } from '@interfaces/trade'
import { defaultValues } from '@renderer/common/constants/tradeInputs'
import { generateID } from '@renderer/common/utils/generateID'

/**
 * Updates the trade values with the value from the number input.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The event object for the number input change event.
 * @param {Dispatch<SetStateAction<Trade>>} setTradeValues - The state setter function for the trade values.
 * @return {void} This function does not return anything.
 */
export const handleChangeNumberInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  setTradeValues: Dispatch<SetStateAction<Trade>>
): void => {
  const { name, value } = e.target

  setTradeValues((prevValues) => ({
    ...prevValues,
    [name]: Number(value)
  }))
}

/**
 * Updates the trade values with the selected date value from the date input.
 *
 * @param {Moment | null} val - The selected date value from the date input.
 * @param {string} name - The name of the property to be updated in the trade values.
 * @param {Dispatch<SetStateAction<Trade>>} setTradeValues - The state setter function for the trade values.
 * @return {void} This function does not return anything.
 */
export const handleChangeDateInput = (
  val: Moment | null,
  name: string,
  setTradeValues: Dispatch<SetStateAction<Trade>>
): void => {
  if (val) {
    setTradeValues((prevValues) => ({
      ...prevValues,
      [name]: val
    }))
  }
}

/**
 * Updates the trade values with the value from the text input.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The event object for the text input change event.
 * @param {Dispatch<SetStateAction<Trade>>} setTradeValues - The state setter function for the trade values.
 * @return {void} This function does not return anything.
 */
export const handleChangeTextInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  setTradeValues: Dispatch<SetStateAction<Trade>>
): void => {
  const { name, value } = e.target

  setTradeValues((prevValues) => ({
    ...prevValues,
    [name]: value
  }))
}

/**
 * Updates the trade values with the selected value from the autocomplete component.
 *
 * @param {string | null} val - The selected value from the autocomplete component.
 * @param {string} name - The name of the property to be updated in the trade values.
 * @param {Dispatch<SetStateAction<Trade>>} setTradeValues - The state setter function for the trade values.
 * @return {void} This function does not return anything.
 */
export const handleAutoCompleteChange = (
  val: string | null,
  name: string,
  setTradeValues: Dispatch<SetStateAction<Trade>>
): void => {
  setTradeValues((prevValues) => ({
    ...prevValues,
    [name]: val
  }))
}

/**
 * Handles the creation of a file by serializing the trade values, sending them to the main process,
 * and resetting the trade values to their default state.
 *
 * @param {Trade} values - The trade values to be serialized and sent.
 * @param {Dispatch<SetStateAction<Trade>>} setTradeValues - The state setter function for the trade values.
 * @return {void} This function does not return anything.
 */
export const handleCreateFile = (
  values: Trade,
  setTradeValues: Dispatch<SetStateAction<Trade>>
): void => {
  // Convert the object to a JSON string because it's the only way I can avoid the "An object could not be cloned." error
  const SERIALIZED_TRADE = JSON.stringify({ ...values, id: generateID() })
  // Convert the JSON string back to an object because we need to send an Object instead of a string but now is a exact copy of values
  const DESERIALIZED_TRADE = JSON.parse(SERIALIZED_TRADE)

  // Send the object to the main process
  window.electron.ipcRenderer.send('new-file', DESERIALIZED_TRADE)

  setTradeValues(defaultValues)
}
