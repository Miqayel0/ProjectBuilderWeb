import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NotFound extends Component {
  render() {
    return (
      <div className="notFound">
        <img src="/public/images/notFound.png" alt='Not Found' />
      </div>
    )
  }
}

NotFound.propTypes = {}
