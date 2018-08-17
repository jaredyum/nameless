import React from 'react';

// MUI Components
import Divider from '@material-ui/core/Divider';
import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';

// Components
import SideMenuItems from './side-menu-items';

const SideMenuGroups = ({ sideMenuConfig, toggleHandler }) => (
  <div>
    {sideMenuConfig.map(({ navTitle, navItems }, currentIndex) => {
      const itemCount = sideMenuConfig.length;
      const showDivider = itemCount > 1 && currentIndex !== itemCount - 1;

      return (
        <div key={navTitle}>
          <MenuList>
            <ListSubheader>{navTitle}</ListSubheader>
            <SideMenuItems
              toggleHandler={toggleHandler}
              collection={navItems}
            />
          </MenuList>
          {showDivider && <Divider />}
        </div>
      );
    })}
  </div>
);


export default SideMenuGroups;
