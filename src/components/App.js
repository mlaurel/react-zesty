import React, {Component} from 'react'

class App extends Component {
  constructor() {
    super()
    this.state = {
      apiData: []
    }
  }
  render() {
    return (
      <React.Fragment>
      <h1>Zesty.io</h1>
      <p>your data returned from the API-</p>
      </React.Fragment>
    )
  }
}

export default App
