import React from 'react'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

function Logo() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar alt="logo" src="https://res.cloudinary.com/ddpqji6uq/image/upload/v1667024661/graphql_images/ntea-logo_zucmny.jpg" />
        <Typography variant="h6" color="black" noWrap component="div">
            N'Tea Fruitshop
        </Typography>
    </Stack>
  )
}

export default Logo