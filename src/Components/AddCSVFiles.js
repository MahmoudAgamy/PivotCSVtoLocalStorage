import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(5),
  },
  input: {
    display: "none",
  },
}));

export default function AddCSVFiles(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={10}
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <input
        accept="csv/*"
        className={classes.input}
        id="contained-button-Invoice"
        type="file"
        onChange={(e) => props.handleInputInvoice(e)}
      />
      <label htmlFor="contained-button-Invoice">
        <Button
          type="file"
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          onChange={(e) => props.handleInputInvoice(e)}
        >
          Invoice - csv
        </Button>
      </label>

      <input
        accept="csv/*"
        className={classes.input}
        id="contained-button-LineItems"
        type="file"
        onChange={(e) => props.handleInputLineItems(e)}
      />
      <label htmlFor="contained-button-LineItems">
        <Button
          type="file"
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          onChange={(e) => props.handleInputLineItems(e)}
        >
          Line Items - csv
        </Button>
      </label>
    </Grid>
  );
}
