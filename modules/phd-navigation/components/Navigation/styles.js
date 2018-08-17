/**
 * The default width of the drawer (sidebar).
 * @const {number}
 */
const DRAWER_WIDTH = 240;

/**
 * The parent styles for this modules.
 * @param {!Object} theme The MUI theme object.
 * @return {!Object.<string, !Object>} The generated styles.
 */
export default theme => ({
  active: {
    fontWeight: 'bold'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  flex: {
    flex: 1
  },
  link: {
    color: '#333',
    cursor: 'pointer',
    width: '100%',
    textDecoration: 'none',
    padding: '5px 0'
  },
  menuItem: {
    height: 'auto',
    padding: 0,
    color: '#333',
    cursor: 'pointer',
    width: '100%',
    textDecoration: 'none'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  searchBox: {
    borderRadius: '5px',
    padding: '4px 0 2px 10px',
    border: '1px solid #ccc',
    textAlign: 'left'
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    ...theme.mixins.toolbar
  }
});
