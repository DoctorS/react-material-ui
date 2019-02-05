import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import validator from 'validator'
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
  }
})

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: []
    }
  }

  signup() {
    this.setState({ errors: [] }, () => {
      let errors = []
      if (!validator.isEmail(this.state.user.email)) errors.push('Invalid email address.')
      if (this.state.user.password !== this.state.user.confirmPassword) errors.push('Password and password confirmation are not equal.')
      if (this.state.user.password.length < 6) errors.push('Password less than 6 characters.')

      if (errors.length) {
        this.setState({ errors })
        return
      }
      this.props.dispatch({
        type: 'SET_USER',
        payload: { email: this.state.user.email }
      })
    })
  }

  email(e) {
    this.setState({ user: Object.assign(this.state.user, { email: e.target.value }) })
  }

  password(e) {
    this.setState({ user: Object.assign(this.state.user, { password: e.target.value }) })
  }

  confirmPassword(e) {
    this.setState({ user: Object.assign(this.state.user, { confirmPassword: e.target.value }) })
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
            Sign up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input onChange={e => this.email(e)} value={this.state.user.email} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={e => this.password(e)} value={this.state.user.password} name="password" type="password" id="password" autoComplete="off" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
              <Input onChange={e => this.confirmPassword(e)} value={this.state.user.confirmPassword} name="confirm_password" type="password" id="confirm_password" autoComplete="off" />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="button" fullWidth variant="contained" color="primary" className={classes.submit} onClick={() => this.signup()}>
              Sign up
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

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(withStyles(styles)(Signup))
