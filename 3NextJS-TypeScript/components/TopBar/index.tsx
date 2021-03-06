import React, { Component } from 'react';
import { withRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import topBarStyles from './style';

interface Props {
    classes: any;
    router: any;
}

// @ts-ignore
@withStyles(topBarStyles)
class TopBar extends Component<Props> {
  constructor (props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin () {
    // 登录跳转
    this.props.router.replace('/login');
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton>
              <HomeIcon className={classes.homeIcon}/>
            </IconButton>
            <Typography variant="h5" className={classes.flex}>
              Cnode
            </Typography>
            <Button onClick={this.handleLogin} className={classes.button}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

(TopBar as any).propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(TopBar);
