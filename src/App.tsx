import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Switch, Route } from "wouter";
import React from "react";
import Register from "./pages/Register";

function App() {
	const user = null; // remplace ça avec ton contexte d'auth

	return (
		<Switch>
			<Route path="/" component={() => (user ? <Dashboard /> : <Login />)} />
			<Route path="/login" component={() => <Login />} />
			<Route path="/register" component={() => <Register />} />
			<Route path="/dashboard" component={() => <Dashboard />} />
		</Switch>
	);
}

export default App;
// App.tsx
