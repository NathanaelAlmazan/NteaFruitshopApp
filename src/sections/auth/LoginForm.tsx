import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { baseURL, useAppDispatch } from '../../custom-hooks'
import { login } from "../../redux/slice/auth"
import axios from 'axios';
import { UserAccount } from '../../pages/accounts';

// ----------------------------------------------------------------------

interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export default function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState({
    emailError: null,
    passError: null
  });

  const { emailError, passError } = loginError;

  const onRouterClick = (path: string) => navigate(path)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const body = JSON.stringify({
        username: values.email,
        password: values.password
      });

      const config = {
        headers: {
            'Content-Type': 'application/json', 
        }
      };

      axios.post(`${baseURL}/auth/login`, body, config).then(response => {
        const tokens: AuthTokens = response.data

        axios.get(`${baseURL}/users/email/${values.email}`, {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + tokens.access_token
          }
        }).then(response => {
          const user: UserAccount = response.data
          dispatch(login({
            firstName: user.firstName,
            lastName: user.lastName,
            username: values.email,
            token: tokens.access_token,
            position: user.userPosition
          }))
          navigate("/app/pos")
        })
        .catch(() => {
          setLoginError({
            passError: null,
            emailError: "User not found."
        })
        })
      }).catch(() => {
        setLoginError({
            passError: "Wrong email or password.",
            emailError: null
        })
      })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email) || Boolean(emailError !== null && emailError)}
            helperText={(touched.email && errors.email) || (emailError !== null && emailError)}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password) || Boolean(passError !== null && passError)}
            helperText={(touched.password && errors.password) || (passError !== null && passError)}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link onClick={() => onRouterClick("/reset/password")} variant="subtitle2" >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
