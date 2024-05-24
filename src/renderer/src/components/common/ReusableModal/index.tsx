import { Dispatch, cloneElement } from 'react'
import { Modal, Paper } from '@mui/material'

import { SX } from './styles'

interface ReusableModalProps {
  children: React.ReactElement
  open: boolean
  onClose: Dispatch<React.SetStateAction<boolean>>
}

const { modalSX, paperSX } = SX

const ReusableModal = ({ children, open, onClose }: ReusableModalProps): JSX.Element => {
  const handleClose = (): void => onClose(false)

  const clonedChildren = cloneElement(children, {
    onClose
  })

  return (
    <Modal sx={modalSX} open={open} onClose={handleClose}>
      <Paper sx={paperSX}>{clonedChildren}</Paper>
    </Modal>
  )
}

export default ReusableModal
