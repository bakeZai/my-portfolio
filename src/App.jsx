import { useState, useMemo, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Box,
  ThemeProvider,
  Button,
  Select,
  MenuItem,
  Link,
  Drawer, // Импортируем Drawer
  List, // Импортируем List
  ListItemButton, // Импортируем ListItemButton
  ListItemText, // Импортируем ListItemText
  useMediaQuery, // Импортируем useMediaQuery
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu'; // Импортируем иконку меню
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { getTheme } from './theme';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function App() {
  const [mode, setMode] = useState('light');
  const location = useLocation();
  const [indicatorColor, setIndicatorColor] = useState('#ffffffff');
  const [language, setLanguage] = useState('en');
  // Состояние для открытия/закрытия мобильного меню
  const [mobileOpen, setMobileOpen] = useState(false);

  // Определяем, является ли экран маленьким (меньше 'md' - 900px по умолчанию в MUI)
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const theme = useMemo(() => getTheme(mode), [mode]);

  // Обновляем цвет индикатора при изменении темы
  useEffect(() => {
    setIndicatorColor(theme.palette.text.primary);
  }, [theme]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isHomeActive = location.pathname === '/';
  const isProjectsActive = location.pathname === '/projects';

  // Переводы для тулбара
  const toolbarTranslations = {
    en: { title: 'My Portfolio', home: 'Home', projects: 'Projects' },
    ru: { title: 'Моё Портфолио', home: 'Главная', projects: 'Проекты' },
    tr: { title: 'Portföyüm', home: 'Ana Sayfa', projects: 'Projeler' },
  };

  const tToolbar = toolbarTranslations[language];

  // Переводы для футера
  const footerTranslations = {
    en: {
      name: 'Ibrahim Zanitdinov',
      address: 'Antalya, Turkey',
      phone: '+90 536 484 83 65',
      email: 'bakeboy99@gmail.com',
    },
    ru: {
      name: 'Ибрагим Занитдинов',
      address: 'Анталья, Турция',
      phone: '+90 536 484 83 65',
      email: 'bakeboy99@gmail.com',
    },
    tr: {
      name: 'İbrahim Zanitdinov',
      address: 'Antalya, Türkiye',
      phone: '+90 536 484 83 65',
      email: 'bakeboy99@gmail.com',
    },
  };

  const tFooter = footerTranslations[language];

  // Содержимое боковой панели для мобильных устройств
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {tToolbar.title}
      </Typography>
      <List>
        <ListItemButton component={RouterLink} to="/" selected={isHomeActive}>
          <ListItemText primary={tToolbar.home} />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/projects" selected={isProjectsActive}>
          <ListItemText primary={tToolbar.projects} />
        </ListItemButton>
        {/* Добавляем выбор языка и переключатель темы в Drawer */}
        <ListItemButton>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{ color: 'inherit', '& .MuiSelect-icon': { color: 'inherit' }, width: '100%' }}
            variant="standard"
            disableUnderline
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
            <MenuItem value="tr">TR</MenuItem>
          </Select>
        </ListItemButton>
        <ListItemButton onClick={toggleTheme}>
          <IconButton color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          {/* Кнопка-гамбургер для мобильных устройств */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Заголовок портфолио */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} // Скрываем на xs, показываем на sm и выше
          >
            {tToolbar.title}
          </Typography>

          {/* Навигационные кнопки для больших экранов */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flexGrow: 1 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                textTransform: 'none',
                fontSize: '1.2rem',
                position: 'relative',
                '&::after': {
                  content: isHomeActive ? '""' : 'none',
                  position: 'absolute',
                  bottom: 4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '2px',
                  backgroundColor: indicatorColor,
                  transition: 'all 0.3s ease',
                },
              }}
            >
              {tToolbar.home}
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/projects"
              sx={{
                mr: 2,
                textTransform: 'none',
                fontSize: '1.2rem',
                position: 'relative',
                '&::after': {
                  content: isProjectsActive ? '""' : 'none',
                  position: 'absolute',
                  bottom: 4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '2px',
                  backgroundColor: indicatorColor,
                  transition: 'all 0.3s ease',
                },
              }}
            >
              {tToolbar.projects}
            </Button>
          </Box>

          {/* Выбор языка и переключатель темы для больших экранов */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ color: 'inherit', '& .MuiSelect-icon': { color: 'white' }, mr: 2 }}
              variant="standard"
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="ru">RU</MenuItem>
              <MenuItem value="tr">TR</MenuItem>
            </Select>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          {/* Заголовок для мобильных устройств (когда нет кнопки-гамбургера) */}
          {isMobile && (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center', display: { xs: 'block', sm: 'none' } }}
            >
              {tToolbar.title}
            </Typography>
          )}

          {/* Выбор языка и переключатель темы для мобильных устройств (если не в Drawer) */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                sx={{ color: 'inherit', '& .MuiSelect-icon': { color: 'white' }, mr: 1 }}
                variant="standard"
              >
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="ru">RU</MenuItem>
                <MenuItem value="tr">TR</MenuItem>
              </Select>
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer для мобильной навигации */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Для лучшей производительности на мобильных
          }}
          sx={{
            display: { xs: 'block', md: 'none' }, // Показываем только на маленьких экранах
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Routes>
          <Route path="/" element={<Home language={language} mode={mode} />} />
          <Route path="/projects" element={<Projects language={language} mode={mode} />} />
        </Routes>
      </Box>
      {/* Глобальный футер */}
      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 3,
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : theme.palette.background.paper,
          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? '#444' : 'divider',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {tFooter.name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {tFooter.address} | {tFooter.phone} | {tFooter.email}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Link href="https://github.com/tvojnik" target="_blank" sx={{ mx: 1, color: 'inherit' }}>
            <GitHubIcon />
          </Link>
          <Link href="https://linkedin.com/in/tvojnik" target="_blank" sx={{ mx: 1, color: 'inherit' }}>
            <LinkedInIcon />
          </Link>
          <Link href="https://instagram.com/tvojnik" target="_blank" sx={{ mx: 1, color: 'inherit' }}>
            <InstagramIcon />
          </Link>
        </Box>
        <Typography variant="body2">
          © 2025 {tFooter.name}. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
