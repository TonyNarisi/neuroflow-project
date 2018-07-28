import React from 'react';
import { prettyPrint } from '../helpers.js';

const Selectors = (props) => (
	<div>
		{ props.potentials.map(opt => {
			let isActive = props.selected.indexOf(opt) > -1;
			return (
				<div
					key={ opt }>
					<button
						className={ `${ props.category }-selector ${ isActive ? 'active': '' }` }
						onClick={ (e) => { props.changeSelected(props.category, opt) } }>
						{ prettyPrint(opt) }
					</button>
				</div>
			)
		})}
	</div>
)

export default Selectors;