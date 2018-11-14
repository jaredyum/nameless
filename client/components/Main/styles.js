export default theme => ({
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 240px)'
    }
  },
  toolbar: theme.mixins.toolbar
});
