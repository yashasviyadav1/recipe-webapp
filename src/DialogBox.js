

//-----------------------------------------------
import {useState} from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system'; // Import styled from @mui/system for MUI v5 or later
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CustomButton = styled(Button)({
  height: '60px',
  width: '150px',
  border: '1px solid white',
  marginBottom: '20px',
  // backgroundColor: 'rgb(103 63 215)',
  backgroundColor: 'RGB(200 100 37)',
  color: 'white',
  fontSize: '14px',
  fontFamily: 'Nunito, sans-serif',
  '&:hover': {
    backgroundColor: 'pink',
  backgroundColor: 'RGB(123 55 13)',

  },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({onSubmit}) {
  
  const [recipeTitle, setRecipeTitle] = useState(''); //
  const [recipeUrlImage, setRecipeUrlImage] = useState(''); //
  const [recipeUploadedImage, setRecipeUploadedImage] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {    
    setOpen(true);
  };

  const handleClose = () => {  
    setOpen(false);
    setRecipeTitle('');  
    setRecipeUrlImage('');   
    setRecipeUploadedImage('');   
  };

  const handleSaveRecipe = () => {  //

    // Validate input data here if needed 
    if(recipeTitle.trim() == ''){
      alert("enter title for recipe card");
      return;
    }

    else if(recipeUrlImage == undefined && recipeUploadedImage == null){
      alert("Upload Image or share image URL");
      return;
    }

    if(recipeTitle && recipeUrlImage) // if title and url found
      onSubmit(recipeTitle, recipeUrlImage);

    else if(recipeTitle && recipeUrlImage)
      onSubmit(recipeTitle, recipeUploadedImage);

    // Close the dialog box
    handleClose();
  };

  return (
    <React.Fragment>
      {/* button */}
      <CustomButton className="dialog-box" onClick={handleClickOpen}>
        + New Recipe
      </CustomButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Recipe!!
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers >
          
          <div className="recipe-input-form-container">
            <input 
              placeholder="Recipe Title" 
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)} // 
              className='input-field recipe-title-field'
            /> 
            {/* <br /> */}

            <input placeholder="image web src" 

              value={recipeUrlImage}
              onChange={(e) => setRecipeUrlImage(e.target.value)}
              className='input-field recipe-image-url-field'

            />
            {/* <br /> */}
{/*             
            <input
              value={recipeUploadedImage}
              type="file"
              placeholder="Upload an image"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setRecipeUrlImage(e.target.value)}
              className='input-field recipe-title-field'

            /> */}

            <br />

          </div>

        </DialogContent>

        <DialogActions>

          {/* <CustomButton autoFocus onClick={handleClose}> */}
          <CustomButton autoFocus onClick={handleSaveRecipe}>
            Save Recipe
          </CustomButton>

        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
