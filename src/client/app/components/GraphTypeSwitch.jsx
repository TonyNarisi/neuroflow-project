import React from 'react';
import { prettyPrint } from '../helpers.js';

const GraphTypeSwitch = (props) => (
	<div>
		{ props.potentials.map(opt => {
			let isActive = props.selected === opt;
			return (
				<div
					key={ opt }>
					<button
						className={ `${ props.category }-selector ${ isActive ? 'active': '' }` }
						onClick={ (e) => { props.changeSelected(opt) } }>
						{ prettyPrint(opt) }
					</button>
				</div>
			)
		})}
	</div>
)

export default GraphTypeSwitch;