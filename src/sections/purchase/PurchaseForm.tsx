import React from 'react'
// mui
import dayjs from 'dayjs';
import Drawer from "@mui/material/Drawer"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import InputAdornment from "@mui/material/InputAdornment"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useTheme } from "@mui/material/styles"
// form
import * as Yup from "yup";
import { Formik } from "formik";
import uploadFile from "../../firebase/upload"
import { useMutation } from '../../custom-hooks'
// icons
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// project components
import PurchaseItems from "./PurchasedItems"
import { PurchaseOrder, PurchasedItems } from '../../pages/purchase'

const drawerWidth = 450;

interface PurchaseFormProps {
    open: boolean
    edit?: boolean
    handleClose: () => void
    onRefresh: () => void
}

export default function PurchaseForm({ open, edit, handleClose, onRefresh }: PurchaseFormProps) {
  const theme = useTheme()
  const { insert, error, data } = useMutation<PurchaseOrder>()
  const [receipt, setReceipt] = React.useState<File>()
  const [selected, setSelected] = React.useState<PurchasedItems[]>([])

  const handleSetReceipt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setReceipt(e.target.files[0])
  }

  React.useEffect(() => {
    if (data) {
        handleClose()
        onRefresh()
    }
  }, [data])

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
                {edit ? "Edit Purchase" : "Record Purchase"}
            </Typography>
            <Tooltip title="Cancel">
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </Stack>

        <Formik
            initialValues={{
                supplier: "",
                totalPrice: 0,
                dueDate: dayjs(new Date().toISOString()),
                paid: false,
                arrived: false,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                supplier: Yup.string().max(30).required("Supplier/Store is required."),
                totalPrice: Yup.number().required("Total Price is required.")
            })}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                if (!receipt) {
                    setErrors({ "submit": "Receipt must be provided." })
                    setSubmitting(false)
                }
                else if (selected.length === 0) {
                    setErrors({ "submit": "There are no purchased items." })
                    setSubmitting(false)
                }
                else {
                    uploadFile(receipt, "receipts").then(url => {
                        const body = {
                            supplier: values.supplier,
                            totalPrice: values.totalPrice,
                            paid: values.paid,
                            arrived: values.arrived,
                            receiptURL: url,
                            dueDate: values.paid ? null : values.dueDate,
                            purchasedItems: selected
                        }

                        insert("/purchase", JSON.stringify(body))

                        setSubmitting(false)
                    }).catch(() => setErrors({ "submit": "Failed to upload receipt." }))
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <Stack component="form" onSubmit={handleSubmit} sx={{ mr: 5, ml: 5, mt: 3, mb: 3, height: "100vh", position: "relative" }} noValidate>
                   <Stack 
                        spacing={3}
                        sx={{ 
                            maxHeight: "calc(100% - 80px)", 
                            overflowY: "auto",
                            "::-webkit-scrollbar": {
                                height: "8px",
                                width: "8px"
                            },
                            "::-webkit-scrollbar-track": {
                                background: theme.palette.grey[300] 
                            },
                              
                            /* Handle */
                            "::-webkit-scrollbar-thumb": {
                                background: theme.palette.grey[600]
                            },
                              
                              /* Handle on hover */
                            "::-webkit-scrollbar-thumb:hover": {
                                background: theme.palette.grey[900]
                            }
                        }}
                    >

                        <TextField 
                            name="supplier"
                            label="Supplier Name"
                            value={values.supplier}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.supplier && errors.supplier)}
                            helperText={Boolean(touched.supplier && errors.supplier) && errors.supplier}
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            name="totalPrice"
                            type="number"
                            label="Total Price"
                            value={values.totalPrice}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.totalPrice && errors.totalPrice)}
                            helperText={Boolean(touched.totalPrice && errors.totalPrice) && errors.totalPrice}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₱</InputAdornment>
                            }}
                            fullWidth
                        />

                        <Stack direction="row" justifyContent="space-around">
                            <Tooltip title="Upload Receipt">
                                <IconButton component="label">
                                    <AttachFileIcon color="info" />
                                    <input type="file" onChange={handleSetReceipt} hidden />
                                </IconButton>
                            </Tooltip>

                            <FormControlLabel control={
                                    <Switch 
                                        checked={values.paid} 
                                        onChange={(e) => {
                                            setFieldValue("paid", e.target.checked)
                                        }}
                                    />
                                } 
                                label="Paid" 
                            />
                            
                            <FormControlLabel control={
                                    <Switch 
                                        checked={values.arrived} 
                                        onChange={(e) => {
                                            setFieldValue("arrived", e.target.checked)
                                        }}
                                    />
                                } 
                                label="Arrived" 
                            />
                        </Stack>

                        {!values.paid && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Due Date"
                                    inputFormat="MM/DD/YYYY"
                                    value={values.dueDate}
                                    onChange={(date) => setFieldValue("dueDate", date)}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </LocalizationProvider>
                        )}

                        <Typography variant="h6">Purchased Items</Typography>

                        <PurchaseItems setTotalPrice={(price) => setFieldValue("totalPrice", price)} setPurchasedItems={(items) => setSelected(items)} />

                        {Boolean(errors.submit || error) && (
                            <Typography variant="caption">{errors.submit as string || error.errors[0]}</Typography>
                        )}

                   </Stack>

                    <Button 
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                        fullWidth
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0
                        }}
                    >
                        {edit ? "Edit Purchase" : "Record Purchase"}
                    </Button>
                </Stack>
            )}
        </Formik>
    </Drawer>
  )
}