import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { FIELDS } from '../config/formConfig'
import axios from '../config/axisConfig';
import UpdateProfile from './UpdateProfile';


const PROFILE_FIELDS = FIELDS.PROFILE;

function EnhancedToolbar(props) {

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...({
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Profile
            </Typography>

            <Tooltip onClick={props.handleDialogOpen} title="Update Information">
                <IconButton>
                    <AddIcon fontSize='large' />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}

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
        axios.get(`/provider/${props.merchantId}/`)
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
                    <EnhancedToolbar handleDialogOpen={handleDialogOpen} />

                    <List>
                        {Object.keys(inputs).map((text, index) => (
                            <ListItem key={index}>
                                {PROFILE_FIELDS[text] && <ListItemText primary={PROFILE_FIELDS[text].displayName} secondary={inputs[text]} />}
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
                merchantId={props.merchantId}
            />
        </>
    );
}