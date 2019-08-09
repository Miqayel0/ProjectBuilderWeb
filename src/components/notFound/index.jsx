import React, { Component } from 'react'

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
