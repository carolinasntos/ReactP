import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function CustomButton({ borrarTexto }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        color="error"
        onClick={borrarTexto}
      >
        Borrar
      </Button>
    </Stack>
  )
}
  