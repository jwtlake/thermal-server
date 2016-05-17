import React from 'react';
import { Link, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppTheme from './AppTheme';
import AppBar from 'material-ui/AppBar';
import AppDrawer from './AppDrawer';

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

export default class App extends React.Component {
  
  getPath() {
  	const pathName = this.props.location.pathname;
  	return pathName.charAt(1).toUpperCase() + pathName.slice(2);
  }

  render() {
    return (
    	<MuiThemeProvider muiTheme={AppTheme()}>
			<div>
				<AppBar title={this.getPath()} iconElementLeft={<AppDrawer/>} />
	    		{this.props.children}
	    	</div>
    	</MuiThemeProvider>
    );
  }
};


// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import IconButton from 'material-ui/IconButton/IconButton';

// import {white} from 'material-ui/styles/colors';

// import MenuIcon from 'material-ui/svg-icons/navigation/menu';

// import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
// import TimelineIcon from 'material-ui/svg-icons/action/timeline';
// import SettingsRemoteIcon from 'material-ui/svg-icons/action/settings-remote';