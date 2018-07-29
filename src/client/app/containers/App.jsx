import React, { Component } from 'react';
import futureStress from '../data/future_stress.json';
import mood from '../data/mood.json';
import rumination from '../data/rumination.json';
import sleep from '../data/sleep.json';
import GraphArea from '../components/GraphArea';
import Selectors from '../components/Selectors';
import GraphTypeSwitch from '../components/GraphTypeSwitch';
import TimeFilterSelector from '../components/TimeFilterSelector';

class App extends Component {
	constructor() {
		super();

		this.state = {
			metricsSelected: [
				'future_stress',
				'mood',
				'rumination',
				'sleep'
			],
			potentialMetrics: [
				'future_stress',
				'mood',
				'rumination',
				'sleep'
			],
			graphTypeSelected: 'scatterplot',
			potentialGraphTypes: [
				'line',
				'scatterplot'
			],
			timeFilter: 'all',
			potentialTimeFilters: ['all'],
			userData: [
				{
					category: 'future_stress',
					data: futureStress
				},
				{
					category: 'mood',
					data: mood
				},
				{
					category: 'rumination',
					data: rumination
				},
				{
					category: 'sleep',
					data: sleep
				}
			]
		}

		this.changeSelected = this.changeSelected.bind(this);
		this.switchGraphType = this.switchGraphType.bind(this);
		this.findTimeFilters = this.findTimeFilters.bind(this);
		this.switchTimeFilter = this.switchTimeFilter.bind(this);
	}

	componentWillMount() {
		this.findTimeFilters();
	}

	findTimeFilters() {
		// We use future stress as an example, but in production this would need to account for discrepancies between the two
		let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		let uniqueMonths = ['all'];
		for (let stressNum = futureStress.length, i = 0; i < stressNum; i++) {
			let monthNum = new Date(parseInt(futureStress[i].timestamp)).getMonth();
			let month = months[monthNum];
			if (uniqueMonths.indexOf(month) === -1) {
				uniqueMonths.push(month);
			}
		}

		this.setState({
			potentialTimeFilters: uniqueMonths
		})
	}

	changeSelected(category, choice) {
		let selectedState = this.state[`${ category }Selected`];
		let choiceIdx = selectedState.indexOf(choice);
		let newData;

		if (choiceIdx > -1) {
			newData = selectedState.filter(elm => elm != choice);
		} else {
			newData = [ ...selectedState, choice ];
		}
		this.setState({
			[`${ category }Selected`]: newData
		})
	}

	switchGraphType(choice) {
		this.setState({
			graphTypeSelected: choice
		})
	}

	switchTimeFilter(choice) {
		this.setState({
			timeFilter: choice
		})
	}

	render() {
		let state = this.state;
		return(
			<div>
				<Selectors
					category='metrics'
					potentials={ state.potentialMetrics }
					selected={ state.metricsSelected }
					changeSelected={ this.changeSelected } />
				<GraphTypeSwitch
					category='graphTypes'
					potentials={ state.potentialGraphTypes }
					selected={ state.graphTypeSelected }
					changeSelected={ this.switchGraphType } />
				<TimeFilterSelector 
					potentials={ state.potentialTimeFilters }
					selected={ state.timeFilter }
					changeSelected={ this.switchTimeFilter } />
				<GraphArea
					metricsSelected={ state.metricsSelected }
					graphTypeSelected={ state.graphTypeSelected }
					userData={ state.userData } />
			</div>
		)
	}	
}


export default App;