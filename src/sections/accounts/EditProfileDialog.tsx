import React from 'react'
// form
import * as Yup from "yup";
import { Formik } from "formik";
// mui
import Dialog from "@mui/material/Dialog"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormHelperText from "@mui/material/FormHelperText"
import InputAdornment from "@mui/material/InputAdornment"
// project components
import uploadFile from "../../firebase/upload"
import { useAppSelector, useMutation, useAppDispatch } from '../../custom-hooks'
import { login } from "../../redux/slice/auth"
import AccountImage from "./AccountImage"
import { UserAccount } from "../../pages/accounts"


interface DialogProps {
    open: boolean
    handleClose: () => void
}

function EditProfileDialog({ open, handleClose }: DialogProps) {
  const { auth } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const { update, error, data } = useMutation<UserAccount>()
  const [profile, setProfile] = React.useState<File | null>(null)

  const { id, firstName, lastName, position, username, phone, image, token } = auth

  const handleImageChange = (image: File) => setProfile(image)

  React.useEffect(() => {
    if (data) {
        dispatch(login({
            id: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.email,
            token: token,
            position: data.userPosition,
            phone: data.phone,
            image: data.image
          }))
        handleClose()
    }
  }, [data])

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
    >
        <Formik
            initialValues={{
                firstName: firstName,
                lastName: lastName,
                email: username,
                phone: phone,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().max(30).required("Employee name is required."),
                lastName: Yup.string().max(30).required("Employee name is required."),
                email: Yup.string().email().required("Employee email is required."),
                phone: Yup.string().min(10).max(10).required("Employee phone number is required.")
            })}
            onSubmit={(values, { setSubmitting }) => {
                if (profile) {
                    uploadFile(profile, "accounts").then(url => {
                        update("/users", JSON.stringify({
                            userId: id,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                            phone: values.phone,
                            userPosition: position,
                            image: url
                        }))
                    })
                } else {
                    update("/users", JSON.stringify({
                        userId: id,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phone: values.phone,
                        userPosition: position,
                        image: image
                    }))
                }

                setSubmitting(false)
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <Stack 
                    direction="row"
                    component="form" 
                    spacing={2} 
                    onSubmit={handleSubmit} 
                    justifyContent="space-between" 
                    alignItems="center" 
                    sx={{ m: 2 }}
                    noValidate
                >
                    <AccountImage 
                            onImageChange={handleImageChange}
                            imageFile={profile}
                            imageURL={image}
                    />
                        
                    <Stack spacing={2} sx={{ width: 300 }}>
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
                        <Button 
                            variant="contained"
                            size="large"
                            type="submit"
                            disabled={isSubmitting}
                            fullWidth
                        >
                            Edit Profile
                        </Button>

                        {error && (
                            <FormHelperText sx={{ color: "error.main" }}>{error.errors[0]}</FormHelperText>
                        )}
                    </Stack>
                </Stack>
            )}
        </Formik>
    </Dialog>
  )
}

export default EditProfileDialog