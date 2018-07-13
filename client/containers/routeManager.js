import React from 'react';
import { connect } from 'react-redux';

// React router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

// Actions
import { onAuthStateChange } from 'actions/Auth';

// MUI Components
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import Main from 'components/Common/main';
import Loading from 'components/Common/loading';
import * as components from 'components';

// Utils
import history from 'history';
import { cleanMapStateToProps } from 'utils/redux';
import { getRoutesArray } from 'utils/routes';

// Copy
import { PAGE_AUTH_REQS } from 'copy/Global/routes';

const {
  AUTHORIZED,
  UNAUTHORIZED
} = PAGE_AUTH_REQS;

const getComponentForRoute = compName => (
  components[compName] || (() => null)
);

const getRouteComponents = FILTER => getRoutesArray(FILTER)
  .map(route => ({
    ...route,
    component: getComponentForRoute(route.component)
  }))
  .map(route => (<Route {...route} key={route.label} />));

class RouteManager extends React.Component {
  componentDidMount() {
    this.props.onAuthStateChange();
  }

  renderAuthorizedRoutes() {
    const routes = getRouteComponents(AUTHORIZED);

    return (
      <ConnectedRouter history={history}>
        <Main
          signOut={this.signOut}
          notifications={this.props.notifications}
          currentNotification={this.props.currentNotification}
        >
          <CssBaseline />
          <Switch>
            {routes}
          </Switch>
        </Main>
      </ConnectedRouter>
    );
  }

  renderUnauthorizedRoutes() {
    const routes = getRouteComponents(UNAUTHORIZED);

    return (
      <ConnectedRouter history={history}>
        <Main
          signOut={this.signOut}
          notifications={this.props.notifications}
          currentNotification={this.props.currentNotification}
        >
          <CssBaseline />
          <Switch>
            {routes}
          </Switch>
        </Main>
      </ConnectedRouter>
    );
  }

  render() {
    const { authed } = this.props;

    if (authed === null) {
      return <Loading />;
    }

    return authed
      ? this.renderAuthorizedRoutes()
      : this.renderUnauthorizedRoutes();
  }
}

export const RouteManagerJest = RouteManager;

const mapDispatchToProps = dispatch => ({
  onAuthStateChange: () => { dispatch(onAuthStateChange()); }
});

export default connect(cleanMapStateToProps([
  'authed',
  'currentNotification',
  'notifications'
]), mapDispatchToProps)(RouteManager);
