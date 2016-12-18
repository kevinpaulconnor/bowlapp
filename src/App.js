import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';
import {USERS} from './reducers/users';

/*-----------Components---------------*/

class App extends Component {
	componentDidMount() {
		this.props.actions.initializeGames();
	}

	render() {
		var renderRoot;
    if (this.props.otherView === "Standings") {
    	//FIXME starting to pass a lot of state along here...
	  	renderRoot = <Scoreline userPicks={this.props.userState.userPicks} games={this.props.games} scores={this.props.scores} otherView={this.props.otherView}/>
		} else {
			renderRoot = <Standings userState={this.props.userState} />
		}	
    return (
      <div className="App">
        <div className="App-header">	
        	<button name="getscores" type="button" onClick={this.props.actions.refreshScores}>Get Scores</button>
        	<button name="toggleview" type="button" onClick={this.props.actions.changeView}>{this.props.otherView}</button>
        </div>
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
						<Userline pick={this.props.userPicks[game.team1.name]} gameState={game.gameState} />
						<Team team={game.team1} gameState={game.gameState} score={this.props.scores[game.team1.name]} flip={false}/>
						<Game game={game} />
						<Team team={game.team2} gameState={game.gameState} score={this.props.scores[game.team2.name]} flip={true}/>
						<Userline pick={this.props.userPicks[game.team2.name]} gameState={game.gameState} />
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
		var user = this.props.userId ? USERS[this.props.userId] : USERS[this.props.pick.user];
		var userImage = user.image;
		var userClassName = 'User';
		if (this.props.gameState) {
			if (this.props.gameState === 'final') {
				userClassName += (this.props.pick.result === true) ? ' winner' : ' loser';
			} else {
				userClassName += ' ' + this.props.gameState;
			}
		}
		return (
			<span className={userClassName}><img src={userImage} className="User-image" alt="user" /></span>
		);
	}
}

class Team extends Component {

	render() {		
		var score = this.props.score ? this.props.score : "-";
	
		//FIXME: wet code
		var containerClassName = 'Team-container';
		var scoreClassName = 'Team-score  ' + this.props.gameState;
		var imgContainerClassName = 'Team-imgcontainer';
		if (this.props.flip) {
			containerClassName += ' flip';
			scoreClassName += ' flip';
			imgContainerClassName += ' flip';
		}
		
		var items = [
			<span key={this.props.team.teamId} className={scoreClassName}>{score}</span>,
			<span className={imgContainerClassName}><img src={this.props.team.logo} className="Team-logo" alt="logo"/></span>
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
		var sortByWins = [];
		var myState = this.props.userState;
		Object.keys(myState.winTotal).forEach( function(key) {
			sortByWins.push({
				total: myState.winTotal[key],
				user: USERS[key],
				id: key
			});
		});
		sortByWins.sort(function (a,b) {
			// super awkward sort fxn in javascript, ugh
			// TODO: break ties in here
			if (a.total < b.total) {
				return 1;
			}
			if (a.total > b.total) {
				return -1;
			}
			return 0;
		});
		
		var rows = [];
		sortByWins.forEach( function(item) {
			// FIXME: probably not the best way to pass these properties down
			rows.push( <Standingsline key={item.user.id} userState={myState} userId={item.id}/>);
		});
		return(
			<div className="Standings-container">{rows}</div>
		)
	}
}

class Standingsline extends Component {
	render() {
		return (
			<div className="Standingsline">
			<Userline userState={this.props.userState} userId={this.props.userId}/>
			<UserPicks userState={this.props.userState} userId={this.props.userId}/>
			<UserTotal userState={this.props.userState} userId={this.props.userId}/>
			</div>
		)
	}
}

class UserPicks extends Component {
	render() {
		var user = USERS[this.props.userId];
		var items = [];
		user.pickOrder.forEach( function(pick) {
			items.push(buildPickForDisplay(pick));
		});
		
		function buildPickForDisplay(pick) {
			return <span className="UserPicks-pick">{pick}</span>;
		}
	
		return (
			<span className="UserPicks">
			{items}
			</span>
		)
	}
}

class UserTotal extends Component {
	render() {
		console.log(this.props);
		return (
			<span className="UserTotal">{this.props.userState.winTotal[this.props.userId]}</span>
		)
	}
}

function mapStateToProps(state) {
  return {
  	userState: state.users,
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
