String.prototype.ucfirst = function() {
  return this.charAt(0).toUpperCase() + this.substr(1);
}

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

render(<Root/>, document.getElementById("root"))
