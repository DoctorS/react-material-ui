import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Home, TransferWithinAStation, GroupAdd, ExitToApp, SentimentSatisfied } from '@material-ui/icons'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({})

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  logout(e) {
    e.preventDefault()
    this.props.dispatch({ type: 'SET_USER', payload: { email: '' } })
  }

  render() {
    return (
      <div className="Navigation">
        <List>
          <NavLink to="/">
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
          {!this.props.user.email && (
            <Fragment>
              <NavLink to="/signin">
                <ListItem button>
                  <ListItemIcon>
                    <TransferWithinAStation />
                  </ListItemIcon>
                  <ListItemText primary="Sign in" />
                </ListItem>
              </NavLink>
              <NavLink to="/signup">
                <ListItem button>
                  <ListItemIcon>
                    <GroupAdd />
                  </ListItemIcon>
                  <ListItemText primary="Sign up" />
                </ListItem>
              </NavLink>
            </Fragment>
          )}
          {this.props.user.email && (
            <Fragment>
              <NavLink to="/profile">
                <ListItem button>
                  <ListItemIcon>
                    <SentimentSatisfied />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
              </NavLink>
              <NavLink to="/logout" onClick={e => this.logout(e)}>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </NavLink>
            </Fragment>
          )}
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(withStyles(styles)(Navigation))
