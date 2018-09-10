import React from 'react';

// React router
import {
  HashRouter,
  Switch
} from 'react-router-dom';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import RouteMiddleware from 'components/RouteMiddleware';
import Main from 'components/Main';
import Loading from 'components/Loading';
import ConnectedNav from 'components/ConnectedNav';

// Routes config
import ROUTES_CONFIG from 'routes';

// Styles
import styles from './styles';

class RouteManager extends React.Component {
  componentDidMount() {
    const { onAuthStateChange } = this.props;

    // Register the firebase auth listener.
    // NOTE: We only ever do this ONCE - Firebase will handle updates.
    onAuthStateChange();
  }

  render() {
    const {
      authed,
      hasRights,
      classes,
      notifications,
      currentNotification
    } = this.props;

    const isLoading = authed === null || hasRights === null;

    return (
      <HashRouter>
        <div className={classes.routeManager}>
          <CssBaseline />
          <ConnectedNav />
          <Main
            notifications={notifications}
            currentNotification={currentNotification}
          >
            {
              isLoading
                ? <Loading />
                : (
                  <Switch>
                    { ROUTES_CONFIG.map(routeProps => (
                      <RouteMiddleware
                        key={routeProps.path || '404'}
                        authed={authed}
                        hasRights={hasRights}
                        {...routeProps}
                      />
                    ))}
                  </Switch>
                )
            }
          </Main>
        </div>
      </HashRouter>
    );
  }
}

export const RouteManagerJest = RouteManager;

export default withStyles(styles)(RouteManager);
