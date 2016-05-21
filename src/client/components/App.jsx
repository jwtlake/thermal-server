import React from 'react';
import { Link, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppTheme from './AppTheme';
import AppBar from 'material-ui/AppBar';
import AppDrawer from './AppDrawer';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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