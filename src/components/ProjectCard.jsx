import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ProjectCard = ({ project, onClick, language }) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        width: 300, // Фиксированная ширина
        height: 300, // Фиксированная высота
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
      onClick={onClick}
    >
      {project.image && (
        <CardMedia
          component="img"
          height="180" // Фиксированная высота изображения
          image={project.image}
          alt={project.title[language]}
          sx={{ objectFit: 'cover' }} // Изображение заполняет область
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          {project.title[language]}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {project.type[language]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;