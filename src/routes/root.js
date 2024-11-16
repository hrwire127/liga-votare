import { Outlet, Link } from "react-router-dom";
import "../css/root.css";
import Persoana from "../components/Persoana";
import { Box, Typography } from "@mui/material";

function Root() {
  return (
    <>
      <Typography variant="h3" className="title" gutterBottom>
        Voteaza Persoana ta Preferata
      </Typography>
      <Box className="hero">
        <h2>Apasa pe vote</h2>

        <Persoana />
        
        <Persoana />
        
        <Persoana />
        
        <Persoana />
      </Box>
    </>
  );
}

export default Root;
