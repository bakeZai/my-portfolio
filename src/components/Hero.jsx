import { Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Привет, я Баке!
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Frontend Developer & Game Designer
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Связаться со мной
        </Button>
      </Box>
    </motion.div>
  );
}
