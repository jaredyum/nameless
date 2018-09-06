import { connect } from 'react-redux';

// Actions
import { onAuthStateChange } from 'actions/Auth';

import RouteManager from './routeManager';

const mapStateToProps = (state) => {
  const {
    authReducer,
    notificationsReducer
  } = state;

  const {
    authed,
    hasRights
  } = authReducer;

  const {
    currentNotification,
    notifications
  } = notificationsReducer;

  return ({
    authed,
    hasRights,
    currentNotification,
    notifications
  });
};

const mapDispatchToProps = dispatch => ({
  onAuthStateChange: () => { dispatch(onAuthStateChange()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteManager);
