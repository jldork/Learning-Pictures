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
                style={{ position: "fixed" , background: "white", border:"none"}}
            />
    );
  }
})

export default TopNav;