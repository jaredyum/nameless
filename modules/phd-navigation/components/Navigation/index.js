import React, { Component } from 'react';

// Components
import SideMenu from './SideMenu';
import TopNav from './TopNav';

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
    this.setState(prevState => ({ sidebarOpen: !prevState.sidebarOpen }));
  }

  render() {
    const {
      appName = 'App Name Unavailable',
      searchHandler,
      searchPlaceholder,
      showSidebar = true,
      showTopNav = true,
      topNavMenuConfig,
      userEmail
    } = this.props;

    const { sidebarOpen } = this.state;

    return (
      <div>
        { showTopNav && (
          <TopNav
            appName={appName}
            menuItems={topNavMenuConfig}
            searchHandler={searchHandler}
            searchPlaceholder={searchPlaceholder}
            toggleHandler={this.toggleDrawer}
            userEmail={userEmail}
          />
        )}
        { showSidebar && (
          <SideMenu
            sidebarOpen={sidebarOpen}
            toggleHandler={this.toggleDrawer}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

export const NavigationJest = Navigation;

export default Navigation;
