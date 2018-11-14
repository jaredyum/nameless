export const styles = theme => ({
  paperDefault: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('sm')]: {
      minWidth: '400px'
    }
  }
});
