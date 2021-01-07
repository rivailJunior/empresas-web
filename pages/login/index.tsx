import clsx from "clsx";
import React, { useState, useContext } from "react";
import Image from "next/image";
import {
  Container,
  Grid,
  Theme,
  FormControl,
  TextField,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { VisibilityOff, Visibility } from "@material-ui/icons/";
import indexCss from "./index.module.css";
import StoreContext from "../../store/context";
import { feedbackValues } from "../../store/feedbackValues";
import { Loading } from "../../components/loading";
import * as yup from 'yup';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "100%",
  },
}));

interface LoginState {
  password: string;
  showPassword: boolean;
  email: string;
}

export default function Home(): JSX.Element {
  const classes = useStyles();
  const { doLogin, isLoading, feedback } = useContext(StoreContext);

  let loginSchema = yup.object().shape({
    password: yup.string().required("passwordRequired"),
    email: yup.string().email("emailInvalid").required("emailRequired"),
  });

  const [values, setValues] = useState<LoginState>({
    password: "",
    showPassword: false,
    email: "",
  });

  const [inputErrors, setInputErrors] = useState({
    password: false,
    email: false
  })

  const handleChange = (prop: keyof LoginState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
    setInputErrors({...inputErrors, [prop]: false})
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

 

  const formSubmit = async (evt: any) => {
    evt.preventDefault();
    const loginForm = {
      email: values.email, 
      password: values.password
    };
    loginSchema.validate(loginForm).then(response => {
      doLogin(values.email, values.password);
    }).catch(({errors}) => {
      errors.forEach((error) =>  {
        if(error === "emailInvalid") setInputErrors({...inputErrors, email: true});
        if(error === "emailRequired")setInputErrors({...inputErrors, email: true});
        if(error === "passwordRequired") setInputErrors({...inputErrors, password: true});
      })
     
    });
   
    
  };
  console.log("loading", isLoading);
  return (
    <div>
      <Loading showLoading={isLoading} />
      <Container className={indexCss.container}>
        <Grid
          container
          justify="center"
          alignContent="center"
          direction="column"
        >
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Image width="250" height="60" src="/logo/logo-home@3x.png" />
            </Grid>
          </Grid>

          <Grid container justify="center" alignItems="center">
            <Grid item md={2}>
              <h1 style={{ textAlign: "center" }}>Bem Vindo ao Empresas</h1>
            </Grid>
          </Grid>

          <Grid container justify="center" alignContent="center">
            <Grid item>
              <form className={indexCss.formLogin} onSubmit={formSubmit} noValidate  autoComplete="off">
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <TextField
                    label="E-mail"
                    id="email"
                    onChange={handleChange("email")}
                    required
                    error={inputErrors.email}
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="password"
                    required
                    error={inputErrors.password}
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Typography className={indexCss.feedback} variant="subtitle1">
                  {feedback === feedbackValues.unauthorized &&
                    "Credenciais inválidas"}
                </Typography>
                <Button
                  type="submit"
                  style={{ marginTop: "10%", backgroundColor: "#57bbbc" }}
                  variant="contained"
                  color="primary"
                >
                  ENTRAR
                </Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
