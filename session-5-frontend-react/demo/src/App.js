import React, { Component } from 'react';

class Tweet extends React.Component {
  constructor() {
    super();
    this.state = {
      numLike: 0
    };
    this.buttonOnClick = () => { this.incrementLike(); };
  }

  incrementLike() {
    const previousLike = this.state.numLike;
    const newState = {
      numLike: previousLike + 1
    };
    this.setState(newState);
  }

  render() {
    const numLike = this.state.numLike;
    return (
      <div>
        <h2>{this.props.tweet}</h2>
        <button onClick={this.buttonOnClick}>
          <span role="img" aria-label="Love">❤️</span> {numLike}
        </button>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      currTweet: ''
    };
    this.tweetIndex = 0;
    this.inputOnChange = (e) => { this.updateCurrTweet(e); };
    this.buttonOnClick = () => { this.addTweet(); };
  }

  updateCurrTweet(event) {
    const newState = {
      currTweet: event.target.value
    };
    this.setState(newState);
  }

  addTweet() {
    const prevTweets = this.state.tweets;
    if (this.state.currTweet === '') {
      alert('Input something first');
      return;
    }
    const currTweetObj = {
      index: this.tweetIndex,
      content: this.state.currTweet
    };
    this.tweetIndex += 1;

    const newTweets = [currTweetObj, ...prevTweets];
    const newState = {
      tweets: newTweets,
      currTweet: ''
    };
    this.setState(newState);
  }
  render() {
    const tweets = this.state.tweets;
    const lists = tweets.map((tweetObj) => <Tweet tweet={tweetObj.content} key={tweetObj.index} />);
    return (
      <div>
        <input value={this.state.currTweet} onChange={this.inputOnChange}/>
        <button onClick={this.buttonOnClick}>tweet</button>
        {lists}
      </div>
    );
  }
}

export default App;
