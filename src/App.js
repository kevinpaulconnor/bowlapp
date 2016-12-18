import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';

/*-----------Components---------------*/

class App extends Component {
	componentDidMount() {
		this.props.actions.initializeGames();
	}

	render() {
	
		function toggleView() {
		
		}
		var renderRoot;
    if (this.props.otherView === "Standings") {
	  	renderRoot = <Scoreline games={this.props.games} scores={this.props.scores} otherView={this.props.otherView}/>
		} else {
			renderRoot = <Standings users={this.props.users} />
		}	
    return (
      <div className="App">
        <div className="App-header">	
        	<button name="getscores" type="button" onClick={this.props.actions.refreshScores}>Get Scores</button>
        	<button name="toggleview" type="button" onClick={this.props.actions.changeView}>{this.props.otherView}</button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <span>{this.props.timestamp}</span>
				{renderRoot}
      </div>
    );
  }
}

class Scoreline extends Component {

		render() {
			var rows = [];
			this.props.games.forEach(
				function(game) {
				rows.push(
					<div className="Scoreline" key={game.name}> 
						<Userline user={game.team1User} gameState={game.gameState} team={game.team1}/>
						<Team team={game.team1} gameState={game.gameState} score={this.props.scores[game.team1.name]} flip={false}/>
						<Game game={game} />
						<Team team={game.team2} gameState={game.gameState} score={this.props.scores[game.team2.name]} flip={true}/>
						<Userline user={game.team2User} gameState={game.gameState} team={game.team2}/>
					</div>
				);
			}.bind(this))
			return (
					<div className="Scoreline-container">{rows}</div>
			);
	}
}

class Userline extends Component {
	render() {
		var userClassName = 'User';
		if (this.props.gameState) {
			if (this.props.gameState == 'final') {
				userClassName += (this.props.team.winner) ? ' winner' : ' loser';
			} else {
				userClassName += ' ' + this.props.gameState;
			}
		}
		return (
			<span className={userClassName}><img src={this.props.user.image} className="User-image" alt="userImage" /></span>
		);
	}
}

class Team extends Component {

	render() {		
		var score = this.props.score ? this.props.score : "-";
	
		//FIXME: wet code
		var containerClassName = 'Team-container';
		var scoreClassName = 'Team-score' + ' ' + this.props.gameState;
		var imgContainerClassName = 'Team-imgcontainer';
		if (this.props.flip) {
			containerClassName += ' flip';
			scoreClassName += ' flip';
			imgContainerClassName += ' flip';
		}
		
		var items = [
			<span key={this.props.team.teamId} className={scoreClassName}>{score}</span>,
			<span className={imgContainerClassName}><img src={this.props.team.logo} className="Team-logo"/></span>
		];
		if (this.props.flip) {
			items = items.reverse();
		}

		return (
			<span key={this.props.team.teamId} className={containerClassName}>{items}</span>
		);
	}
}

class Game extends Component {
		
	render() {
		return (
			<div className="Game-container">
			<div className="Game-bowlname">{this.props.game.name}</div>
			<div className="Game-stadium">{this.props.game.stadium}</div>
			<div className="Game-location">{this.props.game.location}</div>				
			<div className="Game-tv">{this.props.game.tv}</div>
			<div className="Game-date">{this.props.game.date}</div>
			</div>
		);
	}
	
}

class Standings extends Component {
	render() {
		var users = this.props.users.sort(function(a,b) {a.total > b.total});
		var rows = [];
		users.props.forEach( function(user) {
			rows.push( <Userline user={user} />);
		});
		return(
			{rows}
		)
	}

}

class UserPicks extends Component {

}

class UserTotal extends Component {

}

function mapStateToProps(state) {
  return {
  	users: state.users,
    games: state.games,
    scores: state.scores,
    otherView: state.view.otherView
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
