import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ProjectModal = ({ open, onClose, project, language }) => {
  if (!project) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {project.title[language]}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {project.image && (
          <Box
            component="img"
            src={project.image}
            alt={project.title[language]}
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', mb: 2 }}
          />
        )}
        <Typography variant="body1" paragraph>
          {project.description[language]}
        </Typography>
        {/* Добавь сюда дополнительные данные проекта, например технологии, ссылки и т.п. */}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
