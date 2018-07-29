import React from 'react';
import { monthMatch } from '../constants.js';

const TimeFilterSelector = (props) => (
	<div>
		<label>Select a filter for time period</label>
		<select
			value={ props.selected }
			onChange={ (e) => {
				props.changeSelected(e.target.value)
			} }>
			{ props.potentials.map(opt => {
				return(
					<option
						key={ opt }
						value={ opt }>
						{ monthMatch[opt] }
					</option>
				)
			})}
		</select>
	</div>
)

export default TimeFilterSelector;