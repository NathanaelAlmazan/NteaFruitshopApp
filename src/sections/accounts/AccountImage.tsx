import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ImageSearchTwoToneIcon from '@mui/icons-material/ImageSearchTwoTone';
import Button from '@mui/material/Button';

interface AccountImageProps {
    onImageChange: (image: File) => void;
    imageFile?: File;
    imageURL?: string;
}

export default function AccountImage(props: AccountImageProps) {
    const { onImageChange, imageFile, imageURL } = props;
    const [imageSource, setImageSource] = useState(null);

    useEffect(() => {
        if (imageFile !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);

            reader.onloadend = function () {
                setImageSource([reader.result]);
            };

        }
    }, [imageFile])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) onImageChange(event.target.files[0])
    }

    return (
        <Stack spacing={2} justifyContent="center" alignItems="center">
            <Avatar 
                alt="account image" 
                src={imageFile ? imageSource : imageURL ? imageURL : "https://res.cloudinary.com/ddpqji6uq/image/upload/v1661866066/graphql_images/n_tea-logo_rntoqs.png"} 
                sx={{ height: 200, width: 200 }}
            />
            <Button
                variant="contained"
                component="label"
                startIcon={<ImageSearchTwoToneIcon />}
            >
                Change Image
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={event => handleImageChange(event)}
                    hidden 
                />
            </Button>
        </Stack>
    )
}