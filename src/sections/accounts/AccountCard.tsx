import React from 'react'
// mui
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
// types
import { UserAccount } from "../../pages/accounts"
import { capitalCase, constantCase } from 'change-case'

function AccountCard({ account, onSelect, onDelete }: { account: UserAccount, onSelect: () => void, onDelete: () => void }) {
  const { firstName, lastName, userPosition, image } = account
  return (
    <Card sx={{ width: "100%", p: 3, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
            {image ? (
                <Avatar src={image} alt={firstName} />
            ) : (
                <Avatar>{constantCase(firstName).slice(0, 2)}</Avatar>
            )}
            <Stack>
                <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
                <Typography variant="body1">{capitalCase(userPosition)}</Typography>
            </Stack>
        </Stack>
        <Stack direction="row">
            <Tooltip title="Edit">
                <IconButton onClick={onSelect}>
                    <EditIcon color="info" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={onDelete}>
                    <DeleteIcon color="error" />
                </IconButton>
            </Tooltip>
        </Stack>
    </Card>
  )
}

export default AccountCard