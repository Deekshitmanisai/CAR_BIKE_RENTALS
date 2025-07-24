import React, { Component } from 'react'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import BikeListBodyRow from './BikeListBodyRow'

class LoadingRow extends Component {
    render() {
        return (
            <TableRow><TableCell>Loading...</TableCell></TableRow>
        )
    }
}

class NoResultsFoundRow extends Component {
    render() {
        return (
            <TableRow><TableCell>No results found</TableCell></TableRow>
        )
    }
}

class BikeListBody extends Component {
    render() {
        const { bikes, editBike } = this.props;
        return (
            !isLoaded(bikes) ?
                <LoadingRow />
                : isEmpty(bikes) ?
                    <NoResultsFoundRow />
                    : Object.keys(bikes).map(
                        (key, id) => (<BikeListBodyRow key={key} fid={key} bike={bikes[key]} editBike={editBike} />)
                    )
        )
    }
}

class BikeList extends Component {
    render() {
        const { bikes, editBike } = this.props;
        console.log('BikeList render', this.props.bikes);

        return (
            <Paper sx={{ m: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Available</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <BikeListBody bikes={bikes} editBike={editBike} />
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default compose(
  firebaseConnect(['bikes']),
  connect((state) => ({
    bikes: state.firebase.data.bikes,
  }))
)(BikeList);