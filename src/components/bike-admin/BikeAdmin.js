import React, { Component } from 'react'
import { compose } from 'redux'
import BikeFormDialog from './BikeFormDialog'
import BikeList from './BikeList'
import Button from '@mui/material/Button';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir, userIsAuthenticated, userIsNotAuthenticated } from '../../auth/'
import { firebaseConnect } from 'react-redux-firebase'

class BikeAdmin extends Component {
  state = {
    bikeFormDialogIsOpen: false,
    bikeFormDialogAction: 'create',
    bike: {},
    fid: null
  }

  createBike() {
    this.setState((prevState, props) => ({
      bikeFormDialogIsOpen: true,
      bikeFormDialogAction: 'create',
      bike: {
        model: '',
        color: '',
        weight: '',
        location: '',
        available: false
      },
      fid: null
    }));
  }

  editBike(fid, bike) {
    this.setState((prevState, props) => ({
      bikeFormDialogIsOpen: true,
      bikeFormDialogAction: 'edit',
      bike: {
        ...bike
      },
      fid
    }));
  }

  closeBikeFormDialog() {
    this.setState((prevState, props) => ({
      bikeFormDialogIsOpen: false
    }));
  }

  handleChange = event => {
    this.setState({
      bike: {
        ...this.state.bike,
        [event.target.name]: event.target.value,
      }
    })
  };

  render() {
    console.log('BikeAdmin render');
    return (
      <div>
        <h1>BikeAdmin Test</h1>
        <Button
          onClick={() => this.createBike()}
          color="primary"
          variant="contained"
          sx={{ m: 1, ml: 3, mt: 3 }}
        >
          Add new bike
        </Button>
        <BikeFormDialog
          action={this.state.bikeFormDialogAction}
          isOpen={this.state.bikeFormDialogIsOpen}
          bike={this.state.bike}
          fid={this.state.fid}
          handleChange={this.handleChange.bind(this)}
          close={this.closeBikeFormDialog.bind(this)}
        />
        <BikeList
          editBike={this.editBike.bind(this)}
        />
      </div>
    )
  }
}

export default BikeAdmin;