import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSignUp(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // if user is logged in, redirect to /invoices
  useEffect(() => {
    if (!!localStorage.getItem("loggedInUser")) {
      props.history.push("/invoices");
    }
  }, [props]);

  // helper
  const returnIfAnyStateIsEmpty = (fn) => {
    if (name === "" || password === "") {
      alert("please enter username and password");
      return;
    }
    fn();
  };

  // handlers
  const handleSignIn = () => {
    if (localStorage.getItem(`user_${name}`) === password) {
      localStorage.setItem("loggedInUser", name);
      props.history.push("/invoices");
    } else {
      alert("username or password is wrong");
    }
  };

  const handleSignUp = () => {
    localStorage.setItem(`user_${name}`, password);
    localStorage.setItem("loggedInUser", name);
    props.history.push("/invoices");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Name"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => returnIfAnyStateIsEmpty(handleSignIn)}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => returnIfAnyStateIsEmpty(handleSignUp)}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
