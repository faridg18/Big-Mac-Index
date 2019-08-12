import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { AppContext } from "./../Context";
import { makeStyles } from "@material-ui/core/styles";
import { AppSubContext } from "./../SubContext";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200
  }
}));

export default function OutlinedInputAdornments() {
  const classes = useStyles();

  const [amount, setAmount] = useState(0);

  const [data, setData] = useContext(AppContext);
  const [dataset, setDataset] = useContext(AppSubContext);

  // Get data on start
  useEffect(() => {
    const fetchData = async () => {
      fetch("http://localhost:8080/country")
        .then(res => res.json())
        .then(res => {
          setData(prevInfo => {
            return {
              country: res.Country,
              amount: prevInfo.amount,
              countryIndex: res
            };
          });
        });
    };

    fetchData();
  }, []);

  // Track changes of input
  const updateAmount = e => {
    setAmount(e.target.value);
  };

  // Set the new amount
  const updateData = e => {
    setData(preInfo => {
      return {
        country: preInfo.country,
        amount: amount,
        countryIndex: preInfo.countryIndex
      };
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2">
        You are in: {data.country}
      </Typography>
      <TextField
        id="outlined-adornment-amount"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        placeholder="0.00"
        helperText="Please enter an amount of money in your local currency "
        type="number"
        onChange={updateAmount}
        onKeyPress={event => {
          if (event.key === "Enter") {
            updateData();
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>
        }}
      />
    </div>
  );
}
