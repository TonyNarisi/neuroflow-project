import React from 'react';
import { prettyPrint } from '../helpers.js';

const GraphTypeSwitch = (props) => (
	<div className="row-wrapper">
		<div className="row max-width narrow-column small-row-top-padding">
			<div className="col12">
				<h2 className="text-center">Choose Graph Type</h2>
			</div>
		</div>
		<div className="row max-width small-row-bottom-padding">
			<div className="col3 spacer"></div>
			{ props.potentials.map(opt => {
				let isActive = props.selected === opt;
				return (
					<div
						key={ opt }
						className="col3 text-center">
						<button
							className={ `${ props.category }-selector theme-button ${ isActive ? '': 'in' }active` }
							onClick={ (e) => { props.changeSelected(opt) } }>
							{ prettyPrint(opt) }
						</button>
					</div>
				)
			})}
			<div className="col3 spacer"></div>
		</div>
	</div>
)

export default GraphTypeSwitch;