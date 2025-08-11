import { useState, useMemo } from 'react';
import { Container, Typography, Modal, Box, Button, IconButton } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import sand from '../assets/sand.jpg';
import katana from '../assets/katana.png';
import sus from '../assets/sus.png';
import katana1 from '../assets/katana1.png';
import { getTheme } from '../theme';
import ProjectsGrid from '../components/ProjectsGrid';
import Note from '../components/Note';
import TicTacToe from '../components/TicTacToe';
import SnakeGame from '../components/SnakeGame';

// ---  Кастомные компоненты стрелок для карусели
// ---

// Компонент стрелки "Назад"
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      <ArrowBackIos fontSize="large" />
    </IconButton>
  );
};

// Компонент стрелки "Вперёд"
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      <ArrowForwardIos fontSize="large" />
    </IconButton>
  );
};

// ... ваш код импортов

const PhotoCarousel = ({ photos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    // Кастомные стрелки (если вы их добавили, оставьте их)
    // nextArrow: <NextArrow />, 
    // prevArrow: <PrevArrow />,
    swipeToSlide: true, 
    keyboard: true, 
  };

  return (
    <Slider {...settings}>
      {photos.map((photo, index) => (
        <Box 
          key={index} 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <img
            src={photo}
            alt={`Project photo ${index + 1}`}
            style={{ 
              width: '100%', 
              borderRadius: '8px', 
              maxHeight: '300px', // Уменьшаем максимальную высоту
              objectFit: 'contain', 
              margin: 'auto'
            }}
          />
        </Box>
      ))}
    </Slider>
  );
};
// --- Основной компонент проектов
// ---

const Projects = ({ language, mode, searchQuery }) => {
  const theme = useMemo(() => getTheme(mode), [mode]);
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const translations = {
    en: { title: 'My Projects', noProjects: 'No projects yet. Check back later!', close: 'Close' },
    ru: { title: 'Мои Проекты', noProjects: 'Пока нет проектов. Загляните позже!', close: 'Закрыть' },
    tr: { title: 'Projelerim', noProjects: 'Henüz proje yok. Daha sonra tekrar kontrol et!', close: 'Kapat' },
  };

  const t = translations[language];

  const [projects] = useState([
    {
      id: 1,
      title: { en: '2D Platformer Game', ru: 'Игра 2D Платформер', tr: '2D Platformer Oyunu' },
      type: { en: 'Game Development', ru: 'Разработка игр', tr: 'Oyun Geliştirme' },
      description: {
        en: 'A simple 2D game made with Unity, featuring a player and basic obstacles.',
        ru: 'Простая 2D игра, созданная в Unity, с игроком и базовыми препятствиями.',
        tr: 'Unity ile yapılan basit bir 2D oyun, oyuncu ve temel engeller içeriyor.',
      },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80',
      github: 'https://github.com/tvojnik/platformer',
      link: 'https://example.com/platformer',
      isNote: true,
    },
    {
      id: 2,
      title: { en: '3D Model Design', ru: 'Дизайн 3D модели', tr: '3D Model Tasarımı' },
      type: { en: '3D Art', ru: '3D Искусство', tr: '3D Sanat' },
      description: {
        en: 'Detailed 3D model of different scenes and figures.<br />Crafted in Blender with high-poly techniques for realistic rendering.',
        ru: 'Детализированная 3D модель разных сцен и фигурок.<br />Созданная в Blender с использованием высокополигональных техник для реалистичного рендеринга.',
        tr: 'Farklı sahnelerin ve figürlerin detaylı 3B modeli.<br />Blender ile yüksek poligon teknikleri kullanılarak gerçekçi bir render için tasarlandı.',
      },
      text: {
        en: 'This project showcases a sleek spaceship design.<br />It includes intricate details like thrusters and cockpit windows,<br />making it perfect for sci-fi game assets.',
        ru: 'Этот проект демонстрирует элегантный дизайн космического корабля.<br />Включает интригующие детали, такие как двигатели и окна кабины,<br />что делает его идеальным для активов научно-фантастических игр.',
        tr: 'Bu proje, şık bir uzay gemisi tasarımını sergiliyor.<br />İticiler ve kokpit pencereleri gibi ayrıntılı detaylar içerir,<br />bu da onu bilim kurgu oyun varlıkları için ideal hale getiriyor.',
      },
      image: sand, 
      github: 'https://github.com/tvojnik/3dmodel',
      link: 'https://example.com/3dmodel',
      photos: [
        katana, 
        katana1,
        sand,
        sus,
      ],
    },
    {
      id: 3,
      title: { en: 'Real Estate Portfolio', ru: 'Портфолио недвижимости', tr: 'Emlak Portföyü' },
      type: { en: 'Design', ru: 'Дизайн', tr: 'Tasarım' },
      description: {
        en: 'A modern portfolio layout for real estate listings.<br />Designed in Photoshop with vibrant visuals to attract clients.',
        ru: 'Современная компоновка портфолио для объявлений недвижимости.<br />Разработана в Photoshop с яркими визуальными эффектами для привлечения клиентов.',
        tr: 'Emlak listeleri için modern bir portföy düzeni.<br />Photoshop ile canlı görsellerle tasarlanarak müşterileri çekmek için hazırlandı.',
      },
      text: {
        en: 'This portfolio features luxurious villas and apartments.<br />Each property offers stunning views,<br />making it ideal for high-end marketing campaigns.',
        ru: 'Это портфолио включает роскошные виллы и апартаменты.<br />Каждый объект предлагает потрясающие виды,<br />что делает его идеальным для премиальных маркетинговых кампаний.',
        tr: 'Bu portföy, lüks villalar ve daireler sunuyor.<br />Her mülk muhteşem manzaralar sunuyor,<br />bu da onu yüksek profilli pazarlama kampanyaları için ideal kılıyor.',
      },
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80',
      github: null,
      link: 'https://example.com/realestate',
      photos: [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f7c4c60d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      ],
    },
    {
      id: 4,
      title: { en: 'Tic-Tac-Toe Game', ru: 'Игра Крестики-Нолики', tr: 'X-O Oyunu' },
      type: { en: 'Interactive Game', ru: 'Интерактивная игра', tr: 'Etkileşimli Oyun' },
      description: {
        en: 'A classic Tic-Tac-Toe game built with React and Material-UI.',
        ru: 'Классическая игра Крестики-Нолики, созданная с React и Material-UI.',
        tr: 'React ve Material-UI ile yapılmış klasik bir X-O oyunu.',
      },
      image: 'https://images.unsplash.com/photo-1597733336794-12d05021d4ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80',
      github: 'https://github.com/tvojnik/tictactoe',
      link: null,
      isGame: true,
    },
    {
      id: 5,
      title: { en: 'Snake Game', ru: 'Игра Змейка', tr: 'Yılan Oyunu' },
      type: { en: 'Interactive Game', ru: 'Интерактивная игра', tr: 'Etkileşimli Oyun' },
      description: {
        en: 'A classic Snake game built with React and Canvas.',
        ru: 'Классическая игра Змейка, созданная с React и Canvas.',
        tr: 'React ve Canvas ile yapılmış klasik bir Yılan oyunu.',
      },
      image: 'https://images.unsplash.com/photo-1553481187-663b703f6de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80',
      github: 'https://github.com/tvojnik/snake',
      link: null,
      isSnake: true,
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    return projects.filter((project) => {
      const title = project.title[language].toLowerCase();
      const type = project.type[language].toLowerCase();
      const description = project.description[language].toLowerCase();
      const query = searchQuery.toLowerCase();
      return title.includes(query) || type.includes(query) || description.includes(query);
    });
  }, [searchQuery, language, projects]);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <Container sx={{ mt: 4, py: 4, backgroundColor: theme.palette.background.default }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Typography variant="h4" gutterBottom color={theme.palette.text.primary}>
          {t.title}
        </Typography>
        {filteredProjects.length > 0 ? (
          <Box
            sx={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.divider,
                borderRadius: '4px',
              },
            }}
          >
            <ProjectsGrid
              projects={filteredProjects}
              onCardClick={handleOpenModal}
              language={language}
            />
          </Box>
        ) : (
          <Typography variant="body1" color={theme.palette.text.secondary}>
            {t.noProjects}
          </Typography>
        )}
      </motion.div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: 600, md: 800 },
            maxWidth: 1200,
            minWidth: 320,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            border: '1px solid',
            borderColor: theme.palette.divider,
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            color: theme.palette.text.primary,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <motion.div initial="hidden" animate="visible" variants={modalVariants}>
            {selectedProject && (
              selectedProject.isGame ? (
                <TicTacToe
                  theme={theme}
                  onClose={handleCloseModal}
                  language={language}
                />
              ) : selectedProject.isSnake ? (
                <SnakeGame
                  theme={theme}
                  onClose={handleCloseModal}
                  language={language}
                />
              ) : selectedProject.isNote ? (
                <Note
                  project={selectedProject}
                  language={language}
                  theme={theme}
                  onClose={handleCloseModal}
                />
              ) : (
                <>
                  <Typography id="project-modal-title" variant="h6" component="h2">
                    {selectedProject.title[language]}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Type:</strong> {selectedProject.type[language]}
                  </Typography>
                  <Typography
                    sx={{ mt: 1, lineHeight: 1.6, marginBottom: 1 }}
                    component="div"
                  >
                    <strong>Description:</strong>{' '}
                    <span
                      dangerouslySetInnerHTML={{ __html: selectedProject.description[language] }}
                    />
                  </Typography>  
                  {selectedProject.text && (
                    <Typography sx={{ mt: 1, lineHeight: 1.6, marginBottom: 1 }}
                      component="div"
                      >
                      <strong>Text:</strong>{' '}
                      <span dangerouslySetInnerHTML={{ __html: selectedProject.text[language] }} />
                    </Typography>
                  )}
                  {selectedProject.photos && selectedProject.photos.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                          <PhotoCarousel photos={selectedProject.photos} />
                      </Box>
                  )}

                  {selectedProject.link && (
                    <Typography sx={{ mt: 2 }}>
                      <strong>Link:</strong>{' '}
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                        {selectedProject.link}
                      </a>
                    </Typography>
                  )}
                  {selectedProject.github && (
                    <Typography sx={{ mt: 1 }}>
                      <strong>GitHub:</strong>{' '}
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        {selectedProject.github}
                      </a>
                    </Typography>
                  )}
                  <Button
                    onClick={handleCloseModal}
                    sx={{
                      mt: 3,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      },
                      padding: '8px 20px',
                      borderRadius: '8px',
                    }}
                  >
                    {t.close}
                  </Button>
                </>
              )
            )}
          </motion.div>
        </Box>  
      </Modal>
    </Container>
  );
};

export default Projects;