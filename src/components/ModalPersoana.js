import React from "react";
import {
  Button,
  Modal as MuiModal,
  Typography,
  Box,
  CardHeader,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import Persoane from "../Persoane.json";
import "../css/ModalPersoana.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderColor: "none",
};

function ModalPersoana(props) {
  const { open, setOpen } = props; //aa
  //   const Winner = Persoane[props.winner]
  const Winner = Persoane[1];

  return (
    <MuiModal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <CardHeader title="Avem un castigator" />
        {/* <Typography
          className="modal-title"
          gutterBottom
          variant="h5"
          component="div"
        >
          Avem un castigator
        </Typography> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Votezi pentru {Winner.name}
          </Typography>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            EXIT
          </Button>
        </CardActions>
      </Card>
      {/* <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Castigatorul este {Winner.name} cu {Winner.votes} voturi
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {Winner.description}
        </Typography>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Box> */}
    </MuiModal>
  );
}

export default ModalPersoana;
