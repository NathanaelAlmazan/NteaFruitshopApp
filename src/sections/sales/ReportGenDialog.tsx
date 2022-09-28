import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function GenerateReportDialog({ open, start, end, handleClose, handleSubmit }: 
    { open: boolean, start: string, end: string, handleClose: () => void, handleSubmit: (start: Date, end: Date) => void }
    ) {
        const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(start))
        const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(end))
        const [error, setError] = React.useState<string | null>(null)

        const handleStartDateChange = (newValue: Dayjs | null) => setStartDate(newValue)
        const handleEndDateChange = (newValue: Dayjs | null) => setEndDate(newValue)

        const handleFormSubmit = (a: Date, b: Date) => {
            if (a.getTime() > b.getTime()) setError("Start date cannot be less than end date.")
            else if (new Date(start).getTime() > a.getTime() || new Date(start).getTime() > b.getTime()) {
                setError(`Start date and end date cannot be less than ${new Date(start).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}.`)
            }
            else if (new Date(end).getTime() < a.getTime() || new Date(end).getTime() < b.getTime()) {
                setError(`Start date and end date cannot be more than ${new Date(end).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}.`)
            }
            else handleSubmit(a, b)
        }

    return (
        <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
            <DialogTitle>Generate Sales Report</DialogTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DialogContent>
                    <Stack spacing={2}>
                        <DialogContentText>
                            Please specify the start and end date of the Sales Report
                        </DialogContentText>
                        <DesktopDatePicker
                            label="Report Start Date"
                            inputFormat="MM/DD/YYYY"
                            value={startDate}
                            onChange={handleStartDateChange}
                            renderInput={(params) => 
                                <TextField 
                                    {...params}
                                    error={error !== null}
                                    helperText={error && error}
                                    autoFocus
                                    fullWidth 
                                />
                            }
                        />
                        <DesktopDatePicker
                            label="Report End Date"
                            inputFormat="MM/DD/YYYY"
                            value={endDate}
                            onChange={handleEndDateChange}
                            renderInput={(params) => 
                                <TextField 
                                    {...params}
                                    error={error !== null}
                                    helperText={error && error}
                                    fullWidth 
                                />
                            }
                        />
                    </Stack>
                </DialogContent>
            </LocalizationProvider>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleFormSubmit(startDate.toDate(), endDate.toDate())}>Generate</Button>
            </DialogActions>
        </Dialog>
    );
}
