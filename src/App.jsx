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
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { getTheme } from './theme';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]); // ✅ theme создаётся до useMediaQuery
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // ✅ используем theme здесь

  const location = useLocation();
  const [indicatorColor, setIndicatorColor] = useState('#ffffffff');
  const [language, setLanguage] = useState('en');
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const toolbarTranslations = {
    en: { title: 'My Portfolio', home: 'Home', projects: 'Projects' },
    ru: { title: 'Моё Портфолио', home: 'Главная', projects: 'Проекты' },
    tr: { title: 'Portföyüm', home: 'Ana Sayfa', projects: 'Projeler' },
  };
  const tToolbar = toolbarTranslations[language];

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
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {isMobile ? (
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                fontSize: '1.1rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {tToolbar.title}
            </Typography>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {tToolbar.title}
            </Typography>
          )}

          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                sx={{
                  color: 'inherit',
                  '& .MuiSelect-icon': { color: 'white' },
                  mx: 1,
                  fontSize: '0.9rem',
                }}
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
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, mr: 2 }}>
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
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
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
          <Link href="https://github.com/bakeZai" target="_blank" sx={{ mx: 1, color: 'inherit' }}>
            <GitHubIcon />
          </Link>
          <Link href="https://www.linkedin.com/in/ibrabake9" target="_blank" sx={{ mx: 1, color: 'inherit' }}>
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
