import React, { useEffect, useState } from 'react'
import { useMutation } from '../../custom-hooks'
import uploadFile from "../../firebase/upload"
// material
import {
    Stack,
    IconButton,
    FormControlLabel,
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

interface FilterCategControlProps { category?: Category, create?: boolean, _cancel?: () => void, refresh?: () => void }

export default function FilterCategControl({ category, create, _cancel, refresh }: FilterCategControlProps) {
  const { insert, data, error } = useMutation()
  const [edit, setEdit] = useState<boolean>(Boolean(create))
  const [name, setName] = useState<string>(category ? category.categoryName : "")
  const [icon, setIcon] = useState<File>(null)

  useEffect(() => {
    if (data && refresh) {
        _cancel()
        refresh()
    }
  }, [data])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setIcon(event.target.files[0])
  }
  const handleCancelEdit = () => {
    if (create && _cancel) {
        setName("")
        setIcon(null)
        _cancel()
    } else {
        setEdit(!edit)
        setName(category.categoryName)
        setIcon(null)
    }
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
        // TODO: update category
    }
  }

  return (
    <Stack direction="row" justifyContent="space-between">
        {edit ? (
            <TextField 
                name="categoryName"
                variant="standard"
                value={name}
                onChange={handleNameChange}
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
            <FormControlLabel control={<Checkbox />} label={category.categoryName} />
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
                <Tooltip title="Remove Product">
                    <IconButton>
                        <DeleteOutlinedIcon color="error" />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    </Stack>
  )
}