import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./Form.module.scss";
import HttpService from "../../services/http-service";
import { ApiRoute, ClientRoute } from "../../common/enums/routes";
import { Schema as FormData } from "../../common/schemas/api/Signup/schema";
import { Link } from "react-router-dom";

export default function Form() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // TODO : Validate input before submitting

    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: FormData = {
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await HttpService.post(ApiRoute.Signup, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justifyContent="center">
        <form noValidate onSubmit={onSubmit}>
          <TextField
            id="username"
            name="username"
            type="text"
            label="Nom d'utilisateur"
            value={username}
            autoComplete="off"
            helperText={usernameError}
            error={usernameError != null}
            onChange={onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label="Adresse courriel"
            value={email}
            autoComplete="off"
            helperText={emailError}
            error={emailError != null}
            onChange={onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            value={password}
            autoComplete="off"
            helperText={passwordError}
            error={passwordError != null}
            onChange={onChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirmation du mot de passe"
            value={confirmPassword}
            autoComplete="off"
            helperText={confirmPasswordError}
            error={confirmPasswordError != null}
            onChange={onChange}
            margin="normal"
            fullWidth
          />
          {generalError !== null && (
            <Grid container direction="row" justifyContent="center">
              <Typography variant="caption" color="error">
                {generalError}
              </Typography>
            </Grid>
          )}
          <Grid container direction="column" alignItems="center">
            <Grid item style={{ marginTop: 16 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
                style={{ position: "relative" }}
              >
                Créer un compte
                {submitting && (
                  <CircularProgress
                    size={24}
                    color="primary"
                    style={{
                      position: "absolute",
                      // color: theme.palette.primary.contrastText,
                    }}
                  />
                )}
              </Button>
            </Grid>
            <Grid item style={{ marginTop: 8 }}>
              <Typography variant="body2" color="textPrimary">
                Vous avez déjà un compte?
                <Link to={ClientRoute.Signin} className={classes.link}>
                  {" "}
                  Connectez-vous
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}
