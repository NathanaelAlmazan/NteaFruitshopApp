import React from 'react'
// mui
import Drawer from "@mui/material/Drawer"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormHelperText from "@mui/material/FormHelperText"
import MenuItem from "@mui/material/MenuItem"
import InputAdornment from "@mui/material/InputAdornment"
// form
import * as Yup from "yup";
import { Formik } from "formik";
// icons
import CloseIcon from '@mui/icons-material/Close';
// project components
import { useMutation } from '../../custom-hooks'
import { UserAccount } from "../../pages/accounts"

interface AccountFormProps {
    open: boolean,
    edit?: boolean,
    account?: UserAccount,
    handleClose: () => void,
    onReload: () => void
}

const drawerWidth = 400;

const UserPosition = [
    { value: "OWNER", label: "Owner" },
    { value: "ADMIN", label: "Admin" },
    { value: "CASHIER", label: "Cashier" }
]

function AccountForm({ open, edit, account, handleClose, onReload }: AccountFormProps) {
  const { insert, update, error, data } = useMutation<UserAccount>()

  React.useEffect(() => {
    if (data) {
        handleClose()
        onReload()
    }
  }, [data])

  const handleResetAccount = () => {
    update(`/users/reset/${account.userId}`, JSON.stringify({
        userId: account.userId
    }))
  }

  return (
    <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        sx={{
            position: "relative",
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box'
            },
        }}
    >
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 5, ml: 5, mr: 5 }}>
            <Typography variant="h5" component="h3" gutterBottom>
                {edit ? "Edit Employee" : "Add Employee"}
            </Typography>
            <Tooltip title="Cancel">
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </Stack>

        <Formik
            initialValues={{
                firstName: account ? account.firstName : "",
                lastName: account ? account.lastName : "",
                email: account ? account.email : "",
                phone: account ? account.phone : "",
                userPosition: account ? account.userPosition : UserPosition[0].value,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().max(30).required("Employee name is required."),
                lastName: Yup.string().max(30).required("Employee name is required."),
                email: Yup.string().email().required("Employee email is required."),
                phone: Yup.string().min(10).max(10).required("Employee phone number is required."),
                userPosition: Yup.string().max(10).required("Employee position is required."),
            })}
            onSubmit={(values, { setSubmitting }) => {
                if (edit) {
                    update("/users", JSON.stringify({
                        userId: account.userId,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phone: values.phone,
                        userPosition: values.userPosition
                    }))
                } else {
                    insert("/users", JSON.stringify({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phone: values.phone,
                        userPosition: values.userPosition
                    }))
                }
                setSubmitting(false)
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <Stack component="form" spacing={3} onSubmit={handleSubmit} sx={{ m: 5 }} noValidate>
                    <TextField 
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={Boolean(touched.firstName && errors.firstName) && errors.firstName}
                        fullWidth
                        autoFocus
                    />
                    <TextField 
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={Boolean(touched.lastName && errors.lastName) && errors.lastName}
                        fullWidth
                    />
                    <TextField 
                        name="email"
                        label="Email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                        helperText={Boolean(touched.email && errors.email) && errors.email}
                        fullWidth
                    />
                    <TextField 
                        name="phone"
                        label="Phone Number"
                        type="number"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={Boolean(touched.phone && errors.phone) && errors.phone}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+63</InputAdornment>
                        }}
                    />
                    <TextField 
                        name="userPosition"
                        label="Position" 
                        value={values.userPosition} 
                        onChange={handleChange}
                        select
                    >
                        {UserPosition.map(p => (
                            <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                        ))}
                    </TextField>
                    <Button 
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                        fullWidth
                    >
                        {edit ? "Edit Employee" : "Add Employee"}
                    </Button>

                    {edit && (
                         <Button 
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={handleResetAccount}
                            fullWidth
                        >
                            Reset Account
                        </Button>
                    )}

                    {error && (
                        <FormHelperText sx={{ color: "error.main" }}>{error.errors[0]}</FormHelperText>
                    )}
                </Stack>
            )}
        </Formik>
    </Drawer>
  )
}

export default AccountForm