import Button from '@mui/material/Button'

interface DefaultButtonProps {
  text: string
  variant: 'contained' | 'outlined' | 'text'
  onClick: () => void
  sx?: React.CSSProperties
}
const DefaultButton = ({ text, variant, onClick, sx }: DefaultButtonProps): JSX.Element => {
  return (
    <Button onClick={onClick} variant={variant} sx={{ ...sx, width: '100%' }}>
      {text}
    </Button>
  )
}

export default DefaultButton
