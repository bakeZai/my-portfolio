import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import TodoItem from "./TodoItem";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          📝 MUI To-Do App
        </Typography>

        <Box display="flex" gap={2} marginBottom={2}>
          <TextField
            fullWidth
            label="Add a new task"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            disabled={!todo.trim()}
          >
            add
          </Button>
        </Box>

        {todos.map((item, index) => (
          <TodoItem
            key={index}
            text={item}
            onDelete={() => deleteTodo(index)}
          />
        ))}
      </Paper>
    </Container>
  );
}
