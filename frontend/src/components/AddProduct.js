import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { FIELDS } from '../config/formConfig';
const PRODUCT_FIELDS = FIELDS.PRODUCT;


export default function AddProduct(props) {
    const [input, setInput] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddSubmit(input);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setInput({ ...input, [name]: value });
    }

    return (
        <Dialog
            open={props.addDialogOpen}
            handleclose={props.handleAddDialogClose}
            onClose={(_, reason) => reason === 'backdropClick' && props.handleAddDialogClose()}
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
                            {Object.keys(PRODUCT_FIELDS).map((field, index) => (
                                <TextField
                                    onChange={handleInputChange}
                                    key={index}
                                    value={input[field]}
                                    name={PRODUCT_FIELDS[field].name}
                                    label={PRODUCT_FIELDS[field].displayName}
                                    required={PRODUCT_FIELDS[field].required} helperText="" />
                            ))}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.handleAddDialogClose}
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
