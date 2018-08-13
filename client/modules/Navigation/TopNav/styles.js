export default theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  flex: {
    flex: 1
  },
  searchBox: {
    borderRadius: '5px',
    padding: '4px 0 2px 10px',
    border: '1px solid #ccc',
    textAlign: 'left'
  }
});
