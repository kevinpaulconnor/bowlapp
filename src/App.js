import React, { Component } from 'react';
import logo from './logo.svg';
// probably a better way to do this
import unm from './logos/unm.png'
import schexImage from './users/schex.jpg'
import './App.css';

var USERS = {
	schex: createUser(schexImage)
}

function createUser(image) {
	return ({
		image: image
	});
}
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
        <Scoreline users={USERS}/>
      </div>
    );
  }
}

class Scoreline extends Component {
		render() {
			return (
			<div className="Scoreline"> 
				<Userline user={this.props.users.schex}/>
				<Matchup/>
				<Userline user={this.props.users.schex}/>
			</div>
		);
	}
}

class Userline extends Component {
	render() {
		return (
			<img src={this.props.user.image} className="User-image" alt="userImage" />
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
