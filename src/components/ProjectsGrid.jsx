import { Grid } from '@mui/material';
import ProjectCard from './ProjectCard';

const ProjectsGrid = ({ projects, onCardClick, language }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        justifyContent: 'flex-start',
        paddingBottom: '10px', // Добавляем отступ снизу для скролл-бара
      }}
    >
      {projects.map((project) => (
        <Grid
          item
          xs={1}
          key={project.id}
          sx={{
            minWidth: 300, // Фиксированная минимальная ширина
            flexShrink: 0, // Предотвращаем сжатие карточек
          }}
        >
          <ProjectCard
            project={project}
            onClick={() => onCardClick(project)}
            language={language}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsGrid;