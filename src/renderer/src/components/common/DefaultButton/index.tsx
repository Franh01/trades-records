import Button from '@mui/material/Button'
import React from 'react'

interface DefaultButtonProps {
  text: string
  variant: 'contained' | 'outlined' | 'text'
  onClick: () => void
  sx?: React.CSSProperties
}
/**
 * Renders a default button component with the given text, variant, and onClick handler.
 *
 * @param {string} text - The text to display on the button.
 * @param {'contained' | 'outlined' | 'text'} variant - The variant of the button.
 * @param {() => void} onClick - The handler function to be called when the button is clicked.
 * @param {React.CSSProperties} [sx] - Optional CSS styles to apply to the button.
 * @return {JSX.Element} The rendered default button component.
 */
const DefaultButton = ({ text, variant, onClick, sx = {} }: DefaultButtonProps): JSX.Element => {
  return (
    <Button onClick={onClick} variant={variant} sx={{ ...sx, width: '100%' }}>
      {text}
    </Button>
  )
}

export default DefaultButton
