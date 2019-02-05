import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Checkbox, Button, Typography, FormControl, InputLabel, Input, Avatar, FormControlLabel, Paper, SnackbarContent } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: 15
  },
  error: {
    marginBottom: 10,
    backgroundColor: theme.palette.error.dark
  },
  demo: {
    fontSize: 16,
    marginTop: 15
  }
})

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: ''
      },
      errors: []
    }
  }

  email(e) {
    this.setState({ user: Object.assign(this.state.user, { email: e.target.value }) })
  }

  password(e) {
    this.setState({ user: Object.assign(this.state.user, { password: e.target.value }) })
  }

  signin() {
    this.setState({ errors: [] }, () => {
      if (this.state.user.email !== 'demo@demo.com' || this.state.user.password !== 'password') {
        this.setState({ errors: ['Login failed.'] })
        return
      }
      this.props.dispatch({
        type: 'SET_USER',
        payload: { email: this.state.user.email }
      })
    })
  }

  render() {
    if (this.props.user.email) return <Redirect to="/profile" />
    const { classes } = this.props
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography component="div" className={classes.demo}>
            <p>demo@demo.com</p>
            <p>password</p>
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input onChange={e => this.email(e)} value={this.state.user.email} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={e => this.password(e)} value={this.state.user.password} name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="button" fullWidth variant="contained" color="primary" className={classes.submit} onClick={() => this.signin()}>
              Sign in
            </Button>
            {this.state.errors.length > 0 && (
              <FormControl fullWidth>
                {this.state.errors.map((e, ind) => (
                  <SnackbarContent key={ind} className={classes.error} message={e} />
                ))}
              </FormControl>
            )}
          </form>
        </Paper>
      </div>
    )
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(withStyles(styles)(Signin))
