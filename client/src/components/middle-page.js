import React, { useContext, useEffect } from "react";
import { AppContext } from "./../Context";
import { AppSubContext } from "./../SubContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  }
});

export default function MiddlePage() {
  const classes = useStyles();

  const [dataset, setDataset] = useContext(AppSubContext);
  const [data, setData] = useContext(AppContext);

  //Get List of countries
  useEffect(() => {
    const fetchCSVData = async () => {
      fetch("http://localhost:8080/csv")
        .then(res => res.json())
        .then(res => setDataset(preInfo => res));
    };

    fetchCSVData();
  }, []);

  return (
    <Card className={classes.card}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Local Results
          </Typography>
        </Toolbar>
      </AppBar>

      <CardContent>
        <Typography variant="h5" component="h2">
          You could buy{" "}
          {data.countryIndex.Country
            ? (
                (data.countryIndex["Local price"] /
                  data.countryIndex["Dollar price"]) *
                data.amount
              ).toFixed(2)
            : (0.0).toFixed(2)}{" "}
          of Big Macs in your country
        </Typography>
        <Typography className={classes.pos} color="textSecondary" />
        <Typography variant="body2" component="p">
          Your Dollar Purchasing Parity (PPP) is{" "}
          {data.countryIndex.Country
            ? data.countryIndex["Dollar PPP"]
            : "waiting on server"}
        </Typography>
      </CardContent>
    </Card>
  );
}
