import React, { Component } from 'react';

// MUI Components
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

// Components
import NavMenuItem from './top-nav-menu-item';

class TopNavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };

    this.toggleClose = this.toggleClose.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleClose() {
    this.setState({ anchorEl: null });
  }

  toggleOpen(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  render() {
    const { menuItems, userEmail } = this.props;
    const { anchorEl } = this.state;
    const isOpen = Boolean(anchorEl);

    return (
      <div>
        { userEmail }
        <Button
          aria-owns={isOpen ? 'top-nav-menu' : null}
          aria-haspopup="true"
          onClick={this.toggleOpen}
          color="inherit"
        >
          <AccountCircle />
        </Button>
        <Menu
          id="top-nav-menu"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={this.toggleClose}
        >
          {menuItems.map(menuItem => (
            <NavMenuItem
              closeHandler={this.toggleClose}
              key={menuItem.label}
              {...menuItem}
            />
          ))}
        </Menu>
      </div>
    );
  }
}

export default TopNavMenu;
