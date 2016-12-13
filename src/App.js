import React, { Component } from 'react';
import logo from './logo.svg';
// probably a better way to import these images
import './App.css';

var USERS = {
	schex: createUser(require('./users/schex.jpg')),
	dan: createUser(require('./users/dan.jpg')),
	pat: createUser(require('./users/pat.jpg')),
	kevin: createUser(require('./users/kevin.jpg')),
}

function createUser(image) {
	return ({
		image: image
	});
}

var TEAMS = {
	
	// FIXME: use prop name in logo path
	airforce: createTeam("The Air Force", require('./logos/airforce.png')),
	alabama: createTeam("Alabama", require('./logos/alabama.png')),
	appstate: createTeam("", require('./logos/appstate.png')),
	arkansas: createTeam("Texas-San Antonio", require('./logos/arkansas.png')),
	arkstate: createTeam("Texas-San Antonio", require('./logos/arkstate.png')),
	army: createTeam("Texas-San Antonio", require('./logos/army.png')),
	auburn: createTeam("Texas-San Antonio", require('./logos/auburn.png')),
	baylor: createTeam("Texas-San Antonio", require('./logos/baylor.png')),
	boise: createTeam("Texas-San Antonio", require('./logos/boise.png')),
	bostoncollege: createTeam("Texas-San Antonio", require('./logos/bostoncollege.png')),
	byu: createTeam("Texas-San Antonio", require('./logos/byu.png')),
	cenmich: createTeam("Texas-San Antonio", require('./logos/cenmich.png')),
	clemson: createTeam("Texas-San Antonio", require('./logos/clemson.png')),
	colorado: createTeam("Texas-San Antonio", require('./logos/colorado.png')),
	coloradostate: createTeam("Texas-San Antonio", require('./logos/coloradostate.png')),
	eastmich: createTeam("Texas-San Antonio", require('./logos/eastmich.png')),
	florida: createTeam("Texas-San Antonio", require('./logos/florida.png')),
	flostate: createTeam("Texas-San Antonio", require('./logos/flostate.png')),
	georgia: createTeam("Texas-San Antonio", require('./logos/georgia.png')),
	geotech: createTeam("Texas-San Antonio", require('./logos/geotech.png')),
	hawaii: createTeam("Texas-San Antonio", require('./logos/hawaii.png')),
	houston: createTeam("Houston", require('./logos/houston.png')),
	idaho: createTeam("Texas-San Antonio", require('./logos/idaho.png')),
	indiana: createTeam("Texas-San Antonio", require('./logos/indiana.png')),
	iowa: createTeam("Texas-San Antonio", require('./logos/iowa.png')),
	kentucky: createTeam("Texas-San Antonio", require('./logos/kentucky.png')),
	kanstate: createTeam("Texas-San Antonio", require('./logos/kanstate.png')),
	louisville: createTeam("Texas-San Antonio", require('./logos/louisville.png')),
	loulaf: createTeam("Texas-San Antonio", require('./logos/loulaf.png')),
	loutech: createTeam("Texas-San Antonio", require('./logos/loutech.png')),
	lsu: createTeam("Texas-San Antonio", require('./logos/lsu.png')),
	maryland: createTeam("Texas-San Antonio", require('./logos/maryland.png')),
	memphis: createTeam("Texas-San Antonio", require('./logos/memphis.png')),
	miami: createTeam("Texas-San Antonio", require('./logos/miami.png')),
	miaoh: createTeam("Texas-San Antonio", require('./logos/miaoh.png')),
	michigan: createTeam("Texas-San Antonio", require('./logos/michigan.png')),
	midtenn: createTeam("Texas-San Antonio", require('./logos/midtenn.png')),
	minnesota: createTeam("Texas-San Antonio", require('./logos/minnesota.png')),
	misstate: createTeam("Texas-San Antonio", require('./logos/misstate.png')),
	navy: createTeam("Texas-San Antonio", require('./logos/navy.png')),
	ncstate: createTeam("Texas-San Antonio", require('./logos/ncstate.png')),
	nebraska: createTeam("Texas-San Antonio", require('./logos/nebraska.png')),
	northcarolina: createTeam("Texas-San Antonio", require('./logos/northcarolina.png')),
	northtexas: createTeam("Texas-San Antonio", require('./logos/northtexas.png')),
	northwestern: createTeam("Texas-San Antonio", require('./logos/northwestern.png')),
	olddominion: createTeam("Texas-San Antonio", require('./logos/olddominion.png')),
	ohio: createTeam("Texas-San Antonio", require('./logos/ohio.png')),
	ohiostate: createTeam("Texas-San Antonio", require('./logos/ohiostate.png')),
	oklahoma: createTeam("Texas-San Antonio", require('./logos/oklahoma.png')),
	okstate: createTeam("Texas-San Antonio", require('./logos/okstate.png')),
	pennstate: createTeam("Texas-San Antonio", require('./logos/pennstate.png')),
	pitt: createTeam("Texas-San Antonio", require('./logos/pitt.png')),
	sdsu: createTeam("San Diego State", require('./logos/sdsu.png')),
	southalabama: createTeam("Texas-San Antonio", require('./logos/southalabama.png')),
	southcarolina: createTeam("Texas-San Antonio", require('./logos/southcarolina.png')),
	southmississippi: createTeam("Texas-San Antonio", require('./logos/southmississippi.png')),
	southflorida: createTeam("Texas-San Antonio", require('./logos/southflorida.png')),
	stanford: createTeam("Texas-San Antonio", require('./logos/stanford.png')),
	tcu: createTeam("Texas-San Antonio", require('./logos/tcu.png')),
	temple: createTeam("Texas-San Antonio", require('./logos/temple.png')),
	tennessee: createTeam("Texas-San Antonio", require('./logos/tennessee.png')),
	texasam: createTeam("Texas-San Antonio", require('./logos/texasam.png')),
	toledo: createTeam("Texas-San Antonio", require('./logos/toledo.png')),
	troy: createTeam("Texas-San Antonio", require('./logos/troy.png')),
	ucf: createTeam("Texas-San Antonio", require('./logos/ucf.png')),
	newmexico: createTeam('New Mexico', require('./logos/newmexico.png')),
	usc: createTeam("Texas-San Antonio", require('./logos/usc.png')),
	utah: createTeam("Texas-San Antonio", require('./logos/utah.png')),
	utsa: createTeam("Texas-San Antonio", require('./logos/utsa.png')),
	vanderbilt: createTeam("Texas-San Antonio", require('./logos/vanderbilt.png')),
	vatech: createTeam("Texas-San Antonio", require('./logos/vatech.png')),
	wake: createTeam("Texas-San Antonio", require('./logos/wake.png')),
	washington: createTeam("Texas-San Antonio", require('./logos/washington.png')),
	wastate: createTeam("Texas-San Antonio", require('./logos/wastate.png')),
	westkentucky: createTeam("Texas-San Antonio", require('./logos/westkentucky.png')),
	westmichigan: createTeam("Texas-San Antonio", require('./logos/westmichigan.png')),
	westvirginia: createTeam("Texas-San Antonio", require('./logos/westvirginia.png')),
	wisconsin: createTeam("Texas-San Antonio", require('./logos/wisconsin.png')),
	wyoming: createTeam("Texas-San Antonio", require('./logos/wyoming.png'))
}

function createTeam(name, logo){
	return({
		name: name,
		logo: logo
	});

}

var GAMES = [
	createBowlGame("New Mexico Bowl", "University Stadium", "Albuquerque, NM", "Dec 17, 2016 11:00", "ESPN",
		TEAMS.newmexico, TEAMS.utsa, USERS.kevin, USERS.schex),
		createBowlGame("Las Vegas Bowl", "Sam Boyd Stadium", "Las Vegas, NV", "Dec 17, 2016 12:30", "ABC",
		TEAMS.houston, TEAMS.sdsu, USERS.pat, USERS.dan)
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
        <Scoreline games={GAMES}/>
      </div>
    );
  }
}

class Scoreline extends Component {

		render() {
			var rows = [];
			this.props.games.forEach( function(game) {
				rows.push(
					<div className="Scoreline"> 
						<Userline user={game.team1User}/>
						<Matchup game={game}/>
						<Userline user={game.team2User}/>
					</div>
				);
			})
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

class Matchup extends Component {
	render() {
		return (
			<div className="Matchup-container">
			<Team team={this.props.game.team1} flip={false}/>
			<Game game={this.props.game} />
			<Team team={this.props.game.team2} flip={true}/>
			</div>
		);
	}
}

class Team extends Component {
	render() {
		var score1 = Math.floor(Math.random() * (50 - 0)) + 0;
		var score2 = Math.floor(Math.random() * (50 - 0)) + 0;
		
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
			<span className={scoreClassName}>{score1}</span>,
			// really simplifies display css to not include the team name
			/*<span className="Team-name">{this.props.team.name}</span>,*/
			<span className={imgContainerClassName}><img src={this.props.team.logo} className="Team-logo"/></span>
		];
		
		// just for layout testing with random scores
		if (this.props.flip) {
			//items = items.reverse();
			items = [	
			<span className={imgContainerClassName}><img src={this.props.team.logo} className="Team-logo"/></span>,
			<span className={scoreClassName}>{score2}</span>
			// really simplifies display css to not include the team name
			/*<span className="Team-name">{this.props.team.name}</span>,*/
		];
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

export default App;
