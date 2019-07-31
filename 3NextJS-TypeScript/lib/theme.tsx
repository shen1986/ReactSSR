import { deepPurple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ef5350',
        },
        secondary: {
            main: deepPurple[400],
        },
        type: 'light',
    },
});

export default theme;
