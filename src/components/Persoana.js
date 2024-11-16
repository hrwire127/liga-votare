import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { CardOverflow, Button } from "@mui/joy";
import "../css/Persoana.css";

function Persoana() {
  return (
    <Card variant="soft" className="h-card">
      <Box className="c-container">
        <CardOverflow>
          <img
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </CardOverflow>
        <CardContent className="card-text">
          <Typography level="title-md">Persoana 3</Typography>
          <Typography>Description of the card.</Typography>
        </CardContent>
      </Box>
      <CardContent className="card-text">
        <Typography level="title-md">1220 voturi</Typography>
        <Button variant="solid">Voteaza</Button>
      </CardContent>
    </Card>
  );
}

export default Persoana;
