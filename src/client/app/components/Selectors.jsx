import React from 'react';
import { prettyPrint } from '../helpers.js';

const Selectors = (props) => (
	<div className="row-wrapper">
		<div className="row max-width standard-row-top-padding">
			<div className="col12">
				<h2 className="text-center">Choose Metrics to View</h2>
			</div>
		</div>
		<div className="row max-width narrow-column small-row-bottom-padding">
			{ props.potentials.map(opt => {
				let isActive = props.selected.indexOf(opt) > -1;
				return (
					<div
						key={ opt }
						className="col3 text-center">
						<button
							className={ `${ props.category }-selector theme-button ${ isActive ? '': 'in' }active` }
							onClick={ (e) => { props.changeSelected(props.category, opt) } }>
							{ prettyPrint(opt) }
						</button>
					</div>
				)
			})}
		</div>
	</div>
)

export default Selectors;