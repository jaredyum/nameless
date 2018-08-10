import React from 'react';
import { connect } from 'react-redux';

// React router
import {
  HashRouter,
  Switch
} from 'react-router-dom';

// Actions
import { onAuthStateChange } from 'actions/Auth';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import RouteMiddleware from 'modules/RouteMiddleware';
import Main from 'modules/Main';
import Loading from 'modules/Loading';
import TopNav from 'components/Common/topNav';

// Utils
import { cleanMapStateToProps } from 'utils/redux';

// Routes config
import ROUTES_CONFIG from 'routes';

// Styles
import styles from './styles';

class RouteManager extends React.Component {
  componentDidMount() {
    this.props.onAuthStateChange();
  }

  render() {
    const { authed, classes } = this.props;

    if (authed === null) {
      return (
        <div className={classes.routeManager}>
          <Loading />;
        </div>
      );
    }

    return (
      <HashRouter>
        <div className={classes.routeManager}>
          <CssBaseline />
          <TopNav />
          <Main
            notifications={this.props.notifications}
            currentNotification={this.props.currentNotification}
          >
            <Switch>
              { ROUTES_CONFIG.map(routeProps => (
                <RouteMiddleware
                  key={routeProps.path || '404'}
                  authed={authed}
                  {...routeProps}
                />
              ))}
            </Switch>
          </Main>
        </div>
      </HashRouter>
    );
  }
}

export const RouteManagerJest = RouteManager;

const StyledComponent = withStyles(styles)(RouteManager);

const mapDispatchToProps = dispatch => ({
  onAuthStateChange: () => { dispatch(onAuthStateChange()); }
});

export default connect(cleanMapStateToProps([
  'authed',
  'currentNotification',
  'notifications'
]), mapDispatchToProps)(StyledComponent);
