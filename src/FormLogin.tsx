import { withFormik } from "formik";
import { FC, useEffect } from "react";
import * as yup from "yup";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { getToken } from "./get-token";

const validationsForm = {
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
};
const useStyles = makeStyles({
  card: {
    maxWidth: 420,
    marginTop: 50,
    border: "2px solid black",
  },
  container: {
    display: "Flex",
    justifyContent: "center",
  },
  actions: {
    justifyContent: "center",
  },
});

const FormFields: FC<any> = ({
  touched,
  errors,
  isSubmitting,
  handleBlur,
  handleSubmit,
  handleChange,
  submitCount,
  setIsAuthorized,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (submitCount >= 1) {
      setIsAuthorized(true);
    }
  }, [submitCount, setIsAuthorized]);

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id="username"
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.username ? errors.username : ""}
              error={touched.username && Boolean(errors.username)}
              margin="dense"
              variant="outlined"
              fullWidth
              name="username"
              type="username"
              label="Username"
            />
            <TextField
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              label="Password"
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              LOGIN
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const FormLogin = withFormik({
  mapPropsToValues: ({ username, password }: any) => {
    return {
      username: username ?? "",
      password: password ?? "",
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: async (values, { setSubmitting }) => {
    await getToken({ username: values.username, password: values.password });
    setSubmitting(true);
  },
})(FormFields);

export default FormLogin;
