import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoItem({ text, onDelete }) {
  return (
    <Card sx={{ marginY: 1 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{text}</Typography>
        <IconButton onClick={onDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

