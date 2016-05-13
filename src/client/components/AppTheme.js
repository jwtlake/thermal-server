import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700 } from 'material-ui/styles/colors';

const AppTheme = function() {
  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: blue500,
      primary2Color: blue700,
      pickerHeaderColor: blue500
    }
  });
  return muiTheme;
}

export default AppTheme;