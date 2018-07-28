import React from 'react';
import MetricSelectors from '../containers/MetricSelectors';
import GraphTypeSelectors from '../containers/GraphTypeSelectors';
import GraphArea from './GraphArea';

const App = () => (
	<div>
		<MetricSelectors />
		<GraphTypeSelectors />
		<GraphArea />
	</div>
)

export default App;