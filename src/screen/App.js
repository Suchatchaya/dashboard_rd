import { useState, useEffect } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import "./styles.css";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const items = [
  {
    position: {
      lat: 20.088768,
      lng: 99.616239,
    },
    id: 1,
  },
  {
    position: {
      lat: 20.070611,
      lng: 99.603667,
    },
    id: 2,
  },
  {
    position: {
      lat: 20.074346,
      lng: 99.604746,
    },
    id: 3,
  },
  {
    position: {
      lat: 20.083319,
      lng: 99.604982,
    },
    id: 4,
  },
  {
    position: {
      lat: 20.088748,
      lng: 99.616242,
    },
    id: 5,
  },
  {
    position: {
      lat: 20.0765,
      lng: 99.609556,
    },
    id: 6,
  },
  {
    position: {
      lat: 20.070293,
      lng: 99.604024,
    },
    id: 7,
  },
];

const App = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(-1);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("loaded");
    axios.get("http://localhost:3000/").then((res) => {
      console.log();
    });
  }, [selectedItemId]);

  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 20.070293, lng: 99.604024 }}
      >
        {items.map((item) => (
          <Marker
            key={item.id}
            position={item.position}
            onClick={() => {
              setSelectedItemId(item.id);
              setIsModalOpen(true);
            }}
          />
        ))}
      </GoogleMap>
    ))
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Luka
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Dashboard", "Rain Level", "Node Sensor", "Drone Station"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["Control", "Notifications", "Update"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Item>
                <Typography>Rain level</Typography>
                <Typography variant="h3"> 20 </Typography>
                <Typography variant="h5"> mm. </Typography>
              </Item>
            </Grid>
            <Grid item xs={6} md={3}>
              <Item>
                <Typography>Temperature</Typography>
                <Typography variant="h3"> 32 </Typography>
                <Typography variant="h5"> °C </Typography>
              </Item>
            </Grid>
            <Grid item xs={6} md={3}>
              <Item>
                <Typography>Wind speed</Typography>
                <Typography variant="h3"> 10 </Typography>
                <Typography variant="h5"> Km/h </Typography>
              </Item>
            </Grid>
            <Grid item xs={6} md={3}>
              <Item>
                <Typography>Safely level</Typography>
                <Typography variant="h3" color={"green"}>
                  ปลอดภัย
                </Typography>
                <Typography variant="h5">กระแสน้ำไม่รุนแรง</Typography>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWMrDqIlxcZ_Er3kQmgptSuHIXoSn5mKo&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `650px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Grid>
          </Grid>
        </Container>
      </Main>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="custom-modal-style" sx={style}>
          <div class="modal-body">
            <img src="S1-S 01.jpg" />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};
export default App;
