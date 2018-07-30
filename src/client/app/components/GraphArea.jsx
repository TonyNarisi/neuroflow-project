import React, { Component } from 'react';
import Graph from '../containers/Graph';

const GraphArea = (props) => (
	<div>
		{ props.userData.map(dataGroup => {
			let isActive = props.metricsSelected.indexOf(dataGroup.category) > -1;
			return(
				<div
					key={ dataGroup.category }
					className={ `graph-${ !isActive ? 'in': '' }active row-wrapper` }>
					<div className="row small-row-padding max-width narrow-column">
						<div className='data-holder'>
							<Graph 
								timeFilter={ props.timeFilter }
								category={ dataGroup.category }
								data={ dataGroup.data }
								type={ props.graphTypeSelected } />
						</div>
					</div>
				</div>
			)
		})}
		<div>
		</div>
	</div>
)

export default GraphArea;