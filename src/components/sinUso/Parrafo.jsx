import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function Parrafo({ titulo, contenido }) {
  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        {titulo}
      </Typography>
      <Typography variant="body1">
        {contenido}
      </Typography>
    </Box>
  )
}