import React, { Component } from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { styled } from '@mui/material/styles';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
    },
});

class BikeListBodyRow extends Component {
    deleteBike(fid) {
        const { firebase } = this.props;
        firebase.ref(`/bikes/${fid}`).set(null);
    }

    render() {
        const { fid, bike, editBike } = this.props;
        return (
            <TableRow key={fid}>
                <TableCell>{fid}</TableCell>
                <TableCell>{bike.model}</TableCell>
                <TableCell>{bike.color}</TableCell>
                <TableCell numeric>{bike.weight}</TableCell>
                <TableCell>{bike.location}</TableCell>
                <TableCell>{bike.available ? 'yes' : 'no'}</TableCell>
                <TableCell>
                    <IconButton sx={{ ml: 1 }} aria-label="Edit" onClick={() => editBike(fid, bike)} >
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton sx={{ ml: 1 }} aria-label="Delete" onClick={() => this.deleteBike(fid)}>
                        <Icon>delete</Icon>
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
}

export default compose(
  // withStyles(styles),   // <-- Remove or comment out this line
)(BikeListBodyRow);