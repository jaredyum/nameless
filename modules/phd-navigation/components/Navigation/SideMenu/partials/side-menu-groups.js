import React from 'react';

// MUI Components
import Divider from '@material-ui/core/Divider';
import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';

// Components
import SideMenuItem from './side-menu-item';

const SideMenuGroups = ({ sideMenuConfig, toggleHandler }) => (
  <div>
    {sideMenuConfig.map(({ navTitle, navItems }, currentIndex) => {
      const itemCount = sideMenuConfig.length;
      const showDivider = itemCount > 1 && currentIndex !== itemCount - 1;

      return (
        <div key={navTitle}>
          <MenuList>
            <ListSubheader>{navTitle}</ListSubheader>
            { navItems && navItems.length && navItems.map(navItem => (
              <SideMenuItem
                key={navItem.label}
                toggleHandler={toggleHandler}
                {...navItem}
              />
            ))}
          </MenuList>
          {showDivider && <Divider />}
        </div>
      );
    })}
  </div>
);


export default SideMenuGroups;
