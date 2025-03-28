import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

export default function Contact() {
  const [recipeName, setRecipeName] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Gracias por tu sugerencia! 🌍🍽️ \nReceta: ${recipeName} \nPaís: ${country} \nMensaje: ${message}`);
    setRecipeName('');
    setCountry('');
    setMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ textAlign: 'center', my: 3 }}>
        📩 ¡Contáctanos!
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 3, marginTop: 5 }}>
        ¿Te gustaría que agregáramos más recetas o investigáramos sobre la gastronomía de algún país?
        Escríbenos tu sugerencia y con gusto la consideraremos. 🌎🍽️
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 10 }}>
        <TextField
          id="recipe-name"
          label="Nombre de la Receta"
          variant="outlined"
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
          fullWidth
        />
        <TextField
          id="country"
          label="País de origen"
          variant="outlined"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          fullWidth
        />
        <TextField
          id="message"
          label="¿Por qué te interesa esta receta?"
          variant="outlined"
          multiline
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Enviar Sugerencia
        </Button>
      </Box>
    </Container>
  );
}