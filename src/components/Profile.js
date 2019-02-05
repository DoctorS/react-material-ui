import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({})

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (!this.props.user.email) return <Redirect to="/signin" />
    return (
      <Typography component="h1" variant="h5">
        Profile: {this.props.user.email}
      </Typography>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(withStyles(styles)(Profile))
