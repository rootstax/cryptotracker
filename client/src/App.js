import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
var NumberFormat = require('react-number-format');




const AnotherPage = () => <h1>Another Page</h1>;
const NotFound = () => <h1>404 Not Found</h1>;

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cryptos: [],
      response: '',
      post: '',
      responseToPost: '',
    };
  }

  componentDidMount() {
      // Make a request for a user with a given ID
      axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
        .then(res => {
          // handle success
          const cryptos = res.data;
          console.log(cryptos);
          this.setState({cryptos: cryptos});
        })
        .catch(error => {
          console.log(error);
        })

        this.callApi()
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('https://honeycomb-cryptotracker.herokuapp.com/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('https://honeycomb-cryptotracker.herokuapp.com/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
      <div>
        {Object.keys(this.state.cryptos).map((key) => (

          <div id="crypto-container">
            <span className="left">{key}</span>
            <span className="right"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} /></span>
          </div>

        ))}
        </div>
        <div>

                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                  <p>
                    <strong>Post to Server:</strong>
                  </p>
                  <input
                    type="text"
                    value={this.state.post}
                    onChange={e => this.setState({ post: e.target.value })}
                  />
                  <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>
        </div>
      </div>
    );
  }
}


const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/another-page/">Another Page</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/another-page/" component={AnotherPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
