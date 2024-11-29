// teste commit
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, Box } from '@mui/material';

export const livrosMock = [
  { id: 1, titulo: "Harry Potter e a Pedra Filosofal" },
  { id: 2, titulo: "Harry Potter e a Câmara Secreta" },
  { id: 3, titulo: "Harry Potter e o Prisioneiro de Azkaban" },
  { id: 4, titulo: "Harry Potter e o Cálice de Fogo" },
  { id: 5, titulo: "Harry Potter e a Ordem da Fênix" },
  { id: 6, titulo: "Harry Potter e o Enigma do Príncipe" },
  { id: 7, titulo: "Harry Potter e as Relíquias da Morte" },
  { id: 8, titulo: "O Senhor dos Anéis: A Sociedade do Anel" },
  { id: 9, titulo: "O Senhor dos Anéis: As Duas Torres" },
  { id: 10, titulo: "O Senhor dos Anéis: O Retorno do Rei" }
];

const LivroSelector = () => {
  const [selecionados, setSelecionados] = useState([]);
  const [recomendacao, setRecomendacao] = useState(null);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    if (selecionados.length < 3 && !selecionados.includes(value)) {
      setSelecionados([...selecionados, value]);
    }
  };

  const handleEnviar = () => {
    if (selecionados.length === 3) {
      const recomendacao = livrosMock.find(livro => !selecionados.includes(livro.titulo));
      setRecomendacao(recomendacao ? recomendacao.titulo : "Nenhuma recomendação disponível");
    }
  };

  const handleReset = () => {
    setSelecionados([]);
    setRecomendacao(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#2c3e50",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        padding: 2,
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" gutterBottom>
        BookBuddy
      </Typography>

      <FormControl fullWidth>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <FormControl sx={{ width: "40%" }}>
            <InputLabel id="livro-select-label" sx={{ color: "black" }}>Selecione um livro</InputLabel>
            <Select
              labelId="livro-select-label"
              value=""
              onChange={handleSelectChange}
              label="Selecione um livro"
              disabled={selecionados.length >= 3}
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                color: "black",
              }}
            >
              {livrosMock.map((livro) => (
                <MenuItem key={livro.id} value={livro.titulo}>
                  {livro.titulo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </FormControl>

      <Typography variant="h6" style={{ marginTop: 20, color: "#ffffff" }}>
        Livros Selecionados:
      </Typography>
      {selecionados.map((livro, index) => (
        <Typography key={index} style={{ color: "#ffffff" }}>{livro}</Typography>
      ))}

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        onClick={handleEnviar}
        disabled={selecionados.length < 3}
      >
        Buscar Similar
      </Button>

      {recomendacao && (
        <Typography variant="h6" style={{ marginTop: 20, color: "#ffffff" }}>
          Livro Recomendado: {recomendacao}
        </Typography>
      )}

      <Button
        variant="outlined"
        color="primary"
        onClick={handleReset}
        sx={{
          marginTop: 2,
          marginLeft: 1,
          "&:hover": {
            backgroundColor: "blue",
            color: "white",
            borderColor: "blue",
          }
        }}
      >
        Fazer Outra Busca
      </Button>
    </Box>
  );
};

export default LivroSelector;
