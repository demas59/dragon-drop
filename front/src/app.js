import { render } from 'react-dom';
import React from 'react';
import Menu from './Menu';
import Navigator from './Navigator';
import { BrowserRouter } from 'react-router-dom';


render(
	<BrowserRouter>
		<Menu />
		<Navigator />
	</BrowserRouter>,
	document.querySelector('.appContainer')
);
