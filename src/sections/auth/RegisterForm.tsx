import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { baseURL } from '../../custom-hooks';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState({
    emailError: null,
    passError: null
  });

  const { emailError, passError } = loginError;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(9, 'Too Short!').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
        if (values.password !== values.confirmPassword) {
            setLoginError({ ...loginError, passError: "Password does not match." });
        } else {
            const body = JSON.stringify({
                email: values.email,
                password: values.password
            });
    
            const config = {
            headers: {
                'Content-Type': 'application/json', 
            }
            };
            
            axios.post(`${baseURL}/auth/register`, body, config).then(() => navigate("/auth/login"))
            .catch(() => {
                setLoginError({
                    passError: null,
                    emailError: "Employee does not exist"
                })
            })
        }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

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

        <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword) || Boolean(passError !== null && passError)}
            helperText={(touched.confirmPassword && errors.confirmPassword) || (passError !== null && passError)}
          />
        </Stack>

        <br/>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}