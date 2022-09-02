import React from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import OfflineLogo from "../assets/images/offline-image.png";

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  maxHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function OfflinePage() {
  const navigte = useNavigate()

  const handleRefresh = () => navigte("/")

  return (
    <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h3" paragraph>
                Sorry, you are offline!
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
                Sorry, we couldn’t load the page you’re looking for. Perhaps your internet connection is unstable or lost.
            </Typography>

            <Box
                component="img"
                src={OfflineLogo}
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
            />

            <Button size="large" variant="contained" onClick={handleRefresh}>
                Refresh App
            </Button>
        </ContentStyle>
    </Container>
  );
}
