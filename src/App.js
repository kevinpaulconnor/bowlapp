import React, { Component } from 'react';
import logo from './logo.svg';
// probably a better way to import these images
import logoUnm from './logos/unm.png'
import logoUtsa from './logos/utsa.png'
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

var TEAMS = {
	newmexico: createTeam('New Mexico', logoUnm),
	utsa: createTeam("Texas-San Antonio", logoUtsa)
}

function createTeam(name, logo){
	return({
		name: name,
		logo: logo
	});

}

var GAMES = [
	createBowlGame("New Mexico Bowl", "University Stadium", "Albuquerque, NM", "Dec 17, 2016 11:00", "ESPN",
		TEAMS.newmexico, TEAMS.utsa, USERS.kevin, USERS.schex)
];

function createBowlGame(name, stadium, location, datestring, tv, team1, team2, team1User, team2User) {
	return ({
		name: name,
		stadium: stadium,
		location: location,
		date: new Date(datestring),
		tv: tv,
		team1: team1,
		team2, team2,
		team1User: team1User,
		team2User: team2User
	});
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logoUnm} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Scoreline games={GAMES}/>
      </div>
    );
  }
}

class Scoreline extends Component {
		render() {
			return (
			<div className="Scoreline"> 
				<Userline user={this.props.games[0].team1User}/>
				<Matchup game={this.props.games[0]}/>
				<Userline user={this.props.games[0].team2User}/>
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
			<div className="Matchup-container">
			{<Team team={this.props.game.team1}/>}
			<Game game={this.props.game} />
			{/*<Team />*/}
			</div>
		);
	}
}

class Team extends Component {
	render() {
		return (
			<div className="Team-container">
			<span className="Team-score">-</span>
			<span className="Team-name">{this.props.team.name}</span>
			<img src={this.props.team.logo} className="Team-logo"/>
			</div>
		);
	}
}

class Game extends Component {
		
	render() {
		// doesn't seem like this should really be in the render
		function dateFormat(date) {
			var options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
			return date.toLocaleString('en-US', options)
		}
	
		var formattedDate = dateFormat(this.props.game.date);
		return (
			<div className="Game-container">
			<div className="Game-bowlname">{this.props.game.name}</div>
			<div className="Game-stadium">{this.props.game.stadium}</div>			
			<div className="Game-location">{this.props.game.location}</div>				
			<div className="Game-tv">{this.props.game.tv}</div>
			<div className="Game-date">{formattedDate}</div>
			</div>
		);
	}
	
}

class Standings extends Component {

}

class UserPicks extends Component {

}

class UserTotal extends Component {

}

export default App;
