import axios from "axios";
import { withFormik } from "formik";
import { FC } from "react";
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
  file: yup.string().required("Required"),
  fileData: yup.mixed().notRequired(),
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
    float: "right",
  },
});

const FormFields: FC<any> = ({
  touched,
  errors,
  isSubmitting,
  handleBlur,
  handleSubmit,
  handleReset,
  setFieldValue,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <label>File upload</label>
            <TextField
              id="file"
              onChange={(event: any) => {
                setFieldValue("file", event.target.files[0].name ?? "");
                setFieldValue("fileData", event.target.files[0]);
              }}
              onBlur={handleBlur}
              helperText={touched.file ? errors.file : ""}
              error={touched.file && Boolean(errors.file)}
              margin="dense"
              variant="outlined"
              fullWidth
              name="file"
              type="file"
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const FormUploadFile = withFormik({
  mapPropsToValues: ({ file, fileData }: any) => {
    return {
      file: file ?? "",
      fileData: fileData ?? "",
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: async (values, { setSubmitting }) => {
    const file = values.fileData;
    delete values.fileData;

    const access_token = await getToken({
      username: "",
      password: "",
    });

    const { data: userData } = await axios.get(
      "https://mobile-1.moveitcloud.com/api/v1/users/self",
      {
        headers: {
          Authorization: `Bearer ${access_token} `,
        },
      }
    );

    const { data: fileResponseData } = await axios.post(
      `https://mobile-1.moveitcloud.com/api/v1/folders/${userData.homeFolderID}/files`,
      {
        body: { file },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token} `,
        },
      }
    );

    console.log({ fileResponseData, file, userData });
    setSubmitting(false);
  },
})(FormFields);

export default FormUploadFile;
