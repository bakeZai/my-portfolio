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

  Link, // Импортируем Link из MUI

} from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';

import Brightness7Icon from '@mui/icons-material/Brightness7';

import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom'; // RouterLink для навигации

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

  const [language, setLanguage] = useState('en'); // По умолчанию английский



  const theme = useMemo(() => getTheme(mode), [mode]);



  const toggleTheme = () => {

    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

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



  return (

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <AppBar position="static">

        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>

          <Typography variant="h6" sx={{ position: 'absolute', left: 16 }}>

            {tToolbar.title}

          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>

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

          <Box sx={{ display: 'flex', alignItems: 'center', ml: -10 }}>

            <Select

              value={language}

              onChange={(e) => setLanguage(e.target.value)}

              sx={{ color: 'inherit', '& .MuiSelect-icon': { color: 'white' }, mr: 5 }}

              variant="standard"

            >

              <MenuItem value="en">EN</MenuItem>

              <MenuItem value="ru">RU</MenuItem>

              <MenuItem value="tr">TR</MenuItem>

            </Select>

            <IconButton

              onClick={toggleTheme}

              color="inherit"

              sx={{ position: 'absolute', right: 16 }}

            >

              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}

            </IconButton>

          </Box>

        </Toolbar>

      </AppBar>

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
