import React, { Component } from 'react';
import futureStress from '../data/future_stress.json';
import mood from '../data/mood.json';
import rumination from '../data/rumination.json';
import sleep from '../data/sleep.json';

class GraphArea extends Component {
	constructor() {
		super();

		this.state = {
			userData: {
				future_stress: futureStress,
				mood: mood,
				rumination: rumination,
				sleep: sleep
			}
		}
	}

	render() {
		return(
			<div>
				GraphArea
			</div>
		)
	}
}

export default GraphArea;