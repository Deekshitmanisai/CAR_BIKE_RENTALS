import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Divider from '@mui/material/Divider';

export const managerMenuListItems = (
    <div>
        <Link to="bikes" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <Icon>directions_bike</Icon>
                </ListItemIcon>
                <ListItemText primary="Bikes" />
            </ListItem>
        </Link>
    </div>
);

export const userMenuListItems = (
    <div>
        <Link to="/cars" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <DirectionsCarIcon />
                </ListItemIcon>
                <ListItemText primary="Cars" />
            </ListItem>
        </Link>
        <Divider sx={{ my: 1 }} />
        <Link to="/my-bookings" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <Icon>list</Icon>
                </ListItemIcon>
                <ListItemText primary="My Bookings" />
            </ListItem>
        </Link>
    </div>
);