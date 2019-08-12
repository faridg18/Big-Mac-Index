import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "./../Context";
import { AppSubContext } from "./../SubContext";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  }
});

export default function BottomPage() {
  const classes = useStyles();

  const [data, setData] = useContext(AppContext);

  const [dataset, setDataset] = useContext(AppSubContext);

  const [randNum, setRandNum] = useState(Math.random());

  let randomCountry =
    dataset[
      parseInt(randNum * dataset.length + data.countryIndex.index) %
        dataset.length
    ];

  // Get Index that is not the current country
  function getRandNum() {
    while (true) {
      let i = Math.random();
      if (
        dataset[parseInt(i * dataset.length)].Country !=
        data.countryIndex.Country
      ) {
        setRandNum(i);
        break;
      }
    }
  }

  return (
    <Card className={classes.card}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Results compared to random country
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <Typography variant="h5" component="h2">
          Random Country:{" "}
          {dataset.length && data.countryIndex.Country
            ? randomCountry.Country
            : "waiting for server response"}
        </Typography>
        <Typography variant="body2" component="p">
          You could buy{" "}
          {data.countryIndex.Country
            ? (
                (data.amount / data.countryIndex["Local price"]) *
                (data.countryIndex["Dollar price"] /
                  randomCountry["Dollar price"])
              ).toFixed(2)
            : (0.0).toFixed(2)}{" "}
          of Big Macs in {dataset.length ? randomCountry.Country : ""} with{" "}
          {data.amount}!
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          Your {data.amount} is worth about{" "}
          {data.countryIndex.Country
            ? (
                data.amount *
                data.countryIndex["Dollar ex"] *
                randomCountry["Dollar ex"]
              ).toFixed(2)
            : (0.0).toFixed(2)}{" "}
          in {dataset.length ? randomCountry.Country : ""}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={getRandNum}>
          Another Country
        </Button>
      </CardActions>
    </Card>
  );
}
