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
              Change Password
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Enter your email and new password below.</Typography>
        </Stack>
        <RegisterForm />
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Link variant="subtitle2" onClick={() => navigate("/auth/login")}>
            Go Back to Login
          </Link>
        </Typography>
      </ContentStyle>
    </Container>
  );
}

