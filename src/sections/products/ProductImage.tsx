import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageSearchTwoToneIcon from '@mui/icons-material/ImageSearchTwoTone';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

interface ProductImageProps {
    onImageChange: (image: File) => void;
    imageFile?: File;
    imageURL?: string;
    profile?: boolean;
}

export default function ProductImage(props: ProductImageProps) {
    const { onImageChange, imageFile, imageURL, profile } = props;
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
        <Box sx={{ pt: '100%', position: 'relative' }}>
            <ProductImgStyle alt="product image" src={imageFile ? imageSource : imageURL ? imageURL : "https://res.cloudinary.com/ddpqji6uq/image/upload/v1661866066/graphql_images/n_tea-logo_rntoqs.png"} />
                {!profile && (
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<ImageSearchTwoToneIcon />}
                        sx={{
                            zIndex: 9,
                            bottom: 16,
                            right: 16,
                            position: 'absolute',
                            textTransform: 'uppercase'
                        }}
                    >
                        Change Image
                        <input 
                            type="file" 
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={event => handleImageChange(event)}
                            hidden 
                        />
                    </Button>
                )}
        </Box>
    )
}