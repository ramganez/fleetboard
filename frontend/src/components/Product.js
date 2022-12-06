import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import axios from '../config/axisConfig';
import UpdateProduct from './UpdateProduct';

import { getComparator } from '../utils/commonUtils'
import { productColumns } from '../config/tableConfig'


function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {productColumns.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar() {

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
                Product
            </Typography>

            <Tooltip title="Add Product">
                <IconButton>
                    <AddIcon fontSize='large' />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}

function TablePagination(props) {
    const nextDisabled = !props.nextPage;
    const prevDisabled = !props.prevPage;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >

            <Typography
                sx={{ flex: '1 1 100%' }}
            >
            </Typography>

            <Tooltip title="Prev Page">
                <IconButton
                    disabled={prevDisabled ? 'true' : false}
                    onClick={prevDisabled ? undefined : props.handlePrevClick}>
                    <ArrowBackIosNewIcon color={prevDisabled ? 'disabled' : 'inherit'} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Next Page">
                <IconButton
                    disabled={nextDisabled ? 'true' : false}
                    onClick={nextDisabled ? undefined : props.handleNextClick}>
                    <ArrowForwardIosIcon color={nextDisabled ? 'disabled' : 'inherit'} />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}

export default function ProductComponent(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [rows, setRows] = useState([]);
    
    // pagination
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();

    // update product
    const [rowUpdate, setRowUpdate] = useState([]);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const getProducts = (endPoint) => {
        axios.get(endPoint)
            .then(function (response) {
                // handle success
                setRows(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                props.showBackdrop(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    useEffect(() => {
        // Make a request to get list of products for the merchant
        getProducts('/products/000445266622999/');
    }, [])

    const handleNextClick = () => {
        props.showBackdrop(true);
        let queryParams = nextPage.split("/").pop();
        getProducts('/products/000445266622999/' + queryParams);
    }

    const handlePrevClick = () => {
        props.showBackdrop(true);
        let queryParams = prevPage.split("/").pop();
        getProducts('/products/000445266622999/' + queryParams);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = 0;

    // update product
    const handleUpdateDialogOpen = (row) => {
        setRowUpdate(row);
        setUpdateDialogOpen(true);
    };

    const handleUpdateFormInputChange = (row) => {
        setRowUpdate(row);
    };    

    const handleUpdateFormSubmit = (row) => {
        // TODO update rows in table
    };    

    const handleUpdateDialogClose = () => {
        setUpdateDialogOpen(false);
    };


    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8} lg={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 'flex',
                                width: 'flex',
                            }}
                        >
                            <EnhancedTableToolbar />

                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={'medium'}
                                >
                                    <EnhancedTableHead
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {rows.sort(getComparator(order, orderBy)).slice()
                                            .map((row, index) => {
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow key={row.name}>
                                                        <TableCell
                                                            id={labelId}
                                                            // scope="row"
                                                            padding="none"
                                                        >
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="left">{row.mode_type}</TableCell>
                                                        <TableCell align="left">{row.pricing_type}</TableCell>
                                                        <TableCell align="left">{row.pricing_unit}</TableCell>
                                                        <TableCell align="left">{row.pricing_amount}</TableCell>
                                                        <TableCell align="center">...</TableCell>
                                                        <TableCell align="left">{row.metro_area}</TableCell>
                                                        <TableCell align="left">{row.transaction_name}</TableCell>
                                                        <TableCell align="left">{row.discount_amount}</TableCell>
                                                        <TableCell align="center">...</TableCell>
                                                        <TableCell align="left">
                                                            <ToggleButtonGroup size='small'>
                                                                <ToggleButton onClick={() => handleUpdateDialogOpen(row)} value="left" aria-label="left aligned">
                                                                    <ModeEditIcon fontSize='small' />
                                                                </ToggleButton>
                                                                <ToggleButton  value="center" aria-label="centered">
                                                                    <DeleteIcon fontSize='small' />
                                                                </ToggleButton>
                                                            </ToggleButtonGroup>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (53) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination nextPage={nextPage} prevPage={prevPage} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <UpdateProduct
                updateDialogOpen={updateDialogOpen}
                handleUpdateDialogClose={handleUpdateDialogClose}
                handleUpdateFormSubmit={handleUpdateFormSubmit}
                handleUpdateFormInputChange={handleUpdateFormInputChange}
                rowUpdate={rowUpdate}
                showBackdrop={props.showBackdrop}
                showAlert={props.showAlert}>
            </UpdateProduct>
        </>
    );
}
