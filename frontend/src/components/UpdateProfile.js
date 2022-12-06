import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from '../config/axisConfig';
import { FIELDS } from '../config/formConfig';
const PROFILE_FIELDS = FIELDS.PROFILE;


export default function UpdateProfile(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    props.showBackdrop(true);
    axios.patch(`/provider/${props.merchantId}/`, props.inputs)
      .then(function (response) {
        props.setInputs(response.data);
        props.handleDialogClose();
        props.showBackdrop(false);
        props.showAlert();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleResetForm = () => {
    // update to initial state closing without save
    props.setStateToInitialState();
    props.handleDialogClose(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    props.setInputs({ ...props.inputs, [name]: value });
  }

  return (
    <Dialog
      open={props.dialogOpen}
      handleclose={handleResetForm}
      onClose={(_, reason) => reason === 'backdropClick' && handleResetForm()}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="responsive-dialog-title">
          Update Profile
        </DialogTitle>
        <DialogContent>
          <Box component="span" sx={{
            '& .MuiTextField-root': { m: 1, width: '28ch' },
          }}>
            <div>
              {Object.keys(props.inputs).map((field, index) => (
                <TextField
                  onChange={handleInputChange}
                  key={index}
                  value={props.inputs[field]}
                  name={PROFILE_FIELDS[field].name}
                  label={PROFILE_FIELDS[field].displayName}
                  disabled={PROFILE_FIELDS[field].disabled}
                  required={PROFILE_FIELDS[field].required} helperText="" />
              ))}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleResetForm}
            style={{ 'color': '#646464', 'borderColor': '#646464', 'backgroundColor': 'transparent' }}
          >
            Cancle
          </Button>
          <Button
            type="submit"
            value="Submit"
            autoFocus={true}
            style={{ 'color': '#646464', 'borderColor': '#646464', 'backgroundColor': 'transparent' }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>

  )
}
