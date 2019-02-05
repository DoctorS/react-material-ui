import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="Home">
        <Typography component="h1" variant="h4">
          Home
        </Typography>
        <Typography paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut culpa, cumque delectus dolorem doloribus eius excepturi facere in minima modi molestias nobis nulla placeat possimus quae quis rem sequi sit vitae? Eaque inventore, modi molestiae quae reiciendis repellendus repudiandae saepe vero voluptatem! Aliquid atque autem consequuntur cumque dolores esse fugiat iste laborum molestiae odit quas quis quo temporibus, tenetur voluptas. Commodi fugit natus officiis possimus?</Typography>
      </div>
    )
  }
}

export default Home
