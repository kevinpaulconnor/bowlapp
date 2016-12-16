import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';

/*-----------Components---------------*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
					<h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button name="getscores" type="button" onClick={this.props.actions.requestUpdate}>Get Scores</button>
        <Scoreline games={this.props.games} scores={this.props.scores}/>
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
					<div className="Scoreline"> 
						<Userline user={game.team1User}/>
						<Team team={game.team1} score={this.props.scores[game.team1.id]} flip={false}/>
						<Game game={game} />
						<Team team={game.team2} score={this.props.scores[game.team2.id]} flip={true}/>
						<Userline user={game.team2User}/>
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
		return (
			<span className="User"><img src={this.props.user.image} className="User-image" alt="userImage" /></span>
		);
	}
}

class Team extends Component {

	render() {		
		//FIXME: wet code
		var containerClassName = 'Team-container';
		var scoreClassName = 'Team-score';
		var imgContainerClassName = 'Team-imgcontainer';
		if (this.props.flip) {
			containerClassName += ' flip';
			scoreClassName += ' flip';
			imgContainerClassName += ' flip';
		}
		
		var items = [
			<span className={scoreClassName}>{this.props.score}</span>,
			<span className={imgContainerClassName}><img src={this.props.team.logo} className="Team-logo"/></span>
		];
		if (this.props.flip) {
			items = items.reverse();
		}

		return (
			<span className={containerClassName}>{items}</span>
		);
	}
}

class Game extends Component {
		
	render() {
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

function mapStateToProps(state) {
  return {
    games: state.games,
    scores: state.scores.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
