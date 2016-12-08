import React, { Component } from 'react';
import logo from './logo.svg';
// probably a better way to do this
import unm from './logos/unm.png'
import schex from './users/schex.jpg'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={unm} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Scoreline />
      </div>
    );
  }
}

class Scoreline extends Component {
		render() {
			return (
			<div className="Scoreline"> 
				<Userline/>
				<Matchup/>
				<Userline/>
			</div>
		);
	}
}

class Userline extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.userImage = props.userImage;
		this.state.status = props.status;
	}
	render() {
		return (
			<img src={schex} className="User-image" alt="userImage" />
		);
	}
}

class Matchup extends Component {
	render() {
		return (
			<div className="Matchup-container">matchup</div>
		);
	}
}

class Team extends Component {

}

class Game extends Component {
	
}

class Standings extends Component {

}

class UserPicks extends Component {

}

class UserTotal extends Component {

}

export default App;
