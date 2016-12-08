import React, { Component } from 'react';
import logo from './logo.svg';
// probably a better way to import these images
import unm from './logos/unm.png'
import schexImage from './users/schex.jpg'
import danImage from './users/dan.jpg'
import patImage from './users/pat.jpg'
import kevinImage from './users/kevin.jpg'
import './App.css';

var USERS = {
	schex: createUser(schexImage),
	dan: createUser(danImage),
	pat: createUser(patImage),
	kevin: createUser(kevinImage),
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
				<Userline user={this.props.users.pat}/>
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
