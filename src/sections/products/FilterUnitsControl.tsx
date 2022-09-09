import React, { useEffect, useState } from 'react'
import { useMutation } from '../../custom-hooks'
// material
import {
    Stack,
    IconButton,
    FormControlLabel,
    Typography,
    Button,
    Checkbox,
    Tooltip,
    TextField
  } from '@mui/material';
//icons
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// types
import { UnitType } from '../../pages/PointOfSale'

interface FilterCategControlProps {
    selected?: boolean,
    units?: UnitType, 
    create?: boolean, 
    cancel?: () => void, 
    refresh?: () => void,
    handleClick?: () => void
}

export default function FilterCategControl({ selected, units, create, cancel, refresh, handleClick }: FilterCategControlProps) {
  const { insert, update, remove, data, error } = useMutation()
  const [edit, setEdit] = useState<boolean>(Boolean(create))
  const [deleteMode, setDelete] = useState<boolean>(false)
  const [formData, setFormData] = useState<{ name: string, code: string }>({
    name: units ? units.unitLabel : "",
    code: units ? units.unitCode : ""
  })

  const { name, code } = formData

  useEffect(() => {
    if (data) {
        setEdit(false)
        refresh()
        if (create) cancel()
    }
  }, [data, create])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleCancelEdit = () => {
    if (create && cancel) cancel()
    else setEdit(!edit)

    setFormData({ name: "", code: "" })
  }

  const handleSaveCategory = async () => {
    if (create) insert("/units", JSON.stringify({
            unitCode: code,
            unitLabel: name
        }))

    else update("/units", JSON.stringify({
            unitCode: units.unitCode,
            unitLabel: name
        }))
  }

  const handleDeleteCategory = () => {
    if (units) remove(`/units/${units.unitCode}`)
  }

  if (deleteMode) return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: 40 }}>
        <Typography variant="body1">Are you sure?</Typography>
        <Stack direction="row">
            <Button size="small" color="primary" onClick={() => setDelete(false)}>No</Button>
            <Button size="small" color="error" onClick={handleDeleteCategory}>Yes</Button>
        </Stack>    
    </Stack>
  )

  return (
    <Stack direction="row" justifyContent="space-between">
        {edit ? (
            <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                <TextField 
                    name="name"
                    variant="standard"
                    value={name}
                    placeholder="Label"
                    onChange={handleTextChange}
                    error={error !== null}
                    helperText={error && error.errors[0]}
                />
                <TextField 
                    name="code"
                    variant="standard"
                    value={code}
                    onChange={handleTextChange}
                    disabled={!create}
                    placeholder="Code"
                    error={error !== null || code.length > 3}
                    sx={{ width: "45%" }}
                />
            </Stack>
        ) : (
            <FormControlLabel control={<Checkbox checked={selected} />} label={units && `${units.unitLabel} (${units.unitCode})`} onClick={handleClick} />
        )}
        <Stack direction="row">
            {edit ? (
                <Tooltip title="Cancel">
                    <IconButton onClick={handleCancelEdit}>
                        <CancelOutlinedIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Edit">
                    <IconButton onClick={() => setEdit(true)}>
                        <ModeEditOutlinedIcon />
                    </IconButton>
                </Tooltip>
            )}
            
            {edit ? (
                <Tooltip title="Save Changes">
                    <IconButton onClick={handleSaveCategory}>
                        <SaveOutlinedIcon color="primary" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Delete">
                    <IconButton onClick={() => setDelete(true)}>
                        <DeleteOutlinedIcon color="error" />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    </Stack>
  )
}