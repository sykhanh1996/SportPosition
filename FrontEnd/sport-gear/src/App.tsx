import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <RouterRoutes>
    <Route path="/" element={<PublicRoute />}>
				{publicRoutes.map(route => {
					return (
						<Route 
							key={route.path} 
							path={route.path}
							element={
								<AppRoute
									routeKey={route.key} 
									component={route.component}
									{...route.meta} 
								/>
							}
						/ >
					)
				})}
			</Route>
    </RouterRoutes>
  );
}

export default App;
