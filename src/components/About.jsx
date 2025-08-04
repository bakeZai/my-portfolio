import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import profilePic from "../assets/maxresdefault.jpg"; // если есть фото

export default function About() {
  return (
    <motion.div
      className="about-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        sx={{
          maxWidth: 800,
          margin: "auto",
          mt: 6,
          p: 3,
          borderRadius: "2xl",
          boxShadow: 5,
          // Убрали фиксированный фон, теперь используем тему
        }}
      >
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar
              alt="Bake"
              src={profilePic}
              sx={{ width: 80, height: 80 }}
            />
            <div>
              <Typography variant="h5" fontWeight={600} color="text.primary">
                Обо мне
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                Я увлечённый Frontend-разработчик и гейм-дизайнер. Обожаю
                создавать визуально привлекательные и функциональные интерфейсы. Работаю с React, MUI, а также разрабатываю мини-игры.
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}