import React, { useEffect, useState } from 'react'
import { useMutation } from '../../custom-hooks'
import uploadFile from "../../firebase/upload"
// material
import {
    Stack,
    IconButton,
    FormControlLabel,
    Typography,
    Button,
    Checkbox,
    Tooltip,
    TextField,
    InputAdornment
  } from '@mui/material';
//icons
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// types
import { Category } from '../../pages/PointOfSale'

interface FilterCategControlProps { 
    selected?: boolean;
    category?: Category, 
    create?: boolean, 
    cancel?: () => void, 
    refresh?: () => void,
    handleClick?: () => void
}

export default function FilterCategControl({ selected, category, create, cancel, refresh, handleClick }: FilterCategControlProps) {
  const { insert, update, remove, data, error } = useMutation()
  const [edit, setEdit] = useState<boolean>(Boolean(create))
  const [deleteMode, setDelete] = useState<boolean>(false)
  const [name, setName] = useState<string>(category ? category.categoryName : "")
  const [icon, setIcon] = useState<File>(null)

  useEffect(() => {
    if (data) {
        setEdit(false)
        refresh()
        if (create) cancel()
    }
  }, [data, create])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setIcon(event.target.files[0])
  }

  const handleCancelEdit = () => {
    if (create && cancel) cancel()
    else setEdit(!edit)

    setName(category ? category.categoryName : "")
    setIcon(null)
  }

  const handleSaveCategory = async () => {
    if (create) {
        let url: string = null
        if (icon) url = await uploadFile(icon)
        
        insert("/category", JSON.stringify({
            categoryName: name,
            categoryIcon: url
        }))

    } else {
        let url: string = category.categoryIcon
        if (icon) url = await uploadFile(icon)
        
        update("/category", JSON.stringify({
            categoryId: category.categoryId,
            categoryName: name,
            categoryIcon: url
        }))
    }
  }

  const handleDeleteCategory = () => {
    if (category) remove(`/category/${category.categoryId}`)
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
            <TextField 
                name="categoryName"
                variant="standard"
                value={name}
                onChange={handleNameChange}
                placeholder="Category Name"
                error={error !== null}
                helperText={error ? error.errors[0] : icon && `Icon: ${icon.name.slice(0, 12)}...`}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <Tooltip title="Upload Icon">
                            <IconButton component="label">
                                <AddPhotoAlternateOutlinedIcon />
                                <input 
                                    type="file" 
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={event => handleImageChange(event)}
                                    hidden 
                                />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }}
            />
        ) : (
            <FormControlLabel control={<Checkbox checked={selected} />} label={category && category.categoryName} onClick={handleClick} />
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