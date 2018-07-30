import React from 'react';
import { monthMatch } from '../constants.js';

const TimeFilterSelector = (props) => (
	<div className="row-wrapper">
		<div className="row max-width small-row-bottom-padding">
			<div className="col12">
				<h2 className="text-center">Select a month to filter by:</h2>
				<select
					value={ props.selected }
					className="center-self"
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
		</div>
	</div>
)

export default TimeFilterSelector;