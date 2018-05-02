import React, {Component} from 'react'

import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      apiData: [{}]
    }
  }
  componentDidMount(){
    const {
      zestyDomain,
      zestyHash,
      zestyID
    } = this.getEnvValues()
    fetch(`https://${zestyHash}${zestyDomain}/z/content/${zestyID}.json`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({apiData: data.data})
      })
      .catch(err => {
        console.error(err)
      })
  }
  getEnvValues() {
    if (!process.env.REACT_APP_ZESTY_ID
      || !process.env.REACT_APP_ZESTY_DOMAIN
      || !process.env.REACT_APP_ZESTY_HASH) {
      throw new Error('Please define `REACT_APP_ZESTY_ID`, `REACT_APP_ZESTY_DOMAIN` and `REACT_APP_ZESTY_HASH` in your .env file');
    }

    const zestyID = process.env.REACT_APP_ZESTY_ID;
    const zestyDomain = process.env.REACT_APP_ZESTY_DOMAIN;
    const zestyHash = process.env.REACT_APP_ZESTY_HASH;

    return { zestyDomain, zestyHash, zestyID };
  }
  render() {
    return (
      <div className="main">
        <h1>Zesty.io</h1>
        <p>your data returned from the API-</p>
        <div className="articles">
          {this.state.apiData.reverse().map((article, i) => {
            return <article key={i}>
            <h2>{article.title}</h2>
            <p>{article.article}</p>
            </article>
          })}
        </div>
      </div>
    )
  }
}

export default App
