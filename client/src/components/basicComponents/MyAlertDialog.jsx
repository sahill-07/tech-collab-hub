import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

const MyAlertDialog = ({open, setOpen, handleConfirmedButtonClicked, title, content}) => {

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color='error' variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button color='success' variant='outlined' onClick={handleConfirmedButtonClicked} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default MyAlertDialog
