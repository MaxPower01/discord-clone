import Form from "./Form";
import classes from "./index.module.scss";
import { Typography } from "@material-ui/core";

export default function Signup() {
  return (
    <main className={classes.root}>
      <Typography variant="h3" align="center">
        Créer un compte
      </Typography>
      <Form />
    </main>
  );
}
