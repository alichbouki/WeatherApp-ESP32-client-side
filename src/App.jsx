import { AppBar, Button, CircularProgress, Grid, Paper, Slider, Stack, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import LightModeIcon from '@mui/icons-material/LightMode';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';
import { useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null)
  const [tempMode, setTempMode] = useState(true);
  const [redVal, setRedVal] = useState(0);
  const [greenVal, setGreenVal] = useState(0);
  const [blueVal, setBlueVal] = useState(0);
  const [ws, createWS] = useState(null)

  useEffect(() => {
    if (ws !== null) {
      const _data = redVal + "," + greenVal + "," + blueVal
      console.log(_data);
      if (ws.readyState === ws.OPEN) {
        ws.send(_data)
      }
    }
  }, [redVal, greenVal, blueVal])

  useEffect(() => {
    const _ws = new WebSocket("ws://192.168.0.210:8080/");
    _ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      setData(json);
      setRedVal(json.colors.red);
      setGreenVal(json.colors.green);
      setBlueVal(json.colors.blue);
    };
    createWS(_ws);
  }, [])


  const handleChangingMod = () => {
    setTempMode(!tempMode)
  }

  const handleRedChanging = (event, val) => {
    setRedVal(val);
  }

  const handleGreenChanging = (event, val) => {
    setGreenVal(val);
  }

  const handleBlueChanging = (event, val) => {
    setBlueVal(val);
  }


  if (data != null) {
    return (
      <Box sx={{ flexGrow: 1 }} justifyContent="center">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" textAlign={"center"}>
              ESP32 Weather Station
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{
          width: 600,
          mx: "auto",
          mt: 5,
          p: 2
        }}>
          <Grid
            container
            sx={{ color: "text.primary", md: 12 }}
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid container item xs={12}>
              <Grid item xs={3}>
                <LightModeIcon />
              </Grid>
              <Grid item xs="auto">
                <Typography variant="h6" textAlign={"center"}>
                  Ambiant Light: {data.light} lux
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid container sx={{ color: "text.primary" }}>
                <Grid item xs={3}>
                  <InvertColorsIcon />
                </Grid>
                <Grid item xs="auto">
                  <Typography variant="h6" textAlign={"center"}>
                    Humidity: {data.humd}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid container sx={{ color: "text.primary" }}>
                <Grid item xs={3}>
                  <ThermostatIcon />
                </Grid>
                <Grid item xs={6} alignContent={"left"}>
                  <Typography variant="h6" textAlign={"left"}>
                    Temperature: {tempMode ? data.temp.C + "C" : data.temp.F + "F"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button variant={"contained"} onClick={handleChangingMod}>
                    switch to {tempMode ? "F" : "C"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid container sx={{ color: "text.primary" }}>
                <Grid item xs={3}>
                  <CloudIcon />
                </Grid>
                <Grid item xs="auto">
                  <Typography variant="h6" textAlign={"center"}>
                    {data.rain ? "It is not raining there" : "It is raining there"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{
          width: 600,
          mx: "auto",
          mt: 5,
          p: 2
        }}>
          <Slider id={"red-level"} min={0} max={255} value={redVal} onChange={handleRedChanging} valueLabelDisplay="auto" />
          <Slider id={"green-level"} min={0} max={255} value={greenVal} onChange={handleGreenChanging} valueLabelDisplay="auto" />
          <Slider id={"blue-level"} min={0} max={255} value={blueVal} onChange={handleBlueChanging} valueLabelDisplay="auto" />
        </Paper>
      </Box >
    )
  } else {
    return (
      <CircularProgress />
    )
  }
}
export default App;