import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './styles/main.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import HighLowGame from './containers/HighLowGame';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<HighLowGame />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
