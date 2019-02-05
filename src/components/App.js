import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Drawer, Button, Divider, IconButton, CssBaseline } from '@material-ui/core'
import { Menu, ChevronLeft, ChevronRight } from '@material-ui/icons'
import Router from './Router'
import Navigation from './Navigation'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  btnSignin: {
    marginRight: 20
  },
  signin: {
    color: '#ffffff',
    textDecoration: 'none'
  },
  grow: {
    flexGrow: 1
  }
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
              <Link to="/" className={classes.signin}>
                React App
              </Link>
            </Typography>

            {!this.props.user.email && (
              <Button color="inherit" className={classes.btnSignin}>
                <Link to="/signin" className={classes.signin}>
                  Login
                </Link>
              </Button>
            )}
            {this.props.user.email && (
              <Button color="inherit" className={classes.btnSignin}>
                <Link to="/profile" className={classes.signin}>
                  {this.props.user.email}
                </Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}</IconButton>
          </div>
          <Divider />
          <Navigation />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Router />
        </main>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(App)))
