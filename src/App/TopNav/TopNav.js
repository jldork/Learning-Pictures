import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const TopNav = observer(class TopNav extends Component {
  render() {
    return (
            <AppBar 
                title={"Learning Pictures"}
                iconElementRight={<FlatButton label="Español" />}
            />
    );
  }
})

export default TopNav;