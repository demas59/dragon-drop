import { render } from 'react-dom';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import Menu from './Menu';
import Navigator from './Navigator';
import { BrowserRouter } from 'react-router-dom';

const initialState = {
    connectedUser: {}
};
const reducer = (state, action) => {
	return {
		...state,
		connectedUser: action.connectedUser
	};
};
const ConnectedUserContext = createContext();
export const ConnectedUserHook = () => useContext(ConnectedUserContext);
export const ConnectedUserProvider = ({children}) => (
	<ConnectedUserContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</ConnectedUserContext.Provider>
);


render(
	<ConnectedUserProvider>
		<BrowserRouter>
			<Menu />
			<Navigator />
		</BrowserRouter>
	</ConnectedUserProvider>,
	document.querySelector('.appContainer')
);
