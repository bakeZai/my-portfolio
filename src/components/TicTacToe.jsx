import { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';

const TicTacToe = ({ theme, onClose, language }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Переводы
  const translations = {
    en: { title: 'Tic-Tac-Toe', restart: 'Restart', close: 'Close', winner: 'Winner: ' },
    ru: { title: 'Крестики-Нолики', restart: 'Начать заново', close: 'Закрыть', winner: 'Победитель: ' },
    tr: { title: 'X-O Oyunu', restart: 'Yeniden Başlat', close: 'Kapat', winner: 'Kazanan: ' },
  };
  const t = translations[language];

  // Проверка победителя
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
      [0, 4, 8], [2, 4, 6], // Диагонали
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Обработка клика по клетке
  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const newWinner = calculateWinner(newBoard);
    if (newWinner) setWinner(newWinner);
  };

  // Перезапуск игры
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Рендеринг клетки
  const renderSquare = (index) => (
    <Grid item xs={4}>
      <Button
        variant="outlined"
        sx={{
          width: '100%',
          height: 100,
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
          '&:hover': { backgroundColor: theme.palette.action.hover },
          aspectRatio: '1/1', // Квадратные клетки
        }}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </Button>
    </Grid>
  );

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t.title}
      </Typography>
      {winner && (
        <Typography variant="h5" color="success.main" sx={{ mb: 2 }}>
          {t.winner} {winner}
        </Typography>
      )}
      <Grid container spacing={1} sx={{ maxWidth: 360, mx: 'auto' }}>
        {[0, 1, 2].map((row) => (
          <Grid container item key={row} xs={12} spacing={1}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleRestart}
          sx={{ mr: 1 }}
        >
          {t.restart}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          {t.close}
        </Button>
      </Box>
    </Box>
  );
};

export default TicTacToe;