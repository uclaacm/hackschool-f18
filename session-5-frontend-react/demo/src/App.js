import React, { Component } from 'react';

class Tweet extends React.Component {
  constructor() {
    super();
    this.state = {
      numLike: 0
    };
  }

  incrementLike() {
    let previousLike = this.state.numLike;
    let newState = {
        numLike: previousLike + 1
    }
    this.setState(newState);
  }

  render() {
    let numLike = this.state.numLike;
    return (
    <div>
      <h2> {this.props.tweet} </h2>
      <button onClick={() => this.incrementLike()}>❤️ {numLike} </button>
    </div>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      tweets: [],
      currTweet: ""
    }
  }
  updateCurrTweet(event) {
    let tweets = this.state.tweets;
    let newState = {
        tweets: tweets,
        currTweet: event.target.value
    };
    this.setState(newState);
  }

  addTweet() {
    let prevTweets = this.state.tweets;
    if (this.state.currTweet === "") {
      alert("Input something first");
      return;
    }
    prevTweets.push(this.state.currTweet);
    let newState = {
      tweets: prevTweets,
      currTweet: ""
    }
    this.setState(newState);
  }
  render() {
    const tweets = this.state.tweets;
    const lists = tweets.map((text) => <Tweet tweet={text} />);
    return (
      <div>
        <input value={this.state.currTweet} onChange={(e) => this.updateCurrTweet(e)}/>
        <button onClick={() => this.addTweet()}> tweet </button>
        {lists}
      </div>
    );
  }
}

export default App;
