import React from 'react';
import { Link, browserHistory } from 'react-router';

// components
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

// icons
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import DvrIcon from 'material-ui/svg-icons/device/dvr';
import MultilineChartIcon from 'material-ui/svg-icons/editor/multiline-chart';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

// color
import {white} from 'material-ui/styles/colors';

export default class AppDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <IconButton onClick={this.handleToggle}> 
          <MenuIcon color={white}/> 
        </IconButton>
        <Drawer 
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem primaryText="Login" linkButton="true" containerElement={<Link to="/login" />} disabled={true} onClick={this.handleClose} leftIcon={<AccountCircleIcon />}/>
          <Divider />
          <MenuItem primaryText="Dashboard" linkButton="true" containerElement={<Link to="/dashboard" />} onClick={this.handleClose} leftIcon={<DvrIcon />}/>
          <MenuItem primaryText="Trends" linkButton="true" containerElement={<Link to="/trends" />} onClick={this.handleClose} leftIcon={<MultilineChartIcon />}/>
          <Divider />
          <MenuItem primaryText="Alerts" linkButton="true" containerElement={<Link to="/alerts" />} disabled={true} onClick={this.handleClose} leftIcon={<NotificationsIcon />}/>
        </Drawer>
      </div>
    );
  }
}