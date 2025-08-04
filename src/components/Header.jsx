import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => (
  <AppBar position="static" color="transparent" elevation={0}>
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">My Portfolio</Typography>
      <div>
        <Button component={Link} to="/" color="primary">Главная</Button>
        <Button component={Link} to="/projects" color="primary">Проекты</Button>
      </div>
    </Toolbar>
  </AppBar>
);

export default Header;
