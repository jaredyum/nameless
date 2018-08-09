import React from 'react';
import { connect } from 'react-redux';

// Redirect
import { Redirect } from 'react-router-dom';

// Utils
import { cleanMapStateToProps } from 'utils/redux';

// Components
import Home from 'components/Common/home';
import Loading from 'components/Common/loading';

// Actions
import { saveRedirect } from 'actions/Global';

// Constants
import {
  PAGE_AUTH_REQS,
  ROUTEPATH_DEFAULT_PAGE,
  ROUTEPATH_LOGIN
} from 'copy/Global/routes';

// Components
import Forbidden from 'components/Common/Forbidden';
import NotFound from 'components/Common/NotFound';

// Utils
import { getRouteFromPathName } from 'utils/routes';

const { AUTHORIZED } = PAGE_AUTH_REQS;

class RouteInterceptor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forbidden: false,
      notFound: false
    };
  }

  componentDidMount() {
    this.aclCheck(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.aclCheck(nextProps);
  }

  authRouteCheck(props, isAuthRoute) {
    const { authed } = props;

    if (isAuthRoute) {
      // @TODO: In the future, we will check for Authorization privileges.
      this.setState({
        forbidden: !authed,
        notFound: false
      });
    } else {
      this.setState({ notFound: true });
    }
  }

  aclCheck(props) {
    const { authed, location = {} } = props;
    const { pathname } = location;

    // No user yet (Firebase still initializing).
    if (authed === null) return;

    // We don't want to redirect the user to the Login page after a successful login,
    // so we default to the root view.
    const redirectUrl = pathname === ROUTEPATH_LOGIN ? ROUTEPATH_DEFAULT_PAGE : pathname;

    const isAuthorizedRoute = getRouteFromPathName(redirectUrl, r => r.authReq === AUTHORIZED);

    // If the user is logged in, determine if they have access to this page,
    // or if it is indeed a 404.
    this.authRouteCheck(props, isAuthorizedRoute);

    if (authed === true) return;

    // Save the intended redirect route, if it exists.
    if (props.saveRedirect) {
      props.saveRedirect(isAuthorizedRoute ? redirectUrl : ROUTEPATH_DEFAULT_PAGE);
    }
  }

  render() {
    const { forbidden, notFound } = this.state;
    const { authed } = this.props;

    if (forbidden) return <Forbidden />;
    if (notFound) return <NotFound />;

    // If authentication is complete, but the user is not logged in,
    // redirect to the login view.
    if (authed === false) return <Redirect to="/login" />;

    // If user is logged in and accesses an unathenticated view,
    // redirect to the Home view.
    if (authed === true) return <Home />;
    return <Loading />;
  }
}

const mapDispatchToProps = dispatch => ({
  saveRedirect: (...args) => dispatch(saveRedirect(...args))
});

export const RouteInterceptorJest = RouteInterceptor;

export default connect(cleanMapStateToProps([
  'authed',
  'location'
]), mapDispatchToProps)(RouteInterceptor);
