import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Stack, Link, Container, Typography } from '@mui/material';
import LoginForm from "../sections/auth/LoginForm"
import { useAppSelector } from "../custom-hooks"

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));


function Login() {
  const navigate = useNavigate()
  const { auth } = useAppSelector((state) => state)

  useEffect(() => {
    if (auth.token) navigate("/app/pos")
  }, [auth])

  console.log(auth.token)

  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to N'Tea Fruit Shop
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Enter your credentials below.</Typography>
        </Stack>
        <LoginForm />
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Link variant="subtitle2" onClick={() => navigate("/auth/register")}>
            Forgot Password?
          </Link>
        </Typography>
      </ContentStyle>
    </Container>
  )
}

export default Login