import React, { Component } from 'react';

// Components
import SideMenu from 'modules/Navigation/SideMenu';
import TopNav from 'modules/Navigation/TopNav';

class Navigation extends Component {
  constructor(props) {
    super(props);

    // The sidebar is permanently open on Desktop, but must be toggled to
    // open up in mobile mode.
    this.state = {
      sidebarOpen: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  render() {
    const {
      appName = 'App Name Unavailable',
      searchHandler,
      searchPlaceholder,
      topNavMenuConfig
    } = this.props;

    const { sidebarOpen } = this.state;

    return (
      <div>
        <TopNav
          appName={appName}
          menuItems={topNavMenuConfig}
          searchHandler={searchHandler}
          searchPlaceholder={searchPlaceholder}
          toggleHandler={this.toggleDrawer}
        />
        <SideMenu
          sidebarOpen={sidebarOpen}
          toggleHandler={this.toggleDrawer}
          {...this.props}
        />
      </div>
    );
  }
}

export const NavigationJest = Navigation;

export default Navigation;
