import React, { Component } from 'react';
import { connect } from 'react-redux';

// MUI Components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Actions
import { login } from 'actions/Auth';

const styles = theme => ({
  wrapper: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButton: { margin: '15px 0' },
  loginForm: {
    padding: '25px'
  },
  inputLeft: {
    marginRight: theme.spacing.unit
  },
  copy: { margin: '15px 0' }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.login = this.login.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  login(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(email, password);
    }
  }

  updateValue(event, type) {
    const { target } = event;
    const { value } = target;
    if (type === 'email') this.setState({ email: value });
    if (type === 'password') this.setState({ password: value });
  }

  /**
   * Validates the form by making sure that both an email and password have
   * been entered.
   * @return {boolean} Whether or not this form is valid.
   */
  validate() {
    const { email, password } = this.state;
    return email && password;
  }

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;
    const isValid = this.validate();

    return (
      <div className={classes.wrapper}>
        <Grid
          container
          alignItems="center"
          justify="center"
        >
          <Paper elevation={4} className={classes.loginForm}>
            <Typography
              variant="headline"
              component="h3"
              className={classes.copy}
            >Login</Typography>
            <Typography component="p" className={classes.copy}>
            Fill out the form below to login.
            </Typography>

            <form
              className={classes.container}
              onSubmit={this.login}
            >
              <Input
                placeholder="user@email.com"
                className={classes.inputLeft}
                type="email"
                id="email"
                inputProps={{ 'aria-label': 'Email' }}
                onChange={e => this.updateValue(e, 'email')}
                value={email}
              />
              <Input
                placeholder="password"
                type="password"
                id="password"
                inputProps={{ 'aria-label': 'Password' }}
                onChange={e => this.updateValue(e, 'password')}
                value={password}
              />
              <div className={classes.loginButton}>
                <Button
                  variant="raised"
                  color="primary"
                  disabled={!isValid}
                  type="submit"
                  id="login-btn"
                >
              Login
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </div>
    );
  }
}

const stylesHOC = withStyles(styles)(Login);

const mapDispatchToProps = dispatch => ({
  login: (...args) => dispatch(login(...args))
});

export default connect(null, mapDispatchToProps)(stylesHOC);
