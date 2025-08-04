import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';

const SnakeGame = ({ theme, onClose, language }) => {
  // Переводы
  const translations = {
    en: { 
      title: 'Snake Game', 
      score: 'Score', 
      restart: 'Restart', 
      close: 'Close', 
      gameOver: 'Game Over', 
      startPrompt: 'Press arrow keys to start' 
    },
    ru: { 
      title: 'Игра Змейка', 
      score: 'Счёт', 
      restart: 'Начать заново', 
      close: 'Закрыть', 
      gameOver: 'Игра окончена', 
      startPrompt: 'Нажмите стрелки, чтобы начать играть' 
    },
    tr: { 
      title: 'Yılan Oyunu', 
      score: 'Skor', 
      restart: 'Yeniden Başlat', 
      close: 'Kapat', 
      gameOver: 'Oyun Bitti', 
      startPrompt: 'Oyuna başlamak için yön tuşlarına basın' 
    },
  };
  const t = translations[language];

  // Состояние игры
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  const snakeRef = useRef([{ x: 10, y: 10 }]); // Начальная позиция змейки
  const foodRef = useRef({ x: 15, y: 15 }); // Начальная позиция еды
  const directionRef = useRef({ x: 0, y: 0 }); // Направление движения
  const gameLoopRef = useRef(null);

  // Настройки игры
  const tileCount = 20; // Количество клеток в ширину/высоту
  const tileSize = 20; // Размер клетки в пикселях

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current.y === 0) directionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (directionRef.current.y === 0) directionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (directionRef.current.x === 0) directionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (directionRef.current.x === 0) directionRef.current = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Игровой цикл
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const updateGame = () => {
      if (gameOver || (directionRef.current.x === 0 && directionRef.current.y === 0)) {
        // Рисуем начальный экран с инструкцией
        ctx.fillStyle = theme.palette.background.paper;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Рисуем змейку
        ctx.fillStyle = theme.palette.primary.main;
        snakeRef.current.forEach(segment => {
          ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize - 2, tileSize - 2);
        });

        // Рисуем еду
        ctx.fillStyle = theme.palette.error.main;
        ctx.fillRect(foodRef.current.x * tileSize, foodRef.current.y * tileSize, tileSize - 2, tileSize - 2);

        // Рисуем текст инструкции, если змейка не движется
        if (directionRef.current.x === 0 && directionRef.current.y === 0 && !gameOver) {
          ctx.fillStyle = theme.palette.text.primary;
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(t.startPrompt, canvas.width / 2, canvas.height / 2);
        }
        return;
      }

      // Движение змейки
      const snake = snakeRef.current;
      const head = { x: snake[0].x + directionRef.current.x, y: snake[0].y + directionRef.current.y };

      // Проверка столкновений со стенами
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        return;
      }

      // Проверка столкновений с собой (игнорируем, если змейка короче 2 сегментов)
      if (snake.length > 1 && snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }

      // Добавляем новую голову
      snake.unshift(head);

      // Проверка поедания еды
      const food = foodRef.current;
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        // Генерируем новую еду, избегая позиций змейки
        let newFood;
        do {
          newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
          };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        foodRef.current = newFood;
      } else {
        snake.pop(); // Удаляем хвост, если еда не съедена
      }

      // Рендеринг
      ctx.fillStyle = theme.palette.background.paper;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Рисуем змейку
      ctx.fillStyle = theme.palette.primary.main;
      snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize - 2, tileSize - 2);
      });

      // Рисуем еду
      ctx.fillStyle = theme.palette.error.main;
      ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2);
    };

    gameLoopRef.current = setInterval(updateGame, 100);
    return () => clearInterval(gameLoopRef.current);
  }, [gameOver, theme, t.startPrompt]);

  // Перезапуск игры
  const handleRestart = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    foodRef.current = { x: 15, y: 15 };
    directionRef.current = { x: 0, y: 0 };
    setScore(0);
    setGameOver(false);
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t.title}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t.score}: {score}
      </Typography>
      {gameOver && (
        <Typography variant="h5" color="error.main" sx={{ mb: 2 }}>
          {t.gameOver}
        </Typography>
      )}
      <canvas
        ref={canvasRef}
        width={tileCount * tileSize}
        height={tileCount * tileSize}
        style={{ border: `2px solid ${theme.palette.divider}`, borderRadius: '8px' }}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleRestart}
          sx={{ mr: 1 }}
          disabled={!gameOver}
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

export default SnakeGame;