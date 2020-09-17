import React from 'react';
import ReactDOM from 'react-dom';
import twitter from './twitter-icon.png';
import './index.css';

class App extends React.Component {
  state = {
    text: '',
    author: '',
  };

  fetchQuote = async () => {
    const response = await fetch(
      'https://quote-garden.herokuapp.com/api/v2/quotes/random'
    ).then((res) => res.json());

    this.setState({
      text: response.quote.quoteText,
      author: response.quote.quoteAuthor,
    });
  };

  componentDidMount() {
    this.fetchQuote();
  }

  render() {
    return (
      <div id='quote-box'>
        <q id='text'>
          <i> {this.state.text} </i>
        </q>
        <p id='author'>&ndash; {this.state.author}</p>
        <div id='buttons'>
          <a id='tweet-quote' href='twitter.com/intent/tweet' target='_blank'>
            <abbr title='share on Twitter'>
              <img src={twitter} alt='share on Twitter' />
            </abbr>
          </a>
          <button id='new-quote' onClick={this.fetchQuote}>
            Get a Quote!
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
