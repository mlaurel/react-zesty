import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card'

import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      apiData: []
    }
  }
  componentDidMount() {
    const { zestyDomain, zestyHash, zestyID } = this.getEnvValues()
    fetch(`https://${zestyHash}${zestyDomain}/z/content/${zestyID}.json`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ apiData: data.data })
      })
      .catch(err => {
        console.error(err)
      })
  }
  getEnvValues() {
    if (
      !process.env.REACT_APP_ZESTY_ID ||
      !process.env.REACT_APP_ZESTY_DOMAIN ||
      !process.env.REACT_APP_ZESTY_HASH
    ) {
      throw new Error(
        'Please define `REACT_APP_ZESTY_ID`, `REACT_APP_ZESTY_DOMAIN` and `REACT_APP_ZESTY_HASH` in your .env file'
      )
    }

    const zestyID = process.env.REACT_APP_ZESTY_ID
    const zestyDomain = process.env.REACT_APP_ZESTY_DOMAIN
    const zestyHash = process.env.REACT_APP_ZESTY_HASH

    return { zestyDomain, zestyHash, zestyID }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="main">
          <AppBar
            title="Zesty.io"
          />
          <div className="articles">
            {this.state.apiData.reverse().map((article, i) => {
              return (
                <Card key={i}>
                  <CardHeader
                    title={article.title}
                    subtitle={article.author}
                    avatar={article.imageurl}
                  />
                  <CardTitle title={article.title} subtitle={article.author} />
                  <CardText>{article.article_raw}</CardText>
                </Card>
              )
            })}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
