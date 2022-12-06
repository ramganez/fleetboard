import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

import { FIELDS } from '../config/formConfig'
import axios from '../config/axisConfig';
import UpdateProfile from './UpdateProfile';


const PROFILE_FIELDS = FIELDS.PROFILE;

export default function ProfileComponent(props) {
    const [inputs, setInputs] = useState({});
    const [initialState, setInitialState] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const setStateToInitialState = () => {
        setInputs(initialState);
    };

    useEffect(() => {
        // Make a request for a user with a given ID
        axios.get('/provider/000445266622999/')
            .then(function (response) {
                // handle success
                setInputs(response.data);
                setInitialState(response.data);
                props.showBackdrop(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 2 }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'flex',
                        width: 'flex',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                size="small"
                                variant="text"
                                onClick={handleDialogOpen}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                    <List>
                        {Object.keys(inputs).map((text, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={PROFILE_FIELDS[text].displayName} secondary={inputs[text]} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
            <UpdateProfile
                dialogOpen={dialogOpen}
                setStateToInitialState={setStateToInitialState}
                handleDialogClose={handleDialogClose}
                inputs={inputs}
                showBackdrop={props.showBackdrop}
                showAlert={props.showAlert}
                setInputs={setInputs}
            />
        </>
    );
}