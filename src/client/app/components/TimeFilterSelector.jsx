import React from 'react';
import { monthMatch } from '../constants.js';

const TimeFilterSelector = (props) => (
	<div>
		<label>Select a month to start time filter</label>
		<select
			value={ props.selected }
			onChange={ (e) => {
				props.changeSelected(e.target.value)
			} }>
			{ props.potentials.map(opt => {
				let dateParts = opt.split('-');
				let month = dateParts[0];
				let year = dateParts[1] || ''
				return(
					<option
						key={ opt }
						value={ opt }>
						{ `${ monthMatch[month] }${ year ? ' ' : ''}${ year }` }
					</option>
				)
			})}
		</select>
	</div>
)

export default TimeFilterSelector;