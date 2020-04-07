import React, { Fragment } from 'react'
import spinner from './spinner.gif'

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt="Loading..." style={spin} />
    </Fragment>
  )
}

const spin = {
  width: "300px",
  margin: "auto",
  display: "block",
  objectFit: "cover"
}

export default Spinner
