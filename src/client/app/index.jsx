import styles from './styles/main.scss';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App.jsx';

render(
	<App />,
	document.getElementById('react-app')
)