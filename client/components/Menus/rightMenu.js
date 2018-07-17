import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI Components
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuItem } from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Actions
import { logout } from 'actions/Auth';

// Utils
import { cleanMapStateToProps } from 'utils/redux';

// TODO:Move to a copy file for menus.
const menuId = 'topNavRightMenu';

class RightMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };

    this.logout = this.logout.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  closeMenu() {
    this.setState({ anchorEl: null });
  }

  logout() {
    this.props.logout();
    this.closeMenu();
  }

  renderAuthMenuItems() {
    const { anchorEl } = this.state;

    return anchorEl ? [
      <MenuItem key="logout" onClick={this.logout}>Logout</MenuItem>
    ] : [];
  }

  renderUnauthMenuItems() {
    const { anchorEl } = this.state;
    const links = [{
      key: 'login',
      path: '/login',
      label: 'Login'
    }, {
      key: 'reset-password',
      path: '/reset-password',
      label: 'Reset Password'
    }];

    return anchorEl ? links.map(({ key, path, label }) => (
      <MenuItem
        key={key}
        component={Link}
        to={path}
        onClick={this.closeMenu}
      >{label}</MenuItem>
    )) : [];
  }

  render() {
    const { authed } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? menuId : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          { authed
            ? this.renderAuthMenuItems()
            : this.renderUnauthMenuItems()
          }
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: (...args) => dispatch(logout(...args))
});

export default connect(cleanMapStateToProps([
  'authed'
]), mapDispatchToProps)(RightMenu);
