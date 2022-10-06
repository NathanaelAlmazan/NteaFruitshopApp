import React from 'react';
import { useNavigate } from "react-router-dom"
// material
import { styled } from '@mui/material/styles';
import { Stack, Link, Container, Typography } from '@mui/material';
// components
import RegisterForm from "../sections/auth/RegisterForm"

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate()
  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
              Register to N'Tea Fruit Shop
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
        </Stack>
        <RegisterForm />
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?&nbsp;
          <Link variant="subtitle2" onClick={() => navigate("/auth/login")}>
            Login
          </Link>
        </Typography>
      </ContentStyle>
    </Container>
  );
}

