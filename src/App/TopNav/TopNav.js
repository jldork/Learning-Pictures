import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const TopNav = observer(class TopNav extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item >
              <Grid container flexdirection="row">
                <IconButton edge="start" color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <h3> Learning Pictures</h3>
              </Grid>
            </Grid>
            <Grid item>
              <Button color="inherit" edge="end" >Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar >
    );
  }
})

export default TopNav;