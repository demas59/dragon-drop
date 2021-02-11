import { render } from 'react-dom';
import React, { createContext, useContext, useReducer } from 'react';
import Menu from './Menu';
import Navigator from './Navigator';
import { BrowserRouter } from 'react-router-dom';

const initialState = {
    username: '',
};
const reducer = (state, action) => {
	return {
		...state,
		username: action.newUsername
	};
};
const UsernameContext = createContext();
export const UsernameHook = () => useContext(UsernameContext);
export const UsernameProvider = ({children}) => (
	<UsernameContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</UsernameContext.Provider>
 );

render(
	<UsernameProvider>
		<BrowserRouter>
			<Menu />
			<Navigator />
		</BrowserRouter>
	</UsernameProvider>,
	document.querySelector('.appContainer')
);
