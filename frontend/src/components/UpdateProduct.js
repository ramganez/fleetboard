import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from '../config/axisConfig';
import { FIELDS } from '../config/formConfig';
const PRODUCT_FIELDS = FIELDS.PRODUCT;


export default function UpdateProduct(props) {

    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        props.showBackdrop(true);
        axios.patch(`/product/${props.rowUpdate.id}/`, props.rowUpdate)
            .then(function (response) {
                // TODO update rows in table
                props.handleUpdateDialogClose();
                props.showBackdrop(false);
                props.showAlert();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleInputChange = (event) => {
        console.log('calling input change');
        const value = event.target.value;
        const name = event.target.name;
        props.handleUpdateFormInputChange({ ...props.rowUpdate, [name]: value });
    }

    return (
        <Dialog
            open={props.updateDialogOpen}
            handleclose={props.handleUpdateDialogClose}
            onClose={(_, reason) => reason === 'backdropClick' && props.handleUpdateDialogClose()}
        >
            <form onSubmit={handleUpdateSubmit}>
                <DialogTitle id="responsive-dialog-title">
                    Update Profile
                </DialogTitle>
                <DialogContent>
                    <Box component="span" sx={{
                        '& .MuiTextField-root': { m: 1, width: '28ch' },
                    }}>
                        <div>
                            {Object.keys(props.rowUpdate).map((field, index) => (
                                PRODUCT_FIELDS[field] && <TextField
                                    onChange={handleInputChange}
                                    key={index}
                                    value={props.rowUpdate[field]}
                                    name={PRODUCT_FIELDS[field].name}
                                    label={PRODUCT_FIELDS[field].displayName}
                                    required={PRODUCT_FIELDS[field].required} helperText="" />
                            ))}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.handleUpdateDialogClose}
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
