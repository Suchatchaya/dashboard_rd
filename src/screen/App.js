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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
  display: "flex",
};

const data = [
  {
    name: "10:00",
    rainLevel: 0,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "11:00",
    rainLevel: 2,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "12:00",
    rainLevel: 0,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "13:00",
    rainLevel: 0.5,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "14:00",
    rainLevel: 0.7,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "15:00",
    rainLevel: 0,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "16:00",
    rainLevel: 0,
    pv: 4300,
    amt: 2100,
  },
];

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
  const [handleOpen, setHandleOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(-1);
  const [timestamp, setTimestamp] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainLevel, setRainLevel] = useState("");
  const [rainLevelHistory, setRainLevelHistory] = useState([]);

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

  const getAndSetMessage = async () => {
    const response = await axios.get("http://113.53.253.41:4000/nodesensor01");
    const lastItem = response.data[response.data.length - 1];
    const date = new Date();

    setRainLevel(lastItem.rInt + "");
    setTemperature(lastItem.temperature + "");
    setHumidity(lastItem.humidity + "");
    setTimestamp(date.toLocaleString("th-TH"));

    setRainLevelHistory([
      ...rainLevelHistory,
      {
        rainLevel: lastItem.rInt + "",
        name: rainLevelHistory.length + "eieiza",
      },
    ]);
  };

  // [1,2,3] ==>> [...[1,2,3],4] = [1,2,3,4]

  useEffect(() => {
    getAndSetMessage();

    setInterval(() => {
      getAndSetMessage();
    }, 5000);
  }, []);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
            {timestamp}
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
            <Grid
              item
              xs={6}
              md={3}
              onClick={() => {
                setHandleOpen(true);
              }}
            >
              <Item>
                <Typography>Rain level</Typography>
                <Typography variant="h3"> {rainLevel} </Typography>
                <Typography variant="h5"> mm. </Typography>
              </Item>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              onClick={() => {
                setHandleOpen(true);
              }}
            >
              <Item>
                <Typography>Temperature</Typography>
                <Typography variant="h3"> {temperature} </Typography>
                <Typography variant="h5"> °C </Typography>
              </Item>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              onClick={() => {
                setHandleOpen(true);
              }}
            >
              <Item>
                <Typography>Humidity</Typography>
                <Typography variant="h3"> {humidity} </Typography>
                <Typography variant="h5"> % </Typography>
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
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGiGRGMEp5i_C0Wr6_m0L4Xm_ZagIkyg0&v=3.exp&libraries=geometry,drawing,places"
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
          <ResponsiveContainer width="50%" height="50%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="rainLevel" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="50%" height="50%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="rainLevel" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Modal>

      <Modal
        open={handleOpen}
        onClose={() => setHandleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="custom-modal-style" sx={style}>
          <ResponsiveContainer width="90%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="rainLevel"
                stroke="#203a62"
                activeDot={{ r: 8 }}
              />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Time
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={age}
              onChange={handleChange}
              autoWidth
              label="Age"
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={10}>1 hour</MenuItem>
              <MenuItem value={21}>24 hour</MenuItem>
              <MenuItem value={22}>1 week</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};
export default App;
