import React, { Component } from 'react';
// import MetricSelectors from '../containers/MetricSelectors';
// import GraphTypeSelectors from '../containers/GraphTypeSelectors';
import GraphArea from '../components/GraphArea';
import Selectors from '../components/Selectors';

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
			graphTypesSelected: [
				'standard_line'
			],
			potentialGraphTypes: [
				'standard_line',
				'linear_regression'
			]
		}

		this.changeSelected = this.changeSelected.bind(this);
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

	render() {
		let state = this.state;
		return(
			<div>
				<Selectors
					category='metrics'
					potentials={ state.potentialMetrics }
					selected={ state.metricsSelected }
					changeSelected={ this.changeSelected } />
				<Selectors 
					category='graphTypes'
					potentials={ state.potentialGraphTypes }
					selected={ state.graphTypesSelected }
					changeSelected={ this.changeSelected } />
				<GraphArea
					metricsSelected={ state.metricsSelected }
					graphTypesSelected={ state.graphTypesSelected } />
			</div>
		)
	}	
}


export default App;